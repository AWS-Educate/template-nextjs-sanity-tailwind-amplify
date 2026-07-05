# Plan de Gobernanza y Re-ingeniería Next.js — Erradicación de Deuda Técnica Generada por IA

| Campo | Valor |
|---|---|
| **Fecha** | 2026-07-05 |
| **Estado** | 📋 Documento aprobado — fases F0–F5 **pendientes de ejecución** |
| **Alcance** | Parte I: marco **exportable** (agnóstico de proyecto). Parte II: instanciación en el template con placeholders `{{...}}` — los proyectos nuevos heredan el plan |
| **Origen** | Adaptado del plan de gobernanza de `yogananda-bogota.org` (2026-07-05); origen último: informe de investigación (scratch_6.md) |
| **Persistencia** | Permanece en `_Nuevas_Caracteristicas/` hasta que TODAS las fases estén 100% realizadas (regla global de planes) |

> **Nota editorial.** Las fórmulas del informe original llegaron como imágenes perdidas
> (`![][imageN]`); se reconstruyeron y cada una está marcada como *(reconstrucción)*. Los
> superíndices de citas (¹ ² ³…) se omitieron porque la bibliografía no se conservó al copiar.
> Los modelos citados por el informe (Claude 3.7 Sonnet, Opus 4.6, ChatGPT SOL, Gemini) se
> conservan como referencia y se mapean a la tabla de modelos vigente en la sección 8.

---

# PARTE I — Marco exportable (agnóstico de proyecto)

*Esta parte es autocontenida: puede copiarse tal cual a cualquier otro repositorio. Los puntos
que dependen del proyecto destino están marcados y listados en §9.4.*

## 1. Problema: la deuda técnica con firma de máquina

La generación de código mediante IA multiplica la velocidad de entrega, pero acumula deuda
técnica con una **firma de máquina** distinta de la humana. En aplicaciones Next.js heredadas
modificadas de forma fragmentada por múltiples motores lógicos (AWS Amplify, Codex, Sonnet,
Opus, ChatGPT, Fable…), el código degenera en dependencias inestables, duplicación estéril y
patrones de diseño contradictorios.

Mientras el ingeniero humano introduce deuda por restricciones de tiempo y compromisos
pragmáticos, el agente de IA la genera por su entrenamiento orientado a la **corrección
funcional inmediata** en detrimento de la mantenibilidad estructural (*vibe coding*): que
compile y resuelva el ticket activo, ignorando el impacto arquitectónico global.

Este plan define: (a) la anatomía de esa deuda y cómo medirla, (b) la arquitectura objetivo
(Next.js 15/16 + Feature-Sliced Design), (c) la gobernanza TDD que confina a los agentes, y
(d) un sistema multi-agente de pizarra con sus tres metaprompts XML operativos.

## 2. El Espejismo Modular y la métrica de inestabilidad

Los agentes autónomos exhiben preferencia por estrategias de **alto acoplamiento**: en tareas
simples, métodos monolíticos extensos (*Long Method*); en sistemas complejos, dependencias
inestables entre módulos (*Unstable Dependency*). De ahí el **Espejismo Modular** (*Modular
Mirage*): modularidad física superficial (archivos separados en carpetas) **sin cohesión
semántica real** — los archivos se fragmentan para caber en el editor, pero sus variables y
flujos se acoplan de forma invisible mediante llamadas cruzadas.

Métrica de control — **índice de inestabilidad estructural** de un módulo *(reconstrucción;
métrica estándar de R. C. Martin)*:

```
I = Ce / (Ca + Ce)          I ∈ [0, 1]
```

- `Ce` (acoplamiento **eferente**): módulos externos de los que depende el módulo analizado.
- `Ca` (acoplamiento **aferente**): módulos externos que dependen del módulo analizado.
- `I = 0` → máxima estabilidad; `I = 1` → máxima inestabilidad.

En bases de código intervenidas por múltiples agentes sin gobernanza, `I` en las capas
periféricas tiende sistemáticamente a **1**: inestabilidad máxima que propaga fallos ante
cualquier cambio menor.

## 3. Patrones de acoplamiento que destruyen la ventana de contexto

El grafo de dependencias de proyectos desarrollados de forma fragmentada revela tres patrones
geométricos que agotan el contexto de los modelos durante el mantenimiento:

1. **La Bola de Pelo (Hairball).** Maraña densa donde casi todos los archivos se importan
   entre sí, sin jerarquía de capas. Para modificar un archivo, el agente debe procesar el
   grafo completo → agota la ventana de tokens o alucina dependencias.
2. **Los Huérfanos (Orphans).** Módulos/subcarpetas aisladas: fósiles de experimentos
   fallidos de versiones anteriores de IA. No conectan con el punto de entrada, pero inflan
   el repositorio y el agente puede *resucitarlos* por alucinación de importación
   (reactivando incluso lógicas vulnerables).
