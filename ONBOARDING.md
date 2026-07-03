# Onboarding — template next-taildwind-sanity-aws-amplify

## Responsable del proyecto

Edwin Fernando García — cualquier decisión de promoción a producción o cambio a las reglas de Git
la aprueba él (o el responsable del proyecto que nazca de este template).

## Este repo es una plantilla

Cualquier proyecto creado a partir de este template hereda `AGENTS.md` con las reglas de Git ya
definidas. Si personalizas un proyecto nuevo desde aquí, revisa si quieres reemplazar "el
responsable humano" por un nombre concreto en `AGENTS.md`.

## Reglas de Git (obligatorias para cualquier agente o colaborador)

Las reglas completas viven en `AGENTS.md` (raíz del repo). Resumen para empezar rápido:

- Dos ramas permanentes: `main` (producción) y `development` (integración diaria). Todo lo demás es
  temporal (`feat/*`, `fix/*`).
- Nunca se edita ni se hace push directo a `main`. La promoción `development → main` siempre pasa
  por una pregunta explícita al responsable humano.
- El trabajo de cada tarea se hace en un `git worktree` aislado, en una rama `feat/*` o `fix/*`.
- El workflow de integración (abrir PR, mergear a `development`, limpiar) **no arranca solo**: lo
  enciende el responsable humano con la frase exacta `inicia workflow`. Sin esa frase, la rama queda
  lista y pusheada, esperando orden.

Si Claude Code (u otro agente) detecta algo que no encaja con estas reglas, debe detenerse y
preguntar antes de continuar — no improvisar sobre Git.

## Qué hacer si eres nuevo en el repo

1. Lee `AGENTS.md` completo antes de tocar código.
2. Clona el repo y verifica que tu remoto sea `origin` (`git remote -v`).
3. Nunca trabajes directo sobre `main` o `development`: crea siempre un worktree con tu rama de
   tarea (sección 5 de `AGENTS.md`).
4. Ante cualquier duda sobre si algo requiere aprobación del responsable humano, pregunta antes de
   actuar.
