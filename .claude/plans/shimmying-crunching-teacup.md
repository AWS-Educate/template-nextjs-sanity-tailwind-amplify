# Plan de Migración: yogananda-bogota.org (Wix → Next.js + Sanity + AWS Amplify)

## Contexto

**Problema:** El plan Wix de yogananda-bogota.org venció, el costo de renovación es alto, y el sitio necesita migrar urgentemente a una plataforma más económica sin perder URLs críticas vinculadas a Google Ad Grants.

**Resultado esperado:** Sitio migrado con rediseño moderno (tema calma/meditación), mismas URLs preservadas, costo operativo reducido a ~$5/mes en AWS Amplify, contenido gestionable desde Sanity Studio.

**Enfoque:** Rediseño moderno manteniendo esencia espiritual. Extraer contenido via Chrome DevTools MCP (Wix MCP no disponible).

> **NOTA:** Este plan también se guardará en `/doc/MIGRATION-PLAN.md` para referencia del proyecto.

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

### Tokens Visuales Extraídos
- **Colores texto:** negro, naranja cálido `#DE6B2F`, azul profundo `#173981`, navy `#1E3650`, blanco, oliva `#696C0E`, naranja quemado `#C74300`
- **Colores fondo:** blanco, crema `#F0F0E6`, azul profundo, oliva, naranja `#D96316`, navy
- **Fuentes:** Archer Pro (serif), Futura LT Light (sans), Thirsty Script (decorativa), Open Sans
- **Contacto:** Kra 3A No 46-48 Chapinero, Bogotá | WhatsApp: +57 312 4202518 | centro@yogananda-bogota.org
- **Redes:** Facebook, Instagram, YouTube

---

## Fases de Implementación

### Fase 0: Setup Inicial (Días 1-2)

1. **Crear rama `development`** (nunca editar en `main`)
2. **Configurar Sanity Project** → obtener `SANITY_PROJECT_ID` y tokens
3. **Crear `/next-app/.env.local`** con variables reales
4. **Iniciar solicitud Google Ad Grants** para aprobación del dominio en nuevo hosting (10 días hábiles)
5. **Guardar este plan** en `/doc/MIGRATION-PLAN.md`

### Fase 1: Extracción de Contenido (Días 2-5)

Usar Chrome DevTools MCP para cada URL:
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

**Fuentes** (Google Fonts, gratuitas, similares a las de Wix):
- Headings: **Source Serif 4** (reemplaza Archer Pro)
- Body: **Source Sans 3** (reemplaza Futura LT)
- Decorativa: **Cormorant Garamond** (reemplaza Thirsty Script)

### Fase 3: Schemas de Sanity (Días 4-7)

**Directorio:** `studio/schemas/`

#### Document Types (8)

| Schema | Archivo | Descripción |
|--------|---------|-------------|
| `post` | `post.ts` (MODIFICAR) | + category ref, tags, seo |
| `category` | `category.ts` (NUEVO) | Categorías del blog |
| `page` | `page.ts` (NUEVO) | Páginas estáticas con sections modulares |
| `event` | `event.ts` (NUEVO) | Eventos con fecha, zoom link, registro |
| `schedule` | `schedule.ts` (NUEVO) | Programación semanal de meditación |
| `siteSettings` | `siteSettings.ts` (NUEVO) | Logo, nav, contacto, redes sociales |
| `bookstoreItem` | `bookstoreItem.ts` (NUEVO) | Productos de librería |
| `legacyRedirect` | `legacyRedirect.ts` (NUEVO) | Mapeo URLs old→new |

#### Object Types (14) en `studio/schemas/objects/`

| Objeto | Propósito |
|--------|-----------|
| `heroSection` | Hero con imagen, heading, CTA (4 layouts) |
| `textSection` | Bloque de texto rico (Portable Text) |
| `imageTextSection` | Imagen + texto lado a lado |
| `ctaSection` | Call-to-action con botón |
| `scheduleSection` | Tabla de horarios semanales |
| `blogFeedSection` | Grid de posts del blog |
| `contactFormSection` | Formulario de contacto configurable |
| `donationSection` | Info de donaciones |
| `bannerSection` | Banner full-width (SRF headquarters) |
| `quoteSection` | Citas de Yogananda |
| `gallerySection` | Galería de imágenes |
| `eventRegistrationSection` | Registro de eventos |
| `navItem` | Item de navegación con hijos |
| `seo` | Meta title, description, OG image |