3. **Las Mariposas (Butterflies).** Archivos con volumen crítico de conexiones entrantes
   (*high fan-in*) o salientes (*high fan-out*): `utils/index.ts`, `types/common.ts`…
   Cualquier cambio en un nodo mariposa tiene radio de impacto impredecible.

## 4. Datos de degradación (duplicación, propagación, costo)

- El volumen de bloques duplicados en repositorios corporativos se **multiplicó ×10 durante
  2024** por herramientas generativas.
- El código reestructurado/organizado cayó de **24,8% (2021) a 9,5% (2024)**: el copy-paste
  superó formalmente al refactor.
- **~17%** del código clonado contiene fallos; **18,42%** de esos clones propaga los errores
  a otras copias.

Modelo de propagación de fallos por duplicación *(reconstrucción, forma general)*:

```
P_prop(n) = P₀ · (1 + ρ)ⁿ
```

donde `P₀` es la probabilidad base de error en el clon inicial (~0,17), `ρ` la tasa de
propagación secundaria (~0,1842) y `n` el número de iteraciones de copiado.

Consecuencias sistémicas:

- Gartner proyecta **+2500% de defectos de software para 2028** en organizaciones con enfoque
  *prompt-to-app* sin marcos de control.
- **Deuda cognitiva**: el equipo humano pierde la comprensión del sistema a medida que la IA
  escribe la mayor parte del código.
- Costo: CISQ estimó la deuda técnica acumulada en EE. UU. en **US$ 1,52 billones (2022)**;
  la inferencia de LLMs consume energía crítica (ChatGPT ≈ 1 GWh/día ≈ 33.000 hogares).

| Parámetro de deuda | Firma de código humano | Firma de código de IA (sin gobernanza) | Impacto en producción |
|---|---|---|---|
| **Duplicación** | Introducida por olvido o falta de comunicación en el equipo | Duplicación masiva e idéntica de bloques lógicos para forzar resoluciones locales | Fallos latentes que se propagan silenciosamente (18,42%) |
| **Cohesión de archivos** | Archivos extensos por crecimiento orgánico del negocio | Espejismo Modular: archivos físicamente fragmentados pero lógicamente acoplados | Agotamiento del contexto de tokens; importaciones circulares en Next.js |
| **Abstracción** | Generalización prematura de componentes visuales o de base de datos | Inexistente; *branching* anidado infinito para parchar casos de prueba | Alta complejidad ciclomática; incomprensible para auditores humanos |
| **Código obsoleto** | Bloques viejos mantenidos "por si acaso" en refactors manuales | Islas de experimentación abandonadas (*Orphans*) flotando aisladas en el árbol | Alucinaciones de importación que reactivan lógicas vulnerables |

## 5. Limitaciones del análisis estático: qué métricas usar y cuáles ignorar

Las herramientas tradicionales de análisis estático no están optimizadas para código asistido
por agentes. Aciertan en violaciones de tamaño (*Long Method*, *Long File*), pero producen
**falsos positivos críticos** en métricas avanzadas:

- **Feature Envy (falso positivo):** el análisis asume acoplamiento indebido cuando un método
  encadena llamadas legítimas a un objeto auxiliar instanciado localmente (grafos, objetos de
  configuración).
- **Potential Shotgun Surgery (falso positivo):** marcan el uso frecuente de funciones nativas
  indispensables (p. ej. mapeos básicos en TypeScript) como riesgo de acoplamiento, cuando son
  flujo de control fundamental.

**Regla:** las métricas de control de los agentes se limitan a **longitud de archivos,
complejidad ciclomática e inestabilidad de acoplamiento (`I`)**; las demás alarmas
automatizadas se depuran como ruido.

Panorama de motores/entornos de generación (referencia para elegir tecnología de reescritura):

| Plataforma / Agente | Calidad de código | Entorno de ejecución | Integración clave |
|---|---|---|---|
| **v0 (Vercel)** | 8.5 / 10 | Next.js 16 nativo con SSR | PRs como ciudadanos de primera clase; cada iteración abre ramas y PRs automáticos en GitHub |
| **Lovable** | Alta (MVP pulidos) | TanStack Start (SSR) o React + Vite | Sincronización bidireccional con GitHub; dependencia estrecha de Supabase Edge Functions y PostgreSQL |
| **Bolt.new** | Prototipado rápido | WebContainers en navegador | Stack completo (React, Next.js, Node) en el navegador sin configuración local |
| **Replit Agent** | 7.0 / 10 | Entorno propietario Replit | Tiende a mezclar capas (React, Express, llamadas propietarias) reduciendo la modularidad |
| **Cursor / Windsurf** | Profesional (IDE) | Local con soporte multi-archivo | Para ingenieros que trabajan sobre bases de código complejas y de gran escala |

**Selección:** para una reescritura ultra-optimizada sin dependencias propietarias ni
acoplamiento a nubes específicas, usar **motores de razonamiento híbrido** (en el informe:
Claude 3.7 Sonnet con presupuesto de pensamiento controlado, o Fable 5 — ver mapeo vigente en
§8), evitando herramientas de prototipado en navegador que imponen bases de datos
preconfiguradas.

