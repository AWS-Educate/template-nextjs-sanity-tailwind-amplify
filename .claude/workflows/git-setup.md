---
description: Configurar, reiniciar o subir un repositorio Git a GitHub de forma privada. También permite hacer commits inteligentes y gestionar un workflow de ramas (main <-> development).
---

# Git Repository Setup Workflow

# 🤖 PROTOCOLO DE PROTECCIÓN DE AGENTE (TRIGGER AUTOMÁTICO)

> [!CAUTION]
> **LEER ANTES DE CUALQUIER EDICIÓN DE CÓDIGO**
> Este proyecto tiene una política de **TOLERANCIA CERO** a cambios directos en la rama `master`.

Antes de llamar a cualquier herramienta de edición (`write_to_file`, `replace_file_content`, `multi_replace_file_content`), **DEBES** seguir estos pasos ciegamente:

1.  **🔍 Verificar Rama Actual**:
    ```bash
    git branch --show-current
    ```

2.  **🛑 Si la rama es `master`**:
    *   **NO EDITES NADA AÚN.**
    *   Verifica si ya existe `development`: `git branch --list development`
    *   **Ejecuta el cambio de rama**:
        *   *Si NO existe `development`*:
            ```bash
            git checkout -b development
            ```
        *   *Si YA existe `development`*:
            ```bash
            git checkout development
            git merge master
            ```

3.  **✅ Solo una vez en `development` puedes proceder a editar.**

---

Este workflow es **inteligente y adaptativo**. Detecta automáticamente el estado actual del repositorio y guía al usuario a través de las opciones relevantes.

---

## Modo de Operación

Este workflow tiene **dos modos principales**:

1. **Setup Completo**: Configurar, reiniciar o crear un nuevo repositorio en GitHub.
2. **Commit Inteligente**: Detectar cambios, hacer commit y push de forma rápida.
3. **Branch Workflow**: Gestión avanzada de ramas protegidas (`master`) y desarrollo iterativo (`development`).

El modo se determina automáticamente según el contexto de la solicitud del usuario.

---

# MODO 1: SETUP COMPLETO

## Fase 1: Diagnóstico Automático

Ejecuta estos comandos para determinar el estado actual del repositorio:

// turbo-all

### 1.1 Verificar si existe historial de Git

```bash
test -d .git && echo "GIT_INITIALIZED=true" || echo "GIT_INITIALIZED=false"
```

### 1.2 Verificar si hay un remoto configurado (vinculado a GitHub)

```bash
git remote -v 2>/dev/null | grep origin || echo "NO_REMOTE"
```

### 1.3 Listar las organizaciones disponibles del usuario

```bash
gh api user/orgs --jq '.[].login'
```

---

## Fase 2: Preguntas al Usuario (Basadas en el Diagnóstico)

Según los resultados del diagnóstico, presenta **SOLO** las preguntas relevantes:

### Escenario A: Repositorio vinculado a GitHub (remoto detectado)
> Pregunta: "Este repositorio está vinculado a GitHub (`<URL_DETECTADA>`). ¿Quieres desvincularlo?"
> - Si responde **SÍ**: Proceder a Fase 3, Paso 1.
> - Si responde **NO**: Saltar al Escenario B.

### Escenario B: Historial de Git existente
> Pregunta: "Este repositorio tiene historial de Git. ¿Quieres reiniciar el historial desde cero?"
> - Si responde **SÍ**: Proceder a Fase 3, Paso 2.
> - Si responde **NO**: Saltar al Escenario C.

### Escenario C: Crear repositorio en GitHub
> Pregunta: "¿Quieres crear un nuevo repositorio privado en GitHub?"
> - Si responde **SÍ**:
>   - Mostrar la lista de organizaciones disponibles.
>   - Pregunta: "¿En cuál organización?"
>   - Pregunta: "¿Cuál será el nombre del repositorio?"
> - Si responde **NO**: Fin del workflow.

**IMPORTANTE**: No continúes con la Fase 3 hasta que el usuario haya respondido todas las preguntas relevantes.

---

## Fase 3: Ejecución (Basada en las Respuestas)

