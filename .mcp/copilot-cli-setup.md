# ✅ Configuración MCP para Copilot CLI - COMPLETADA

**Fecha**: 2026-02-13
**Estado**: Configuración inicial completada, lista para pruebas

---

## 🎯 Resumen de Configuración

Se creó archivo **`~/.copilot/mcp-config.json`** con los 6 servidores MCP:

1. ✅ **Sanity CMS** - `@sanity/mcp-server@latest`
2. ✅ **GitHub** - `@modelcontextprotocol/server-github`
3. ✅ **Google Search Console** - `mcp-server-gsc`
4. ✅ **Google Analytics** - `analytics-mcp`
5. ✅ **Google Tag Manager** - `gtm-mcp`
6. ✅ **Short.io** - `mcp-remote`

---

## 📋 Estado de Dependencias

### ✅ Instalado
- `pipx` v1.8.0
- `analytics-mcp` v0.1.1
- `gtm-mcp` (última versión)

### ✅ Credenciales
- `.env` copiado desde `.mcp/.env.shared` ✓
- `google-cloud.json` presente en `.mcp/credentials/` ✓

---

## 🚀 Próximos Pasos (Para Usuario)

### 1. Reiniciar Copilot CLI
```bash
# Salir completamente del CLI actual
exit

# O presionar Ctrl+D

# Luego iniciar de nuevo
copilot
```

### 2. Verificar MCPs Cargados
```bash
# Dentro del CLI, ejecutar:
/mcp
```

**Deberías ver los 6 servidores listados:**
- sanity
- github
- google-search-console
- google-analytics
- google-tag-manager
- shortio

---

## 🧪 Pruebas de Conectividad

### Prueba 1: Sanity CMS
```bash
# Dentro de Copilot CLI:
"Query the 5 most recent blog posts from Sanity"
"List all documents of type 'clase'"
"Show me the structure of the Sanity schema"
```

**Resultado esperado**: Lista de posts del blog con títulos, slugs, fechas.

---

### Prueba 2: GitHub
```bash
"Show my open pull requests in academiasemillas.edu.co"
"List recent commits on main branch"
"Show issues assigned to me"
```

**Resultado esperado**: Lista de PRs, commits o issues.

---

### Prueba 3: Google Search Console
```bash
"Get top 10 pages by clicks in the last 7 days"
"Show Search Console performance summary"
"What are the top queries driving traffic?"
```

**Resultado esperado**: Datos de rendimiento SEO.

---

### Prueba 4: Google Analytics
```bash
"Show visitor count for the last 30 days"
"What are the top traffic sources?"
"Show bounce rate by page"
```

**Resultado esperado**: Métricas de analytics.

---

### Prueba 5: Google Tag Manager
```bash
"List all GTM containers"
"Show active tags in the main container"
"List all triggers configured"
```

**Resultado esperado**: Configuración de GTM.

---

### Prueba 6: Short.io
```bash
"Create a short link for https://academiasemillas.edu.co/blog/nuevo-post"
"List my 10 most recent short links"
"Show statistics for short link xyz"
```

**Resultado esperado**: Link corto creado o lista de links.

---

## 🔧 Comandos de Gestión

### Ver Estado de MCPs
```bash
/mcp
```

### Deshabilitar un MCP Temporalmente
Editar `~/.copilot/mcp-config.json` y agregar `"disabled": true`:

```json
{
  "mcpServers": {
    "sanity": {
      "disabled": true,
      "command": "npx",
      ...
    }
  }
}
```

### Re-habilitar un MCP
Eliminar la línea `"disabled": true` o cambiarla a `false`.

---

## 📁 Ubicaciones de Archivos

```
~/.copilot/
└── mcp-config.json              ← Config global de MCPs

/Users/edwingarcialozano/WebstormProjects/academiasemillas.edu.co/
├── .env                         ← Variables de entorno (gitignored)
├── .mcp/
│   ├── config.json              ← Config para Claude Code (intacta)
│   ├── .env.shared              ← Keys compartidas (gitignored)
│   ├── credentials/
│   │   └── google-cloud.json    ← Credenciales Google
│   └── copilot-cli-setup.md     ← Este archivo
```

