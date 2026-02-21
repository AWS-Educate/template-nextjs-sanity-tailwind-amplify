# Audit Notes - Phases 3 & 4

## Phase 3 Audit (Schemas) - 2026-02-20
**Before: 6/10 → After: 9/10**

### Critical fixes applied:
- isUnique on ALL slug fields (post, category, page, event, bookstoreItem)
- Missing sections in page.ts: added scheduleSection + eventRegistrationSection
- sections array now has min(1) validation

### Major fixes applied:
- 9 schemas refactored: inline objects → defineField/defineArrayMember
- event.ts: endDate >= startDate custom validation, capacity positive().integer()
- bookstoreItem.ts: price min(0), pages positive().integer()
- schedule.ts: time regex /^\d{1,2}:\d{2}$/, year range 2024-2100
- siteSettings.ts: email regex, preview config, socialMedia with defineArrayMember
- legacyRedirect.ts: oldPath/newPath validated with regex /^\//
- heroSection.ts: imageAlt now required
- gallerySection.ts: alt now required
- Form schemas: added label, placeholder, options fields (needed by components)

## Phase 4 Audit (Client/Queries/Types) - 2026-02-20
**Before: 5/10 → After: 9/10**

### Critical fixes applied:
- types.ts: 8 interfaces had wrong field names/structures
  - ScheduleSection: had {title, schedule ref} → now {items[]}
  - ImageTextSection: had {text: string} → now {heading, body: PortableText}
  - BannerSection: had {text} → now {message, icon}
  - GallerySection: had {title, images with asset} → now {images: GalleryItem[]}
  - FormField: had phantom fields (label, placeholder, options) → re-added to match updated schemas
  - DonationSection.donationLink: was optional → now required
  - EventRegistrationSection.eventLink: was optional → now required
  - HeroSection.imageAlt: was optional → now required
- GROQ queries: gallery[] → images[] in PAGE_BY_SLUG and HOME_PAGE queries
- RELATED_POSTS: [0..3] → [0..2] (Sanity ranges are inclusive)

### Major fixes applied:
- lib.ts: replaced all dynamic import() with static imports
- middleware.ts: added in-memory redirect cache (5min TTL) instead of API call per request
- Added getAllRedirects() helper for bulk loading
- searchPosts: appends wildcard to search term

### Components updated:
- BannerSection: data.text → data.message
- ImageTextSection: data.text → data.heading + data.body (PortableText)
- ScheduleSection: supports inline items + fallback to schedule document
- GallerySection: img.asset → img.image
- blog/[slug]: fixed generateStaticParams type cast

## Remaining known limitations (not blocking):
- getSanityImageUrl doesn't handle hotspot/crop (consider @sanity/image-url later)
- siteSettings not enforced as singleton (needs Desk config in studio)
- No visual editing / stega configuration yet

## CSS Cascade Fix (2026-02-21) — CRITICAL PATTERN
- **Problem:** Tailwind utility classes (`text-white`, `text-accent-sage-700`) are in `@layer utilities`
- **Unlayered globals.css element styles** (`h1 {}`, `h3 {}`, `a {}`) have HIGHER cascade priority than `@layer utilities`
- **Effect:** `className="text-white"` on an `<h1>` does NOT override the global `h1 { color: #de6b2f }` rule
- **Fix:** Use `style={{ color: '...' }}` inline styles — these beat CSS cascade layers entirely
- **Rule:** Any heading or `<a>` that needs a color different from globals.css MUST use `style={{}}` not Tailwind color classes

## Figma Integration Notes (2026-02-21)
- **MCP servers active:** `mcp__claude_ai_Figma__*` and `mcp__figma-remote-mcp__*` (both connected)
- **User Figma account:** Edwin Fernando Garcia Lozano — 13 teams/projects
- **File used:** `9zHkkJnGqIYrEfyDdhYDIH` (Web Aterrizaje Visita Monastica 2024)
- **Figma asset URLs:** Temporary (7-day expiry from `figma.com/api/mcp/asset/...`) — NOT for production
- **WARNING:** `visita-monastica/page.tsx` uses 4 Figma asset URLs as `const IMG_*` — must be replaced with Sanity CDN uploads before next deploy
- **Event handlers in server components:** FORBIDDEN — use Tailwind `hover:` classes instead of `onMouseEnter`/`onMouseLeave`

## Phase 6 Migration Notes (2026-02-21)
- **Wix image 403 pattern:** URLs with `/v1/fill/` transform params blocked by Wix CDN
  - Fix applied: `stripWixParams()` now extracts base `~mv2.ext` URL
  - Images without transforms (direct `~mv2.xxx`) work fine
- **Book cover images:** 40 items created WITHOUT images (Wix 403 in first run, items already existed in second run)
  - To fix: update each bookstoreItem manually in Studio, or write a patch script using slugs
- **Org token vs Project token:** Wix migration required Project-level Editor token
  - Org token gives `g-` prefixed userId → rejected with "project user not found"
  - Project token path: manage → project jovlwcbx → API → Tokens
- **Migration idempotency:** `docExists()` checks slug before creating — safe to re-run
- **Image cache:** `.image-cache.json` persists across runs (49 refs after Phase 6)
