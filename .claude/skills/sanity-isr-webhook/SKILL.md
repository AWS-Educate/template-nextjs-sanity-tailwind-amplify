---
name: sanity-isr-webhook
description: Set up on-demand ISR (Incremental Static Regeneration) via Sanity webhook for Next.js apps deployed on AWS Amplify. Use when the user says "set up revalidation", "Sanity webhook", "on-demand ISR", "cache revalidation", "Sanity + Next.js + Amplify revalidation", or wants content changes in Sanity to instantly update the Next.js frontend without rebuilding.
---

# Sanity → Next.js On-Demand ISR via Webhook (AWS Amplify)

Publish in Sanity → webhook fires → Next.js API route revalidates cache tags → page updates in ~2-3s.

## Prerequisites

- Next.js App Router (v14+) with `next-sanity` installed
- Sanity project with dataset
- AWS Amplify hosting (SSR mode)
- `npm install next-sanity` (includes `parseBody` for webhook HMAC validation)

## Step 1: Generate Shared Secret

Generate a random secret string (32+ chars). Store it in:
1. `next-app/.env.local` as `SANITY_REVALIDATE_SECRET=<secret>`
2. AWS Amplify Console → Environment Variables → same key/value
3. Sanity webhook config (Step 4)

## Step 2: Create API Route

Create `src/app/api/revalidate/route.ts`:

```typescript
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Map Sanity document types → cache tags to revalidate
const TYPE_TAG_MAP: Record<string, string[]> = {
  // CUSTOMIZE: Add your Sanity schema types and their cache tags
  post: ['post', 'blog'],
  page: ['page'],
  // Add more mappings as needed
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string
      _id: string
      slug?: string
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad request', { status: 400 })
    }

    const tags = TYPE_TAG_MAP[body._type] || []

    // Granular slug-based tag for single-page revalidation
    if (body.slug) {
      tags.push(`${body._type}:${body.slug}`)
    }

    for (const tag of tags) {
      revalidateTag(tag)
    }

    return NextResponse.json({
      revalidated: true,
      tags,
      type: body._type,
      id: body._id,
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
```

## Step 3: Add Cache Tags to Data Fetching

In pages/components that fetch Sanity data, use `next: { tags: [...] }`:

```typescript
// Example: fetching blog posts
const posts = await sanityClient.fetch(query, params, {
  next: { tags: ['post', 'blog'] },
})

// Example: fetching a single post by slug
const post = await sanityClient.fetch(query, { slug }, {
  next: { tags: ['post', `post:${slug}`] },
})
```

## Step 4: Configure Sanity Webhook

Go to: `https://sanity.io/manage` → Project → API → Webhooks → Create Webhook

| Field | Value |
|-------|-------|
| Name | `Next.js ISR Revalidation` |
| URL | `https://YOUR-DOMAIN.com/api/revalidate` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | Leave empty (all types) or use GROQ filter |
| Projection | `{_type, _id, "slug": slug.current}` |
| Secret | The same `SANITY_REVALIDATE_SECRET` value |
| HTTP method | POST |
| API version | Latest |
| Enabled | Yes |

**GROQ Filter examples:**
- All types: leave empty
- Specific types: `_type in ["post", "page", "sede"]`
- Exclude drafts: `!(_id in path("drafts.**"))`

## Step 5: AWS Amplify — Inline Env Var (CRITICAL)

**Amplify passes env vars to the build container but NOT to Lambda runtime.**

Add to `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  env: {
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET || '',
    // Add other server-side env vars here too
  },
  // ... rest of config
}
```

Without this, the webhook returns **401 Invalid signature** in production because `process.env.SANITY_REVALIDATE_SECRET` is undefined at Lambda runtime.

## Step 6: Cache Killers — Remove Time-Based Revalidation (CRITICAL)

On-demand ISR and time-based ISR conflict. Two things to fix:

### 6a: No `export const revalidate` in layout.tsx

**Never** set `export const revalidate = N` in the root layout. It acts as a ceiling for ALL pages — even if the webhook invalidates tags, Next.js won't regenerate until the timer expires.

```typescript
// ❌ BAD — blocks on-demand revalidation for the entire app
export const revalidate = 86400 // 24h ceiling on ALL pages

// ✅ GOOD — let cache tags handle everything
// (no revalidate export at all)
```

Remove any `revalidate` export from `layout.tsx` and individual `page.tsx` files. The cache tags from Step 3 are sufficient.

### 6b: Set `useCdn: false` in Sanity Client

Sanity's CDN caches GROQ responses for ~60 seconds. With on-demand ISR, when the webhook invalidates tags and Next.js regenerates the page, it must fetch **fresh data directly from the Content Lake**, not the CDN.

```typescript
// src/sanity/env.ts (or wherever useCdn is configured)

// ❌ BAD — CDN serves stale data ~60s after publish
export const useCdn = process.env.NODE_ENV === 'production'

// ✅ GOOD — always fetch from Content Lake
// On-demand ISR means we only regenerate on actual changes, no rate limit risk
export const useCdn = false
```

**Why this is safe:** Without on-demand ISR, `useCdn: true` protects against excessive API calls. But with webhooks, pages only regenerate when content actually changes — so direct Content Lake access is fine and won't hit rate limits.

### 6c: Exception — Non-Sanity Fetches

External API fetches (Google Places, third-party APIs) can still use time-based `revalidate` on their individual fetch calls, since they don't go through Sanity:

```typescript
// This is fine — per-fetch revalidate for external APIs only
const reviews = await fetch(googlePlacesUrl, {
  next: { revalidate: 86400 }, // 24h cache for external API
})
```

## Step 7: Validate

### Local
1. Run `npm run dev`
2. Edit + publish a document in Sanity Studio
3. Check Next.js terminal for revalidation log
4. Refresh the page — change should appear without hard refresh

### Production
1. Deploy to Amplify (push to main)
2. Check endpoint exists: `curl -I https://YOUR-DOMAIN/api/revalidate` → expect 405 (GET not supported)
3. Edit + publish in Sanity Studio
4. Check Sanity Console → Webhooks → delivery log → expect **200**
5. Visit the page — content should be updated in ~2-3 seconds

### Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| 401 Invalid signature | Secret mismatch or not inlined | Verify `next.config.ts env` block + Amplify env var matches Sanity webhook secret |
| 200 but page not updating | `export const revalidate` in layout.tsx | Remove it — it caps all pages (Step 6a) |
| 200 but stale data ~60s | `useCdn: true` in production | Set `useCdn: false` (Step 6b) |
| 405 Method Not Allowed | GET request to endpoint | Normal — only POST is supported |
| 500 Internal Server Error | Code error in route | Check Amplify Lambda logs in CloudWatch |
| Page not updating | Wrong cache tags | Verify `TYPE_TAG_MAP` matches your fetch `tags` |
| Works locally, fails in prod | Env var not inlined | Add to `next.config.ts env` block (Step 5) |