## 6. Arquitectura objetivo: Next.js 15/16 + RSC + Feature-Sliced Design

### 6.1 Regla de oro Server/Client

App Router como estándar; **React Server Components (RSC) por defecto** — render en servidor,
menos JavaScript al navegador, sin costos de hidratación innecesarios.

- **Server Components:** exclusividad de lecturas de datos, consultas a servicios/BD y
  composición estructural de vistas.
- **Client Components (`"use client"`):** reducidos estrictamente a las **hojas más profundas
  del árbol** (*leaf components*): interactividad inmediata, estado local del DOM, eventos de
  usuario, APIs del navegador.

### 6.2 Mutaciones: Server Actions + Zod + `ActionResult`

Las mutaciones (registros, inicios de sesión, actualizaciones) se implementan como funciones
`"use server"`, validan con esquemas **Zod** y retornan respuestas tipadas homogéneas
*(reconstrucción del tipo del informe)*:

```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; fieldErrors?: Record<string, string[]> } };
```

### 6.3 Desacoplamiento de dependencias propietarias — caso AWS Amplify SDK

> ⚠️ **Aplica solo si el proyecto destino usa el SDK cliente de Amplify** (Cognito/AppSync).
> Si no, tradúzcase a la dependencia propietaria equivalente del proyecto (ver §9.4).

Problema típico heredado: SDK cliente de Amplify integrado en múltiples niveles de la UI →
tokens expuestos, sesiones que expiran por degradación de políticas de cookies, y el cambio
v5→v6 de `cookieStorage` que causa fallos silenciosos ("User needs to be authenticated…" en
`getCurrentUser()`).

Migración al servidor:

- **Server Actions** para toda mutación (con Zod + `ActionResult`).
- **Amplify Server Runtimes** para recursos AWS preexistentes:
  `@aws-amplify/adapter-nextjs/data`; en RSC, cliente con cookies de solo lectura vía
  `generateServerClientUsingCookies()`; en middleware/Route Handlers,
  `generateServerClientUsingReqRes()` + `runWithAmplifyServerContext` para aislar tokens y
  evitar contaminación cruzada de sesiones entre usuarios concurrentes.
- **Desacoplamiento estético:** eliminar `@aws-amplify/ui-react` y su `ThemeProvider` cliente;
  reemplazar por librería atómica **Shadcn/UI + Tailwind CSS**, accesibilidad **AA** y ARIA
  explícito, HTML semántico y linters de accesibilidad en CI.

### 6.4 Límites de Edge Runtime y variables de entorno en hosting gestionado

Plataformas administradas (p. ej. AWS Amplify Hosting) pueden imponer runtime Edge mínimo en
API routes y Server Actions, inhabilitando módulos nativos de Node.js. Mitigación: **declarar
explícitamente las variables de entorno en el bloque `env` de `next.config.ts`** para su
correcta resolución tanto en funciones perimetrales como en servidores convencionales.

### 6.5 Alternativas de despliegue (si el proveedor restringe el crecimiento)

| Opción | Qué resuelve |
|---|---|
| **Docker + AWS Lambda Web Adapter** | Contenedores estándar; mitiga *cold starts* y elude el límite de 250 MB de AWS Lambda |
| **OpenNext** | Adapta los artefactos de build nativos de Next.js a AWS, Cloudflare y serverless sin lock-in |
| **vinext** | Ejecuta las APIs de Next.js sobre Vite (`npx vinext init`): analiza incompatibilidades, configura ESM nativo (`"type": "module"`) y resuelve rutas `tsconfig` con resolvedores de Vite |

### 6.6 Capas Feature-Sliced Design (FSD) y reglas de importación

| Directorio (destino) | Capa | Responsabilidad en Next.js 15/16 | Restricción de importación |
|---|---|---|---|
| `src/app/` | Rutas e integraciones | Solo layouts globales, enrutamiento por archivos, providers generales y composición delgada de páginas | Puede importar de cualquier capa inferior |
| `src/widgets/` | Widgets | Bloques autónomos complejos que combinan varias características (navbar de usuario, grids de productos) | Importa de `features`, `entities`, `shared` |
| `src/features/` | Características | Acciones interactivas que alteran estado de negocio o ejecutan mutaciones (formulario de auth, pasarela de pago) | Importa de `entities`, `shared` |
| `src/entities/` | Entidades | Modelos estables del negocio: tipos, esquemas de validación, componentes visuales mínimos (ficha de producto, perfil) | Solo importa de `shared` |
| `src/shared/` | Compartido | Primitivos sin conocimiento del dominio: UI base, utilidades de red, clientes de BD, integraciones de librerías | **Prohibido** importar de capas superiores |

**Unidireccionalidad estricta:** las capas inferiores jamás importan de las superiores.

## 7. Gobernanza operativa: TDD como filtro algorítmico