Ejecuta **SOLO** los pasos que correspondan según las respuestas del usuario.

// turbo-all

### Paso 1: Desvincular de GitHub (si aplica)

Elimina el directorio `.git` para borrar toda conexión con el repositorio original.

```bash
rm -rf .git
```

### Paso 2: Reiniciar historial de Git (si aplica)

Si el usuario quiere reiniciar el historial (o si se desvinculó en el Paso 1), inicializa un nuevo repositorio.

```bash
git init
git add .
git commit -m "feat: initial commit"
```

### Paso 3: Crear repositorio privado en GitHub (si aplica)

Reemplaza `<ORGANIZACION>` y `<NOMBRE_REPO>` con los valores proporcionados por el usuario.

```bash
gh repo create <ORGANIZACION>/<NOMBRE_REPO> --private --source=. --remote=origin --push
```

### Paso 4: Verificar configuración

```bash
git remote -v
git log --oneline -1
```

---

# MODO 2: COMMIT INTELIGENTE

Utiliza este modo cuando el usuario quiera hacer commit y push de cambios existentes. este modo se inicia al escribir: commit

## Fase 1: Diagnóstico Rápido

// turbo-all

### 1.1 Verificar estado del repositorio y cambios pendientes

```bash
git status --porcelain
```

### 1.2 Verificar si hay remoto configurado

```bash
git remote -v 2>/dev/null | grep origin || echo "NO_REMOTE"
```

### 1.3 Verificar visibilidad del repositorio (si hay remoto)

```bash
gh repo view --json isPrivate --jq '.isPrivate' 2>/dev/null || echo "UNKNOWN"
```

---

## Fase 2: Análisis de Cambios

### 2.1 Obtener un resumen de los cambios para sugerir mensaje

```bash
git diff --stat HEAD 2>/dev/null || git diff --stat --cached
```

### 2.2 Obtener lista de archivos modificados

```bash
git status --short
```

---

## Fase 3: Interacción Mínima con el Usuario

Basado en el diagnóstico, presenta **SOLO** lo necesario:

### Si NO hay cambios pendientes:
> Informar: "No hay cambios pendientes para commit."
> Fin del workflow.

### Si hay cambios pendientes:
> 1. Mostrar resumen de los archivos modificados.
> 2. Generar un mensaje de commit descriptivo basado en los cambios.
> 3. Pregunta: "Mensaje de commit sugerido: `<MENSAJE_GENERADO>`. ¿Lo apruebas o quieres cambiarlo?"
>    - Si aprueba: Usar el mensaje sugerido.
>    - Si quiere cambiar: Solicitar el nuevo mensaje.

### Si el repositorio NO es privado:
> Advertencia: "⚠️ Este repositorio es PÚBLICO. ¿Deseas continuar con el push?"
> - Si responde **NO**: Fin del workflow.

### Si NO hay remoto configurado:
> Pregunta: "No hay un remoto configurado. ¿Quieres configurar GitHub ahora?"
> - Si responde **SÍ**: Cambiar a Modo 1 (Setup Completo).
> - Si responde **NO**: Solo hacer commit local, no push.

---

## Fase 4: Ejecución del Commit y Push

// turbo-all

### Paso 1: Agregar todos los cambios

```bash
git add .
```

### Paso 2: Realizar el commit

Reemplaza `<MENSAJE_COMMIT>` con el mensaje aprobado por el usuario.

```bash
git commit -m "<MENSAJE_COMMIT>"
```

### Paso 3: Push al remoto (si aplica)

```bash
git push origin HEAD
```

### Paso 4: Confirmar resultado

```bash
git log --oneline -1
echo "✅ Commit y push realizados exitosamente."
```

---

# Reglas Importantes

## Reglas Generales
1.  **Diagnóstico Primero**: SIEMPRE ejecutar el diagnóstico antes de hacer preguntas.
2.  **Preguntas Mínimas**: SOLO preguntar lo estrictamente necesario.
3.  **No repetir información**: Si algo ya está configurado (organización, nombre, remoto), NO preguntar de nuevo.

