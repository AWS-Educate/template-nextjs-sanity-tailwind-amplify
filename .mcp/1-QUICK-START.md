# MCP Quick Start Guide

## What is the MCP Profile System?

Load **only the tools you need** to save costs and startup time.

---

## The 4 Profiles

```
minimal   →  1 MCP    → $0.41/day  → Git only
content   →  2 MCPs   → $0.94/day  → Sanity + Git (DEFAULT) ⭐
seo       →  4 MCPs   → $1.86/day  → + Google Analytics/GSC
full      →  6 MCPs   → $3.24/day  → All + Tag Manager + Shortio
```

---

## Quick Commands

```bash
# Switch to a profile (then restart Claude)
./sync.sh content   # Use this 80% of the time
./sync.sh seo       # For SEO work
./sync.sh minimal   # For quick git fixes
./sync.sh full      # For marketing setup
./sync.sh auto      # Auto-detect based on your work

# Using aliases (after source .mcp/aliases.sh):
mcp-content   # Switch to content
mcp-seo       # Switch to SEO
mcp-status    # Show current MCPs
```

---

## Which Profile Should I Use?

| Task | Profile |
|------|---------|
| Editing content in Sanity | **content** ⭐ |
| Managing blog posts | **content** |
| Creating classes/schedules | **content** |
| SEO audits | **seo** |
| Analytics deep-dive | **seo** |
| Quick git fixes | **minimal** |
| Marketing/GTM setup | **full** |

---

## The Difference

### Before
```
Every Claude session loaded ALL 7 MCPs
→ 40,502 tokens per message
→ $3.24/day per person
→ $16.20/day for team of 5
```

### After
```
Default (content) loads 2 MCPs
→ 14,704 tokens per message
→ $0.94/day per person
→ $4.70/day for team of 5
→ SAVES $3,518/year for team
```

---

## Setup (One-Time)

### Option A: Manual Commands (Always Works)
```bash
cd ~/WebstormProjects/academiasemillas.edu.co
./sync.sh content
# Restart Claude Code
```

### Option B: Quick Aliases (Recommended)
```bash
# Add to ~/.zshrc or ~/.bashrc:
source ~/WebstormProjects/academiasemillas.edu.co/.mcp/aliases.sh

# Then use:
mcp-content
mcp-seo
mcp-status
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Claude shows old MCPs | Fully restart Claude Code (quit + reopen) |
| Profile not found | Check: `ls .mcp/profiles/` |
| Permission denied | Run: `chmod +x .mcp/sync.sh` |
| Wrong profile chosen by auto | Specify manually: `./sync.sh content` |

---

## Key Takeaways

✅ **Use `content` by default** - Most of your work needs just Sanity + GitHub
✅ **Switch profiles easily** - `./sync.sh <name>` or `mcp-<name>`
✅ **Restart Claude after switching** - Changes apply on startup only
✅ **Save money** - 60% cost reduction with default profile
❌ **Salesforce is gone** - Removed Feb 2026 (no CRM needed)

---

## Documentation

- Full guide: `.mcp/PROFILES.md`
- Implementation details: `.mcp/IMPLEMENTATION.md`
- Testing checklist: `.mcp/IMPLEMENTATION.md` (Testing Checklist section)

---

## Need Help?

```bash
# Show current MCPs
mcp-status

# View all available profiles
ls .mcp/profiles/

# Read full documentation
cat .mcp/PROFILES.md

# Validate JSON
jq . .mcp/profiles/content.json
```

---

**Saving Academia Semillas $3,518/year on API costs! 🎉**