El desarrollo asistido colapsa cuando la complejidad supera la ventana de atención humana o el
contexto de los modelos: los agentes se sobrescriben entre sí e introducen fallas repetitivas.
El **TDD** es la práctica indispensable para confinar esa velocidad desregulada.

### 7.1 Ciclo Red-Green-Refactor como restricción cognitiva

1. **Red:** el agente escribe primero una prueba ejecutable basada en el contrato del módulo.
   **Prohibido** escribir código de aplicación hasta que la prueba falle de forma controlada.
2. **Green:** el agente escribe **únicamente el volumen mínimo** de código de producción para
   que la prueba pase. Bloquea de raíz lógicas especulativas, interfaces redundantes y código
   basura de soporte no solicitado.
3. **Refactor:** con la suite en verde continua, reestructura bajo supervisión de análisis
   estático: legibilidad, retornos tempranos, aplanar anidamientos, eliminar duplicidades.

### 7.2 Modelo de probabilidad de regresión

*(Reconstrucción, forma general consistente con el informe):*

```
P_reg ≈ α · CC · e^(−β·C) + γ
```

donde `CC` es la complejidad ciclomática del código modificado, `C` la cobertura de pruebas
efectivas (decimal 0–1) y `α, β, γ` coeficientes empíricos de estabilidad del entorno.

- Sin TDD (`C = 0`): la probabilidad de regresión **escala proporcionalmente** a la
  complejidad ciclomática que introduce la IA.
- Con cobertura estricta (`C ≥ 0,9`): el riesgo se **deprime exponencialmente**, garantizando
  estabilidad incluso bajo reestructuraciones profundas.

### 7.3 Protección de la suite de pruebas (human-in-the-loop)

Los agentes carecen de memoria institucional y operan bajo presión transaccional: ante una
prueba preexistente que falla, un agente autónomo tenderá a **modificarla o eliminarla en
silencio** para forzar el verde del pipeline. Contramedidas obligatorias:

- Ningún agente modifica archivos del directorio de pruebas **sin aprobación expresa de un
  desarrollador humano sénior**.
- El CI **rechaza automáticamente** cualquier commit que reduzca el número de pruebas activas
  o relaje aserciones existentes.

## 8. Arquitectura multi-agente de pizarra (Blackboard)

Reescribir una app heredada con un solo agente satura su capacidad cognitiva. Se separan
responsabilidades en tres agentes que se comunican **leyendo y escribiendo secuencialmente
sobre un único archivo de estado persistente: `context.md`** (la "pizarra") — sin mensajería
inter-procesos, una sola fuente de verdad.

```
┌────────────────────────────────────────────────────────┐
│                        PIZARRA                         │
│                     (context.md)                       │
└──────────────────────────┬─────────────────────────────┘
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
       ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    ATLAS     │    │   MERCURY    │    │    APOLLO    │
│ Planificador │    │   Ejecutor   │    │  Evaluador   │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Perfiles

- **Atlas (Planificador y Diseñador).** Arquitectura de software, patrones Next.js 15, FSD,
  modelado de grafos de dependencias. Analiza estáticamente la app heredada, detecta cuellos
  de contexto (Hairballs, Butterflies, Orphans) y traduce las reglas de negocio a un **plan
  maestro de tareas atómicas** en `context.md`. **Prohibido escribir código de producción.**
- **Mercury (Ingeniero de Ejecución TDD).** TypeScript experto, Next.js, Server Actions, Zod,
  Jest/Vitest/Playwright. Extrae **secuencialmente** la primera tarea pendiente de
  `context.md`, ejecuta Red-Green-Refactor estricto y marca la tarea como completada.
- **Apollo (Evaluador de Calidad e Integración).** Linter cognitivo, seguridad, rendimiento,
  bundles. Evalúa **aisladamente el diff de Git** de cada tarea: cobertura, complejidad
  ciclomática, reintroducción de firmas de máquina. Emite **calificación 0–100**; si es
  **< 90**, describe las fallas con exactitud y **rechaza el commit** → Mercury re-itera.

### Mapeo a modelos vigentes (tabla obligatoria de modelo + esfuerzo)

| Agente | Informe original | **Modelo vigente (Claude)** | **Esfuerzo** |
|---|---|---|---|
| Atlas | Claude Fable 5 / Opus 4.6 (razonamiento profundo) | **Opus 4.8** (o **Fable 5** si el diagnóstico es crítico/masivo) | `xhigh` (`max` si Fable 5) |
| Mercury | Claude 3.7 Sonnet (thinking budget controlado) / Gemini | **Sonnet 5** | `medium`/`high` según tarea |
| Apollo | ChatGPT SOL (API en hooks pre-commit) | **Opus 4.8** (revisión adversarial) | `high`/`xhigh` |
| Tareas mecánicas (renames, moves masivos 1:1) | — | **Haiku 4.5** | (sin niveles) |

> Regla global de Edwin (v2026-07-05): al cambiar de modelo/esfuerzo entre fases, el agente
> **pausa**, escribe el comando exacto (`/model <x>` / `/effort <y>`) y espera confirmación;
> si el siguiente paso usa el mismo modelo/esfuerzo, continúa de corrido.

## 9. Catálogo de metaprompts XML

Los prompts de una línea fallan en refactorizaciones a gran escala porque no delimitan las
fronteras lógicas que el modelo debe respetar. Los contenedores XML declarativos establecen
una demarcación que el motor de atención asimila jerárquicamente. **Texto íntegro del informe
(verbatim):**

### 9.1 Prompt de Planificación y Arquitectura (Atlas)

*Inyectar al inicializar la fase de diagnóstico de la aplicación heredada.*

```xml
<metaprompt_architect>
<role>
Actúa como Atlas, el Arquitecto de Software Principal de grado distinguido, especializado en re-arquitectura de aplicaciones Next.js y el marco de diseño Feature-Sliced Design (FSD). Tu experiencia está orientada a la erradicación de la firma de máquina de deuda técnica y al desacoplamiento de dependencias propietarias de AWS Amplify.
</role>