## Reglas para Setup (Modo 1)
4.  **Visibilidad**: SIEMPRE usar `--private`. Nunca crear repositorios públicos.
5.  **Organización**: SIEMPRE preguntar al usuario. Nunca asumir.
6.  **Nombre del Repositorio**: SIEMPRE preguntar al usuario. Nunca inventar nombres.

## Reglas para Commit (Modo 2)
7.  **Mensaje Inteligente**: Analizar los cambios y sugerir un mensaje descriptivo siguiendo Conventional Commits (feat:, fix:, docs:, refactor:, etc.).
8.  **Confirmación Rápida**: Si el usuario aprueba el mensaje sugerido, proceder inmediatamente.
9.  **Advertencia de Visibilidad**: Si el repositorio es público, advertir antes del push.
10. **Sin Remoto**: Si no hay remoto, ofrecer configurarlo o hacer solo commit local.

---

# Ejemplos de Mensajes de Commit Sugeridos

Basado en los archivos modificados, generar mensajes como:

| Archivos Modificados | Mensaje Sugerido |
|----------------------|------------------|
| `*.md` | `docs: update documentation` |
| `*.css`, `*.scss` | `style: update styles` |
| `*.ts`, `*.tsx`, `*.js` | `feat: update components` |
| `.env*`, `*.config.*` | `chore: update configuration` |
| `package.json`, `package-lock.json` | `chore: update dependencies` |
| Varios tipos mixtos | `chore: general updates` |

Si el usuario proporciona contexto adicional, incorporarlo al mensaje.

---

# MODO 3: BRANCH WORKFLOW

Flujo de trabajo basado en ramas `master` ↔ `development`. Protege producción y permite iteración ágil.

## Política de Ramas

| Rama         | Propósito                     | Protección           |
|--------------|-------------------------------|----------------------|
| `master`       | Código en producción (estable)| Solo merge aprobado  |
| `development`| Trabajo en progreso (WIP)     | Push libre           |

## 🚨 Reglas de Oro

1. **NUNCA editar directamente en `master`**
2. **TODO cambio inicia en `development`**
3. **Merge a `master` requiere aprobación explícita**
4. **Ambas ramas deben estar en GitHub**

---

## Fase 1: Preparación del Entorno (Ejecución Única)

// turbo-all

### 1.1 Verificar si existe la rama development

```bash
git branch --list development
```

### 1.2 Si NO existe development, crearla

```bash
git checkout -b development
git push -u origin development
```

---

## Fase 2: Ciclo de Trabajo Diario

### A. Antes de Editar Cualquier Archivo

```bash
git checkout development
git pull origin development
```

### B. Durante la Edición y Commit

```bash
# 1. Hacer cambios en archivos
# 2. Stage y commit
git add .
git commit -m "tipo: descripción"
git push origin development
```

### C. Solicitud de Aprobación

> "✅ Commit en `development` sincronizado con GitHub."
> "¿Autorizo merge a `master` para producción? (Sí/No)"

- Si **NO**: Continuar trabajando en `development`
- Si **SÍ**: Proceder a Fase 3

---

## Fase 3: Promoción a Producción

// turbo-all

### 3.1 Cambiar a master y actualizar

```bash
git checkout master
git pull origin master
```

### 3.2 Fusionar development en master

```bash
git merge development --no-ff
```

### 3.3 Push a producción

```bash
git push origin master
```

### 3.4 Volver a development

```bash
git checkout development
```

---

## Fase 4: Mantenimiento de Sincronización

```bash
git checkout development
git merge master
git push origin development
```

---

## Manejo de Situaciones Especiales

### Caso 1: Hotfix Urgente en master

```bash
git checkout master
git checkout -b hotfix/descripcion
# Hacer cambios...
git commit -am "hotfix: corrección urgente"
git checkout master
git merge hotfix/descripcion
git push origin master
# Sincronizar con development
git checkout development
git merge master
git push origin development
```

### Caso 2: Descartar Cambios en Development (⚠️ DESTRUCTIVO)

```bash
git checkout development
git reset --hard origin/master
```

### Caso 3: Ver Diferencias Entre Ramas

```bash
git diff master..development
```