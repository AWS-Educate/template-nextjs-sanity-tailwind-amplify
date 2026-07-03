# Reglas de Git para agentes (plantilla agnóstica — copiar/pegar en cualquier proyecto)

> Pega este bloque en el archivo de reglas de agentes del proyecto destino (por ejemplo `AGENTS.md`,
> `CLAUDE.md` o un `reglas-git.md` dedicado). No contiene nombres de proyecto ni de personas; usa
> "el responsable humano". Sustitúyelo por el nombre real si lo prefieres. La frase disparadora del
> interruptor es `inicia workflow`; el proyecto destino puede personalizarla, pero debe ser UNA frase
> exacta y única.
>
> Workflow definitivo (2026-07-02): interruptor de integración + squash a `development` + merge
> commit a `main` + pregunta de promoción por recorrido.

Eres un agente trabajando en este repositorio. Sigue estas reglas de Git SIEMPRE. Si una regla no se
puede cumplir por permisos, rutas o bloqueo técnico, detente, documenta el bloqueo y pide autorización
antes de continuar. No improvises sobre Git.

## 1. Ramas permanentes (solo dos)

- `main`: producción. Si está conectada a deploy automático (Vercel, Amplify, Netlify, etc.), todo
  cambio en `main` se considera publicación en producción.
- `development`: rama de integración y base de trabajo diaria.
- No deben existir otras ramas permanentes. Cualquier otra rama es temporal y desechable.

## 2. Ramas temporales

- `feat/nombre-corto`: nueva funcionalidad. `fix/nombre-corto`: corrección.
- Se crean SIEMPRE desde `development` actualizado, en kebab-case, con nombre único y descriptivo.
- Antes de crear, verifica que el nombre no exista (`git branch -a`).

## 3. Regla de oro: `main` nunca lo toca un agente por iniciativa propia

- Ningún agente edita, commitea ni hace push directo a `main`. Nunca. Sin excepciones.
- Ningún agente mergea a `main` ni abre un PR hacia `main` por iniciativa propia.
- Antes de empezar cualquier cambio, confirma que NO estás sobre `main` (`git branch --show-current`).
- A `main` solo se llega por el protocolo de promoción con pregunta obligatoria por instancia (3.1).

## 3.1. Promoción a producción (`development → main`) — pregunta obligatoria en cada recorrido

En cada recorrido de integración que mergea a `development` con CI verde (sección 4), el agente
**siempre pregunta al responsable humano antes de cualquier merge a `main`**. No se asume; se
pregunta cada vez. Pregunta exacta sugerida: `¿Promuevo development a main ahora?`

La pregunta se hace con la rama/worktree temporal de la tarea ya limpiados (la limpieza es
automática e inmediata tras verificar el merge en `origin/development`; sección 11).

- Si el humano responde **SÍ**: el agente abre el PR `development → main`, espera los CI/checks
  requeridos, hace el **merge con merge commit**, verifica que `origin/main` contiene el merge,
  resincroniza `development` desde `main` (sección 9) y registra la promoción en el historial del
  proyecto. Si `main` tiene deploy automático, este merge **dispara la publicación en producción**.
- Si el humano responde **NO**: el agente **no abre** el PR `development → main`; y si ya lo había
  abierto, lo **cierra/elimina**. No queda nada pendiente apuntando a `main`; el trabajo queda en
  `development`.
- El agente **nunca** hace push directo a `main` en ningún escenario.
- Hasta que el humano responda SÍ o NO, la tarea no se considera completamente cerrada.

## 4. Interruptor del workflow de integración (`inicia workflow`)

El recorrido de integración NO arranca solo: lo enciende el responsable humano. Así el humano decide
cómo y cuándo se integra (por tarea, por hito, por fase o a demanda), sin cambiar estas reglas.

- Estado por defecto: workflow de integración **APAGADO**.
- Disparador único: la frase exacta `inicia workflow` dicha por el responsable humano. Mencionar
  palabras como git, commit, pr, PR, github o workflow en conversación normal NO enciende nada; solo
  la frase exacta cuenta.
- Siempre encendido, no depende del interruptor: worktree obligatorio, commits inmediatos, push de
  la rama temporal al remoto (sección 12) y la regla de oro de nunca tocar `main`.
- Con el interruptor APAGADO, al terminar una tarea el agente: valida (lint, type-check, build,
  tests aplicables), deja la rama `feat/*`/`fix/*` pusheada al remoto y reporta al humano que la
  tarea está lista para integrar, recordándole que puede decir `inicia workflow`. NO abre PR, NO
  mergea a `development`, NO pregunta por producción y NO limpia la rama/worktree (aún no está
  integrada).