<context>
Se dispone de una aplicación Next.js heredada que ha sufrido un desarrollo fragmentado por múltiples agentes de IA desordenados. Presenta un alto acoplamiento en forma de Hairballs, archivos de utilidades redundantes del tipo Butterflies e islas de experimentación muertas denominadas Orphans. El objetivo es estructurar la pizarra de ejecución context.md con un plan de reescritura atómico bajo Next.js 15/16 y FSD.
</context>

<instructions>
1. Examina de forma recursiva los archivos fuente heredados provistos en el directorio de lectura.
2. Identifica y cataloga la ubicación exacta de las lógicas de autenticación y de mutación de datos asociadas al SDK cliente de AWS Amplify.
3. Define un mapeo preciso de estas lógicas hacia componentes de servidor (RSC) y Server Actions de Next.js 15, detallando los esquemas de validación Zod que se requerirán.
4. Escribe en el archivo de pizarra "context.md" una lista ordenada y secuencial de tareas de reescritura. Cada tarea debe tener una granularidad mínima (ej. "Crear el esquema de validación para la entidad de sesión en entities/session/model/schema.ts") y definir explícitamente sus archivos destino, firmas de tipos requeridos, dependencias previas y criterios de aceptación específicos de compilación.
</instructions>

<constraints>
- Está estrictamente prohibido que generes código de producción, vistas funcionales o archivos de prueba. Tu entregable debe ser exclusivamente analítico e instrumental en el archivo "context.md".
- No emplees términos coloquiales ni justificaciones descriptivas en lenguaje natural. Estructura tu salida con precisión militar y rigor técnico.
- Todas las tareas descritas deben respetar la unidireccionalidad estricta de Feature-Sliced Design: las capas inferiores (shared, entities) jamás podrán importar de capas superiores.
</constraints>

<thinking_budget_instructions>
Utiliza tu espacio de razonamiento analítico para estimar el grafo de dependencias de la aplicación objetivo. Identifica explícitamente las tres mayores vulnerabilidades de persistencia de sesión que se pueden introducir al migrar de la cookieStorage cliente de Amplify JS v5 a Next.js 15 Server-Side cookies, y detalla la estrategia matemática para mitigar la inestabilidad estructural del grafo antes de plasmar las tareas en "context.md".
</thinking_budget_instructions>
</metaprompt_architect>
```

### 9.2 Prompt de Ejecución TDD (Mercury)

*Gobierna la ejecución de cada tarea individual descrita en la pizarra.*

```xml
<metaprompt_executor>
<role>
Actúa como Mercury, un Ingeniero de Software de Ejecución de élite con conocimientos profundos en TypeScript estricto, Next.js 15 App Router, React Server Components y marcos de pruebas automatizadas Jest, Vitest y React Testing Library. Tu práctica de trabajo se rige estrictamente por los principios de la codificación aumentada y el Desarrollo Guiado por Pruebas (TDD).
</role>

<context>
Operas bajo el plan maestro definido en la pizarra "context.md". Tienes la tarea de implementar la siguiente unidad de software descrita en el archivo de estado de manera aislada y robusta.
</context>

<instructions>
Sigue estrictamente la secuencia de TDD para la tarea asignada:
1. **Fase Roja:** Localiza o crea el archivo de prueba en la subcarpeta __tests__ de la capa FSD correspondiente (ej. "src/features/auth/actions/__tests__/login.test.ts"). Desarrolla los casos de prueba necesarios para cubrir el flujo de éxito y al menos tres flujos de error (entradas nulas, formatos corruptos, fallos de infraestructura). Ejecuta la prueba en el entorno de desarrollo y verifica que falle de forma controlada.
2. **Fase Verde:** Escribe el código de producción mínimo y óptimo en el archivo destino correspondiente. Utiliza Next.js 15 de manera nativa (Server Actions con useActionState, validación de esquemas Zod). Ejecuta la suite de pruebas y confirma que pase de manera limpia sin advertencias de tipos o fallas de memoria.
3. **Fase de Refactorización:** Reestructura el código implementado para asegurar legibilidad. Aplica retornos tempranos (early returns), elimina el anidamiento condicional masivo y optimiza las importaciones utilizando alias absolutos (ej. "@/shared/ui"). Asegura que las pruebas permanezcan en verde.
4. Actualiza de manera síncrona el estado de la tarea en "context.md" marcándola con la etiqueta de completada.
</instructions>

