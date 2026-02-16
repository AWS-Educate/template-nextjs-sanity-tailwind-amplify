#!/bin/bash
# ============================================
# MCP Profile Quick-Switch Aliases
# ============================================
# Source this file in ~/.zshrc or ~/.bashrc:
#
#   # Add to ~/.zshrc or ~/.bashrc:
#   source ~/WebstormProjects/academiasemillas.edu.co/.mcp/aliases.sh
#
# Then restart your terminal and use:
#   mcp-min      # Switch to minimal profile (git only)
#   mcp-content  # Switch to content profile (default - Sanity + Git)
#   mcp-seo      # Switch to SEO profile (+ Google Analytics/GSC)
#   mcp-full     # Switch to full profile (all MCPs)
#   mcp-status   # Show currently active MCPs
#
# ============================================

# Alias function to cd + sync
_mcp_sync() {
    local profile="$1"
    local project_dir="$HOME/WebstormProjects/academiasemillas.edu.co"

    if [ ! -d "$project_dir" ]; then
        echo "❌ Project directory not found: $project_dir"
        return 1
    fi

    cd "$project_dir"
    ./.mcp/sync.sh "$profile"

    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Profile switched to: $profile"
        echo "⚠️  Restart Claude Code to apply changes"
    fi
}

# Quick-switch aliases
alias mcp-min='_mcp_sync minimal'
alias mcp-content='_mcp_sync content'
alias mcp-seo='_mcp_sync seo'
alias mcp-full='_mcp_sync full'
alias mcp-auto='_mcp_sync auto'

# Status display
alias mcp-status='echo "MCP Status:" && python3 << '\''PYEOF'\''
import json
import os
from pathlib import Path

claude_config = Path.home() / ".claude.json"
if claude_config.exists():
    with open(claude_config) as f:
        config = json.load(f)

    project_path = os.path.expanduser("~/WebstormProjects/academiasemillas.edu.co")

    if project_path in config.get("projects", {}):
        servers = config["projects"][project_path].get("mcpServers", {})
        print(f"  Active MCPs: {list(servers.keys())}")
        print(f"  Total: {len(servers)} MCPs loaded")
    else:
        print("  No Academia Semillas project found in ~/.claude.json")
else:
    print("  ~/.claude.json not found")
PYEOF
'

echo "✅ MCP aliases loaded successfully!"
echo ""
echo "Available commands:"
echo "  mcp-content  Switch to content profile (Sanity + GitHub)"
echo "  mcp-seo      Switch to SEO profile (+ Google)"
echo "  mcp-min      Switch to minimal profile (GitHub only)"
echo "  mcp-full     Switch to full profile (all MCPs)"
echo "  mcp-auto     Auto-detect profile from working context"
echo "  mcp-status   Show currently active MCPs"
