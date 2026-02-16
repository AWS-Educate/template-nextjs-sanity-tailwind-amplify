# ✅ Configuración MCPs para Copilot CLI - Windows 11

**Fecha**: 2026-02-13  
**Estado**: ✅ Configuración completada  
**Ubicación**: `~/.copilot/mcp-config.json` (WSL: `/home/dwin-ubuntu/.copilot/mcp-config.json`)

---

## 🎯 Estado Actual

### ✅ MCPs Configurados (4/6)

| MCP | Estado | Comando | Requiere |
|-----|--------|---------|----------|
| **Sanity CMS** | ✅ Listo | `npx` | Node.js |
| **GitHub** | ✅ Listo | `npx` | Node.js |
| **Google Search Console** | ✅ Listo | `npx` | Node.js + credenciales JSON |
| **Short.io** | ✅ Listo | `npx` | Node.js |
| **Google Analytics** | ⚠️ Pendiente | `pipx` | Python + pipx |
| **Google Tag Manager** | ⚠️ Pendiente | `pipx` | Python + pipx |

### 📍 Ubicación del Archivo
```
Windows (PowerShell): C:\Users\Edwin-PC\.copilot\mcp-config.json
WSL (Ubuntu):         /home/dwin-ubuntu/.copilot/mcp-config.json
```

---

## 🚀 Pasos para Activar (2 minutos)

### 1. Reiniciar Copilot CLI
```bash
# Si estás en una sesión activa de Copilot CLI, sal completamente:
exit

# O presiona:
Ctrl + D

# Luego, inicia de nuevo:
gh copilot
```

### 2. Verificar MCPs Cargados
```bash
# Dentro de Copilot CLI, lista los MCPs:
/mcp
```

**Deberías ver**:
```
✓ sanity
✓ github  
✓ google-search-console
✓ shortio
```

---

## 🧪 Pruebas Rápidas

### Prueba 1: Sanity CMS
```
Query the 5 most recent blog posts from Sanity
```
✅ **Esperado**: Lista de posts con títulos, slugs y fechas.

### Prueba 2: GitHub
```
List open pull requests in academiasemillas.edu.co
```
✅ **Esperado**: Lista de PRs abiertos o mensaje "No open PRs".

### Prueba 3: Google Search Console
```
Get top 10 pages by clicks in the last 7 days
```
✅ **Esperado**: Datos de rendimiento SEO de las páginas.

### Prueba 4: Short.io
```
Create a short link for https://academiasemillas.edu.co/blog/test
```
✅ **Esperado**: URL corta generada.

---

## ⚠️ MCPs Pendientes (Opcionales)

Los siguientes MCPs requieren **pipx** (Python):

### Google Analytics
```bash
# Requiere:
pipx install analytics-mcp
```

### Google Tag Manager
```bash
# Requiere:
pipx install gtm-mcp
```

### Cómo Instalar pipx en Windows/WSL

#### Opción A: WSL (Ubuntu)
```bash
# Instalar Python y pipx
sudo apt-get update
sudo apt-get install -y python3-pip python3-venv pipx

# Configurar PATH
pipx ensurepath

# Cerrar y reabrir terminal

# Instalar los MCPs
pipx install analytics-mcp
pipx install gtm-mcp
```

#### Opción B: Windows nativo (PowerShell)
```powershell
# Instalar Python desde https://www.python.org/downloads/
# Asegúrate de marcar "Add Python to PATH" durante la instalación

# Instalar pipx
pip install pipx
pipx ensurepath

# Reiniciar PowerShell

# Instalar los MCPs
pipx install analytics-mcp
pipx install gtm-mcp
```

---

## 🔧 Comandos Útiles por MCP

### Sanity CMS
```
- "Query documents of type 'clase'"
- "Show the 10 most recent blog posts"
- "Search for 'guitarra' in Sanity"
- "Update document [id] with new data"
```

### GitHub
```
- "List recent commits on main branch"
- "Show open pull requests"
- "Get details of issue #123"
- "List all branches in this repo"
```

### Google Search Console
```
- "Show top performing pages in the last 30 days"
- "What are the top search queries?"
- "Show mobile usability issues"
- "Get index coverage report"
```

### Short.io
```
- "Create a short link for [URL]"
- "List my 10 most recent short links"
- "Show statistics for short link [code]"
```

---

## 🔐 Seguridad

✅ **Archivo local**: `~/.copilot/mcp-config.json` NO está en el repositorio Git  
✅ **Credenciales**: Las API keys están embebidas en el archivo local  
✅ **Google Cloud**: Credenciales JSON en `.mcp/credentials/google-cloud.json` (gitignored)  
✅ **Tokens**: Nunca se commitean al repo

---

## 📁 Estructura de Archivos

```
~/.copilot/
└── mcp-config.json              ← Config de MCPs (ESTE ARCHIVO)

~/WebstormProjects/academiasemillas.edu.co/
├── .env                         ← Variables de entorno (gitignored)
├── .mcp/
│   ├── config.json              ← Config para Claude Code (separado)
│   ├── credentials/
│   │   └── google-cloud.json    ← Credenciales Google
│   ├── COPILOT-CLI-WINDOWS.md   ← Esta guía
│   └── copilot-cli-setup.md     ← Guía original (macOS/Linux)
```

