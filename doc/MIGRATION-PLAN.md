# Plan de Migración: yogananda-bogota.org (Wix → Next.js + Sanity + AWS Amplify)

## Contexto

**Problema:** El plan Wix de yogananda-bogota.org venció, el costo de renovación es alto, y el sitio necesita migrar urgentemente a una plataforma más económica sin perder URLs críticas vinculadas a Google Ad Grants.

**Resultado esperado:** Sitio migrado con rediseño moderno (tema calma/meditación), mismas URLs preservadas, costo operativo reducido a ~$5/mes en AWS Amplify, contenido gestionable desde Sanity Studio.

**Enfoque:** Rediseño moderno manteniendo esencia espiritual. Extraer contenido via Chrome DevTools MCP (Wix MCP no disponible).

---

## Inventario del Sitio Actual

### URLs Críticas (15 páginas estáticas)
| URL | Página |
|-----|--------|
| `/` | Home |
| `/nosotros` | Acerca de |
| `/paramahansa-yogananda` | Biografía |
| `/autobiografia-de` | Libro |
| `/kriya-yoga` | Enseñanza |
| `/lecciones-srf` | Lecciones |
| `/programacion` | Blog/Programación |
| `/escuela-dominical` | Escuela Dominical |
| `/libreria` | Librería |
| `/blog` | Blog |
| `/contacto` | Contacto |
| `/donar` | Donaciones |
| `/webinar-registration` | Registro Webinar |
| `/webinar-registration-1` | Registro Webinar 2 |
| `/dia-internacional-del-yoga-en-bogota-...` | Evento Yoga |

### Blog Posts: 38 entradas bajo `/post/[slug]`
### Categorías: `/programacion/categories/eventos`, `/programacion/categories/junio`
### Formularios Legacy: 3 bajo `/detalles-y-registro/`

### Tokens Visuales Extraídos del Sitio Wix
- **Colores texto:** negro, naranja cálido `#DE6B2F`, azul profundo `#173981`, navy `#1E3650`, blanco, oliva `#696C0E`, naranja quemado `#C74300`
- **Colores fondo:** blanco, crema `#F0F0E6`, azul profundo, oliva, naranja `#D96316`, navy
- **Fuentes Wix:** Archer Pro (serif), Futura LT Light (sans), Thirsty Script (decorativa), Open Sans
- **Contacto:** Kra 3A No 46-48 Chapinero, Bogotá | WhatsApp: +57 312 4202518 | centro@yogananda-bogota.org
- **Redes:** Facebook, Instagram, YouTube

---

## Fases de Implementación

### Fase 0: Setup Inicial (Días 1-2)

1. **Crear rama `development`** (nunca editar en `main`)
2. **Crear directorio `/doc/`** y guardar este plan como `MIGRATION-PLAN.md`
3. **Configurar Sanity Project** → obtener `SANITY_PROJECT_ID` y tokens
4. **Crear `/next-app/.env.local`** con variables reales
5. **Iniciar solicitud Google Ad Grants** para aprobación del dominio en nuevo hosting (10 días hábiles)

### Fase 1: Extracción de Contenido via Chrome DevTools MCP (Días 2-5)

Para cada URL del inventario:
1. `navigate_page` → `take_snapshot` → `take_screenshot`
2. Extraer: textos, imágenes (URLs de `static.wixstatic.com`), estructura
3. Guardar contenido estructurado en `/doc/content-extracted/` como JSON por página
4. Descargar imágenes principales a `/next-app/public/images/migration/`

**Prioridad:** Homepage y páginas estáticas primero → blog posts → eventos

### Fase 2: Sistema de Diseño (Días 3-5)

**Archivo:** `next-app/src/app/globals.css`

Reemplazar tema naranja/púrpura del template con paleta SRF modernizada:

| Token | Color | Uso |
|-------|-------|-----|
| `primary-500` | `#173981` (azul profundo) | Encabezados, nav, CTA |
| `secondary-500` | `#DE6B2F` (naranja azafrán) | Acentos, botones, enlaces |
| `accent-sage-500` | `#696C0E` (oliva/salvia) | Badges, detalles |
| `navy-800` | `#1E3650` (navy oscuro) | Footer, texto oscuro |
| `neutral-100` | `#F5F3EE` (crema) | Fondos suaves |
| `neutral-50` | `#FDFCF9` (blanco cálido) | Fondo principal |

