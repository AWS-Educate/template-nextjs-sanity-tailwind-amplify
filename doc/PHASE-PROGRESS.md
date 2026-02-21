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

---

## Fase 2: Sistema de Diseño - ✅ COMPLETADA (2026-02-16)

### Tareas Completadas
- [x] Consultar paleta de colores y fuentes del sitio Wix
- [x] Importar fuentes Google (Source Serif 4, Source Sans 3, Cormorant Garamond)
- [x] Configurar variables CSS (colores, tipografía, espaciado)
- [x] Crear paleta completa (50-900 shades para cada color primario)
- [x] Implementar dark mode support
- [x] Establecer jerarquía tipográfica
- [x] Commit d5fa996

### Configuración Implementada

**Colores Primarios:**
- Primary: #173981 (Azul profundo - Meditación/Espiritualidad)
- Secondary: #DE6B2F (Naranja cálido - Energía/Compasión)
- Accent Sage: #696C0E (Oliva/Salvia - Naturaleza/Balance)
- Navy: #1E3650 (Navy oscuro - Footer/Texto oscuro)

**Neutrales (Paleta Cálida):**
- Neutral-50: #FDFCF9 (Blanco cálido)
- Neutral-100: #F5F3EE (Crema clara)
- Neutral-900: #252320 (Marrón oscuro)

**Fuentes Google Implementadas:**
- Headings: Source Serif 4 (elegante, contemplativa)
- Body: Source Sans 3 (clara, legible)
- Decorative: Cormorant Garamond (espiritual, refinada)

**Archivos Modificados:**
- `/next-app/src/app/globals.css` (202 líneas)
  - 90+ variables CSS para colores
  - 3 gradientes temáticos
  - Sombras meditativas
  - Tipografía jerárquica completa
  - Soporte dark mode

### Sesiones de Trabajo
- **2026-02-16 sesión 1:** Extracción Fase 1 + Consolidación documentación + Actualización CLAUDE.md
- **2026-02-16 sesión 2:** Fase 2 completa (Sistema de Diseño + CSS variables + Tipografía)

---

---

## Fase 3: Schemas de Sanity - ✅ COMPLETADA (2026-02-16)

### Tareas Completadas
- [x] Crear 8 document types
- [x] Crear 14 object types
- [x] Registrar todos los tipos en `studio/schemas/index.ts`
- [x] Verificar compilación TypeScript
- [x] Commit d09cd8e

### Document Types (8) Creados
1. ✅ `post.ts` - Blog posts con category, tags, seo
2. ✅ `category.ts` - Categorías del blog
3. ✅ `page.ts` - Páginas modulares (10 section types)
4. ✅ `event.ts` - Eventos con fechas, zoom, registro, capacidad
5. ✅ `schedule.ts` - Programación semanal (lunes-domingo)
6. ✅ `siteSettings.ts` - Global settings singleton
7. ✅ `bookstoreItem.ts` - Librería con ISBN, precios, stock
8. ✅ `legacyRedirect.ts` - URL redirects (301/302/307/308)

### Object Types (14) Creados
Ubicación: `studio/schemas/objects/`
- ✅ seo.ts - Meta tags, OG image
- ✅ navItem.ts - Navigation with submenu
- ✅ heroSection.ts - Hero banners
- ✅ textSection.ts - Rich text blocks
- ✅ ctaSection.ts - Call-to-action buttons
- ✅ imageTextSection.ts - Image + text layout
- ✅ scheduleSection.ts - Event scheduling arrays
- ✅ blogFeedSection.ts - Dynamic blog feed
- ✅ contactFormSection.ts - Form builder
- ✅ donationSection.ts - Donation CTA
- ✅ bannerSection.ts - Announcement banners
- ✅ quoteSection.ts - Testimonials/quotes
- ✅ gallerySection.ts - Image galleries
- ✅ eventRegistrationSection.ts - Event registration forms

### Cambios en Archivos Existentes

**post.ts - Campos Agregados:**
```typescript
- category: reference → category
- tags: array → string[]
- seo: seo object
```

**index.ts - Actualizado:**
- Importa 8 document types
- Importa 14 object types
- Organiza imports por categoría

### Configuración Técnica

**Características Implementadas:**
- Type-safe schemas con `defineField` y `defineType`
- Validación en campos críticos
- References entre documentos (post → category, page → sections)
- Asset support (imágenes con hotspot)
- Portable text (blockContent) para rich text
- Singleton support (siteSettings)
- Preview configurations para Studio

