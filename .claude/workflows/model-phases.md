---
description: 3-Phase Model Workflow - Haiku → Opus → Sonnet with persistent memory handoff
---

# 🔄 Flujo de Trabajo por Fases de Modelo (CRITICAL)

## Principio Fundamental

Cada proyecto nuevo sigue 3 fases con modelos diferentes. Entre fases, Claude
escribe un **handoff completo** en `doc/memory/phase-handoff.md` para que el
siguiente modelo NO necesite reinvestigar nada.

---

## FASE 1: Análisis (Haiku - Modelo Económico)

**Modelo:** `/model haiku`
**Objetivo:** Entender completamente el código y proyecto existente

### Qué hace:
1. Lee TODA la estructura de archivos (`Glob` recursivo)
2. Analiza componentes, schemas, queries, rutas, configuraciones
3. Identifica patrones, dependencias, stack exacto
4. Documenta hallazgos en `doc/memory/phase-handoff.md`

### Al finalizar, Claude DEBE:
1. Escribir handoff completo en `doc/memory/phase-handoff.md` (sección FASE 1)
2. Crear/actualizar `doc/memory/architecture.md` con mapa del proyecto
3. Mostrar este mensaje EXACTO:

```
═══════════════════════════════════════════════════════
✅ FASE 1 COMPLETADA - Análisis del Proyecto (Haiku)
═══════════════════════════════════════════════════════

📋 Handoff guardado en: doc/memory/phase-handoff.md
📐 Arquitectura en: doc/memory/architecture.md

🔄 SIGUIENTE PASO:
   1. Cambia el modelo: /model opus
   2. Escribe: "Continúa con FASE 2 - lee doc/memory/phase-handoff.md"

═══════════════════════════════════════════════════════
```

---

## FASE 2: Planificación (Opus - Modelo Avanzado)

**Modelo:** `/model opus`
**Objetivo:** Crear plan de desarrollo detallado y estructurado

### Al iniciar, Claude DEBE:
1. Leer `doc/memory/phase-handoff.md` COMPLETO (NO reinvestigar código)
2. Leer `doc/memory/architecture.md`
3. Confirmar: "He leído el handoff de Fase 1. Contexto cargado."

### Qué hace:
1. Diseña arquitectura de la solución
2. Define orden de implementación (tareas numeradas)
3. Especifica archivos a crear/modificar con detalles
4. Identifica riesgos y dependencias
5. Escribe plan en `doc/memory/phase-handoff.md` (sección FASE 2)

### Al finalizar, Claude DEBE:
1. Actualizar handoff con plan completo (sección FASE 2)
2. Mostrar este mensaje EXACTO:

```
═══════════════════════════════════════════════════════
✅ FASE 2 COMPLETADA - Plan de Desarrollo (Opus)
═══════════════════════════════════════════════════════

📋 Plan guardado en: doc/memory/phase-handoff.md
📝 Tareas definidas: [N tareas]

🔄 SIGUIENTE PASO:
   1. Cambia el modelo: /model sonnet
   2. Escribe: "Continúa con FASE 3 - lee doc/memory/phase-handoff.md"

═══════════════════════════════════════════════════════
```

---

## FASE 3: Implementación (Sonnet - Modelo Balanceado)

**Modelo:** `/model sonnet`
**Objetivo:** Ejecutar el plan de desarrollo tarea por tarea

### Al iniciar, Claude DEBE:
1. Leer `doc/memory/phase-handoff.md` COMPLETO
2. Leer `doc/memory/architecture.md`
3. Confirmar: "He leído el handoff de Fases 1 y 2. Ejecutando plan."
4. Crear TaskList con todas las tareas del plan

### Qué hace:
1. Implementa cada tarea del plan en orden
2. Actualiza progreso en `doc/memory/phase-handoff.md` (sección FASE 3)
3. Marca tareas completadas
4. Reporta cualquier desviación del plan

### Al finalizar, Claude DEBE:
1. Actualizar handoff con resumen de implementación
2. Ejecutar Git workflow si hay cambios
3. Mostrar este mensaje EXACTO:

