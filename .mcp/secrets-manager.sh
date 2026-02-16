#!/bin/bash
# ============================================
# MCP Secrets Manager - Academia Semillas
# ============================================
# Gestiona las API keys del equipo de forma segura
#
# Uso:
#   ./secrets-manager.sh upload     # Subir keys a 1Password
#   ./secrets-manager.sh download   # Descargar keys de 1Password
#   ./secrets-manager.sh rotate     # Rotar una key específica
#   ./secrets-manager.sh list       # Ver keys disponibles (sin valores)
# ============================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SHARED_FILE="$SCRIPT_DIR/.env.shared"
LOCAL_FILE="$(dirname "$SCRIPT_DIR")/.env"
ITEM_NAME="Academia Semillas - MCP Keys"
CREDENTIALS_FILE="$SCRIPT_DIR/credentials/google-cloud.json"

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   MCP Secrets Manager                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# ============================================
# Verificar dependencias
# ============================================
check_dependencies() {
    if ! command -v op &> /dev/null; then
        echo -e "${RED}✗ Error: 1Password CLI no está instalado${NC}"
        echo -e "${YELLOW}Instalar con: brew install 1password-cli${NC}"
        exit 1
    fi

    if ! op account list &> /dev/null; then
        echo -e "${YELLOW}⚠ No estás logueado en 1Password${NC}"
        echo -e "${YELLOW}Ejecuta: op signin${NC}"
        exit 1
    fi
}

# ============================================
# Subir secrets a 1Password
# ============================================
upload_secrets() {
    echo -e "${BLUE}→ Subiendo secrets a 1Password...${NC}"

    if [ ! -f "$SHARED_FILE" ]; then
        echo -e "${RED}✗ Error: $SHARED_FILE no encontrado${NC}"
        exit 1
    fi

    # Crear o actualizar item
    if op item get "$ITEM_NAME" &> /dev/null; then
        echo -e "${YELLOW}⚠ Item ya existe. Actualizando...${NC}"
        op item edit "$ITEM_NAME" "notesPlain=$(cat "$SHARED_FILE")"
    else
        echo -e "${GREEN}→ Creando nuevo item...${NC}"
        op item create \
            --category="Secure Note" \
            --title="$ITEM_NAME" \
            --vault="Shared" \
            "notesPlain=$(cat "$SHARED_FILE")"
    fi

    # Subir credenciales de Google si existen
    if [ -f "$CREDENTIALS_FILE" ]; then
        echo -e "${BLUE}→ Subiendo credenciales de Google Cloud...${NC}"

        if op item get "Academia Semillas - Google Cloud Credentials" &> /dev/null; then
            op item edit "Academia Semillas - Google Cloud Credentials" \
                --vault="Shared" \
                "file=$CREDENTIALS_FILE"
        else
            op document create "$CREDENTIALS_FILE" \
                --title="Academia Semillas - Google Cloud Credentials" \
                --vault="Shared"
        fi
    fi

    echo -e "${GREEN}✓ Secrets subidos exitosamente${NC}"
    echo -e "${YELLOW}Los compañeros pueden descargar con: ./secrets-manager.sh download${NC}"
}

# ============================================
# Descargar secrets de 1Password
# ============================================
download_secrets() {
    echo -e "${BLUE}→ Descargando secrets de 1Password...${NC}"

    # Descargar .env
    if op item get "$ITEM_NAME" &> /dev/null; then
        op item get "$ITEM_NAME" --fields notesPlain > "$LOCAL_FILE"
        echo -e "${GREEN}✓ Keys descargadas: $LOCAL_FILE${NC}"
    else
        echo -e "${RED}✗ Error: Item no encontrado en 1Password${NC}"
        echo -e "${YELLOW}El líder debe ejecutar: ./secrets-manager.sh upload${NC}"
        exit 1
    fi

    # Descargar credenciales de Google
    mkdir -p "$SCRIPT_DIR/credentials"

    if op document get "Academia Semillas - Google Cloud Credentials" &> /dev/null; then
        op document get "Academia Semillas - Google Cloud Credentials" \
            --output "$CREDENTIALS_FILE"
        chmod 600 "$CREDENTIALS_FILE"
        echo -e "${GREEN}✓ Credenciales Google descargadas: $CREDENTIALS_FILE${NC}"
    else
        echo -e "${YELLOW}⚠ Credenciales de Google no encontradas en 1Password${NC}"
    fi

    echo ""
    echo -e "${GREEN}✓ Setup completo. Ahora ejecuta:${NC}"
    echo -e "${BLUE}   ./.mcp/sync.sh${NC}"
}

