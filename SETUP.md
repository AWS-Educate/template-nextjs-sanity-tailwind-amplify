# {{PROJECT_NAME}} - Setup Guide

Complete setup instructions for this project template.

## Prerequisites

- **Node.js 22+** (for Next.js and Sanity Studio)
- **npm** or **pnpm**
- **Git**
- **Sanity CLI** (`npm install -g @sanity/cli`)
- **AWS Amplify CLI** (optional, for deployment)

## 1. Copy and Customize Template

### 1.1 Copy Template Files

```bash
# Copy template to your new project directory
cp -r template/ /path/to/your-new-project
cd /path/to/your-new-project
```

### 1.2 Replace Placeholders

Run the setup script (macOS/Linux):

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

Or manually replace placeholders:

```bash
# Replace project placeholders
find . -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" -not -path "*/dist/*" -exec sed -i '' 's/{{PROJECT_NAME}}/Your Project Name/g' {} +
find . -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" -not -path "*/dist/*" -exec sed -i '' 's/{{PROJECT_SLUG}}/your-project-slug/g' {} +
find . -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" -not -path "*/dist/*" -exec sed -i '' 's/{{SITE_URL}}/https:\/\/your-domain.com/g' {} +

# Rename .iml file
mv .idea/{{PROJECT_SLUG}}.iml .idea/your-project-slug.iml
```

## 2. Install Dependencies

```bash
npm install
```

This installs dependencies for both `next-app` and `studio` workspaces.

## 3. Configure Sanity CMS

### 3.1 Create Sanity Project

```bash
cd studio
npx sanity init

# Follow prompts:
# - Create new project or use existing
# - Choose dataset name (usually "production")
# - Output path: . (current directory)
```

### 3.2 Get API Tokens

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Settings → API → Add API token
4. Create tokens:
   - **Read token**: For public reads (low permissions)
   - **Write token**: For content writes (editor permissions)

### 3.3 Configure Environment Variables

```bash
# Root .env
cp .env.example .env
# Edit with your Sanity credentials

# Next.js .env.local
cd next-app
cp .env.local.example .env.local
# Edit with all API keys
```

## 4. Configure Analytics (Optional)

### 4.1 Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `next-app/.env.local`:
   ```
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```

### 4.2 Segment Analytics

1. Create account at [segment.com](https://segment.com)
2. Create source (Next.js website)
3. Get Write Key
4. Add to `next-app/.env.local`:
   ```
   NEXT_PUBLIC_SEGMENT_WRITE_KEY=your-write-key
   ```

## 5. Configure Authentication (Optional)

### 5.1 better-auth Setup

Generate secret:

```bash
openssl rand -base64 32
```

### 5.2 Turso Database

1. Install Turso CLI:
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

2. Create database:
   ```bash
   turso db create your-db-name
   turso db show your-db-name --url
   turso db tokens create your-db-name
   ```

3. Add to `next-app/.env.local`:
   ```
   BETTER_AUTH_SECRET=<generated-secret>
   TURSO_DATABASE_URL=<database-url>
   TURSO_AUTH_TOKEN=<auth-token>
   ```

## 6. Development

```bash
# Run both Next.js and Sanity Studio
npm run dev

# Or individually:
npm run dev --workspace=next-app    # http://localhost:3000
npm run dev --workspace=studio      # http://localhost:3333
```

## 7. Build and Deploy

### 7.1 Local Build

```bash
npm run build
npm run start
```

### 7.2 Deploy Sanity Studio

```bash
cd studio
npx sanity deploy
```

Your studio will be available at `https://your-project.sanity.studio`

### 7.3 Deploy to AWS Amplify

1. Push code to GitHub
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Connect repository
4. Configure build settings (use `amplify.yml`)
5. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_READ_TOKEN`
   - All other env vars from `.env.local.example`

6. Deploy!

## 8. MCP Configuration (Optional)

### 8.1 Configure MCP Profile

```bash
# Choose a profile:
./.mcp/sync.sh content    # Default: Sanity + GitHub
./.mcp/sync.sh seo        # + Google tools
./.mcp/sync.sh full       # All MCPs
```

### 8.2 Add API Keys

Edit `.mcp/.env.template` → create `.mcp/.env.shared` with your keys:

```bash
cp .mcp/.env.template .mcp/.env.shared
# Edit .mcp/.env.shared with real API keys
```

## 9. IDE Configuration

### 9.1 WebStorm/IntelliJ

- Open project folder
- IDE should recognize `.idea/` configuration
- Enable Prettier: `Languages & Frameworks → JavaScript → Prettier`
- Enable ESLint: `Languages & Frameworks → JavaScript → Code Quality Tools → ESLint`

### 9.2 VS Code

- Install recommended extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Sanity.io

### 9.3 Claude Code

- Configuration in `.claude/CLAUDE.md`
- Workflows in `.claude/workflows/`
- Run sync: `.mcp/sync.sh <profile>`

### 9.4 GitHub Copilot

- Configuration in `.copilot/config.json` and `.github/copilot-instructions.md`

## 10. Customize

### 10.1 Design Tokens

Edit `next-app/src/app/globals.css`:

```css
@theme {
  /* Update your brand colors */
  --color-primary-500: #YOUR_COLOR;
  --color-secondary-500: #YOUR_COLOR;
  /* ... */
}
```

### 10.2 Sanity Schemas

Add/modify schemas in `studio/schemas/`:

```typescript
// studio/schemas/mySchema.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mySchema',
  title: 'My Schema',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
})
```

Register in `studio/schemas/index.ts`.

### 10.3 Update Navigation

Content-driven navigation via Sanity `navigation` schema.

## 11. Troubleshooting

### Build Errors

```bash
# Clear caches
rm -rf node_modules .next next-app/.next next-app/node_modules studio/node_modules studio/dist
npm install
npm run build
```

### Sanity Connection Issues

Check:
- Project ID is correct
- Dataset exists
- API tokens have correct permissions

### MCP Not Working

```bash
# Re-sync MCP
./.mcp/sync.sh content

# Restart Claude Code completely (Cmd+Q / Alt+F4)
```

## 12. Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [AWS Amplify Docs](https://docs.amplify.aws)

---

*Setup Guide - {{PROJECT_NAME}} - 2026*
