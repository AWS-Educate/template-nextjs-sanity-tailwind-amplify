#!/bin/bash

# ============================================================================
# Template Initialization Script
# Replaces all {{PLACEHOLDER}} values with your project-specific information
# ============================================================================

set -e

echo "🚀 Template Initialization"
echo "=========================="
echo ""

# Collect project information
read -p "📌 Project Name (e.g., My Awesome Site): " PROJECT_NAME
read -p "🔗 Project Slug (e.g., my-awesome-site): " PROJECT_SLUG
read -p "📧 Contact Email (e.g., hello@example.com): " CONTACT_EMAIL
read -p "📞 Contact Phone (e.g., +1 555 123 4567): " CONTACT_PHONE
read -p "📱 WhatsApp Number - digits only (e.g., 15551234567): " WHATSAPP_NUMBER
read -p "🌐 Site URL (e.g., https://example.com): " SITE_URL
read -p "🎨 Sanity Project ID: " SANITY_PROJECT_ID
read -p "📂 Sanity Dataset (default: production): " SANITY_DATASET

# Defaults
SANITY_DATASET=${SANITY_DATASET:-production}
SITE_URL=${SITE_URL:-https://${PROJECT_SLUG}.com}

echo ""
echo "📋 Summary:"
echo "  Project Name:     $PROJECT_NAME"
echo "  Project Slug:     $PROJECT_SLUG"
echo "  Contact Email:    $CONTACT_EMAIL"
echo "  Contact Phone:    $CONTACT_PHONE"
echo "  WhatsApp:         $WHATSAPP_NUMBER"
echo "  Site URL:         $SITE_URL"
echo "  Sanity Project:   $SANITY_PROJECT_ID"
echo "  Sanity Dataset:   $SANITY_DATASET"
echo ""

read -p "✅ Proceed with replacement? (y/n): " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "❌ Cancelled."
  exit 0
fi

echo ""
echo "🔄 Replacing placeholders..."

# Get the project root directory (parent of scripts/)
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Function to replace in all relevant files
replace_placeholder() {
  local placeholder="$1"
  local value="$2"

  # Find and replace in all text files (excluding node_modules, .git, dist, .next)
  find "$PROJECT_ROOT" \
    -type f \
    \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.json" -o -name "*.md" -o -name "*.yml" -o -name "*.yaml" -o -name "*.env*" -o -name "*.html" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/.git/*" \
    -not -path "*/.next/*" \
    -not -path "*/dist/*" \
    -not -path "*/.sanity/*" \
    -not -path "*/scripts/init-template.sh" \
    -exec sed -i '' "s|${placeholder}|${value}|g" {} +

  echo "  ✓ Replaced ${placeholder}"
}

replace_placeholder "{{PROJECT_NAME}}" "$PROJECT_NAME"
replace_placeholder "{{PROJECT_SLUG}}" "$PROJECT_SLUG"
replace_placeholder "{{CONTACT_EMAIL}}" "$CONTACT_EMAIL"
replace_placeholder "{{CONTACT_PHONE}}" "$CONTACT_PHONE"
replace_placeholder "{{WHATSAPP_NUMBER}}" "$WHATSAPP_NUMBER"
replace_placeholder "{{SITE_URL}}" "$SITE_URL"
replace_placeholder "{{SANITY_PROJECT_ID}}" "$SANITY_PROJECT_ID"
replace_placeholder "{{SANITY_DATASET}}" "$SANITY_DATASET"

# Create .env.local for next-app if it doesn't exist
ENV_FILE="$PROJECT_ROOT/next-app/.env.local"
if [[ ! -f "$ENV_FILE" ]]; then
  echo ""
  echo "📝 Creating next-app/.env.local..."
  cat > "$ENV_FILE" << EOF
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=${SANITY_PROJECT_ID}
NEXT_PUBLIC_SANITY_DATASET=${SANITY_DATASET}
SANITY_API_READ_TOKEN=

# Site Configuration
NEXT_PUBLIC_SITE_URL=${SITE_URL}
EOF
  echo "  ✓ Created .env.local"
fi

echo ""
echo "✅ Template initialized successfully!"
echo ""
echo "📋 Next steps:"
echo "  1. cd next-app && npm install"
echo "  2. cd studio && npm install"
echo "  3. Add your SANITY_API_READ_TOKEN to next-app/.env.local"
echo "  4. Run 'npm run dev' in both next-app and studio"
echo "  5. Configure your content in Sanity Studio"
echo ""
echo "🎉 Happy building!"