**Fuentes** (Google Fonts gratuitas, similares a las de Wix):
- Headings: **Source Serif 4** (reemplaza Archer Pro)
- Body: **Source Sans 3** (reemplaza Futura LT)
- Decorativa: **Cormorant Garamond** (reemplaza Thirsty Script)

### Fase 3: Schemas de Sanity (Días 4-7)

**Directorio:** `studio/schemas/`

#### Document Types (8)

| Schema | Archivo | Descripción |
|--------|---------|-------------|
| `post` | `post.ts` (MODIFICAR existente) | Agregar: category ref, tags, seo |
| `category` | `category.ts` (NUEVO) | Categorías del blog |
| `page` | `page.ts` (NUEVO) | Páginas con sections modulares (page builder) |
| `event` | `event.ts` (NUEVO) | Eventos con fecha, zoom link, registro |
| `schedule` | `schedule.ts` (NUEVO) | Programación semanal meditación |
| `siteSettings` | `siteSettings.ts` (NUEVO) | Logo, nav, contacto, redes sociales (singleton) |
| `bookstoreItem` | `bookstoreItem.ts` (NUEVO) | Productos librería |
| `legacyRedirect` | `legacyRedirect.ts` (NUEVO) | Mapeo URLs old→new |

#### Object Types (14) en `studio/schemas/objects/`

`heroSection`, `textSection`, `imageTextSection`, `ctaSection`, `scheduleSection`, `blogFeedSection`, `contactFormSection`, `donationSection`, `bannerSection`, `quoteSection`, `gallerySection`, `eventRegistrationSection`, `navItem`, `seo`

**Registrar todo** en `studio/schemas/index.ts`

### Fase 4: Cliente Sanity + Queries GROQ (Días 6-8)

**Archivos en** `next-app/src/sanity/`:
- `client.ts` → createClient con project ID, dataset, CDN
- `image.ts` → imageUrlBuilder para Sanity CDN
- `queries/page.ts` → pageBySlug con sections expandidas
- `queries/post.ts` → listado, single post, por categoría
- `queries/event.ts` → próximos/pasados eventos
- `queries/settings.ts` → siteSettings singleton
- `queries/bookstore.ts` → items librería

### Fase 5: Páginas Next.js (Días 7-14)

**Rutas en** `next-app/src/app/` (preservando URLs exactas de Wix):

| Archivo | URL |
|---------|-----|
| `app/page.tsx` | `/` |
| `app/nosotros/page.tsx` | `/nosotros` |
| `app/paramahansa-yogananda/page.tsx` | `/paramahansa-yogananda` |
| `app/autobiografia-de/page.tsx` | `/autobiografia-de` |
| `app/kriya-yoga/page.tsx` | `/kriya-yoga` |
| `app/lecciones-srf/page.tsx` | `/lecciones-srf` |
| `app/programacion/page.tsx` | `/programacion` |
| `app/programacion/categories/[slug]/page.tsx` | `/programacion/categories/*` |
| `app/escuela-dominical/page.tsx` | `/escuela-dominical` |
| `app/libreria/page.tsx` | `/libreria` |
| `app/blog/page.tsx` | `/blog` |
| `app/contacto/page.tsx` | `/contacto` |
| `app/donar/page.tsx` | `/donar` |
| `app/post/[slug]/page.tsx` | `/post/*` (38 posts) |
| `app/webinar-registration/page.tsx` | `/webinar-registration` |
| `app/webinar-registration-1/page.tsx` | `/webinar-registration-1` |
| `app/detalles-y-registro/[slug]/page.tsx` | `/detalles-y-registro/*` |

**Componentes** en `next-app/src/components/`:
- **`shared/`:** Header, Footer, MobileNav, SocialLinks, WhatsAppButton, SrfBanner
- **`sections/`:** SectionRenderer + 12 componentes de sección
- **`ui/`:** Button, Card, Badge, Input, Textarea, Select, Container, PortableTextRenderer, SanityImage

**Formulario contacto** (Server Action): Nombre, Email, Teléfono, Interés (dropdown 6 opciones), Mensaje

**SEO:** `app/robots.ts`, `app/sitemap.ts`, metadata dinámica desde Sanity

### Fase 6: Migración de Contenido a Sanity (Días 12-16)