```
═══════════════════════════════════════════════════════
✅ FASE 3 COMPLETADA - Implementación (Sonnet)
═══════════════════════════════════════════════════════

📋 Resumen en: doc/memory/phase-handoff.md
✅ Tareas completadas: [N/Total]
📁 Archivos modificados: [lista]

🔄 SIGUIENTE PASO:
   1. Revisa los cambios implementados
   2. Cambia modelo si deseas (ej: /model haiku para revisión)
   3. Ejecuta: npm run build para verificar

═══════════════════════════════════════════════════════
```

---

## 📄 Estructura del Handoff (`doc/memory/phase-handoff.md`)

El handoff es el **documento vivo** que conecta las 3 fases. Cada fase
escribe su sección sin borrar las anteriores.

### Secciones obligatorias:

```markdown
# Phase Handoff - [Nombre del Proyecto/Tarea]
> Fecha: YYYY-MM-DD
> Estado: FASE [1|2|3] [EN CURSO|COMPLETADA]

## FASE 1: Análisis (Haiku)
### Resumen del Proyecto
### Stack y Dependencias
### Estructura de Archivos (mapa)
### Componentes Clave
### Schemas Sanity (si aplica)
### Queries GROQ (si aplica)
### Patrones Identificados
### Problemas/Deuda Técnica
### Conclusiones para Planificación

## FASE 2: Plan de Desarrollo (Opus)
### Objetivo del Proyecto
### Arquitectura Propuesta
### Tareas de Implementación (numeradas)
### Archivos a Crear/Modificar
### Dependencias entre Tareas
### Riesgos y Mitigaciones
### Criterios de Aceptación

## FASE 3: Implementación (Sonnet)
### Progreso de Tareas
### Archivos Modificados
### Desviaciones del Plan
### Estado Final
```

---

## 🧠 Recomendación Inteligente de Modelos (CRITICAL)

**DIRECTIVA:** Al inicio de CADA tarea o proyecto nuevo, Claude DEBE analizar el tipo
de trabajo y recomendar qué modelo usar en cada fase, con justificación.

### Fortalezas de cada modelo:

| Modelo | Fortaleza | Costo | Velocidad | Ideal para |
|--------|-----------|-------|-----------|------------|
| **Haiku** | Rápido, económico | $ | Muy rápida | Lectura de código, análisis superficial, tareas repetitivas, docs, fixes triviales |
| **Sonnet** | Equilibrio calidad/velocidad | $$ | Rápida | Implementación estándar, código siguiendo un plan, testing, features moderadas |
| **Opus** | Máxima capacidad de razonamiento | $$$ | Más lenta | Arquitectura compleja, planificación profunda, debugging difícil, decisiones críticas |

### Matriz de Recomendación por Tipo de Tarea:

#### 1. Feature nueva compleja (nueva página, nuevo sistema, integración)
```
F1: Haiku (análisis)  →  F2: Opus (plan)  →  F3: Sonnet (implementar)
Razón: Haiku escanea rápido y barato. Opus diseña la arquitectura con
profundidad. Sonnet ejecuta eficientemente siguiendo el plan.
```

#### 2. Feature nueva simple (botón, componente pequeño, campo nuevo)
```
F1: Haiku (análisis breve)  →  F2+F3: Sonnet (planear + implementar)
Razón: No justifica Opus. Sonnet puede planear e implementar algo simple
en una sola fase. Ahorra costo y tiempo.
```

#### 3. Bug fix simple (typo, error obvio, fix puntual)
```
Solo: Haiku o Sonnet directo (sin fases)
Razón: No necesita análisis profundo ni planificación. Ir directo al fix.
```

#### 4. Bug fix complejo (error intermitente, lógica rota, causa raíz no obvia)
```
F1: Haiku (análisis)  →  F2: Opus (diagnóstico + plan)  →  F3: Sonnet (fix)
Razón: Opus es el mejor para razonamiento profundo y encontrar causas raíz
no evidentes. Sonnet aplica el fix una vez diagnosticado.
```

#### 5. Refactoring grande (reestructurar módulos, cambiar patrones)
```
F1: Haiku (análisis)  →  F2: Opus (plan)  →  F3: Opus (implementar)
Razón: Implementar un refactoring complejo requiere el mismo nivel de
razonamiento que planificarlo. Sonnet podría perder coherencia en cambios
masivos interconectados. Usar Opus en F3 vale el costo extra.
```