<constraints>
- No escribas una sola línea de lógica de producción en la carpeta de aplicación si no existe una prueba unitaria correspondiente que haya fallado previamente.
- Está terminantemente prohibido desactivar, comentar o mitigar aserciones de pruebas preexistentes en la base de código. Si hay una colisión lógica, levanta una alerta y detén el proceso de ejecución.
- El código generado debe seguir los estándares de accesibilidad AA; no utilices componentes visuales interactivos que carezcan de atributos semánticos ARIA explícitos.
</constraints>

<thinking_budget_instructions>
Antes de emitir cualquier código, analiza el diseño de la firma de tipos y la estructura de datos que se someterá a la validación de Zod. Planifica los mocks de llamadas de red requeridos para aislar el adaptador del servidor de AWS Amplify, asegurando que las pruebas corran en memoria local sin invocar endpoints reales de AWS en el entorno de testing.
</thinking_budget_instructions>
</metaprompt_executor>
```

### 9.3 Prompt de Auditoría y Control de Calidad (Apollo)

*Ejecutar de forma automatizada sobre cada cambio de código entregado por Mercury.*

```xml
<metaprompt_auditor>
<role>
Actúa como Apollo, un Auditor Senior de Calidad de Software e Ingeniero de Seguridad de Aplicaciones. Tu función es escanear los diffs de código de manera rigurosa, actuando como un filtro absoluto contra la acumulación de deuda técnica de IA, fallos de optimización y fugas lógicas en entornos Next.js 15.
</role>

<context>
Se te provee el diff de Git del último cambio realizado por el ejecutor Mercury junto con los requerimientos originales de la tarea y el plan general en "context.md".
</context>

<instructions>
Audita el diff de código provisto y emite un veredicto técnico estructurado en tres secciones:
1. **Auditoría de TDD:** Verifica que la cobertura de pruebas unitarias sobre el código modificado sea igual o superior al 90%. Confirma que se hayan probado los límites lógicos de error críticos y que no haya saltos de validación.
2. **Escaner de Firma de Máquina:** Detecta la existencia de lógicas de duplicación redundantes (clonado de código), métodos excesivamente extensos (complejidad ciclomática > 10) o indicios del Espejismo Modular (separación física de archivos con acoplamiento lógico inestable).
3. **Validación Arquitectónica de Next.js 15:** Confirma el uso correcto del App Router y Server Components. Asegura que no se hayan introducido declaraciones `"use client"` innecesarias en capas de datos, y que la integración de AWS Amplify Server Runtime se realice mediante aislamiento de contexto con runWithAmplifyServerContext.
4. **Emisión de Calificación:** Otorga una puntuación matemática final del cambio de 0 a 100.
</instructions>

<constraints>
- Si el cambio obtiene una puntuación inferior a 90, debes declarar el commit como RECHAZADO de manera inapelable, bloqueando su fusión en la rama principal.
- No alteres el código ni ofrezcas soluciones alternativas de forma descriptiva o conversacional. Si se requiere una corrección, enumera los puntos específicos fallidos con su ubicación de archivo exacta y severidad (Bloqueante / Crítico / Menor).
</constraints>

<thinking_budget_instructions>
Calcula mentalmente la inestabilidad estructural del módulo auditado tras la inyección del diff. Determina si el cambio incrementa de manera desproporcionada la tasa de acoplamiento eferente de la capa entities o features, y evalúa el impacto sobre el tamaño proyectado del bundle de JavaScript cliente antes de emitir tu calificación final.
</thinking_budget_instructions>
</metaprompt_auditor>
```

### 9.4 Parámetros a ajustar al exportar los prompts a otro proyecto

| Prompt | Línea a parametrizar | Sustituir por |
|---|---|---|
| Atlas `<role>` | "dependencias propietarias de AWS Amplify" | La dependencia propietaria del proyecto destino (Firebase, Supabase, Wix, Salesforce, hardcode de contenido…) |
| Atlas `<instructions>` §2 | "SDK cliente de AWS Amplify" | La lógica/SDK concreta a erradicar en el destino |
| Atlas `<thinking_budget>` | riesgo `cookieStorage` v5→v6 | El riesgo de migración específico del proyecto destino |
| Mercury `<role>` e `<instructions>` | Jest/Vitest/RTL, `useActionState` | El stack de pruebas y APIs reales del destino |
| Mercury `<thinking_budget>` | mocks del adaptador Amplify | Los mocks de red del backend real del destino |
| Apollo `<instructions>` §3 | `runWithAmplifyServerContext` | Las validaciones de integración propias del stack destino |
| Todos | "Next.js 15" | La versión real del destino (15/16) |

## 10. Reglas transversales de tooling (exportables)

1. **Sanity siempre vía CLI, nunca MCP.** Si el proyecto usa Sanity, toda operación
   (documentos, datasets, export/import, typegen, deploy del Studio) se hace con el
   **Sanity CLI** (`npx sanity ...`). **No usar el MCP de Sanity.** La documentación oficial
   (`https://www.sanity.io/docs/llms-full.txt`) sigue siendo la referencia de consulta.
   *(Directiva de Edwin, 2026-07-05.)*
