# Architecture & File Map

## Project Structure
```
yogananda-bogota.org/
├── next-app/              # Next.js 14 App Router
│   ├── src/app/           # 14 routes (13 pages + not-found)
│   ├── src/components/
│   │   ├── ui/            # 6 components (Container, Button, Card, Badge, SanityImage, PortableTextRenderer)
│   │   ├── sections/      # 13 components (SectionRenderer + 12 sections)
│   │   └── shared/        # 4 components (Header, Footer, MobileNav, WhatsAppButton)
│   ├── src/sanity/
│   │   ├── client.ts      # createClient (public CDN + server with token)
│   │   ├── types.ts       # 30+ TypeScript interfaces synced with schemas
│   │   ├── queries.ts     # 20+ GROQ queries (optimized projections)
│   │   ├── lib.ts         # 20+ helper functions (static imports)
│   │   └── index.ts       # Central re-export
│   └── src/middleware.ts   # Legacy redirects with in-memory cache (5min TTL)
├── studio/                # Sanity Studio v3
│   └── schemas/
│       ├── 8 document types (post, category, page, event, schedule, siteSettings, bookstoreItem, legacyRedirect)
│       ├── objects/        # 14 object types (sections + meta)
│       └── index.ts        # Registry (all 22+ types)
├── doc/                   # Documentation
│   ├── MIGRATION-PLAN.md  # Master plan (10 phases)
│   ├── PHASE-PROGRESS.md  # Detailed progress log (critical - update always)
│   └── content-extracted/ # 14 JSON files + screenshots from Wix
└── .claude/               # Claude Code config
    ├── CLAUDE.md          # Project instructions
    ├── mcp-servers.json   # Sanity MCP config
    └── workflows/         # git-setup.md, development-standard.md
```

## Key Pages (preserving Wix URLs)
/, /nosotros, /paramahansa-yogananda, /kriya-yoga, /autobiografia-de,
/lecciones-srf, /programacion, /escuela-dominical, /libreria,
/blog, /blog/[slug], /contacto, /donar, /visita-monastica (new, static)

## Tidewinds Design System (applied 2026-02-21)
### Fonts (Google Fonts — applied in globals.css)
- `--font-sans: "Inter"` → body, UI, components (replaces Source Sans 3)
- `--font-heading: "Bitter"` → slab-serif h1/h2 (replaces ArcherPro:Bold premium)
- `--font-decorative: "Cormorant Garamond"` → hero decorative (replaces Thirsty Script)

### Brand Colors
- Primary: `#173981` (deep blue) → `--color-primary-500`
- Secondary: `#DE6B2F` (warm orange) → `--color-secondary-500`
- Sage/Olive: `#696C0E` → `--color-accent-sage-500`
- Navy Dark: `#1E3650` → `--color-navy-800`

### Tidewinds Semantic Named Tokens (`:root` in globals.css)
- `--h1-eventos: #de6b2f` (orange) | `--h2-eventos: #696c0e` (olive) | `--h3-eventos: #de6b2f`
- `--parrafos: #4a4a4a` | `--btn: #de6b2f`
- `--bg-primary: #ffffff` | `--bg-secondary: #f9fafb`
- `--text-primary: #101828` | `--text-tertiary: #475467`
- `--border-secondary: #eaecf0`

### Typography Hierarchy (globals.css)
- `h1`: Bitter Bold, `#de6b2f` (orange)
- `h2`: Bitter SemiBold, `#696c0e` (olive)
- `h3`: Inter SemiBold, `#de6b2f` (orange)
- `p`: Inter Regular, `#4a4a4a`

### Shadows (Tidewinds neutral gray)
- `--shadow-soft: 0px 1px 2px 0px rgba(16,24,40,0.05)`
- `--shadow-card: 0px 4px 8px -2px rgba(16,24,40,0.10)...`

### Footer (updated 2026-02-21)
- Background: `bg-neutral-50` (#F9FAFB) — was `bg-primary-900` (dark navy)
- h4 headings: `color: var(--color-primary-500)` inline style
- Links: `text-neutral-600 hover:text-secondary-500`
- Divider: `border-neutral-200`

## Contact Info
- Address: Kra 3A No 46-48 Chapinero, Bogotá
- WhatsApp: +57 312 4202518
- Email: centro@yogananda-bogota.org
- 5 centers in Colombia (Bogotá, Manizales, Cali, Medellín, Pereira)
