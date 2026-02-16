# 📦 Template Information

This is a reusable project template extracted from Academia Semillas.

## ✨ What's Included

### ✅ Complete Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (with @theme design tokens)
- **Sanity CMS v5** (with example schemas)
- **AWS Amplify** (deployment config)
- **Analytics**: Google Analytics 4 + Segment
- **Auth**: better-auth + Turso (libSQL)
- **Animations**: Framer Motion

### ✅ IDE/AI Configurations

- **Claude Code** (.claude/) - AI workflows and instructions
- **GitHub Copilot** (.copilot/, .github/) - Copilot configuration
- **WebStorm/IntelliJ** (.idea/) - Code styles, inspections, AWS
- **MCP System** (.mcp/) - Profile-based MCP loading
- **VS Code** (.vscode/) - Tasks configuration

### ✅ Development Tools

- **Git Workflows** - Automated branching and commits
- **Setup Script** - Automated placeholder replacement
- **Design System** - Pre-configured design tokens
- **Monorepo** - npm workspaces (next-app + studio)

## 📁 Directory Structure

```
template/
├── .claude/                    # Claude Code configuration
│   ├── CLAUDE.md               # AI instructions
│   ├── settings.local.json     # Permissions
│   └── workflows/              # Git and development workflows
├── .copilot/                   # GitHub Copilot config
├── .github/                    # GitHub instructions
├── .idea/                      # WebStorm/IntelliJ config
│   ├── codeStyles/             # Code formatting
│   └── inspectionProfiles/     # Linting rules
├── .mcp/                       # Model Context Protocol
│   ├── config.json             # MCP configuration
│   ├── profiles/               # Profile-based loading
│   └── *.md                    # Documentation
├── .vscode/                    # VS Code tasks
├── next-app/                   # Next.js application
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities (auth, analytics, SEO)
│   │   ├── sanity/             # Sanity client & queries
│   │   └── utils/              # Helper functions
│   ├── public/                 # Static assets
│   └── package.json
├── studio/                     # Sanity Studio
│   ├── schemas/                # Content schemas
│   │   ├── post.ts             # Blog post (example)
│   │   ├── blockContent.ts     # Portable Text
│   │   └── index.ts            # Schema registry
│   ├── sanity.config.ts        # Studio configuration
│   └── package.json
├── scripts/
│   └── setup.sh                # Automated setup script
├── package.json                # Monorepo root
├── amplify.yml                 # AWS deployment config
├── README.md                   # Quick start
├── SETUP.md                    # Detailed setup guide
└── .gitignore                  # Git ignores

```

## 🔄 Placeholders Used

The following placeholders must be replaced when using this template:

### Project Info
- `{{PROJECT_NAME}}` - Display name (e.g., "My Awesome Project")
- `{{PROJECT_SLUG}}` - Kebab-case slug (e.g., "my-awesome-project")
- `{{SITE_URL}}` - Production URL (e.g., "https://example.com")

### Sanity CMS
- `{{SANITY_PROJECT_ID}}` - Your Sanity project ID
- `{{SANITY_DATASET}}` - Dataset name (usually "production")
- `{{SANITY_READ_TOKEN}}` - Read API token
- `{{SANITY_WRITE_TOKEN}}` - Write API token

### Analytics
- `{{GA4_ID}}` - Google Analytics 4 measurement ID
- `{{SEGMENT_WRITE_KEY}}` - Segment write key

### Authentication
- `{{BETTER_AUTH_SECRET}}` - better-auth secret key
- `{{TURSO_DATABASE_URL}}` - Turso database URL
- `{{TURSO_AUTH_TOKEN}}` - Turso authentication token

## 🚀 Quick Setup

```bash
# 1. Copy template
cp -r template/ /path/to/new-project
cd /path/to/new-project

# 2. Run setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# 3. Install dependencies
npm install

# 4. Configure environment
cp .env.example .env
cp next-app/.env.local.example next-app/.env.local
# Edit files with your API keys

# 5. Run development
npm run dev
```

## 📖 Documentation

- **README.md** - Project overview and quick start
- **SETUP.md** - Detailed setup instructions
- **next-app/README.md** - Next.js app documentation
- **studio/README.md** - Sanity Studio documentation
- **.mcp/README.md** - MCP system documentation
- **.claude/CLAUDE.md** - Claude Code instructions

## 🎨 Customization

### Design Tokens

Edit `next-app/src/app/globals.css`:

```css
@theme {
  --color-primary-500: #YOUR_PRIMARY_COLOR;
  --color-secondary-500: #YOUR_SECONDARY_COLOR;
  --color-accent-teal-500: #YOUR_ACCENT_COLOR;
  /* Customize fonts, shadows, gradients, etc. */
}
```

### Sanity Schemas

1. Create new schema in `studio/schemas/yourSchema.ts`
2. Register in `studio/schemas/index.ts`
3. Run `npm run dev` to see changes

### Pages and Routes

Add pages in `next-app/src/app/`:
- `page.tsx` for routes
- `[slug]/page.tsx` for dynamic routes
- `layout.tsx` for shared layouts

## 🔧 Features

### Pre-configured

- ✅ Security headers
- ✅ Image optimization (Sanity CDN + next/image)
- ✅ SEO utilities (robots.ts, sitemap.ts, metadata)
- ✅ Analytics integration (GA4 + Segment)
- ✅ Authentication (better-auth)
- ✅ Design system (Tailwind tokens)
- ✅ Monorepo setup (npm workspaces)
- ✅ AI-friendly (Claude Code, Copilot)

### Included Integrations

- Google Analytics 4
- Segment Analytics
- Sanity CMS
- AWS Amplify
- better-auth (authentication)
- Turso (database)
- Framer Motion (animations)

## 📝 Notes

### What's NOT Included

This template provides structure and configuration, but you need to add:

- **Content**: Add your own Sanity schemas and content
- **Components**: Build your UI components (examples not included to keep template clean)
- **Pages**: Create your specific pages and routes
- **Styling**: Customize design tokens and components
- **API Routes**: Add your own API endpoints if needed

### Why This Approach?

This is a **foundation template**, not a complete website. It provides:

1. **Configuration** - All tools pre-configured
2. **Structure** - Organized file structure
3. **Integration** - Services connected
4. **Standards** - Best practices implemented

You build your specific features on top of this foundation.

## 🆘 Support

See troubleshooting section in `SETUP.md` or:

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

*Template extracted from Academia Semillas - February 2026*
