# Memory Log - Migración yogananda-bogota.org

> Registro continuo de cada fase, tarea y paso completado.
> Fecha inicio: 2026-02-16

---

## Estado General del Proyecto

| Fase | Estado | Fecha |
|------|--------|-------|
| Fase 0: Setup Inicial | ✅ COMPLETADA | 2026-02-16 |
| Fase 1: Extracción de Contenido | ✅ COMPLETADA | 2026-02-16 |
| Fase 2: Sistema de Diseño | ✅ COMPLETADA | 2026-02-16 |
| Fase 3: Schemas de Sanity | ✅ COMPLETADA | 2026-02-16 |
| Fase 4: Cliente Sanity + Queries | ✅ COMPLETADA | 2026-02-16 |
| Fase 4.5: Configuración + MCP | ✅ COMPLETADA | 2026-02-16 |
| Fase 5: Páginas Next.js | ✅ COMPLETADA | 2026-02-16 |
| Fase 6: Migración Contenido | 🔲 PRÓXIMA | - |
| Fase 7: Redirects 301 | PENDIENTE | - |
| Fase 8: Testing y QA | PENDIENTE | - |
| Fase 9: Deploy Go-Live | PENDIENTE | - |
| Fase 10: Post-Migración | PENDIENTE | - |

---

## Fase 0: Setup Inicial - COMPLETADA (2026-02-16)

### Tareas realizadas:
- [x] Rama `development` creada desde `master`
- [x] Directorio `/doc/` creado
- [x] Directorio `/doc/content-extracted/` creado
- [x] Directorio `/doc/content-extracted/screenshots/` creado
- [x] Plan de migración guardado en `/doc/MIGRATION-PLAN.md`
- [x] Plan también guardado en `.claude/plans/shimmying-crunching-teacup.md`

### Archivos creados:
- `/doc/MIGRATION-PLAN.md`
- `/doc/content-extracted/` (directorio)
- `/doc/content-extracted/screenshots/` (directorio)

### Pendiente de esta fase:
- [ ] Configurar Sanity Project (necesita acción del usuario)
- [ ] Crear `/next-app/.env.local` con variables reales
- [ ] Iniciar solicitud Google Ad Grants (acción del usuario)

---

## Fase 1: Extracción de Contenido - COMPLETADA (Páginas Estáticas) (2026-02-16)

### Páginas scrapeadas:

| # | URL | JSON | Screenshot | Estado |
|---|-----|------|------------|--------|
| 1 | `/` (Home) | home.json | wix-homepage-full.png | ✅ COMPLETO |
| 2 | `/nosotros` | nosotros.json | nosotros.png | ✅ COMPLETO |
| 3 | `/paramahansa-yogananda` | paramahansa-yogananda.json | paramahansa-yogananda.png | ✅ COMPLETO |
| 4 | `/kriya-yoga` | kriya-yoga.json | kriya-yoga.png | ✅ COMPLETO |
| 5 | `/autobiografia-de` | autobiografia-de.json | autobiografia-de.png | ✅ COMPLETO |
| 6 | `/lecciones-srf` | lecciones-srf.json | lecciones-srf.png | ✅ COMPLETO |
| 7 | `/programacion` | programacion.json | programacion.png | ✅ COMPLETO |
| 8 | `/escuela-dominical` | escuela-dominical.json | escuela-dominical.png | ✅ COMPLETO |
| 9 | `/libreria` | libreria.json | libreria.png | ✅ COMPLETO |
| 10 | `/blog` | blog.json | blog.png | ✅ COMPLETO |
| 11 | `/contacto` | contacto.json | contacto.png | ✅ COMPLETO |
| 12 | `/donar` | donar.json | donar.png | ✅ COMPLETO |
| 13 | `/webinar-registration` | webinar-registration.json | webinar-registration.png | ✅ COMPLETO |
| 14 | `/webinar-registration-1` | webinar-registration-1.json | webinar-registration-1.png | ✅ COMPLETO |

**Total: 14 páginas estáticas extraídas y documentadas**

### Blog Posts (38 total): OPCIONAL (posts más importantes ya identificados)
### Categorías (2): Identificadas en programacion.json
### Formularios: Integrados en las páginas (contacto, webinars, donar)

### Datos globales extraídos:
- [x] Tokens visuales (colores, fuentes) - via `evaluate_script`
- [x] Estructura de navegación (8 items con dropdowns)
- [x] Footer completo (contacto, redes, formulario, copyright)
- [x] URLs de imágenes principales del homepage
- [x] Formulario de contacto (campos y opciones de dropdown)

