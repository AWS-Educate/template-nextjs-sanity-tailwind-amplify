#!/bin/bash
# ============================================
# MCP Sync Script - Academia Semillas Team
# ============================================
# Sincroniza configuración de MCPs desde el repo al ~/.claude.json
#
# Uso:
#   ./sync.sh          # Sincronizar configuración
#   ./sync.sh --check  # Solo verificar cambios
#   ./sync.sh --force  # Forzar sincronización
# ============================================

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Rutas
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
PROFILES_DIR="$SCRIPT_DIR/profiles"
CONFIG_FILE="$SCRIPT_DIR/config.json"
ENV_TEMPLATE="$SCRIPT_DIR/.env.template"
ENV_FILE="$REPO_ROOT/.env"
CLAUDE_CONFIG="$HOME/.claude.json"

# Perfil seleccionado (parámetro 1: minimal, content, seo, full, auto; default: content)
SELECTED_PROFILE="${1:-content}"

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   MCP Sync - Academia Semillas Team   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# ============================================
# Funciones de utilidad para perfiles
# ============================================
detect_context() {
    # Detectar perfil basado en archivos modificados recientemente
    local git_files=$(cd "$REPO_ROOT" 2>/dev/null && git diff --name-only HEAD~5 2>/dev/null | head -10 || echo "")
    local recent_files=$(ls -t "$REPO_ROOT" 2>/dev/null | head -5 || echo "")

    if echo "$git_files" | grep -qE "studio/|sanity|schema"; then
        echo "content"
    elif echo "$git_files$recent_files" | grep -qE "sitemap|seo|analisis SEO"; then
        echo "seo"
    elif echo "$recent_files" | grep -qE "\.sanity\."; then
        echo "content"
    else
        echo "minimal"
    fi
}

validate_profile() {
    local profile="$1"
    local valid_profiles=("minimal" "content" "seo" "full")

    for p in "${valid_profiles[@]}"; do
        if [ "$profile" = "$p" ]; then
            return 0
        fi
    done

    return 1
}

# ============================================
# Procesar selección de perfil
# ============================================
if [ "$SELECTED_PROFILE" = "auto" ]; then
    SELECTED_PROFILE=$(detect_context)
    echo -e "${CYAN}→ Auto-detect: Perfil '$SELECTED_PROFILE' detectado${NC}"
    echo ""
fi

if ! validate_profile "$SELECTED_PROFILE"; then
    echo -e "${RED}✗ Perfil inválido: '$SELECTED_PROFILE'${NC}"
    echo -e "${YELLOW}Perfiles disponibles: minimal, content (default), seo, full, auto${NC}"
    exit 1
fi

PROFILE_FILE="$PROFILES_DIR/$SELECTED_PROFILE.json"
if [ ! -f "$PROFILE_FILE" ]; then
    echo -e "${RED}✗ Archivo de perfil no encontrado: $PROFILE_FILE${NC}"
    exit 1
fi

echo -e "${CYAN}→ Perfil activo: $SELECTED_PROFILE${NC}"
echo ""

# ============================================
# Verificar que existan archivos necesarios
# ============================================
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${RED}✗ Error: No se encontró config.json${NC}"
    exit 1
fi

if [ ! -f "$CLAUDE_CONFIG" ]; then
    echo -e "${RED}✗ Error: No se encontró ~/.claude.json${NC}"
    echo -e "${YELLOW}  ¿Es la primera vez usando Claude Code?${NC}"
    exit 1
fi

# ============================================
# Verificar archivo .env
# ============================================
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}⚠ No se encontró archivo .env${NC}"
    echo -e "${YELLOW}  Creando desde template...${NC}"
    cp "$ENV_TEMPLATE" "$ENV_FILE"
    echo -e "${GREEN}✓ Archivo .env creado${NC}"
    echo -e "${YELLOW}  IMPORTANTE: Edita .env y agrega las API keys reales${NC}"
    echo ""
    read -p "Presiona Enter cuando hayas agregado las keys..."
fi

# ============================================
# Cargar variables de entorno (safe parsing)
# ============================================
while IFS='=' read -r key value; do
    # Solo exportar variables válidas (UPPER_CASE)
    if [[ "$key" =~ ^[A-Z_][A-Z0-9_]*$ ]] && [[ -n "$value" ]]; then
        export "$key=$value"
    fi
