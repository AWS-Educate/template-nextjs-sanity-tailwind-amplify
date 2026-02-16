#!/bin/bash

# {{PROJECT_NAME}} - Setup Script
# Automates placeholder replacement in template

set -e

echo "🚀 {{PROJECT_NAME}} Template Setup"
echo "===================================="
echo ""

# Function to prompt for input
prompt() {
  read -p "$1: " value
  echo "$value"
}

# Collect information
PROJECT_NAME=$(prompt "Enter project name (e.g., 'My Awesome Project')")
PROJECT_SLUG=$(prompt "Enter project slug (e.g., 'my-awesome-project')")
SITE_URL=$(prompt "Enter site URL (e.g., 'https://example.com')")
SANITY_PROJECT_ID=$(prompt "Enter Sanity Project ID (or leave empty to configure later)")
SANITY_DATASET=$(prompt "Enter Sanity Dataset (default: 'production')") 
SANITY_DATASET=${SANITY_DATASET:-production}

echo ""
echo "📝 Replacing placeholders..."

# Replace placeholders in all files
find . -type f \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/.git/*" \
  -not -path "*/dist/*" \
  -not -path "*/scripts/setup.sh" \
  -exec sed -i '' "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" {} +

find . -type f \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/.git/*" \
  -not -path "*/dist/*" \
  -not -path "*/scripts/setup.sh" \
  -exec sed -i '' "s/{{PROJECT_SLUG}}/$PROJECT_SLUG/g" {} +

find . -type f \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/.git/*" \
  -not -path "*/dist/*" \
  -not -path "*/scripts/setup.sh" \
  -exec sed -i '' "s|{{SITE_URL}}|$SITE_URL|g" {} +

if [ -n "$SANITY_PROJECT_ID" ]; then
  find . -type f \
    -not -path "*/node_modules/*" \
    -not -path "*/.next/*" \
    -not -path "*/.git/*" \
    -not -path "*/dist/*" \
    -not -path "*/scripts/setup.sh" \
    -exec sed -i '' "s/{{SANITY_PROJECT_ID}}/$SANITY_PROJECT_ID/g" {} +
fi

find . -type f \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/.git/*" \
  -not -path "*/dist/*" \
  -not -path "*/scripts/setup.sh" \
  -exec sed -i '' "s/{{SANITY_DATASET}}/$SANITY_DATASET/g" {} +

# Rename .iml file
if [ -f ".idea/{{PROJECT_SLUG}}.iml" ]; then
  mv ".idea/{{PROJECT_SLUG}}.iml" ".idea/$PROJECT_SLUG.iml"
  echo "✅ Renamed .idea module file"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env and next-app/.env.local with your API keys"
echo "2. Run 'npm install' to install dependencies"
echo "3. Configure Sanity: cd studio && npx sanity init"
echo "4. Run 'npm run dev' to start development"
echo ""
echo "📖 See SETUP.md for detailed instructions"