- Al recibir `inicia workflow`, el agente corre el recorrido completo: PR `feat/*` →
  `development` → CI verde → squash merge → verificar `origin/development` → limpieza automática →
  pregunta de promoción (sección 3.1) con su protocolo SÍ/NO.
- Si hay varias ramas `feat/*`/`fix/*` pendientes de integrar cuando llega la orden, el agente lista
  cuáles hay y confirma con el humano cuáles integrar antes de abrir PRs. Si tocan los mismos
  archivos, integra primero la más pequeña (sección 8).

## 5. Trabajar siempre con git worktree

Usa `git worktree` para aislar cada tarea y no contaminar el directorio principal ni
`development`/`main`. Crea el worktree en un directorio **hermano fuera del repositorio**, para que no
quede trackeado.

```bash
git checkout development && git pull
git worktree add ../<repo>-feat-nombre -b feat/nombre-corto development
```

### El checkout es implícito: se trabaja DENTRO del worktree

- `git worktree add ../<dir> -b <rama>` crea el directorio Y hace el checkout de la rama nueva
  dentro de él, en un solo paso. No existe (ni debe existir) un `git checkout` posterior: la rama
  nace checked-out en el directorio nuevo. "Entrar" al worktree es solo `cd` (o usar rutas dentro de
  él); no es una operación de Git.
- Con worktrees, el checkout es un estado POR DIRECTORIO: el repo principal queda clavado en
  `development` a propósito (vista estable, trabajo en paralelo sin pisarse) y cada tarea vive
  checked-out en su carpeta hermana. `git worktree list` muestra qué rama tiene cada directorio.
- Guardia obligatorio antes del primer edit: `pwd && git branch --show-current` deben mostrar el
  directorio del worktree y la rama de la tarea. El error #1 con worktrees es editar en el
  directorio principal creyendo estar en la rama.
- Candados de Git a favor: una rama checked-out en un worktree no puede hacerse checkout en otro
  directorio (`already checked out`), y `git branch -d` falla mientras su worktree exista — por eso
  la limpieza borra primero el worktree y después la rama.
- Lo gitignored NO viaja al worktree: cada worktree necesita instalar sus propias dependencias
  (p. ej. `npm ci`) antes de validar, y los `.env*` se copian a mano si la tarea los necesita. Los
  worktrees comparten `.git` (historia, objetos, remotos), no los artefactos ignorados.
- El IDE que tiene abierta la carpeta principal NO muestra el worktree: para trabajar manualmente en
  él, abrir la carpeta hermana como proyecto (una ventana por worktree). Los agentes no lo
  necesitan: operan con rutas dentro del worktree.
- Dentro del worktree, todo comando git opera automáticamente sobre la rama de la tarea; nunca se
  cambia de rama allí.

## 6. Flujo obligatorio de una tarea

Siempre, con o sin interruptor:

1. Parte de `development` actualizado (`git checkout development && git pull`).
2. Crea un worktree con una rama `feat/*` o `fix/*` (queda checked-out en el worktree desde su
   creación).
3. Verifica el guardia dentro del worktree antes del primer edit: `pwd && git branch --show-current`.
4. Trabaja y commitea dentro de ese worktree (commits pequeños y claros).
5. Actualiza tu rama desde `development` (`git fetch origin` + `git rebase origin/development`; si
   la rama ya fue compartida con otro agente, usa merge en vez de rebase) para evitar conflictos.
6. Valida en el worktree: lint, type-check, build y tests, y `git status` limpio.
7. Empuja la rama temporal a origin (respaldo obligatorio).
8. Con el interruptor APAGADO (estado por defecto): reporta al responsable humano que la rama está
   lista para integrar y espera su orden `inicia workflow`. La tarea queda pusheada, sin PR, sin
   merge y sin limpieza.

Solo cuando el responsable humano dice `inicia workflow`:

9. Abre el PR `feat/*` o `fix/*` → `development`.
10. Espera el check de CI en verde; confirma rama actualizada contra `development` y sin conflictos.
11. **Merge automático a `development`** (sin aprobación humana) cuando pasa el gate (sección 7).
12. Verifica que `origin/development` contiene el merge.
13. **Limpieza automática** del worktree y la rama recién integrada, local y remota (sección 11).
14. Pregunta de promoción a producción (sección 3.1): `¿Promuevo development a main ahora?`
15. Con NO: no abras PR hacia `main` y cierra la tarea. Con SÍ: PR `development → main`, CI/checks,
    merge commit, verificar `origin/main`, resincronizar `development`, registrar la promoción y
    cerrar la tarea.