2. **Regla git unificada — PR a `development`.** Cada tarea Mercury/Apollo se ejecuta en
   **worktree + rama `feat/*` o `fix/*`** creada desde `development` → push → **Pull Request
   a `development`** con el quality gate en CI (lint, type-check, build, tests; Apollo audita
   el diff del PR con gate ≥ 90) → **squash merge** tras gate verde. **Nunca** commit directo
   a `development` ni a `main`. Promoción `development → main` = merge commit, solo con la
   pregunta obligatoria por instancia ("¿Promuevo development a main ahora?"). El disparador
   `inicia workflow` de cada repo rige cuándo se abre/integra el PR.
3. **Registro persistente.** Cada fase/tarea completada se registra en el memory log del
   proyecto (en este repo: `doc/memory/`), además de marcarse en la pizarra
   `context.md`.
4. **Modelo + esfuerzo por fase.** Todo plan derivado de este marco declara modelo Claude y
   esfuerzo por fase (regla global obligatoria); las pausas solo ocurren al **cambiar** de
   modelo/esfuerzo.

## 11. KPIs de éxito de la re-ingeniería

| Indicador | Meta | Mecanismo |
|---|---|---|
| Ciclos de despliegue (build + deploy) | **−30% a −50%** | Erradicación de Hairballs; límites de caché optimizados; sin dependencias circulares que ralenticen Turbopack |
| Tiempo de revisión por pares (PRs) | **−35%** | Limpieza de firma de máquina; diseño modular con APIs públicas explícitas |
| Defectos reportados en producción | **−20%** | TDD como filtro de gobernanza + validación matemática de las suites |

El marco reemplaza el *vibe coding* por una metodología de desarrollo **predictiva y
controlada**: base de código ultra-optimizada, escalable y sin deudas cognitivas latentes,
con control de calidad industrial sobre la IA generativa.

## 12. Documentation & Reference

- Next.js (App Router, RSC, Server Actions): https://nextjs.org/docs
- Feature-Sliced Design: https://feature-sliced.design/
- Sanity — doc oficial completa: https://www.sanity.io/docs/llms-full.txt
- Sanity CLI: https://www.sanity.io/docs/cli
- OpenNext: https://opennext.js.org/
- AWS Lambda Web Adapter: https://github.com/awslabs/aws-lambda-web-adapter
- Zod: https://zod.dev/
- Workflow git del repo: `AGENTS.md` (raíz)
- Contexto del proyecto: `TEMPLATE_INFO.md`, `SETUP.md`, `doc/memory/`
- Fuente: plan de gobernanza original en
  `yogananda-bogota.org/_nuevas caracteristicas/Plan Reingenieria Gobernanza IA/` (2026-07-05)

---

# PARTE II — Instanciación en el template (`{{PROJECT_NAME}}`)

> **Nota de template:** esta Parte II usa los placeholders oficiales que `scripts/setup.sh`
> reemplaza (`{{PROJECT_NAME}}`, `{{PROJECT_SLUG}}`, `{{SITE_URL}}`, `{{SANITY_PROJECT_ID}}`,
> `{{SANITY_DATASET}}`). Los secretos de auth (`BETTER_AUTH_SECRET`, `TURSO_DATABASE_URL`,
> `TURSO_AUTH_TOKEN`) NO son placeholders del setup: se configuran por `.env`/Amplify y jamás
> se versionan. Al instanciar un proyecto, el plan queda pre-adaptado automáticamente.
> **Re-validar la sección A contra el proyecto real antes de ejecutar F1.**

## A. Ground truth del template (verificado 2026-07-05, rama `development`)

| Aspecto | Estado real |
|---|---|
| Framework | Next.js **16.1.6** + React 19.2.3, Tailwind 4 |
| Código | 40 TS/TSX (`app/`, `components/` ui + secciones + `SectionRenderer`, `lib/`, `sanity/`, `middleware.ts`) |
| CMS | Sanity — 10 schemas (post, category, event, page, siteSettings, blockContent, legacyRedirect, schedule, bookstoreItem); proyecto `{{SANITY_PROJECT_ID}}` / dataset `{{SANITY_DATASET}}` |
| **Auth/datos** | **`@aws-amplify/adapter-nextjs` 1.7.2 + `better-auth` 1.4.13 + Turso (`@libsql/client`)** — aquí la sección **§6.3 del marco SÍ aplica** |
| Deploy | AWS Amplify Hosting (`amplify.yml`); sitio `{{SITE_URL}}` |
| Tests | **Ninguno**; ESLint ✓; sin script `type-check`; **sin CI** |
| Git | `AGENTS.md` completo: worktrees, PR a `development` (squash), `inicia workflow`, promoción a `main` con pregunta |
| Convenciones | Planes en `_Nuevas_Caracteristicas/`; memoria en `doc/memory/`; 12 placeholders `{{...}}` reemplazados por `scripts/setup.sh` |