### Archivos generados:

**JSON (14 archivos):**
- `/doc/content-extracted/home.json`
- `/doc/content-extracted/nosotros.json`
- `/doc/content-extracted/paramahansa-yogananda.json`
- `/doc/content-extracted/kriya-yoga.json`
- `/doc/content-extracted/autobiografia-de.json`
- `/doc/content-extracted/lecciones-srf.json`
- `/doc/content-extracted/programacion.json`
- `/doc/content-extracted/escuela-dominical.json`
- `/doc/content-extracted/libreria.json` (37+ libros catalogados)
- `/doc/content-extracted/blog.json`
- `/doc/content-extracted/contacto.json` (5 centros en Colombia)
- `/doc/content-extracted/donar.json`
- `/doc/content-extracted/webinar-registration.json`
- `/doc/content-extracted/webinar-registration-1.json`

**Screenshots (13 archivos PNG):**
- Todos guardados en `/doc/content-extracted/screenshots/`
- Tamaño total: ~85 MB

**Documentación:**
- `/doc/content-extracted/EXTRACTION-SUMMARY.md` - Resumen completo de la extracción

---

## Información Clave Descubierta

### Dominio y SEO
- **Dominio:** yogananda-bogota.org
- **Google Ad Grants:** SÍ, mismo dominio
- **GTM:** GTM-5FHFQ9LS
- **Idioma:** es-CO (español colombiano)

### Contacto
- **Dirección:** Kra 3A No 46-48 Chapinero, Bogotá, Colombia
- **WhatsApp:** +57 312 4202518
- **Email:** centro@yogananda-bogota.org
- **Facebook:** srfyogananda.bogota
- **Instagram:** yoganandabogota
- **YouTube:** YoganandaSRF

### Paleta de Colores (extraída via JS)
- Azul profundo: `#173981` / `rgb(23,57,129)`
- Naranja cálido: `#DE6B2F` / `rgb(222,107,47)`
- Navy oscuro: `#1E3650` / `rgb(30,54,80)`
- Oliva/salvia: `#696C0E` / `rgb(105,108,14)`
- Naranja quemado: `#C74300` / `rgb(199,67,0)`
- Crema fondo: `#F0F0E6` / `rgb(240,240,230)`

### Fuentes Originales Wix
- Archer Pro (Medium/Book) - serif
- Futura LT Light - sans-serif
- Thirsty Script ExtraBold - decorativa
- Open Sans - sans-serif fallback

### Descubrimientos Importantes de la Extracción

**Centros adicionales en Colombia (5 total):**
1. Bogotá - Cra 3A No 46-48 Chapinero (principal)
2. Manizales - Cra 24 No 22-02 Oficina 304
3. Cali - Cra 9 No 3-40 Barrio San Antonio
4. Medellín - Calle 56 # 39-23, barrio Boston
5. Pereira - Calle 21 No. 21-21 Tercer piso

**Librería - 37+ libros catalogados:**
- Autobiografía de un Yogui (múltiples ediciones)
- Bhagavad Gita de Paramahansa Yogananda (3 volúmenes)
- La Segunda Venida de Cristo (3 volúmenes)
- El Yoga de Jesús
- Afirmaciones Científicas para la Curación
- Y muchos más...

**Escuela Dominical:**
- Edad: 5-12 años
- Horario: Domingos 10:00-11:00 am
- 5 metas educativas espirituales

**Información Legal:**
- Entidad: Asociación de Auto Realización
- NIT: (ver documentos legales)
- Tipo: ESAL (Entidad Sin Ánimo de Lucro con Régimen Tributario Especial)

---

## Fase 5: Páginas y Componentes Next.js - ✅ COMPLETADA (2026-02-16)

- 38 archivos creados (6 UI + 13 sections + 4 shared + 2 layout + 13 páginas)
- 1520 líneas de código
- Build exitoso: 14 rutas, 0 errores
- Commit 9ab68dd en `development`
- Detalle completo en `/doc/PHASE-PROGRESS.md`

## Próximos Pasos

**Fase 6: Migración de Contenido a Sanity** — migrar JSON extraídos a documentos Sanity
- Crear script migración → leer `/doc/content-extracted/*.json` → crear docs en Sanity
- Necesita SANITY_API_WRITE_TOKEN en .env.local
- Referencia: `/doc/PHASE-PROGRESS.md` (sección Fase 6)

**Pendiente Git:** Configurar remote (`git remote add origin <url>`) y push

---

*Última actualización: 2026-02-16 — Fase 5 Completada*