# ============================================
# Listar keys disponibles (sin valores)
# ============================================
list_keys() {
    echo -e "${BLUE}→ Keys disponibles:${NC}"
    echo ""

    if [ -f "$LOCAL_FILE" ]; then
        SOURCE="$LOCAL_FILE"
    elif [ -f "$SHARED_FILE" ]; then
        SOURCE="$SHARED_FILE"
    else
        echo -e "${RED}✗ No se encontró ningún archivo de keys${NC}"
        exit 1
    fi

    cat "$SOURCE" | grep -v "^#" | grep -v "^$" | cut -d= -f1 | while read key; do
        echo -e "${GREEN}  ✓ $key${NC}"
    done
}

# ============================================
# Rotar una key específica
# ============================================
rotate_key() {
    local KEY_NAME="$1"

    if [ -z "$KEY_NAME" ]; then
        echo -e "${RED}✗ Error: Especifica qué key rotar${NC}"
        echo -e "${YELLOW}Uso: ./secrets-manager.sh rotate NOMBRE_KEY${NC}"
        exit 1
    fi

    echo -e "${BLUE}→ Rotando key: $KEY_NAME${NC}"

    if [ ! -f "$SHARED_FILE" ]; then
        echo -e "${RED}✗ Error: $SHARED_FILE no encontrado${NC}"
        exit 1
    fi

    # Pedir nuevo valor
    echo -e "${YELLOW}Ingresa el nuevo valor para $KEY_NAME:${NC}"
    read -s NEW_VALUE
    echo ""

    # Actualizar archivo local
    if grep -q "^$KEY_NAME=" "$SHARED_FILE"; then
        # macOS compatible sed
        sed -i '' "s|^$KEY_NAME=.*|$KEY_NAME=$NEW_VALUE|" "$SHARED_FILE"
        echo -e "${GREEN}✓ Key actualizada en $SHARED_FILE${NC}"
    else
        echo "$KEY_NAME=$NEW_VALUE" >> "$SHARED_FILE"
        echo -e "${GREEN}✓ Key agregada a $SHARED_FILE${NC}"
    fi

    # Subir a 1Password
    echo -e "${BLUE}→ Actualizando en 1Password...${NC}"
    upload_secrets

    echo ""
    echo -e "${GREEN}✓ Key rotada exitosamente${NC}"
    echo -e "${YELLOW}⚠ Notifica al equipo para que ejecuten:${NC}"
    echo -e "${BLUE}   ./secrets-manager.sh download${NC}"
}

# ============================================
# Main
# ============================================
case "$1" in
    upload)
        check_dependencies
        upload_secrets
        ;;
    download)
        check_dependencies
        download_secrets
        ;;
    list)
        list_keys
        ;;
    rotate)
        check_dependencies
        rotate_key "$2"
        ;;
    *)
        echo -e "${YELLOW}Uso: $0 {upload|download|list|rotate}${NC}"
        echo ""
        echo -e "${BLUE}Comandos disponibles:${NC}"
        echo -e "${GREEN}  upload${NC}     - Subir keys a 1Password (solo líder)"
        echo -e "${GREEN}  download${NC}   - Descargar keys de 1Password (team)"
        echo -e "${GREEN}  list${NC}       - Ver keys disponibles (sin valores)"
        echo -e "${GREEN}  rotate${NC}     - Rotar una key específica"
        echo ""
        echo -e "${BLUE}Ejemplos:${NC}"
        echo -e "  $0 upload"
        echo -e "  $0 download"
        echo -e "  $0 list"
        echo -e "  $0 rotate GITHUB_PERSONAL_ACCESS_TOKEN"
        exit 1
        ;;
esac
