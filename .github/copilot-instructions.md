# GitHub Copilot Instructions - {{PROJECT_NAME}}

This project uses **Sanity CMS**, **Next.js (App Router)**, **Tailwind CSS** and **AWS Amplify**.

---

## 🔄 Automatic Git Workflow (CRITICAL - HIGH PRIORITY)

### ⚠️ IMPORTANT: Mandatory Workflow

**GitHub Copilot MUST automatically execute this workflow when detecting pending changes in the repository.**

---

### 🤖 Expected Automatic Behavior

When you detect repository changes (`git status` not empty):

1. **Analyze changes** → Generate smart commit message (Conventional Commits: `feat:`, `fix:`, `docs:`, etc.)

2. **Ask ONCE**:
   > *"I detected pending changes. Execute complete Git workflow (commit → push development → merge to main)?"*

3. **If user says YES** → Automatically execute entire flow:
   ```bash
   # Step 1: Commit on development
   git add .
   git commit -m "<smart_message>"
   git push origin development

   # Step 2: Ask production approval
   # "Merge to main (production)?"

   # Step 3: If approved, execute merge to main
   git checkout main
   git pull origin main
   git merge development --no-ff
   git push origin main
   git checkout development
   ```

---

### 🚨 Golden Rules (NON-NEGOTIABLE)

| Rule | Description |
|------|-------------|
| 🚫 **NEVER edit on `main`** | The `main` branch is production. Only approved merge. |
| ✅ **EVERYTHING starts on `development`** | Daily work branch. Free push. |
| ✅ **Merge to `main` = Explicit approval** | Always ask before merge to production. |
| ✅ **Return to `development`** | After merge to main, return to development. |

---

### 📚 Complete Reference Document

For complete workflow details (3 modes: Setup, Smart Commit, Branch Workflow):

📍 **Location**: `.claude/workflows/git-setup.md`

**Available modes**:
1. **Complete Setup**: Configure/reset repository on GitHub
2. **Smart Commit**: Quick commit and push with auto-generated message
3. **Branch Workflow**: `development` ↔ `main` management (production protection)

---

## 🏗 Project Architecture

### Main Stack
- **CMS**: Sanity CMS + MCP enabled
- **Frontend**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Deploy**: AWS Amplify
- **Standards**: Modern best practices

### Folder Structure
```
/next-app         → Next.js application
/studio           → Sanity CMS Studio
/docs             → Master documentation
/.claude          → Configuration and workflows for Claude Code
/.github          → Instructions for GitHub Copilot
/.mcp             → MCP configuration (Sanity, GitHub, etc.)
```

### Branch Structure
```
main         → Production (only approved merge, protected)
development  → Daily work (free push, fast iteration)
```

---

## 📖 Key Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| **Project README** | `README.md` | Project overview and setup |
| **Setup Guide** | `SETUP.md` | Detailed configuration instructions |
| **Git Workflow** | `.claude/workflows/git-setup.md` | Complete Git workflow guide |
| **Development Standard** | `.claude/workflows/development-standard.md` | Implementation plan standards |

---

## ⚡ Best Practices

### Code
- **TypeScript Strict**: Always use strict mode
- **Mobile First**: Start with mobile designs
- **Component Reusability**: Check existing components before creating new
- **Tailwind Utility-First**: Avoid custom CSS when possible

### Sanity CMS
- **TypeGen**: Regenerate types after schema changes
- **GROQ Optimization**: Use projection to limit data
- **Visual Editing**: Enable for better content management

### Performance
- **ISR**: Use for semi-static content
- **next/image**: Always for images
- **Code Splitting**: Lazy load heavy components
- **Caching**: Implement cache strategies

### Git
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, etc.
- **Descriptive Branches**: `feat/`, `fix/`, `chore/` prefixes
- **PR Reviews**: Include screenshots for visual changes
- **Never commit**: `.env` files, credentials, sensitive data

---

*Instructions optimized for GitHub Copilot CLI - 2026*