**Registrar todo** en `studio/schemas/index.ts`

### Fase 4: Cliente Sanity + Queries (Días 6-8)

**Archivos en** `next-app/src/sanity/`:

| Archivo | Propósito |
|---------|-----------|
| `client.ts` | createClient con project ID, dataset, CDN |
| `image.ts` | imageUrlBuilder para Sanity CDN |
| `queries/page.ts` | GROQ: pageBySlug con sections expandidas |
| `queries/post.ts` | GROQ: listado, single post, por categoría |
| `queries/event.ts` | GROQ: próximos eventos, pasados |
| `queries/settings.ts` | GROQ: siteSettings singleton |
| `queries/bookstore.ts` | GROQ: items de librería |

### Fase 5: Páginas Next.js (Días 7-14)

**Todas las rutas en** `next-app/src/app/`

#### Layout Root (`app/layout.tsx`)
- `lang="es"`, Google Fonts, GTM script
- Header compartido (nav con dropdowns)
- Footer compartido (contacto, redes, formulario)

#### Rutas (preservando URLs exactas de Wix)
| Archivo | URL | Fuente |
|---------|-----|--------|
| `app/page.tsx` | `/` | page doc "home" |
| `app/nosotros/page.tsx` | `/nosotros` | page doc |
| `app/paramahansa-yogananda/page.tsx` | `/paramahansa-yogananda` | page doc |
| `app/autobiografia-de/page.tsx` | `/autobiografia-de` | page doc |
| `app/kriya-yoga/page.tsx` | `/kriya-yoga` | page doc |
| `app/lecciones-srf/page.tsx` | `/lecciones-srf` | page doc |
| `app/programacion/page.tsx` | `/programacion` | page doc + blog feed |
| `app/programacion/categories/[slug]/page.tsx` | `/programacion/categories/*` | category filter |
| `app/escuela-dominical/page.tsx` | `/escuela-dominical` | page doc |
| `app/libreria/page.tsx` | `/libreria` | bookstoreItem listing |
| `app/blog/page.tsx` | `/blog` | post listing |
| `app/contacto/page.tsx` | `/contacto` | page doc + form |
| `app/donar/page.tsx` | `/donar` | page doc |
| `app/post/[slug]/page.tsx` | `/post/*` | 38 blog posts |
| `app/webinar-registration/page.tsx` | `/webinar-registration` | page doc |
| `app/webinar-registration-1/page.tsx` | `/webinar-registration-1` | page doc |
| `app/detalles-y-registro/[slug]/page.tsx` | `/detalles-y-registro/*` | event docs |

#### Componentes Compartidos (`next-app/src/components/`)

**`shared/`:** Header, Footer, MobileNav, SocialLinks, WhatsAppButton, SrfBanner
**`sections/`:** SectionRenderer + 12 componentes de sección (hero, text, imageText, cta, schedule, blogFeed, contactForm, donation, banner, quote, gallery, eventRegistration)
**`ui/`:** Button, Card, Badge, Input, Textarea, Select, Container, PortableTextRenderer, SanityImage

#### Formulario de Contacto (Server Action)
- Campos: Nombre, Email, Teléfono, Interés (dropdown), Mensaje
- Opciones dropdown: Librería, Retiros, Info General, Oficios de Meditación, Yoga para Niños, Lecciones
- Envío via email API (Resend/SES)

#### SEO
- `app/robots.ts` → robots.txt
- `app/sitemap.ts` → XML sitemap dinámico
- Metadata por página desde Sanity

### Fase 6: Migración de Contenido a Sanity (Días 12-16)

1. Subir imágenes a Sanity CDN via `client.assets.upload()`
2. Crear documentos `siteSettings` (nav, contacto, redes)
3. Crear documentos `page` para las 15 páginas estáticas
4. Crear 38 documentos `post` con contenido extraído
5. Crear documentos `category`, `schedule`, `bookstoreItem`
6. Crear documentos `event` para registros

### Fase 7: Redirects 301 (Días 14-16)

**Configurar en AWS Amplify Console** (no en next.config.ts):

```json
[
  { "source": "/_api/<*>", "target": "/", "status": "301" },
  { "source": "/members/<*>", "target": "/", "status": "301" },
  { "source": "/?lightbox=<*>", "target": "/", "status": "301" }
]
```