## 7. Integración a `development` (con gate de calidad)

Dentro del recorrido de `inicia workflow`, el agente integra a `development` **sin pedir aprobación
adicional**, mediante PR `feat/* → development`. El merge lo hace el propio agente **solo si se
cumple todo el gate**:

1. **Validación local** en verde: lint, type-check, build y test.
2. **Check de CI en verde** sobre el PR.
3. Rama **rebasada sobre `development`** y **sin conflictos**.
4. `git status` limpio (sin cambios sin commitear ni stashes).

Si algo falla, no se mergea: se corrige en la rama de trabajo y se reintenta. Resuelve conflictos en
tu rama, nunca en `development`. `development` se mantiene siempre funcional.

**Estilo de merge:**

- PR `feat/*`/`fix/*` → `development`: **squash merge** (un commit limpio por tarea; el título del PR
  queda como mensaje del commit).
- PR `development → main`: **merge commit** (conserva trazabilidad de cada publicación).
- Prohibido `force-push` a ramas compartidas y prohibido usar `--admin` o cualquier bypass de las
  protecciones de rama.
- Si `gh pr merge` (o el merge por API) falla — por ejemplo por una limitación local de worktrees —
  **no repitas el merge a ciegas**: primero verifica el estado remoto del PR (puede haber quedado
  MERGED aunque el comando reportara error).

## 8. Trabajo en paralelo (varios agentes)

- No tomes una tarea ya tomada por otro agente. Revisa el estado antes de empezar.
- Si dos ramas tocan los mismos archivos, integra primero la más pequeña; la otra rebasa sobre
  `development` y resuelve el conflicto.
- No reviertas ni borres trabajo de otro agente sin autorización explícita.
- Cada agente borra **solo** su propio worktree/rama; nunca los de otra tarea o agente.

## 9. Sincronización `main → development`

Después de cada publicación en `main`, sincroniza `development` con `main` para evitar divergencia.
Esto **lee `main` hacia `development`** (no modifica `main`), así que el agente puede hacerlo sin
pedir permiso; **nunca en sentido inverso**.

```bash
git checkout development && git merge main && git push origin development
```

## 10. Hotfix de producción

- Ante un bug crítico en `main`, crea `fix/nombre-corto` desde `main` (crear la rama no modifica
  `main`). Corrige y valida en el worktree.
- La promoción del hotfix a `main` sigue el **protocolo de la sección 3.1** (pregunta por instancia).
- Después, sincroniza `development` con `main` (sección 9).

## 11. Limpieza automática de worktrees y ramas

Objetivo: que solo existan `main`, `development` y las ramas temporales activas o en espera de
integración.

- Tras un merge exitoso a `development` **verificado en `origin/development`**, el agente **elimina
  automáticamente** el worktree y la rama `feat/*`/`fix/*` recién integrada (local y remota), sin
  pedir aprobación. La limpieza ocurre **ANTES** de la pregunta de promoción (sección 3.1): la rama
  temporal ya cumplió su función y no se necesita para el PR `development → main`.
- La limpieza automática aplica **solo a ramas ya integradas** dentro del recorrido de
  `inicia workflow`. Las ramas pusheadas que esperan la orden del humano NO se limpian y no cuentan
  como colgadas: están en espera legítima.
- Borra **solo** la rama/worktree de la tarea recién integrada; nunca toca las de otras tareas.
- Condición de seguridad antes de borrar: merge en `origin/development` verificado, CI/validación en
  verde, `git status` limpio y sin stashes.
- Si un worktree lleva más de 7 días sin actividad, avisa al humano: si su trabajo ya está en
  `development`, propón limpieza; si está en espera de integración, propón decir `inicia workflow` o
  descartar la rama.

```bash
git worktree remove ../<repo>-feat-nombre
git branch -d feat/nombre-corto
git push origin --delete feat/nombre-corto
git worktree prune
```

Nota operativa del squash: como el merge a `development` es squash, Git puede rechazar
`git branch -d` porque la rama temporal no queda como ancestro directo. Antes de usar
`git branch -D`, verifica que el PR está MERGED, que CI pasó y que `origin/development` contiene el
merge; y elimina también la rama remota.

## 12. Persistencia en el remoto (nada solo en la máquina local)