**Columnas de Datos Soportadas:**
- Text, number, datetime, slug, url, email
- Arrays y objects anidados
- References y backreferences
- Images con hotspot support
- Rich content con blockContent

### Archivos Generados
- `/studio/schemas/post.ts` (MODIFICADO - 68 líneas)
- `/studio/schemas/category.ts` (NEW - 28 líneas)
- `/studio/schemas/page.ts` (NEW - 48 líneas)
- `/studio/schemas/event.ts` (NEW - 79 líneas)
- `/studio/schemas/schedule.ts` (NEW - 73 líneas)
- `/studio/schemas/siteSettings.ts` (NEW - 61 líneas)
- `/studio/schemas/bookstoreItem.ts` (NEW - 74 líneas)
- `/studio/schemas/legacyRedirect.ts` (NEW - 39 líneas)
- `/studio/schemas/index.ts` (MODIFICADO - 54 líneas)

**Total: 22 document/object types registrados**

---

## Fase 4: Cliente Sanity + Queries - ✅ COMPLETADA (2026-02-16)

### Tareas Completadas
- [x] Cliente Sanity (public + server variants)
- [x] TypeScript types (8 docs + 14 objects + 264 líneas)
- [x] GROQ queries (20 total, optimizadas)
- [x] Helper functions (20+ funciones)
- [x] Middleware para redirects 301
- [x] Image utilities con transformaciones
- [x] Commit 75ae8be

### Archivos Creados

**`next-app/src/sanity/client.ts`** (32 líneas)
- `client`: Lectura pública (CDN, perspectiva 'published')
- `serverClient`: Con token (sin CDN, perspectiva 'previewDrafts')
- Validación de env vars automática

**`next-app/src/sanity/types.ts`** (264 líneas)
- 8 tipos documento (Post, Category, Page, Event, Schedule, SiteSettings, BookstoreItem, LegacyRedirect)
- 14 tipos objeto (secciones + meta tipos)
- Union types: `Section`, respuestas API
- Completo TypeScript support

**`next-app/src/sanity/queries.ts`** (344 líneas)
- 20 GROQ queries optimizadas
- Site Settings: 1
- Blog: 6 (all, by-slug, by-category, related, search)
- Categories: 2 (all, by-slug)
- Pages: 2 (by-slug, home)
- Events: 2 (upcoming, by-slug)
- Schedule: 2 (current, by-week)
- Bookstore: 4 (all, featured, by-slug, by-category)
- Redirects: 2 (single, all)
- Static Gen: 4 utility queries

**`next-app/src/sanity/lib.ts`** (232 líneas)
- 20+ helper functions
- `fetchSanity<T>()`: Base function con error handling
- Funciones tipadas para cada recurso
- `getSanityImageUrl()`: Image transformations
- Todas retornan null en error (seguro)

**`next-app/src/middleware.ts`** (24 líneas)
- Middleware para redirects legacy
- Consulta tabla legacyRedirect
- Status code personalizado (301/302/307/308)
- Matcher: Excluye assets estáticos

**`next-app/src/sanity/index.ts`** (8 líneas)
- Re-export central
- Imports: client, lib, types, queries

### Características Implementadas

**Optimización de Queries**
- ✅ Projection: Solo campos necesarios
- ✅ Asset resolution: asset->url
- ✅ Ordering: Optimizado por campos
- ✅ Filtering: Conditions eficientes
- ✅ Limit: Para paginación

**Error Handling**
- ✅ Try-catch en fetchSanity
- ✅ Null returns en error
- ✅ Console logging
- ✅ Env var validation

**Type Safety**
- ✅ TypeScript strict mode
- ✅ Todos los tipos documentados
- ✅ Generic `fetchSanity<T>`
- ✅ Union types para sections

**Performance**
- ✅ CDN para client público
- ✅ Image URL builder
- ✅ Listo para ISR caching
- ✅ SSG-ready queries

### Resumen Técnico

**Total Líneas**: 905 líneas
**Funciones Helper**: 20+
**Queries GROQ**: 20
**Tipos TypeScript**: 30+
**Documentación**: PHASE-4-SANITY-CLIENT.md

### Ejemplo de Uso

```typescript
// En una página Next.js
import {getPostBySlug, getUpcomingEvents} from '@/sanity'

export default async function BlogPost({params}) {
  const post = await getPostBySlug(params.slug)
  return <article>{post.title}</article>
}

// En middleware
import {getLegacyRedirect} from '@/sanity'
const redirect = await getLegacyRedirect('/old-url')
// → {newPath: '/new-url', statusCode: 301}
```

