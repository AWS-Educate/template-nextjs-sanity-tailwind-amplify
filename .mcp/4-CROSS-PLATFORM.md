# 🖥️ Cross-Platform Setup - Windows + macOS

## Rutas de Archivos por Plataforma

### Variables de Entorno (.env)
**Ubicación**: Raíz del proyecto (igual en ambas plataformas)
```
./env
```

### Credenciales de Google Cloud

#### macOS
```bash
# Archivo original en tu sistema
~/.config/gcloud/your-gcloud-credentials.json

# Copiar al proyecto
cp ~/.config/gcloud/your-gcloud-credentials.json .mcp/credentials/google-cloud.json
```

#### Windows
```powershell
# Archivo original en tu sistema
C:\Users\Edwin-PC\.config\gcloud\your-gcloud-credentials.json

# Copiar al proyecto
copy "C:\Users\Edwin-PC\.config\gcloud\your-gcloud-credentials.json" ".mcp\credentials\google-cloud.json"
```

### Configuración de Claude

#### macOS
```bash
~/.claude.json
```

#### Windows
```powershell
%USERPROFILE%\.claude.json
# Ejemplo: C:\Users\Edwin-PC\.claude.json
```

---

## Solución: Variable ${PROJECT_ROOT}

En `config.json` usamos la variable `${PROJECT_ROOT}` que el script `sync.sh` reemplaza automáticamente con la ruta correcta de tu proyecto.

### Ejemplo en config.json
```json
{
  "google-search-console": {
    "env": {
      "GOOGLE_APPLICATION_CREDENTIALS": "${PROJECT_ROOT}/.mcp/credentials/google-cloud.json"
    }
  }
}
```

### Resultado en ~/.claude.json

**macOS**:
```json
{
  "google-search-console": {
    "env": {
      "GOOGLE_APPLICATION_CREDENTIALS": "/Users/edwingarcialozano/WebstormProjects/academiasemillas.edu.co/.mcp/credentials/google-cloud.json"
    }
  }
}
```

**Windows**:
```json
{
  "google-search-console": {
    "env": {
      "GOOGLE_APPLICATION_CREDENTIALS": "C:\\Users\\Edwin-PC\\WebstormProjects\\academiasemillas.edu.co\\.mcp\\credentials\\google-cloud.json"
    }
  }
}
```

---

## Setup en Windows

### 1. Clonar Repositorio
```powershell
cd C:\Users\Edwin-PC\WebstormProjects
git clone https://github.com/academia-semillas/academiasemillas.edu.co.git
cd academiasemillas.edu.co
```

### 2. Copiar Variables de Entorno
```powershell
copy .mcp\.env.shared .env
```

### 3. Copiar Credenciales de Google
```powershell
# Crear directorio si no existe
mkdir .mcp\credentials -Force

# Copiar archivo
copy "C:\Users\Edwin-PC\.config\gcloud\your-gcloud-credentials.json" ".mcp\credentials\google-cloud.json"
```

### 4. Ejecutar Sincronización
```powershell
# Usando Git Bash (recomendado)
bash .mcp/sync.sh

# O usando WSL2
wsl bash .mcp/sync.sh
```

### 5. Reiniciar Claude Code
```powershell
# Cerrar desde Task Manager
taskkill /IM "Claude Code.exe" /F

# Reabrir desde el menú inicio
```

---

## Setup en macOS

### 1. Clonar Repositorio
```bash
cd ~/WebstormProjects
git clone https://github.com/academia-semillas/academiasemillas.edu.co.git
cd academiasemillas.edu.co
```

### 2. Copiar Variables de Entorno
```bash
cp .mcp/.env.shared .env
```

### 3. Copiar Credenciales de Google
```bash
# El archivo ya está copiado en el repo, pero puedes actualizarlo:
cp ~/.config/gcloud/your-gcloud-credentials.json .mcp/credentials/google-cloud.json
```

### 4. Ejecutar Sincronización
```bash
./.mcp/sync.sh
```

### 5. Reiniciar Claude Code
```bash
# Cerrar completamente
killall "Claude Code"

# O usar Cmd+Q

# Reabrir desde Applications
open -a "Claude Code"
```

---

## Verificación Cross-Platform

### Comando Universal
```bash
# Ver MCPs configurados (funciona en ambas plataformas)
cat .mcp/config.json | python3 -m json.tool | grep -A 1 "description"
```

### Resultado Esperado
```json
✓ sanity: Sanity CMS
✓ salesforce: Salesforce CRM
✓ github: GitHub
✓ google-search-console: Google Search Console
✓ google-analytics: Google Analytics
✓ google-tag-manager: Google Tag Manager
✓ shortio: Short.io
✓ io.github.github/github-mcp-server: GitHub MCP (HTTP)
```

---

## Dependencias por Plataforma

### macOS

```bash
# Instalar pipx (para Google Analytics y GTM)
brew install pipx
pipx ensurepath

# Verificar Node.js (para MCPs npm)
node --version  # Debe ser v18+

# Verificar Python (para sync.sh)
python3 --version  # Debe ser 3.8+
```

### Windows

```powershell
# Instalar pipx (para Google Analytics y GTM)
python -m pip install pipx
python -m pipx ensurepath

# Verificar Node.js (para MCPs npm)
node --version  # Debe ser v18+

# Verificar Python (para sync.sh via Git Bash)
python --version  # Debe ser 3.8+
```

---

## Troubleshooting Cross-Platform

### Error: "python3: command not found" (Windows)

**Solución**:
```powershell
# Git Bash usa "python3" pero Windows tiene "python"
# Crear alias en Git Bash
echo "alias python3='python'" >> ~/.bashrc
source ~/.bashrc
```

### Error: Rutas con espacios

**macOS/Linux**:
```bash
# Usar comillas dobles
cd "/Users/edwin garcia/proyectos/academiasemillas.edu.co"
```

**Windows**:
```powershell
# Usar comillas dobles
cd "C:\Users\Edwin PC\proyectos\academiasemillas.edu.co"
```

### Error: Credenciales de Google no encontradas

**Verificar en macOS**:
```bash
ls -la ~/.config/gcloud/*.json
```

**Verificar en Windows**:
```powershell
dir "$env:USERPROFILE\.config\gcloud\*.json"
```

Si no existe, [descargar desde Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts).

---

## FAQ Cross-Platform

**P: ¿Los MCPs funcionan igual en Windows y Mac?**
R: Sí, gracias a la variable `${PROJECT_ROOT}` que se reemplaza automáticamente.

**P: ¿Puedo usar el mismo archivo .env en ambas plataformas?**
R: Sí, todas las variables de entorno son iguales. Solo cambia la ubicación del archivo de credenciales de Google.

**P: ¿Necesito instalar algo adicional?**
R: Sí, `pipx` para Google Analytics y GTM. Ver sección "Dependencias por Plataforma".

**P: ¿Qué pasa con JetBrains MCP?**
R: Es local-only (http://localhost:64342). No se sincroniza porque cada máquina tiene su propio servidor.

---

**Última actualización**: 2026-02-13
**Probado en**: macOS Sequoia 15.x, Windows 11