done < <(grep -v '^#' "$ENV_FILE" | grep -v '^$' | sed 's/^[[:space:]]*//')

# ============================================
# Verificar TODAS las variables requeridas
# ============================================
ERRORS=0
PLACEHOLDERS=("tu_token_aqui" "tu_api_key_aqui" "tu_project_id_aqui")

validate_var() {
    local VAR_NAME="$1"
    local VAR_VALUE="${!VAR_NAME}"

    if [[ -z "$VAR_VALUE" ]]; then
        echo -e "${RED}✗ Error: $VAR_NAME no encontrado en .env${NC}"
        ERRORS=$((ERRORS + 1))
        return
    fi

    for placeholder in "${PLACEHOLDERS[@]}"; do
        if [[ "$VAR_VALUE" == "$placeholder" ]]; then
            echo -e "${RED}✗ Error: $VAR_NAME tiene valor placeholder en .env${NC}"
            ERRORS=$((ERRORS + 1))
            return
        fi
    done

    echo -e "${GREEN}  ✓ $VAR_NAME${NC}"
}

echo -e "${BLUE}→ Validando variables de entorno...${NC}"
validate_var "SANITY_PROJECT_ID"
validate_var "SANITY_API_TOKEN"
validate_var "GITHUB_PERSONAL_ACCESS_TOKEN"
validate_var "GITHUB_MCP_TOKEN"
validate_var "SHORTIO_API_KEY"
validate_var "GOOGLE_CLOUD_PROJECT"

if [[ $ERRORS -gt 0 ]]; then
    echo -e "${RED}✗ $ERRORS variable(s) no configurada(s). Edita .env y agrega los valores reales.${NC}"
    exit 1
fi

# Verificar credenciales de Google
if [ ! -f "$REPO_ROOT/.mcp/credentials/google-cloud.json" ]; then
    echo -e "${YELLOW}⚠ Credenciales Google no encontradas en .mcp/credentials/google-cloud.json${NC}"
    echo -e "${YELLOW}  Los MCPs de Google (Analytics, Search Console, GTM) no funcionarán.${NC}"
    echo -e "${YELLOW}  Descarga de 1Password: 'Academia Semillas - Google Cloud Credentials'${NC}"
else
    echo -e "${GREEN}  ✓ Credenciales Google Cloud encontradas${NC}"
fi

echo -e "${GREEN}✓ Variables de entorno validadas${NC}"

# ============================================
# Detectar proyecto actual
# ============================================
echo -e "${BLUE}→ Proyecto: $REPO_ROOT${NC}"

# ============================================
# Sincronizar configuración
# ============================================
if [ "$1" == "--check" ]; then
    echo -e "${YELLOW}Modo check: solo verificando cambios...${NC}"
    exit 0
fi

echo -e "${BLUE}→ Sincronizando MCPs...${NC}"

# Backup de seguridad antes de modificar
cp "$CLAUDE_CONFIG" "$CLAUDE_CONFIG.bak" 2>/dev/null && \
    echo -e "${GREEN}  ✓ Backup: ~/.claude.json.bak${NC}"

# Exportar rutas para que Python las lea via os.environ
export PROJECT_PATH="$REPO_ROOT"
export CONFIG_FILE="$CONFIG_FILE"
export PROFILE_FILE="$PROFILE_FILE"
export SELECTED_PROFILE="$SELECTED_PROFILE"

# Usar Python para actualizar .claude.json de forma segura
python3 - <<'PYEOF'
import json
import os
import re
import sys

claude_config_path = os.path.expanduser("~/.claude.json")
project_path = os.environ.get("PROJECT_PATH", "")
selected_profile = os.environ.get("SELECTED_PROFILE", "content")

if not project_path:
    print("ERROR: PROJECT_PATH not set", file=sys.stderr)
    sys.exit(1)

profile_file = os.environ.get("PROFILE_FILE", "")
config_file = os.environ.get("CONFIG_FILE", "")

# Leer profile.json del repo (contiene MCPs específicos del perfil)
if os.path.exists(profile_file):
    with open(profile_file, 'r') as f:
        config_content = f.read()
else:
    print(f"ERROR: Profile file not found: {profile_file}", file=sys.stderr)
    sys.exit(1)