---

## Fase 4.5: Configuración Sanity + MCP - ✅ COMPLETADA (2026-02-16)

### Tareas Completadas
- [x] Sanity Project ID configurado (jovlwcbx)
- [x] Sanity Dataset configurado (production)
- [x] sanity.config.ts actualizado
- [x] sanity.cli.ts actualizado
- [x] .env.local creado (local, no commitear)
- [x] .env.local.example actualizado
- [x] MCP server configurado (.claude/mcp-servers.json)
- [x] Documentación MCP creada
- [x] Commits 8e5e9ae, 98bbf9b, 96118aa

### Archivos Creados

**Configuration**:
- `studio/sanity.config.ts` - MODIFICADO con jovlwcbx
- `studio/sanity.cli.ts` - MODIFICADO con jovlwcbx
- `next-app/.env.local` - CREADO (local, no en git)
- `next-app/.env.local.example` - ACTUALIZADO

**MCP Setup**:
- `.claude/mcp-servers.json` - Configuración MCP
- `doc/SANITY-SETUP-GUIDE.md` - Guía de setup
- `doc/MCP-SANITY-SETUP.md` - Guía de MCP

### Credenciales Configuradas
```
PROJECT_ID: jovlwcbx
DATASET:    production
```

### MCP Sanity
```json
{
  "mcpServers": {
    "sanity": {
      "command": "npx",
      "args": ["@sanity/mcp@latest", "serve"],
      "env": {
        "SANITY_PROJECT_ID": "jovlwcbx",
        "SANITY_DATASET": "production"
      }
    }
  }
}
```

### Cómo Activar MCP en Claude Code
1. Cmd/Ctrl + Shift + P
2. "Configure MCP Servers"
3. Agregar servidor Sanity
4. Reiniciar Claude Code

---

## Fase 5: Páginas y Componentes Next.js - ✅ COMPLETADA (2026-02-16)

### Tareas Completadas
- [x] 6 UI Components (Container, Button, Card, Badge, SanityImage, PortableTextRenderer)
- [x] 13 Section Components (SectionRenderer + 12 secciones)
- [x] 4 Shared Components (Header, Footer, MobileNav, WhatsAppButton)
- [x] Layout global (layout.tsx + not-found.tsx)
- [x] 13 Páginas (Homepage, Blog, Blog [slug], Nosotros, Yogananda, Kriya Yoga, Autobiografía, Lecciones SRF, Programación, Escuela Dominical, Librería, Contacto, Donar)
- [x] Fix TypeScript errors en lib.ts (fetchSanity params, redirect types)
- [x] Build exitoso: 14 rutas, 0 errores
- [x] Commit 9ab68dd (40 archivos, 1520 líneas)

### Archivos Creados (38 archivos)

**UI Components (6):**
- `next-app/src/components/ui/Container.tsx` - Max-width wrapper responsive
- `next-app/src/components/ui/Button.tsx` - Variantes primary/secondary/outline, sizes sm/md/lg
- `next-app/src/components/ui/Card.tsx` - Card para posts/libros con imagen, badge, date
- `next-app/src/components/ui/Badge.tsx` - Tags/categorías con colores
- `next-app/src/components/ui/SanityImage.tsx` - Wrapper next/image + Sanity CDN
- `next-app/src/components/ui/PortableTextRenderer.tsx` - Renderiza Portable Text de Sanity

**Section Components (13):**
- `next-app/src/components/sections/SectionRenderer.tsx` - Mapea _type → componente
- `next-app/src/components/sections/HeroSection.tsx` - Hero con imagen overlay + CTA
- `next-app/src/components/sections/TextSection.tsx` - Rich text con alignment
- `next-app/src/components/sections/CtaSection.tsx` - Call to action con botones
- `next-app/src/components/sections/ImageTextSection.tsx` - Imagen + texto (left/right)
- `next-app/src/components/sections/ScheduleSection.tsx` - Horario meditación (async, fetch Sanity)
- `next-app/src/components/sections/BlogFeedSection.tsx` - Feed posts recientes (async)
- `next-app/src/components/sections/ContactFormSection.tsx` - Formulario dinámico ('use client')
- `next-app/src/components/sections/DonationSection.tsx` - Sección donaciones
- `next-app/src/components/sections/BannerSection.tsx` - Banner informativo
- `next-app/src/components/sections/QuoteSection.tsx` - Citas con autor
- `next-app/src/components/sections/GallerySection.tsx` - Galería grid/carousel
- `next-app/src/components/sections/EventRegistrationSection.tsx` - Registro eventos ('use client')