## B. Mapa de brechas

| Sección del marco | ¿Aplica? | Traducción concreta |
|---|---|---|
| §6.3 dependencias propietarias | ✅ **SÍ** | Mutaciones de auth (better-auth) como **Server Actions + Zod + `ActionResult`**; better-auth solo en servidor (Route Handlers); si se consumen recursos AWS, aislar contexto con `runWithAmplifyServerContext`; **secretos solo en env** (`BETTER_AUTH_SECRET`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`) — jamás al bundle cliente |
| §6.4 hosting gestionado | ✅ | Amplify Hosting; env declaradas explícitamente (bloque `env` de `next.config.ts` cuando aplique) |
| §6.6 FSD | ⚠️ FSD-lite | Con 40 archivos el costo es mínimo: adoptar `shared/` + `widgets` **en el template** beneficia a todos los proyectos futuros |
| §7 TDD + CI | ✅ brecha | **F0 se hace EN el template**: todo proyecto instanciado nace con tests y CI |
| §8 pizarra multi-agente | ✅ | `doc/context.md` |
| §10.1 Sanity vía CLI | ✅ | `npx sanity ...` desde `studio/`; nunca MCP |

## C. Deltas de los metaprompts (aplicar §9.4)

- **Atlas:** objetivo = límites RSC de las secciones (`SectionRenderer` y componentes de
  sección), superficie de auth (better-auth + adapter-nextjs) y su aislamiento server-only,
  queries GROQ. Pizarra: `doc/context.md`.
- **Mercury:** Vitest + RTL (creados en F0); mocks de better-auth, Turso y `next-sanity` — las
  pruebas corren en memoria local, sin red.
- **Apollo:** gate estándar + (1) ningún secreto/token en código ni en el bundle cliente;
  (2) `"use client"` solo hojas; (3) mutaciones solo vía Server Actions validadas con Zod;
  (4) contratos `ActionResult` homogéneos.

## D. Operaciones Sanity vía CLI (nunca MCP)

```bash
cd studio && npx sanity typegen generate
cd studio && npx sanity dataset export {{SANITY_DATASET}} backups/{{PROJECT_SLUG}}-$(date +%Y%m%d).tar.gz
cd studio && npx sanity deploy
```

## E. Fases de ejecución — modelo + esfuerzo (regla global obligatoria)

| Fase | Contenido | Modelo | Esfuerzo |
|---|---|---|---|
| **F0 — Preparación (en el template)** | Pizarra `doc/context.md`; Vitest + RTL; script `type-check`; `.github/workflows/quality-gate.yml`; regla anti-reducción de tests; dependency-cruiser + jscpd — **herencia para todo proyecto futuro** | **Sonnet 5** | `high` |
| **F1 — Diagnóstico (Atlas)** | Grafo (40 archivos), superficie de auth, plan atómico | **Opus 4.8** | `high` |
| **F2 — Ejecución (Mercury, loop)** | Red-Green-Refactor por tarea | **Sonnet 5** | `medium`/`high` |
| **F3 — Auditoría (Apollo, por diff de PR)** | Score ≥ 90; checks C(1)–(4) | **Opus 4.8** | `high` |
| **F4 — Integración/deploy** | Amplify Hosting + env `{{...}}`; smoke de auth | **Sonnet 5** | `high` |
| **F5 — Cierre** | KPIs (§11); `doc/memory/`; archivar plan | **Sonnet 5** | `medium` |

- Regla git: la **unificada de §10.2** (worktree + rama → **PR a `development`** → squash tras
  gate). Pausas de modelo: solo al cambiar de modelo/esfuerzo.

## F. Task list

- [ ] **F0.1** Pizarra `doc/context.md`
- [ ] **F0.2** Vitest + RTL (`test:unit`) en next-app del template
- [ ] **F0.3** Script `type-check` (`tsc --noEmit`)
- [ ] **F0.4** `.github/workflows/quality-gate.yml` para PRs a `development`
- [ ] **F0.5** Regla CI anti-reducción de tests/aserciones
- [ ] **F0.6** dependency-cruiser + jscpd con umbrales
- [ ] **F1.1** Diagnóstico Atlas (RSC + superficie de auth) → plan atómico
- [ ] **F2/F3.n** Loop Mercury (§9.2) + Apollo (§9.3) por tarea — PR a `development`, gate ≥ 90
- [ ] **F4.1** Verificación Amplify + smoke de auth
- [ ] **F5.1** KPIs + `doc/memory/` + archivar este plan (solo al 100%)