#### 6. Refactoring pequeño (renombrar, mover archivos, extraer componente)
```
F1+F2+F3: Sonnet directo (sin fases)
Razón: Cambio mecánico que no requiere análisis ni planificación profunda.
```

#### 7. Optimización / Performance
```
F1: Haiku (profiling, identificar cuellos)  →  F2: Opus (plan de optimización)  →  F3: Sonnet (implementar)
Razón: Haiku identifica los datos. Opus diseña la estrategia de optimización
(requiere razonamiento sobre trade-offs). Sonnet aplica los cambios.
```

#### 8. Documentación / README / Comments
```
Solo: Haiku (análisis + escritura)
Razón: Tarea económica. Haiku es suficiente para leer código y generar docs.
No justifica modelos más costosos.
```

#### 9. Revisión de código / Auditoría de seguridad
```
Solo: Opus directo
Razón: Requiere el razonamiento más profundo para detectar vulnerabilidades,
patrones problemáticos y edge cases. No es tarea para Haiku ni Sonnet.
```

#### 10. Migración / Upgrade de dependencias
```
F1: Haiku (análisis de impacto)  →  F2: Opus (plan de migración)  →  F3: Sonnet (ejecutar)
Razón: Haiku mapea dependencias rápido. Opus planifica el orden correcto y
prevé breaking changes. Sonnet ejecuta la migración paso a paso.
```

#### 11. Diseño de schemas / Modelos de datos
```
F1: Haiku (análisis de schemas existentes)  →  F2: Opus (diseño + plan)  →  F3: Sonnet (implementar)
Razón: El diseño de datos es una decisión arquitectónica crítica.
Opus razona mejor sobre relaciones, normalización y escalabilidad.
```

#### 12. UI/UX y estilos (Tailwind, CSS, layouts)
```
F1+F2: Sonnet (analizar + planear)  →  F3: Sonnet (implementar)
Razón: Trabajo visual/iterativo. Sonnet tiene buena relación calidad/precio.
Opus no aporta ventaja significativa en tareas de UI.
```

### Cómo usar la recomendación:

Al inicio de cada tarea, Claude DEBE:

1. **Identificar** el tipo de tarea (de la lista arriba o combinación)
2. **Recomendar** los modelos para cada fase con formato:

```
═══════════════════════════════════════════════════════
🧠 RECOMENDACIÓN DE MODELOS
═══════════════════════════════════════════════════════

Tipo de tarea: [categoría identificada]

  Fase 1 (Análisis):       [Modelo] — [razón breve]
  Fase 2 (Planificación):  [Modelo] — [razón breve]
  Fase 3 (Implementación): [Modelo] — [razón breve]

  Costo estimado: [$ / $$ / $$$]
  Fases requeridas: [1, 2, 3] o [reducidas si aplica]

¿Apruebas esta configuración de modelos?
═══════════════════════════════════════════════════════
```

3. **Esperar aprobación** del usuario antes de proceder
4. **Ajustar** si el usuario prefiere otro modelo en alguna fase

### Reglas de la Recomendación:

- **Nunca usar Opus para tareas triviales** — es costoso y lento
- **Nunca usar Haiku para planificación compleja** — no tiene la profundidad
- **Sonnet es el default seguro** — si dudas, recomienda Sonnet
- **Permitir saltar fases** — no toda tarea necesita 3 fases
- **El usuario tiene la última palabra** — la recomendación es sugerencia
- **Documentar en handoff** qué modelo se usó realmente en cada fase

---

## ⚠️ Reglas de Oro

1. **NUNCA reinvestigar** lo que ya documentó una fase anterior
2. **SIEMPRE leer handoff** antes de comenzar cualquier fase
3. **SIEMPRE escribir handoff** antes de terminar cualquier fase
4. **SIEMPRE mostrar mensaje de transición** con instrucciones claras
5. **El handoff es la fuente de verdad** entre fases, no el contexto del chat
6. **Si el usuario dice "nueva tarea"**: Crear nuevo handoff, no sobrescribir
7. **SIEMPRE recomendar modelos** al inicio de cada tarea nueva
8. **Documentar modelo usado** en cada sección del handoff