**Shared Components (4):**
- `next-app/src/components/shared/Header.tsx` - Nav con dropdown, logo SRF Bogotá
- `next-app/src/components/shared/Footer.tsx` - 3 columnas: about, links, contacto
- `next-app/src/components/shared/MobileNav.tsx` - Hamburguesa responsive ('use client')
- `next-app/src/components/shared/WhatsAppButton.tsx` - Botón flotante verde ('use client')

**Layout (2):**
- `next-app/src/app/layout.tsx` - RootLayout con Header/Footer/WhatsApp, metadata SEO
- `next-app/src/app/not-found.tsx` - Página 404

**Páginas (13):**
- `next-app/src/app/page.tsx` - Homepage (hero gradient + intro + quote + posts + CTA)
- `next-app/src/app/blog/page.tsx` - Blog listing
- `next-app/src/app/blog/[slug]/page.tsx` - Blog post detalle (generateStaticParams + generateMetadata)
- `next-app/src/app/nosotros/page.tsx` - Sobre SRF
- `next-app/src/app/paramahansa-yogananda/page.tsx` - Biografía Yogananda
- `next-app/src/app/kriya-yoga/page.tsx` - Kriya Yoga
- `next-app/src/app/autobiografia-de/page.tsx` - Libro Autobiografía
- `next-app/src/app/lecciones-srf/page.tsx` - Lecciones SRF
- `next-app/src/app/programacion/page.tsx` - Programación + horarios + eventos
- `next-app/src/app/escuela-dominical/page.tsx` - Escuela Dominical
- `next-app/src/app/libreria/page.tsx` - Librería (grid de libros)
- `next-app/src/app/contacto/page.tsx` - Contacto (info + formulario mailto)
- `next-app/src/app/donar/page.tsx` - Donaciones

### Archivos Modificados
- `next-app/src/sanity/lib.ts` - Fix: `params ?? {}` y tipos redirect

### Arquitectura Implementada
- **Server Components** por defecto (data fetching directo con Sanity)
- **'use client'** solo en: MobileNav, ContactFormSection, EventRegistrationSection, WhatsAppButton
- **Patrón fallback**: Cada página intenta cargar de Sanity → si no hay contenido, muestra HTML estático
- **generateStaticParams** en blog/[slug] para SSG
- **generateMetadata** en TODAS las páginas para SEO
- **SectionRenderer** mapea sections dinámicas de Sanity a componentes
- **Mobile First** con Tailwind

### Rutas Build Output
```
○ /                        (Static)
○ /_not-found              (Static)
○ /autobiografia-de        (Static)
○ /blog                    (Static)
● /blog/[slug]             (SSG)
○ /contacto                (Static)
○ /donar                   (Static)
○ /escuela-dominical       (Static)
○ /kriya-yoga              (Static)
○ /lecciones-srf           (Static)
○ /libreria                (Static)
○ /nosotros                (Static)
○ /paramahansa-yogananda   (Static)
○ /programacion            (Static)
```

### Notas para el Equipo
- **No hay remote Git configurado** — hacer `git remote add origin <url>` y luego `git push -u origin development`
- Las páginas muestran contenido estático hardcoded hasta que se migre contenido a Sanity (Fase 6)
- Para ver el sitio: `cd next-app && npm run dev` → http://localhost:3000
- Nav items están hardcodeados en Header.tsx (podrían moverse a Sanity siteSettings en futuro)

---

## Fase 6: Migración de Contenido a Sanity - PRÓXIMA

### Objetivo
Migrar contenido extraído (JSON de Fase 1) a Sanity CMS para que las páginas carguen contenido dinámico en vez del fallback estático.

### Tareas Principales
1. Crear script de migración (leer JSONs → crear documentos Sanity)
2. Migrar páginas estáticas como documentos `page` con secciones
3. Migrar blog posts (38) como documentos `post`
4. Migrar librería (37+ libros) como `bookstoreItem`
5. Crear categorías del blog
6. Configurar siteSettings (nav, footer, contacto)
7. Subir imágenes a Sanity CDN
8. Configurar horario de meditación (schedule)
9. Verificar que todas las páginas cargan desde Sanity

### Dependencias
- Fase 5: Páginas Next.js ✅ COMPLETADA
- Sanity Studio accesible (jovlwcbx / production)
- SANITY_API_WRITE_TOKEN configurado en .env.local