---

## 🔐 Seguridad

- ✅ `.env` está en `.gitignore` (no se commitea)
- ✅ `google-cloud.json` está en `.gitignore`
- ✅ `.mcp/.env.shared` está en `.gitignore`
- ✅ `~/.copilot/mcp-config.json` es local (no está en repo)

---

## 🎓 Comandos Útiles por MCP

### Sanity
- `"Query documents of type [tipo]"`
- `"Update document [id] with [datos]"`
- `"Search for [término] in Sanity"`
- `"Show schema for type [tipo]"`

### GitHub
- `"List open PRs"`
- `"Show commit history"`
- `"Get issue #123"`
- `"List branches"`

### Google Search Console
- `"Top performing pages"`
- `"Search queries analysis"`
- `"Mobile usability issues"`
- `"Index coverage report"`

### Google Analytics
- `"Traffic by source"`
- `"Top pages by views"`
- `"User demographics"`
- `"Conversion funnel"`

### Google Tag Manager
- `"List containers"`
- `"Show tag configuration"`
- `"List triggers"`
- `"Show variables"`

### Short.io
- `"Create short link for [URL]"`
- `"List recent links"`
- `"Get stats for [short-link]"`
- `"Delete link [short-link]"`

---

## 🐛 Troubleshooting

### MCPs no aparecen después de reiniciar
1. Verificar que `~/.copilot/mcp-config.json` existe
2. Verificar sintaxis JSON: `jq . ~/.copilot/mcp-config.json`
3. Revisar logs: `~/.copilot/logs/`

### Error de autenticación en Sanity/GitHub/etc
1. Verificar que `.env` tiene las keys correctas
2. Revisar que no haya espacios extra en las keys
3. Regenerar tokens si están expirados

### Google MCPs fallan
1. Verificar que `pipx` está instalado: `which pipx`
2. Verificar que paquetes están instalados: `pipx list`
3. Verificar ruta de credenciales: `ls -la .mcp/credentials/google-cloud.json`

### npx tarda mucho o falla
1. Limpiar cache de npm: `npm cache clean --force`
2. Verificar conexión a internet
3. Probar instalar manualmente: `npm install -g @sanity/mcp-server`

---

## 📝 Notas Importantes

1. **Claude Code NO afectado**: La configuración de `.mcp/config.json` y `~/.claude.json` permanece intacta. Copilot CLI usa su propio archivo de configuración.

2. **Todos los MCPs ACTIVOS por defecto**: Todos los 6 MCPs están habilitados. Si quieres deshabilitarlos, edita `~/.copilot/mcp-config.json` manualmente.

3. **Perfil único**: A diferencia del sistema de perfiles de Claude (minimal/content/seo/full), Copilot CLI carga todos los MCPs del archivo. Habilitar/deshabilitar se hace editando el JSON.

4. **Actualización automática**: Los MCPs que usan `npx -y` se actualizan automáticamente a la última versión en cada ejecución.

---

## 🔄 Proceso de Deshabilitar MCPs (Pendiente)

**Después de las pruebas**, si quieres deshabilitar los MCPs:

```bash
# Editar archivo
nano ~/.copilot/mcp-config.json

# Agregar "disabled": true a cada MCP
# Ejemplo:
{
  "mcpServers": {
    "sanity": {
      "disabled": true,
      ...
    }
  }
}

# Reiniciar Copilot CLI
```

---

## ✅ Checklist de Verificación

- [x] Archivo `~/.copilot/mcp-config.json` creado
- [x] 6 MCPs configurados
- [x] Credenciales copiadas
- [x] Dependencias instaladas (pipx, analytics-mcp, gtm-mcp)
- [ ] Copilot CLI reiniciado
- [ ] `/mcp` muestra los 6 servidores
- [ ] Pruebas de conectividad realizadas
- [ ] MCPs deshabilitados (opcional)
- [ ] Documentación revisada

---

**¡Configuración lista!** Reinicia Copilot CLI y prueba los comandos. 🚀