Las URLs principales NO necesitan redirect porque se preservan exactamente.

### Fase 8: Testing y QA (Días 16-19)

- [ ] 15 páginas estáticas renderizan correctamente
- [ ] 38 blog posts con imágenes y contenido correcto
- [ ] Filtro por categorías funciona
- [ ] Formulario de contacto envía correctamente
- [ ] Navegación desktop (dropdowns) y mobile (hamburger)
- [ ] Links sociales (Facebook, Instagram, YouTube)
- [ ] WhatsApp y email funcionan
- [ ] Banner SRF enlaza a yogananda.org/es/
- [ ] SEO: titles únicos, meta descriptions, sitemap.xml, robots.txt
- [ ] Lighthouse > 90 en Core Web Vitals
- [ ] Responsivo: 375px, 768px, 1024px, 1440px
- [ ] TODAS las URLs del inventario devuelven 200

### Fase 9: DNS / Deploy / Go-Live (Días 19-21)

1. Crear Amplify app → conectar repo Git (rama `main`)
2. Configurar env vars en Amplify Console
3. Deploy staging → QA completo en URL de staging
4. Agregar dominio custom `yogananda-bogota.org` + `www`
5. SSL automático via ACM (gratis, auto-renovación)
6. Actualizar DNS (Route 53 o DNS externo) → 24-48h propagación
7. Verificar sitio en dominio final
8. Deploy Sanity Studio: `npx sanity deploy`

### Fase 10: Post-Migración (Días 21-30)

- Monitorear Google Search Console (errores de rastreo)
- Verificar Google Ad Grants (anuncios sirviendo correctamente)
- Reenviar sitemap.xml a Google
- Monitorear logs Amplify (404/500)
- Auditoría de performance semanal
- Entrenar editores en Sanity Studio

---

## Puntos Ciegos Identificados

| Riesgo | Mitigación |
|--------|------------|
| Google Ad Grants rechaza dominio | Iniciar solicitud DÍA 1 (10 días hábiles). No cortar DNS hasta aprobación. |
| Wix se cae antes de extraer contenido | **URGENTE:** Extraer TODO el contenido PRIMERO (Fase 1 es prioridad máxima) |
| URLs con caracteres codificados | Probar `decodeURIComponent` en todos los slugs de blog |
| Formulario contacto sin backend email | Configurar Resend/SES con dominio verificado ANTES del go-live |
| Imágenes de Wix CDN dejan de servir | Descargar TODAS las imágenes durante extracción, no referenciar wixstatic.com |
| DNS propagation delay | Usar URL staging de Amplify para QA. Cortar DNS solo tras verificación completa |
| Donaciones sin pasarela de pago | Verificar método actual (transferencia bancaria, PayPal, etc.) y replicar |

---

## Cronograma Visual

```
Semana 1: [Setup] [Extracción contenido ▓▓▓▓] [Diseño ▓▓▓]
Semana 2: [Schemas ▓▓▓▓] [Client/Queries ▓▓▓] [Páginas ▓▓▓▓▓▓▓▓]
Semana 3: [Páginas ▓▓▓▓] [Contenido Sanity ▓▓▓▓▓] [Redirects ▓▓]
Semana 4: [Testing ▓▓▓▓] [Deploy ▓▓▓] [Monitoreo →→→→→→→→→]
```

**Total: ~21 días hábiles al go-live (4 semanas)**

---

## Consejo Inicial

**Recomiendo la Opción B (Rediseño Moderno)** porque:
1. El sitio Wix actual tiene diseño datado (fuentes pesadas, layouts rígidos)
2. Un rediseño fresco con la paleta de colores existente + tipografía moderna transmite mejor la calma y espiritualidad
3. El page-builder modular en Sanity permite reorganizar secciones fácilmente
4. Next.js + Tailwind produce sitios más rápidos y mejor optimizados para SEO
5. El costo adicional de rediseño vs réplica es mínimo cuando ya se tiene el contenido extraído

**Acción inmediata más importante:** Extraer TODO el contenido del sitio Wix AHORA (mientras está accesible).

---

## Verificación

Para verificar el éxito de la migración:
1. `npm run dev` → verificar todas las rutas en localhost:3000
2. `npm run build` → verificar build sin errores
3. Comparar cada URL contra inventario del sitemap original
4. Google Search Console → verificar indexación post-migración
5. Google Ads → verificar campañas activas con el dominio