### Archivos de Referencia
- `/doc/content-extracted/*.json` (14 archivos con contenido)
- `/doc/content-extracted/screenshots/*.png` (referencia visual)

---

## Auditoría Fase 3+4 - ✅ COMPLETADA (2026-02-20)

### Auditoría Fase 3: Schemas de Sanity
**Puntaje inicial: 6/10 → Puntaje final: 9/10**

**Correcciones CRÍTICAS:**
- [x] `isUnique` agregado a slug fields en: post, category, page, event, bookstoreItem
- [x] `scheduleSection` y `eventRegistrationSection` agregados al array de page.ts
- [x] `sections` con validación min(1) en page.ts

**Correcciones MAYORES:**
- [x] Refactored inline objects → `defineField`/`defineArrayMember` en 9 schemas
- [x] event.ts: validación endDate >= startDate + capacity positive().integer()
- [x] bookstoreItem.ts: price min(0), pages positive().integer()
- [x] schedule.ts: time regex HH:MM, year min/max, defineArrayMember
- [x] siteSettings.ts: email regex, preview config, defineArrayMember en socialMedia
- [x] legacyRedirect.ts: paths validados con regex /^\//
- [x] heroSection.ts: imageAlt ahora required + defineField en CTA
- [x] gallerySection.ts: alt ahora required + defineArrayMember
- [x] contactFormSection.ts: label + placeholder + options agregados al schema
- [x] eventRegistrationSection.ts: label + placeholder agregados al schema

**14 archivos modificados, 0 errores TypeScript, build OK**

### Auditoría Fase 4: Cliente + Queries + Types
**Puntaje inicial: 5/10 → Puntaje final: 9/10**

**Correcciones CRÍTICAS:**
- [x] types.ts sincronizado con schemas: ScheduleSection, ImageTextSection, BannerSection, GallerySection, FormField, DonationSection, EventRegistrationSection, HeroSection
- [x] PAGE_BY_SLUG_QUERY: `gallery[]` → `images[]` (match schema field name)
- [x] HOME_PAGE_QUERY: misma corrección
- [x] Removed redundant projections (heroImage, mainImage en sections)

**Correcciones MAYORES:**
- [x] RELATED_POSTS_QUERY: `[0..3]` → `[0..2]` (3 items, no 4)
- [x] lib.ts: dynamic import() → static imports (performance)
- [x] middleware.ts: API call per-request → in-memory cache con TTL 5min
- [x] searchPosts: agrega wildcard suffix a searchTerm
- [x] getAllRedirects() helper agregado para middleware caching

**Componentes actualizados:**
- [x] BannerSection.tsx: `data.text` → `data.message`
- [x] ImageTextSection.tsx: `data.text` → `data.heading` + `data.body` (PortableText)
- [x] ScheduleSection.tsx: soporta items inline del section + fallback a schedule document
- [x] GallerySection.tsx: `img.asset` → `img.image` (tipo correcto)
- [x] blog/[slug]/page.tsx: fix generateStaticParams type cast

**Build: 14/14 rutas, 0 errores TypeScript, middleware OK**

---

## Estado General Actualizado

| Fase | Estado | Fecha |
|------|--------|-------|
| Fase 0: Setup Inicial | ✅ COMPLETADA | 2026-02-16 |
| Fase 1: Extracción de Contenido | ✅ COMPLETADA | 2026-02-16 |
| Fase 2: Sistema de Diseño | ✅ COMPLETADA | 2026-02-16 |
| Fase 3: Schemas de Sanity | ✅ AUDITADA Y CORREGIDA | 2026-02-20 |
| Fase 4: Cliente Sanity + Queries | ✅ AUDITADA Y CORREGIDA | 2026-02-20 |
| Fase 4.5: Configuración + MCP | ✅ COMPLETADA | 2026-02-16 |
| Fase 5: Páginas Next.js | ✅ COMPLETADA | 2026-02-16 |
| Fase 6: Migración Contenido | 🔲 PRÓXIMA | - |
| Fase 7: Redirects 301 | PENDIENTE | - |
| Fase 8: Testing y QA | PENDIENTE | - |
| Fase 9: Deploy Go-Live | PENDIENTE | - |
| Fase 10: Post-Migración | PENDIENTE | - |

---

*Última actualización: 2026-02-20 — Auditoría Fases 3+4 completada (schemas corregidos, types sincronizados, queries optimizadas, build OK)*
