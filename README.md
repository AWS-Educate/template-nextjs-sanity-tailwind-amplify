# {{PROJECT_NAME}} - Project Template

Modern full-stack template with **Sanity CMS**, **Next.js**, **Tailwind CSS**, and **AWS Amplify**.

## 🚀 Quick Start

1. **Copy the template**:
   ```bash
   cp -r template/ /path/to/your-new-project
   cd /path/to/your-new-project
   ```

2. **Search and replace placeholders**:
   ```bash
   # Replace {{PROJECT_NAME}} with your project name
   # Replace {{PROJECT_SLUG}} with your-project-slug
   # Replace {{SITE_URL}} with https://your-domain.com
   # Replace {{SANITY_PROJECT_ID}} with your Sanity project ID
   # Replace {{SANITY_DATASET}} with your Sanity dataset (usually "production")
   ```

   You can use a script like this:
   ```bash
   # From the template root
   find . -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" -exec sed -i '' 's/{{PROJECT_NAME}}/Your Project Name/g' {} +
   find . -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" -exec sed -i '' 's/{{PROJECT_SLUG}}/your-project-slug/g' {} +
   # Repeat for other placeholders
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure environment variables**:
   ```bash
   cp .env.example .env
   cp next-app/.env.local.example next-app/.env.local
   # Edit .env and next-app/.env.local with your API keys
   ```

5. **Run development**:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:3000`
   - Sanity Studio: `http://localhost:3333`

## 📖 Documentation

See `SETUP.md` for detailed configuration instructions.

## 🛠 Stack

- **Frontend**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity CMS v5
- **Deployment**: AWS Amplify
- **Analytics**: Google Analytics 4 + Segment
- **Auth**: better-auth + Turso
- **Animations**: Framer Motion

## 📁 Structure

```
template/
├── .claude/              # Claude Code AI configuration
├── .copilot/             # GitHub Copilot configuration
├── .github/              # GitHub configuration
├── .idea/                # WebStorm/IntelliJ configuration
├── .mcp/                 # MCP (Model Context Protocol) configuration
├── .vscode/              # VS Code configuration
├── next-app/             # Next.js application
├── studio/               # Sanity Studio
├── scripts/              # Setup and utility scripts
├── package.json          # Monorepo root config
├── amplify.yml           # AWS Amplify build config
└── README.md             # This file
```

## 🔄 Placeholders to Replace

The template uses these placeholders that you must replace:

- `{{PROJECT_NAME}}` - Your project name (e.g., "My Awesome Project")
- `{{PROJECT_SLUG}}` - Your project slug (e.g., "my-awesome-project")
- `{{SITE_URL}}` - Your site URL (e.g., "https://example.com")
- `{{SANITY_PROJECT_ID}}` - Your Sanity project ID
- `{{SANITY_DATASET}}` - Your Sanity dataset name
- `{{SANITY_READ_TOKEN}}` - Your Sanity read token
- `{{SANITY_WRITE_TOKEN}}` - Your Sanity write token
- `{{GA4_ID}}` - Your Google Analytics 4 ID
- `{{SEGMENT_WRITE_KEY}}` - Your Segment write key
- `{{BETTER_AUTH_SECRET}}` - Your Better Auth secret
- `{{TURSO_DATABASE_URL}}` - Your Turso database URL
- `{{TURSO_AUTH_TOKEN}}` - Your Turso auth token

## ⚡ Next Steps

1. Read `SETUP.md` for detailed configuration
2. Customize design tokens in `next-app/src/app/globals.css`
3. Update Sanity schemas in `studio/schemas/`
4. Configure IDE settings in `.claude/`, `.copilot/`, etc.
5. Set up AWS Amplify deployment
6. Configure analytics and authentication

---

*Template generated 2026 - Modern Stack*