El remoto (GitHub o equivalente) es el único medio de distribución y respaldo entre máquinas y
agentes. Nada del proyecto puede quedar guardado únicamente en la máquina local.

- Al terminar cualquier tarea o sesión: commit + push de la rama de trabajo al remoto. Un commit
  local sin push se considera trabajo NO guardado.
- Prohibido dejar archivos del proyecto sueltos fuera del repositorio (escritorio, descargas,
  carpetas temporales, notas locales). Si un archivo pertenece al proyecto, vive dentro del repo y
  se versiona; si es temporal de verdad, se elimina antes de cerrar la sesión.
- Prohibido depender de stashes (`git stash`) o de cambios sin commitear como forma de "guardar para
  después": los stashes no viajan al remoto.
- Las ramas `feat/*`/`fix/*` en curso también se pushean aunque la tarea no esté terminada (respaldo
  y visibilidad del equipo).
- Excepciones ÚNICAS que sí son locales y NO se suben: secretos y credenciales (`.env*`, tokens,
  llaves — se comparten por canal seguro, jamás por el repo), artefactos regenerables
  (`node_modules/`, builds) y archivos propios de la máquina o del IDE, todos cubiertos por
  `.gitignore`.
- Verificación antes de cerrar sesión: `git status` limpio, `git stash list` vacío y
  `git log origin/<rama>..<rama>` sin commits pendientes de push.

## 13. Autorización permanente vs. pregunta por instancia (resumen)

- **Automático siempre, sin preguntar:** crear rama `feat/*`/`fix/*`, trabajar en worktree,
  commitear y empujar la rama temporal al remoto.
- **Automático solo dentro del recorrido disparado por `inicia workflow`:** abrir PR
  `feat → development`, mergear a `development` (con gate) y limpiar el worktree/rama integrada.
- **Pregunta obligatoria cada vez:** cualquier merge o PR hacia `main` (sección 3.1).
- Esto **sobrescribe los defaults del asistente**: los PR de agentes van a `development`, no a
  `main`; y dentro del recorrido el agente no pide confirmación por cada PR, merge o limpieza.

## 14. Commit inmediato y orden de trabajo (evitar perder ediciones)

- El worktree se crea **ANTES** de editar el primer archivo de la tarea. Ningún agente edita
  archivos del repositorio en el directorio principal si la tarea ya califica para worktree
  (sección 5); primero el worktree, después el primer edit.
- Cada archivo creado o editado se **commitea tan pronto queda en un estado coherente**, no se
  espera a terminar toda la tarea. Un cambio sin commit es frágil: cualquier `checkout`, `reset` o
  nueva sesión/agente que parta de `development` puede perderlo sin aviso, porque no hay commit que
  lo respalde.
- Antes de partir de `development` o de cambiar de rama en el directorio principal, corre
  `git status`; si hay cambios sin commitear que no son de la tarea actual, detente y pregunta antes
  de descartarlos.
- Si crees haber creado o editado un archivo pero no lo encuentras donde esperabas, el primer paso
  es `git log --oneline -- <archivo>` y `git worktree list` — nunca asumir que el trabajo se perdió
  sin antes revisar si quedó commiteado en otra rama o worktree.

## 15. Verificación rápida (al cerrar cada tarea)

```bash
git branch --show-current   # confirmar que no estás en main
git status                  # limpio
git worktree list           # estado de worktrees
git branch -a               # ramas locales y remotas
```

## 16. Operaciones rutinarias: gh CLI directo, sin re-razonar el flujo

- Para operaciones rutinarias de git/GitHub (crear PR, mergear, ver checks, listar issues/PRs, ver
  estado de ramas y equivalentes), el agente ejecuta `gh`/`git` directo por la terminal. No regenera
  explicaciones, planes ni justificaciones del flujo en cada paso mecánico: el flujo ya está
  documentado en estas reglas y repetirlo consume tokens de salida sin aportar nada.
- El texto hacia el responsable humano se limita a reportar el resultado (qué se hizo, qué quedó
  verificado) y las novedades o excepciones que requieran su decisión.
- Esta regla regula el CÓMO ejecutar, no el QUÉ está autorizado: el interruptor `inicia workflow`,
  los gates de calidad y la pregunta de promoción a `main` siguen intactos.

## 17. Catálogo genérico de operaciones rutinarias por CLI

Operaciones mecánicas que un comando resuelve en cualquier proyecto. El agente las ejecuta directo y
reporta solo resultado (pass/fail + errores) y excepciones; no narra ni re-justifica los pasos.

