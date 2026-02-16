# MCP Sanity - Configuración

**Estado**: ✅ Configurado  
**Proyecto**: jovlwcbx  
**Dataset**: production  
**Fecha**: 2026-02-16

---

## ¿Qué es MCP de Sanity?

MCP (Model Context Protocol) permite a Claude Code acceder directamente a tu proyecto Sanity CMS, consultando:
- Documentos y contenido en tiempo real
- Esquemas (schemas)
- Contenido publicado y borradores
- Estadísticas del proyecto

---

## ✅ Configuración Completada

El archivo `.claude/mcp-servers.json` ya está configurado con:

```json
{
  "mcpServers": {
    "sanity": {
      "command": "npx",
      "args": [
        "@sanity/mcp@latest",
        "serve"
      ],
      "env": {
        "SANITY_PROJECT_ID": "jovlwcbx",
        "SANITY_DATASET": "production"
      }
    }
  }
}
```

---

## 🚀 Cómo Activarlo

### Opción 1: En Claude Code (CLI)

1. **Abre la paleta de comandos** en Claude Code:
   - Mac: `Cmd + Shift + P`
   - Linux/Windows: `Ctrl + Shift + P`

2. **Busca**: `Claude Code: Configure MCP Servers`

3. **Selecciona**: Agrega `sanity` a tu lista de MCP servers

4. **Reinicia** Claude Code

### Opción 2: Configuración Manual

Edita `~/.claude/config.json` (o crea si no existe):

```json
{
  "mcpServers": [
    {
      "name": "sanity",
      "command": "npx",
      "args": [
        "@sanity/mcp@latest",
        "serve"
      ],
      "env": {
        "SANITY_PROJECT_ID": "jovlwcbx",
        "SANITY_DATASET": "production"
      }
    }
  ]
}
```

---

## 🔑 Credenciales Requeridas (Opcional)

Si necesitas acceso a borradores o contenido privado, añade tokens:

```json
{
  "env": {
    "SANITY_PROJECT_ID": "jovlwcbx",
    "SANITY_DATASET": "production",
    "SANITY_API_READ_TOKEN": "tu_read_token_aqui"
  }
}
```

**Para obtener el token**:
1. Ve a https://manage.sanity.io
2. Selecciona tu proyecto → **Settings → API**
3. Crea un nuevo token con permisos de lectura
4. Cópialo en la config

---

## 💡 Ejemplos de Uso

Una vez activado, puedes preguntarle a Claude:

### Consultar Documentos
- "¿Cuántos posts tengo en Sanity?"
- "Muéstrame todos los eventos próximos"
- "¿Cuál es el contenido de la página de inicio?"

### Explorar Estructura
- "¿Cuáles son todos los campos del schema 'post'?"
- "Muéstrame la estructura del tipo 'page'"

### Análisis de Contenido
- "¿Qué posts están sin categoría?"
- "¿Qué imágenes no tienen alt text?"

### Validación
- "¿Hay algún post sin SEO?"
- "¿Hay eventos sin zoom link?"

---

## ⚙️ Comandos Útiles

Una vez que MCP esté activo, puedes pedirle a Claude:

```
"Usando el MCP de Sanity, muéstrame todos los posts"
"Consulta Sanity y dame el contenido de la categoría 'Meditación'"
"Verifica en Sanity si hay documentos sin publicar"
```

---

## 🔍 Verificar que Funciona

Una vez configurado, en Claude Code puedes escribir:

```
Hola, verifica en Sanity que el proyecto jovlwcbx esté conectado
```

Si ves que Claude puede acceder a datos de Sanity, ¡está funcionando!

---

## 📝 Archivo de Configuración

```
📁 .claude/
└── mcp-servers.json  ✅ Creado y configurado
```

---

## 🚨 Troubleshooting

### Error: "Cannot connect to Sanity"
- Verifica que el PROJECT_ID y DATASET son correctos
- Reinicia Claude Code
- Verifica conexión a internet

### MCP no aparece en la lista
- Reinicia Claude Code completamente
- Verifica que el archivo JSON está bien formado
- Usa: `Claude Code: Show MCP Logs` para ver errores

### Solo veo contenido publicado
- Añade un SANITY_API_READ_TOKEN en la configuración
- Eso permitirá ver borradores y contenido privado

---

## 📚 Documentación Oficial

- [Sanity MCP GitHub](https://github.com/sanity-io/mcp)
- [Claude Code MCP Setup](https://claude.com/claude-code/mcp)
- [Sanity Docs](https://www.sanity.io/docs)

---

## 🎯 Beneficios

✅ Claude puede ver tu contenido en tiempo real  
✅ Ayuda a validar esquemas y estructura  
✅ Acelera la creación de páginas y componentes  
✅ Detecta problemas de contenido automáticamente  
✅ Genera código basado en datos reales de Sanity  

---

**Próximo paso**: Usa el MCP para ayudarte a crear las páginas de Fase 5

*Última actualización: 2026-02-16 - MCP Sanity Setup Completo*
