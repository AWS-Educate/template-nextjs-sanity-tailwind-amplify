# 🔧 MCP Configuration System - {{PROJECT_NAME}}

**Smart synchronization and profile system for team MCPs**

> 📚 **Recommended reading order**: Start here → QUICK-START → PROFILES → IMPLEMENTATION → CROSS-PLATFORM

---

## 🚀 What's New? Profile System

### ✨ Major Change: Profile-Based Loading

**Before (Old System)**:
- All MCPs loaded always (high token cost)
- Slow startup
- Unnecessary tools loaded

**Now (New Profile System)**:
- Load ONLY the MCPs you need
- 4 predefined profiles: minimal, content, seo, full
- **60% fewer tokens** by default
- **Faster startup**
- Smart auto-detection

---

## 📋 Recommended Reading Structure

```
1️⃣  README.md (This file)
     ↓ General system overview

2️⃣  QUICK-START.md
     ↓ Quick instructions to start

3️⃣  PROFILES.md
     ↓ Detailed profile explanation

4️⃣  IMPLEMENTATION.md
     ↓ Technical details and testing checklist

5️⃣  CROSS-PLATFORM.md
     ↓ OS-specific notes
```

**⏱️ Total time**: 15-20 minutes reading everything
**🎯 Minimum viable**: Just read QUICK-START.md (2-3 minutes)

---

## 🎯 Quick Start (90 seconds)

### For Existing Users
```bash
# 1. Update changes
git pull

# 2. Run with default profile (content = Sanity + GitHub)
./sync.sh content

# 3. Restart Claude Code
# Cmd+Q (macOS) or close window (Windows)
```

### For New Members
```bash
# 1. Clone repo
git clone <your-repo-url>
cd <your-repo>

# 2. Copy environment file
cp .env.example .env

# 3. Fill in your API keys in .env

# 4. Run sync with desired profile
./.mcp/sync.sh content

# 5. Restart Claude Code
```

---

## 📊 Available Profiles

| Profile | MCPs Included | Use Case | Token Cost |
|---------|--------------|----------|-----------|
| **minimal** | GitHub only | Quick dev, no content | ~2.4K |
| **content** ⭐ | Sanity + GitHub | Content work (default) | ~14.7K |
| **seo** | content + Google tools | SEO optimization | ~31.2K |
| **full** | All MCPs | Complete toolset | ~40.5K |

⭐ **Default**: `content` profile (best balance for most work)

---

## 🔧 Available MCPs

### Core (Always Useful)
- **Sanity**: CMS content management
- **GitHub**: Repository, issues, PRs

### SEO & Analytics
- **Google Search Console**: SEO data
- **Google Analytics**: Site analytics
- **Google Tag Manager**: Tag management
- **Short.io**: URL shortening (if configured)

---

## 📖 Complete Documentation Index

All docs are in `.mcp/`:

- `INDICE.md` - Full documentation index
- `1-QUICK-START.md` - Quick setup (2-3 min)
- `2-PROFILES.md` - Profile system explained
- `3-IMPLEMENTATION.md` - Technical implementation
- `4-CROSS-PLATFORM.md` - OS-specific notes
- `COPILOT-CLI-WINDOWS.md` - Copilot CLI on Windows
- `copilot-cli-setup.md` - Copilot CLI setup

---

## 💡 Tips

### Switching Profiles
```bash
# Development work (content only)
./.mcp/sync.sh content

# SEO optimization day
./.mcp/sync.sh seo

# Full power (rare, expensive)
./.mcp/sync.sh full

# Minimal (quick commits)
./.mcp/sync.sh minimal
```

### Aliases (Optional)
```bash
# Add to ~/.zshrc or ~/.bashrc
source /path/to/project/.mcp/aliases.sh

# Then use shortcuts:
mcp-content  # Switch to content profile
mcp-seo      # Switch to SEO profile
mcp-full     # Switch to full profile
```

---

## 🔐 Security & Team Sharing

- **`.env.shared`**: Shared team credentials (GITIGNORED, never commit)
- **`.env.template`**: Template with placeholders
- **`credentials/`**: Google Cloud credentials (GITIGNORED)
- **`config.json`**: MCP configuration (uses env vars, safe to commit)

**Important**: Never commit real API keys to Git!

---

## 🛠 Troubleshooting

### "Permission denied" on sync.sh
```bash
chmod +x .mcp/sync.sh
```

### "Command not found: pipx"
```bash
# macOS
brew install pipx

# Windows
python -m pip install --user pipx
```

### Claude Code doesn't see MCPs
1. Run `./sync.sh <profile>` again
2. Completely quit Claude Code (Cmd+Q / Alt+F4)
3. Restart Claude Code
4. Check Tools → MCP Servers menu

### Need help?
See `IMPLEMENTATION.md` for detailed troubleshooting

---

*MCP System - {{PROJECT_NAME}} - 2026*