| Operación | Comando |
|---|---|
| Gate de calidad completo | `npm run validate` — script único que encadena lint, type-check, build y test (`"validate": "npm run lint && npm run type-check && npm run build && npm test"`; crearlo en el proyecto destino si no existe) |
| Verificación rápida al cerrar tarea | `git branch --show-current && git status --short && git worktree list && git branch -a` |
| Cierre de sesión (persistencia) | `git status --short; git stash list; git log origin/$(git branch --show-current)..HEAD --oneline` — salida vacía = todo respaldado |
| Estado de PRs y checks | `gh pr list`, `gh pr checks <n>`, `gh pr view <n> --json state,mergeStateStatus` |
| Consultar branch protection | `gh api repos/<owner>/<repo>/branches/main/protection` |
| Verificar DNS al migrar dominio | `dig <dominio> A +short` y `dig www.<dominio> CNAME +short` contra los valores esperados del hosting |
| Verificar URL pública / SSL / redirect | `curl -sI https://<dominio> \| head -5` (status, location, content-type) |
| Smoke test HTTP de N URLs | loop `curl -s -o /dev/null -w "%{http_code} %{url_effective}\n"` sobre la lista de URLs del proyecto |

Reglas del catálogo:

- Cada proyecto agrega a este catálogo sus rutinas específicas (CLI del CMS, CLI del hosting,
  scripts propios de auditoría/QA) como filas operación → comando, para que los agentes las
  ejecuten sin re-razonar el flujo.
- Si una rutina requiere más de ~3 comandos o lógica condicional, se convierte en script versionado
  en el repo (por ejemplo `scripts/<rutina>.mjs`) y el catálogo referencia el script: escribirlo es
  trabajo de una vez; correrlo es rutina.
- Quedan FUERA del catálogo (requieren razonamiento o decisión): ediciones editoriales de
  planes/documentos, decisiones del responsable humano (promoción a `main`, prioridades, copy) y QA
  manual/visual.

## 18. Eliminación manual de archivos (fuera de git) en rutas no-código

- **Rutas no-código por defecto**: `_Nuevas_Caracteristicas/`, cualquier carpeta `docs/`, y archivos
  `*.md` sueltos en la raíz del repo. Cada proyecto puede ampliar esta lista agregando filas al
  catálogo de la sección 17.
- **Detección obligatoria al inicio de cada tarea**: antes de crear un worktree nuevo, el agente
  corre `git status --short` en el repo principal. Si aparece una línea ` D <ruta>` (eliminación no
  stageada) fuera de la tarea actual:
  - Si la ruta cae dentro de las rutas no-código: el agente reporta en una línea qué archivo(s) se
    detectaron borrados y pregunta confirmación breve antes de commitear (ej.: "Detecté N archivos
    de `_Nuevas_Caracteristicas/` borrados manualmente. ¿Confirmo el commit a `development`?").
  - Si la ruta es código de la app: el agente NO commitea directo; reporta el hallazgo y sigue el
    flujo normal (worktree + `fix/*` + PR) como cualquier otro cambio.
- **Flujo ágil para rutas no-código (confirmado)**: sin worktree, sin rama temporal, sin PR. El
  agente hace `git add -u <rutas>` (o los paths específicos), commit directo sobre `development`
  actualizado, y `git push origin development`. Se salta el interruptor `inicia workflow` porque no
  hay riesgo de build/producción — es puro registro de un borrado ya ejecutado por el humano.
- **Excepción explícita a la regla de oro (sección 3)**: esta ruta ágil sigue prohibiendo tocar
  `main` directamente; el commit va solo a `development`.
- **Registro**: el mensaje de commit debe listar los archivos eliminados y motivo si se conoce (ej.
  "docs: eliminar instrucciones-para-codex-revision-fases-1-5.md (obsoleto)").
- **Dependencia del bypass de protección de rama**: si `development` tiene protección (requiere PR
  y/o check `ci`), el push directo de este flujo ágil solo funciona porque la cuenta que ejecuta
  tiene permiso de *bypass* (GitHub reporta `Bypassed rule violations`). Es esperado y aceptado
  únicamente para borrados en rutas no-código. Si en el proyecto destino la cuenta NO tiene bypass,
  o se decide no depender de él, este flujo cae de vuelta al de rama corta `fix/*` + PR a
  `development` (sin worktree). Esta excepción NO aplica jamás a `main` (sección 3).
