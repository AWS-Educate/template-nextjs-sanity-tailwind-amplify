# MCP Profile System - Academia Semillas

## Overview

The profile system allows you to load **only the MCPs you need** for your specific task, reducing API costs and startup time.

### Quick Start

```bash
# Default profile (Sanity + GitHub) - use this 80% of the time
./sync.sh content

# SEO audits and analytics
./sync.sh seo

# Quick git operations
./sync.sh minimal

# Everything except Salesforce
./sync.sh full

# Auto-detect based on your recent work
./sync.sh auto
```

Then **restart Claude Code** to apply changes.

---

## Profiles Explained

### 1. Minimal Profile 🚀
**Use this for**: Quick fixes, git operations, general coding

**Includes**: GitHub only
- **MCPs**: 1 (GitHub)
- **Est. tokens**: 5,123 per message
- **Startup time**: ~800ms
- **Cost**: $0.41/day
- **Best for**: Hot fixes, emergency changes, pure coding

```bash
./sync.sh minimal
```

---

### 2. Content Profile 📝 **[DEFAULT]**
**Use this for**: Sanity CMS work, content management, blog editing

**Includes**:
- GitHub
- Sanity CMS

**MCPs**: 2
- **Est. tokens**: 14,704 per message
- **Startup time**: ~2.1s
- **Cost**: $0.94/day
- **Best for**: 80% of your work - daily content management

```bash
./sync.sh content    # This is the default if you just run ./sync.sh
```

---

### 3. SEO Profile 🔍
**Use this for**: SEO audits, analytics debugging, search console monitoring

**Includes**:
- GitHub
- Sanity CMS
- Google Search Console
- Google Analytics

**MCPs**: 4
- **Est. tokens**: 29,225 per message
- **Startup time**: ~3.2s
- **Cost**: $1.86/day
- **Best for**: Weekly SEO audits, analytics investigations
- **Requires**: Google Cloud credentials in `.mcp/credentials/google-cloud.json`

```bash
./sync.sh seo
```

---

### 4. Full Profile 💪
**Use this for**: Marketing campaigns, complex multi-tool workflows

**Includes**:
- GitHub
- Sanity CMS
- Google Search Console
- Google Analytics
- Google Tag Manager
- Short.io URL shortener

**MCPs**: 6 (Salesforce removed permanently)
- **Est. tokens**: 40,502 per message
- **Startup time**: ~4.5s
- **Cost**: $3.24/day
- **Best for**: 5% of work - complex integrations, marketing setup
- **Requires**: Google Cloud credentials

```bash
./sync.sh full
```

---

### 5. Auto-Detect Profile 🤖
**Use this for**: Automatic profile selection based on your work context

The system analyzes:
- Last 5 git commits (looks for `studio/`, `sanity`, `schema` patterns)
- Last modified files (checks for SEO-related changes)

**Logic**:
```
If last commits touched studio/ or sanity/ → content profile
Else if you modified SEO files → seo profile
Else if Sanity files modified recently → content profile
Else → minimal profile
```

```bash
./sync.sh auto
```

---

## Cost Comparison

| Profile | MCPs | Tokens | Daily Cost | Use Case |
|---------|------|--------|-----------|----------|
| **Minimal** | 1 | 5,123 | $0.41 | Git ops |
| **Content** | 2 | 14,704 | $0.94 | Default (CMS work) |
| **SEO** | 4 | 29,225 | $1.86 | Analytics audits |
| **Full** | 6 | 40,502 | $3.24 | Marketing |

### Team Impact (5 members)

- **Old system (always full)**: $16.20/day = $486/month
- **New system (default content)**: $4.70/day = $141/month
- **Savings**: $345/month = **$4,140/year** 🎉

---

## How to Switch Profiles

### Method 1: Manual Switching (Recommended for Experts)

```bash
cd ~/WebstormProjects/academiasemillas.edu.co
./sync.sh content    # Switch profile
# Then restart Claude Code
```

