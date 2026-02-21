# yogananda-bogota.org - Persistent Memory

## Project Overview
- **What:** Migration of yogananda-bogota.org from Wix → Next.js + Sanity CMS + Tailwind CSS
- **Why:** Wix plan expired, high renewal cost. Target ~$5/month on AWS Amplify
- **Domain:** yogananda-bogota.org (SRF meditation center, Bogotá Colombia)
- **Language:** es-CO (Spanish Colombia)
- **Sanity Project ID:** jovlwcbx | Dataset: production

## Current Status (2026-02-21)
- **Phases 0-6:** COMPLETED ✅
- **Phase 6:** Content migration to Sanity DONE (150s run, 49 images uploaded to CDN)
- **Phase 7:** NEXT → Redirects 301 + QA
- **Phases 8-10:** Pending (testing, deploy, post-migration)
- **Servers running:** localhost:3000 (Next.js) + localhost:3333 (Sanity Studio)
- **Git remote:** NOT configured yet (local only)
- **Branch:** `development` (never edit `main` directly)

## Design System Work (2026-02-21 — Tidewinds + Figma)
- **Figma file:** `9zHkkJnGqIYrEfyDdhYDIH` (Web Aterrizaje Visita Monastica 2024)
- **New page created:** `/visita-monastica` (static, no Sanity) — full landing page from Figma
- **Tidewinds tokens applied** to `globals.css` project-wide (see architecture.md)
- **Footer changed:** dark (`bg-primary-900`) → light (`bg-neutral-50`) with Tidewinds tokens
- **Pending:** Figma asset URLs in `visita-monastica/page.tsx` expire in 7 days — must replace with Sanity CDN assets
- **Pending:** User shared reference image that did NOT render — re-share to apply specific design

## Phase 6 Migration Results (2026-02-21)
- 2 categories | 1 siteSettings | 14 pages | 6 posts | 40 bookstore items | 1 schedule | 1 event | 2 redirects
- **Book cover images:** NOT uploaded (Wix 403 on /v1/fill/ URLs during run) — add manually via Studio
- **Migration token:** Project-level Editor token required (NOT org-level token)
- **Run command:** `npx tsx --env-file=scripts/.env scripts/migrate.ts`
- **Image cache:** `scripts/.image-cache.json` (49 refs cached, gitignored)
- **Scripts:** `scripts/migrate.ts` + `scripts/migrate/` (14 files)

## Key Architecture
- See [architecture.md](architecture.md) for detailed file map
- See [audit-notes.md](audit-notes.md) for audit findings

## User Preferences
- **Language:** Communicates in Spanish, code/docs in English
- **Git workflow:** Auto-commit on development → ask before merge to main
- **Model preference:** Opus for complex design/planning, Sonnet for execution/audits
- **Progress tracking:** PHASE-PROGRESS.md must be updated after every phase/task
- **Session logging:** Save progress every 5 minutes (CLAUDE.md directive)
- **Style:** User prefers fully automated execution — only interrupt on real blockers