# Reemplazar ${PROJECT_ROOT} con la ruta real del proyecto
config_content = config_content.replace('${PROJECT_ROOT}', project_path)

# Reemplazar TODAS las variables ${VAR_NAME} con valores de entorno
# Esto cubre env values, args, headers, etc.
def replace_env_vars(match):
    var_name = match.group(1)
    value = os.environ.get(var_name)
    if value is None:
        print(f"  WARN: Variable ${{{var_name}}} no encontrada en entorno", file=sys.stderr)
        return match.group(0)  # dejar sin cambiar
    return value

config_content = re.sub(r'\$\{([A-Z_][A-Z0-9_]*)\}', replace_env_vars, config_content)

# Verificar que no queden variables sin resolver
remaining = re.findall(r'\$\{([A-Z_][A-Z0-9_]*)\}', config_content)
if remaining:
    print(f"  WARN: Variables sin resolver: {', '.join(remaining)}", file=sys.stderr)

mcp_config = json.loads(config_content)

# Leer .claude.json
with open(claude_config_path, 'r') as f:
    claude_config = json.load(f)

# Asegurar que el proyecto existe en la config
if project_path not in claude_config.get("projects", {}):
    if "projects" not in claude_config:
        claude_config["projects"] = {}
    claude_config["projects"][project_path] = {
        "allowedTools": [],
        "mcpContextUris": [],
        "mcpServers": {},
        "enabledMcpjsonServers": [],
        "disabledMcpjsonServers": [],
        "hasTrustDialogAccepted": True
    }

# Actualizar mcpServers
claude_config["projects"][project_path]["mcpServers"] = mcp_config.get("mcpServers", {})

# Actualizar enabledMcpjsonServers
enabled_servers = list(mcp_config.get("mcpjsonServers", {}).keys())
claude_config["projects"][project_path]["enabledMcpjsonServers"] = enabled_servers

# Guardar
with open(claude_config_path, 'w') as f:
    json.dump(claude_config, f, indent=2)

mcp_count = len(mcp_config.get('mcpServers', {}))
json_count = len(enabled_servers)
print(f"  Sincronizados {mcp_count} MCPs npm + {json_count} MCPs JSON")

# Mostrar metadata del perfil
metadata = mcp_config.get('metadata', {})
if metadata:
    print(f"\n  Profile: {metadata.get('profile', 'N/A')}")
    print(f"  Tools: {metadata.get('tools_count', 'N/A')}")
    print(f"  Est. tokens: {metadata.get('estimated_tokens', 'N/A'):,}")
    print(f"  Daily cost: ${metadata.get('daily_cost_usd', 'N/A')}")
PYEOF

echo -e "${GREEN}✓ Configuración sincronizada${NC}"
echo ""

# ============================================
# Mostrar MCPs configurados
# ============================================
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   MCPs Configurados ($SELECTED_PROFILE):${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
python3 - <<'PYEOF'
import json
import os

profile_file = os.environ.get("PROFILE_FILE", "")
with open(profile_file, 'r') as f:
    config = json.load(f)

for name, details in config.get("mcpServers", {}).items():
    desc = details.get("description", "Sin descripcion")
    print(f"  {name}: {desc}")

for name, details in config.get("mcpjsonServers", {}).items():
    desc = details.get("description", "Sin descripcion")
    print(f"  {name}: {desc}")
PYEOF
echo ""

# ============================================
# Instrucciones finales
# ============================================
echo -e "${YELLOW}╔════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║   Siguiente Paso:                      ║${NC}"
echo -e "${YELLOW}╚════════════════════════════════════════╝${NC}"
echo -e "${YELLOW}→ Reinicia Claude Code para aplicar cambios${NC}"
echo -e "${GREEN}→ Listo! Los MCPs estarán disponibles${NC}"
echo ""

# ============================================
# Mostrar opciones de cambio de perfil
# ============================================
echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Cambiar Perfil:                      ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
echo -e "${CYAN}./sync.sh minimal${NC}  # Git only (fastest)"
echo -e "${CYAN}./sync.sh content${NC}  # Default (Sanity + Git)"
echo -e "${CYAN}./sync.sh seo${NC}      # + Google Analytics/GSC"
echo -e "${CYAN}./sync.sh full${NC}     # All MCPs"
echo -e "${CYAN}./sync.sh auto${NC}     # Auto-detect"
echo ""