### Method 2: Quick Aliases (Easiest)

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
source ~/WebstormProjects/academiasemillas.edu.co/.mcp/aliases.sh
```

Then use shortcuts:

```bash
mcp-content   # Switch to content profile
mcp-seo       # Switch to SEO profile
mcp-min       # Switch to minimal profile
mcp-full      # Switch to full profile
mcp-status    # Show current MCPs
```

Restart Claude Code after switching.

### Method 3: Let Auto-Detection Choose

```bash
./sync.sh auto
# System detects your recent work and suggests profile
```

---

## Profile Selection Guide

### Choose **Minimal** If:
- Making emergency git fixes
- Quick code reviews
- General code writing (no CMS needed)
- Internet connection is slow
- You want fastest Claude startup

### Choose **Content** If:
- Managing Sanity CMS content
- Writing blog posts
- Editing classes/schedules
- Creating media assets
- Default choice (80% of use cases)

### Choose **SEO** If:
- Doing SEO audits
- Analyzing Google Analytics
- Checking Search Console performance
- Researching keyword data
- Tracking backlinks

### Choose **Full** If:
- Setting up Google Tag Manager
- Creating URL shortening workflows
- Complex multi-MCP integrations
- Marketing campaign setup
- Running scripts that need all tools

### Choose **Auto** If:
- You want the system to decide
- First time using profiles
- Not sure which profile to use

---

## Technical Details

### Profile File Structure

Each profile is a JSON file in `.mcp/profiles/`:

```json
{
  "description": "Profile description",
  "use_case": "When to use this",
  "is_default": false,
  "mcpServers": {
    "mcp-name": {
      "command": "npx",
      "args": [...],
      "env": {...},
      "description": "...",
      "required": true
    }
  },
  "mcpjsonServers": {...},
  "metadata": {
    "profile": "name",
    "tools_count": 0,
    "estimated_tokens": 0,
    "startup_time_ms": 0,
    "daily_cost_usd": 0.00
  }
}
```

### How sync.sh Uses Profiles

1. **Check for profile argument**:
   ```bash
   ./sync.sh <profile_name>    # Load specific profile
   ./sync.sh                    # Use default (content)
   ./sync.sh auto              # Auto-detect
   ```

2. **Load profile JSON**:
   ```
   .mcp/profiles/<profile>.json
   ```

3. **Merge with environment variables**:
   - Replace `${VAR_NAME}` with actual values from `.env`

4. **Update ~/.claude.json**:
   - Write MCPs to `~/.claude.json` project config

5. **Display loaded MCPs**:
   - Show which MCPs are now active

### Environment Variables Needed

Different profiles need different env vars:

**All profiles**:
- `SANITY_PROJECT_ID` (for content/seo/full)
- `SANITY_API_TOKEN` (for content/seo/full)
- `GITHUB_PERSONAL_ACCESS_TOKEN` (all)
- `GITHUB_MCP_TOKEN` (all)

**Google profiles** (seo, full):
- `GOOGLE_CLOUD_PROJECT`
- `.mcp/credentials/google-cloud.json` file

**Full profile**:
- `SHORTIO_API_KEY`

Check `.mcp/.env.template` for all required variables.

---

## Troubleshooting

### Profile not loading?

```bash
# Check if profile file exists
ls .mcp/profiles/

# Validate JSON syntax
jq . .mcp/profiles/content.json

# Run sync.sh with verbose output
./sync.sh content 2>&1 | head -50
```

### Claude still showing old MCPs?

```bash
# Restart Claude Code completely (not just reload)
# Kill any running Claude processes and reopen the editor

# Or manually check ~/.claude.json
cat ~/.claude.json | jq .projects
```

### Error: "Profile validation failed"

- Check spelling: `minimal`, `content`, `seo`, `full`, `auto`
- Ensure `.mcp/profiles/` directory exists
- Verify profile JSON is valid

### Cost still high?

- Verify you're using `content` profile (default)
- Run `mcp-status` to see active MCPs
- Check that sync.sh completed successfully

---

## Advanced Usage

### Creating Custom Profiles

Want a `marketing` profile? Create `.mcp/profiles/marketing.json`:

```json
{
  "description": "Marketing Profile",
  "mcpServers": {
    "google-tag-manager": {...},
    "shortio": {...},
    "google-analytics": {...}
  },
  "metadata": {
    "profile": "marketing",
    "tools_count": 3
  }
}
```

Then use: `./sync.sh marketing`

### Scheduled Profile Switching

For team workflows, you could create a cron job:

```bash
# Every morning, switch to content profile
0 9 * * * cd ~/WebstormProjects/academiasemillas.edu.co && ./sync.sh content
```

### CI/CD Integration

In GitHub Actions, use specific profiles:

```yaml
- name: Sync MCPs for deployment
  run: ./.mcp/sync.sh minimal  # Fast startup for deploys
```

---

## FAQ

**Q: Will my API keys leak when using profiles?**
A: No. Profile files are templates. Real API keys only exist in `.env` (gitignored).

**Q: Can I use two profiles at once?**
A: No, profiles are exclusive. Restart Claude to switch.

**Q: Why does claude-code take longer to start after switching?**
A: First time loading new MCPs requires downloading them. Subsequent starts are fast.

**Q: What if I forget which profile I'm on?**
A: Run `mcp-status` to check current MCPs.

**Q: Can I contribute new profiles?**
A: Yes! Create `.mcp/profiles/custom.json` and submit as PR.

**Q: Why was Salesforce removed?**
A: Academia Semillas has zero Salesforce integration. Removed Feb 2026 to save costs.

---

## Profile System Timeline

- **Feb 11, 2026**: Profile system implemented
- **Feb 13, 2026**: This documentation created
- **Future**: Add dynamic profile switching (no restart required)

---

## See Also

- `.mcp/sync.sh` - Profile switching script
- `.mcp/config.json` - Main MCP configuration
- `docs/future/salesforce-mcp-reference.md` - Archived Salesforce docs
- `CLAUDE.md` - Project standards