1. Subir imágenes a Sanity CDN via `client.assets.upload()`
2. Crear `siteSettings` (nav, contacto, redes)
3. Crear 15 documentos `page` con sections
4. Crear 38 documentos `post`
5. Crear `category`, `schedule`, `bookstoreItem`, `event`

### Fase 7: Redirects 301 (Días 14-16)

**Configurar en AWS Amplify Console** (no en next.config.ts):
- `/_api/<*>` → `/` (301)
- `/members/<*>` → `/` (301)
- `/?lightbox=<*>` → `/` (301)

Las URLs principales NO necesitan redirect porque se preservan exactamente.

### Fase 8: Testing y QA (Días 16-19)

- [ ] 15 páginas estáticas renderizan correctamente
- [ ] 38 blog posts con imágenes y contenido
- [ ] Formulario de contacto envía
- [ ] Nav desktop (dropdowns) y mobile (hamburger)
- [ ] WhatsApp, email, redes sociales funcionan
- [ ] SEO: titles, meta, sitemap.xml, robots.txt
- [ ] Lighthouse > 90
- [ ] Responsivo: 375px, 768px, 1024px, 1440px
- [ ] TODAS las URLs devuelven 200

### Fase 9: DNS / Deploy / Go-Live (Días 19-21)

1. Crear Amplify app → conectar repo (`main`)
2. Env vars en Amplify Console
3. Deploy staging → QA en URL staging
4. Dominio custom `yogananda-bogota.org` + `www`
5. SSL automático via ACM (gratis)
6. Actualizar DNS → 24-48h propagación
7. Deploy Sanity Studio: `npx sanity deploy`

### Fase 10: Post-Migración (Días 21-30)

- Monitorear Search Console y Google Ads
- Reenviar sitemap a Google
- Auditoría performance semanal
- Entrenar editores en Sanity Studio

---

## Puntos Ciegos y Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Google Ad Grants rechaza | Iniciar solicitud DÍA 1. No cortar DNS hasta aprobación |
| Wix cae antes de extraer | **URGENTE:** Extraer TODO el contenido PRIMERO |
| URLs con caracteres codificados | Probar `decodeURIComponent` en todos los slugs |
| Formulario sin backend email | Configurar Resend/SES antes del go-live |
| Imágenes Wix CDN dejan de servir | Descargar TODAS las imágenes durante extracción |
| DNS propagation delay | Usar staging URL para QA, cortar DNS solo tras verificar |
| Donaciones sin pasarela pago | Verificar método actual y replicar |

---

## Cronograma

```
Semana 1: [Setup] [Extracción contenido ▓▓▓▓] [Diseño ▓▓▓]
Semana 2: [Schemas ▓▓▓▓] [Queries ▓▓▓] [Páginas ▓▓▓▓▓▓▓▓]
Semana 3: [Páginas ▓▓▓▓] [Contenido Sanity ▓▓▓▓▓] [Redirects ▓▓]
Semana 4: [Testing ▓▓▓▓] [Deploy ▓▓▓] [Monitoreo →→→→→→→→→]
```

**Total: ~21 días hábiles al go-live (4 semanas)**

---

## Archivos Críticos a Modificar/Crear

| Archivo | Acción |
|---------|--------|
| `next-app/src/app/globals.css` | MODIFICAR: nueva paleta colores + fuentes |
| `studio/schemas/index.ts` | MODIFICAR: registrar 8 doc types + 14 object types |
| `studio/schemas/post.ts` | MODIFICAR: agregar category, tags, seo |
| `next-app/next.config.ts` | MODIFICAR: agregar wixstatic.com a remotePatterns |
| `studio/schemas/page.ts` | CREAR: schema page builder modular |
| `studio/schemas/siteSettings.ts` | CREAR: singleton configuración sitio |
| `next-app/src/sanity/client.ts` | CREAR: Sanity client |
| `next-app/src/sanity/queries/*.ts` | CREAR: queries GROQ |
| `next-app/src/components/**` | CREAR: ~25 componentes |
| `next-app/src/app/*/page.tsx` | CREAR: ~17 rutas |

## Verificación

1. `npm run dev` → verificar todas las rutas en localhost:3000
2. `npm run build` → build sin errores
3. Comparar cada URL contra inventario del sitemap original
4. Google Search Console → indexación post-migración
5. Google Ads → campañas activas con dominio