---

## 🔄 Actualizar Configuración

Si necesitas cambiar algo (API keys, agregar MCPs, etc.):

```bash
# 1. Editar archivo
nano ~/.copilot/mcp-config.json

# O desde Windows:
notepad C:\Users\Edwin-PC\.copilot\mcp-config.json

# 2. Reiniciar Copilot CLI
exit
gh copilot

# 3. Verificar cambios
/mcp
```

---

## 🐛 Troubleshooting

### MCPs no aparecen después de reiniciar
1. ✅ Verifica que el archivo existe:
   ```bash
   ls -lh ~/.copilot/mcp-config.json
   ```
2. ✅ Verifica sintaxis JSON (no debe tener errores):
   ```bash
   cat ~/.copilot/mcp-config.json | jq .
   ```
3. ✅ Verifica logs:
   ```bash
   tail -n 50 ~/.copilot/logs/*.log
   ```

### Error "command not found: npx"
- **Solución**: Instalar Node.js desde https://nodejs.org/
- Verificar instalación:
  ```bash
  node --version
  npm --version
  npx --version
  ```

### Google Search Console falla con error de credenciales
1. ✅ Verifica que el archivo existe:
   ```bash
   ls -la /mnt/c/Users/Edwin-PC/WebstormProjects/academiasemillas.edu.co/.mcp/credentials/google-cloud.json
   ```
2. ✅ Verifica que el path es correcto en el config:
   ```bash
   grep "GOOGLE_APPLICATION_CREDENTIALS" ~/.copilot/mcp-config.json
   ```

### Short.io no responde
- ✅ Verifica la API key en el config
- ✅ Prueba la API manualmente:
  ```bash
  curl -H "Authorization: sk_w7it48zuQVNyX6fg" https://api.short.io/links
  ```

### npx tarda mucho en iniciar
- **Normal**: La primera vez que `npx` descarga un paquete, puede tardar 10-30 segundos
- **Solución**: Instalar globalmente para acelerar:
  ```bash
  npm install -g @sanity/mcp-server @modelcontextprotocol/server-github mcp-server-gsc
  ```

---

## 🎓 Comandos de Ejemplo Avanzados

### Combinando MCPs

#### Ejemplo 1: Blog Post SEO
```
1. "Get the 10 most recent blog posts from Sanity"
2. "For each post, check Search Console performance in the last 30 days"
3. "Identify which posts need SEO optimization"
```

#### Ejemplo 2: Clase + GitHub
```
1. "Query all documents of type 'clase' from Sanity"
2. "Check if there are any open issues in GitHub related to clases"
3. "Create a summary report"
```

#### Ejemplo 3: Marketing Campaign
```
1. "Create short links for the top 5 blog posts from Sanity"
2. "Track clicks on those short links"
3. "Compare with Google Analytics traffic"
```

---

## ⚡ Optimización de Costos

### Perfil Recomendado para Copilot CLI: CONTENT

**MCPs activos**: Sanity + GitHub  
**Tokens/mensaje**: ~14,704  
**Costo/día**: $0.94  
**Uso**: 80% del trabajo diario

Si necesitas **Google Search Console** ocasionalmente, está incluido sin costo adicional de pipx.

### Deshabilitar MCPs Temporalmente

Si quieres deshabilitar un MCP sin eliminarlo:

```json
{
  "mcpServers": {
    "shortio": {
      "disabled": true,
      "command": "npx",
      ...
    }
  }
}
```

---

## ✅ Checklist de Verificación

- [x] Archivo `~/.copilot/mcp-config.json` creado
- [x] 4 MCPs configurados (Sanity, GitHub, Google Search Console, Short.io)
- [x] Credenciales copiadas desde `.env`
- [x] Archivo `google-cloud.json` presente
- [ ] Copilot CLI reiniciado
- [ ] `/mcp` muestra los 4 servidores activos
- [ ] Pruebas de conectividad realizadas
- [ ] (Opcional) pipx instalado para Google Analytics/GTM

---

## 📚 Recursos Adicionales

- [Documentación MCPs oficial](https://modelcontextprotocol.io/)
- [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli)
- [Sanity MCP Server](https://github.com/sanity-io/mcp-server)
- [Node.js Windows](https://nodejs.org/en/download/)
- [Python Windows](https://www.python.org/downloads/windows/)

---

## 📞 Soporte

- **Líder Técnico**: Edwin García
- **Canal**: #dev-mcp (Slack)
- **Issues**: [GitHub Issues](https://github.com/academia-semillas/academiasemillas.edu.co/issues)

---

## 🎉 ¡Configuración Lista!

**Próximos pasos**:
1. ✅ Reinicia Copilot CLI: `exit` → `gh copilot`
2. ✅ Verifica MCPs: `/mcp`
3. ✅ Prueba un comando: `"Query recent blog posts from Sanity"`
4. ✅ ¡A trabajar! 🚀

---

**Última actualización**: 2026-02-13  
**Versión**: 1.0.0 (Windows 11 / WSL)  
**Mantenedor**: Edwin García
