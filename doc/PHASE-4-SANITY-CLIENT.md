# Fase 4: Cliente Sanity + GROQ Queries

**Estado**: ✅ COMPLETADA - 2026-02-16

## Objetivo
Crear el cliente Sanity y las queries GROQ optimizadas para conectar el frontend Next.js con el CMS.

---

## Archivos Creados

### 1. `/next-app/src/sanity/client.ts` (32 líneas)
**Propósito**: Configurar cliente Sanity para frontend

```typescript
- client: Lectura pública (CDN, perspectiva 'published')
- serverClient: Lectura con token (sin CDN, perspectiva 'previewDrafts')
- apiVersion: 2025-02-16
- Validación: Throws si faltan env vars SANITY_PROJECT_ID o SANITY_DATASET
```

**Uso**:
```typescript
import {client, serverClient} from '@/sanity'
const posts = await client.fetch(POST_BY_SLUG_QUERY, {slug})
```

---

### 2. `/next-app/src/sanity/types.ts` (264 líneas)
**Propósito**: Tipos TypeScript para todos los documentos y objetos Sanity

**Tipos de Documentos**:
- `Post` - Blog posts con category, tags, seo
- `Category` - Blog categories
- `Page` - Páginas modulares
- `Event` - Eventos con zoom, registro
- `Schedule` - Programación semanal
- `SiteSettings` - Configuración global
- `BookstoreItem` - Librería
- `LegacyRedirect` - URL redirects

**Tipos de Objetos**:
- `SEO`, `NavItem`, `HeroSection`, `TextSection`, `CtaSection`
- `ImageTextSection`, `ScheduleSection`, `BlogFeedSection`, `ContactFormSection`
- `DonationSection`, `BannerSection`, `QuoteSection`, `GallerySection`, `EventRegistrationSection`

**Tipos Compartidos**:
- `Slug`, `Image`, `PortableText`, `FormField`, `ScheduleItem`, `SocialLink`
- `Section` - Union type de todas las secciones
- `SanityResponse<T>`, `PaginatedResponse<T>`

**Uso**:
```typescript
import type {Post, Page, Event} from '@/sanity'

const post: Post = await getPostBySlug('my-post')
```

---

### 3. `/next-app/src/sanity/queries.ts` (344 líneas)
**Propósito**: GROQ queries optimizadas por recurso

#### **Site Settings**
- `SITE_SETTINGS_QUERY` - Logo, nav, contacto, redes

#### **Blog Posts** (6 queries)
- `ALL_POSTS_QUERY` - Todos los posts (ordenados por fecha)
- `POST_BY_SLUG_QUERY` - Post individual con contenido completo
- `POSTS_BY_CATEGORY_QUERY` - Posts por categoría
- `RELATED_POSTS_QUERY` - Posts relacionados
- `SEARCH_POSTS_QUERY` - Búsqueda por título/excerpt

#### **Categories** (2 queries)
- `ALL_CATEGORIES_QUERY` - Todas las categorías
- `CATEGORY_BY_SLUG_QUERY` - Categoría individual

#### **Pages** (2 queries)
- `PAGE_BY_SLUG_QUERY` - Página con secciones renderables
- `HOME_PAGE_QUERY` - Homepage específica

#### **Events** (2 queries)
- `UPCOMING_EVENTS_QUERY` - Eventos futuros ordenados
- `EVENT_BY_SLUG_QUERY` - Evento individual

#### **Schedule** (2 queries)
- `CURRENT_SCHEDULE_QUERY` - Programación semanal activa
- `SCHEDULE_BY_WEEK_QUERY` - Programación específica por semana

#### **Bookstore** (4 queries)
- `ALL_BOOKS_QUERY` - Todos los libros en stock
- `FEATURED_BOOKS_QUERY` - Libros destacados
- `BOOK_BY_SLUG_QUERY` - Libro individual
- `BOOKS_BY_CATEGORY_QUERY` - Libros por categoría

#### **Redirects** (2 queries)
- `LEGACY_REDIRECT_QUERY` - Redirect individual por oldPath
- `ALL_REDIRECTS_QUERY` - Todos los redirects activos

#### **Utilidades** (4 queries)
- `ALL_POSTS_SLUGS_QUERY` - Slugs para SSG
- `ALL_PAGES_SLUGS_QUERY` - Slugs para SSG
- `ALL_EVENTS_SLUGS_QUERY` - Slugs para SSG
- `ALL_BOOKS_SLUGS_QUERY` - Slugs para SSG

**Características de Optimización**:
- ✅ Projection: Solo campos necesarios
- ✅ Asset references resueltas (`asset->url`)
- ✅ Order by: Ordenamiento optimizado
- ✅ Match: Búsqueda full-text
- ✅ Condition filter: Filtros de estado

---

### 4. `/next-app/src/sanity/lib.ts` (232 líneas)
**Propósito**: Funciones helper para ejecutar queries con manejo de errores

**Función Base**:
```typescript
fetchSanity<T>(query: string, params?: Record<string, unknown>): Promise<T | null>
- Error handling incorporado
- Retorna null en caso de error
```

**Funciones por Tipo**:

**Site Settings**
- `getSiteSettings()` - Obtener configuración global

**Blog**
- `getAllPosts()` - Todos los posts
- `getPostBySlug(slug)` - Post individual
- `getPostsByCategory(categoryId)` - Posts por categoría
- `getRelatedPosts(categoryId, postId)` - Posts relacionados
- `searchPosts(searchTerm)` - Búsqueda

**Categories**
- `getAllCategories()` - Todas las categorías
- `getCategoryBySlug(slug)` - Categoría individual

**Pages**
- `getPageBySlug(slug)` - Página individual
- `getHomePage()` - Homepage

**Events**
- `getUpcomingEvents()` - Eventos futuros
- `getEventBySlug(slug)` - Evento individual

**Schedule**
- `getCurrentSchedule()` - Programación actual
- `getScheduleByWeek(week, year)` - Programación por semana

**Bookstore**
- `getAllBooks()` - Todos los libros
- `getFeaturedBooks()` - Libros destacados
- `getBookBySlug(slug)` - Libro individual
- `getBooksByCategory(category)` - Libros por categoría

**Redirects**
- `getLegacyRedirect(oldPath)` - Obtener redirect

**Static Generation**
- `getAllPostsSlugs()` - Slugs para SSG
- `getAllPagesSlugs()` - Slugs para SSG
- `getAllEventsSlugs()` - Slugs para SSG
- `getAllBooksSlugs()` - Slugs para SSG

**Image Utilities**
- `getSanityImageUrl(assetId, width?, height?, fit?)` - URL de imagen con transformaciones

**Uso**:
```typescript
import {getPostBySlug, getUpcomingEvents, getSiteSettings} from '@/sanity'

const post = await getPostBySlug('my-post')
const events = await getUpcomingEvents()
const siteConfig = await getSiteSettings()
```

---

### 5. `/next-app/src/middleware.ts` (24 líneas)
**Propósito**: Manejar redirects 301 desde URLs legacy de Wix

```typescript
- Intercepta cada request
- Verifica en tabla legacyRedirect
- Retorna redirect con status code apropiado
- Matcher: Excluye assets estáticos
```

**Uso Automático**:
```
/antiguo-url → /nueva-url (status 301)
```

---

### 6. `/next-app/src/sanity/index.ts` (8 líneas)
**Propósito**: Re-export central para facilitar imports

```typescript
export {client, serverClient} from './client'
export * from './lib'
export * from './types'
export * from './queries'
```

**Uso**:
```typescript
import {getPostBySlug, client, type Post} from '@/sanity'
```

---

## Resumen de Queries

| Query | Propósito | Cache | SSG |
|-------|-----------|-------|-----|
| `SITE_SETTINGS_QUERY` | Config global | ✅ ISR 3600s | ✅ Singleton |
| `ALL_POSTS_QUERY` | Lista de posts | ✅ ISR 1800s | ❌ Dinámico |
| `POST_BY_SLUG_QUERY` | Post individual | ✅ ISR 3600s | ✅ SSG |
| `PAGE_BY_SLUG_QUERY` | Página individual | ✅ ISR 3600s | ✅ SSG |
| `UPCOMING_EVENTS_QUERY` | Eventos futuros | ✅ ISR 900s | ❌ Dinámico |
| `ALL_BOOKS_QUERY` | Librería | ✅ ISR 1800s | ❌ Dinámico |
| `LEGACY_REDIRECT_QUERY` | Redirects | ✅ ISR 86400s | ❌ Middleware |

---

## Arquitectura de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                         │
├─────────────────────────────────────────────────────────────┤
│  Pages (/app)        Components          Lib (@/sanity)     │
│  ├── page.tsx        ├── sections/       ├── client.ts      │
│  ├── blog/[slug]     ├── shared/         ├── lib.ts         │
│  ├── events/         ├── ui/             ├── queries.ts     │
│  └── libreria/       └── ...             ├── types.ts       │
│                                          ├── middleware.ts  │
│                                          └── index.ts       │
└─────────────────────────────────────────────────────────────┘
                          ↕ (GROQ Queries)
┌─────────────────────────────────────────────────────────────┐
│                  SANITY CMS (Backend)                       │
├─────────────────────────────────────────────────────────────┤
│  Schemas (8 docs + 14 objects)                              │
│  ├── post, category, page, event, schedule                  │
│  ├── siteSettings, bookstoreItem, legacyRedirect            │
│  └── 14 section object types                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Próximos Pasos: Fase 5

### Crear Páginas y Componentes Next.js
1. Crear layout.tsx global
2. Crear page.tsx (homepage)
3. Crear blog/[slug]/page.tsx
4. Crear eventos/page.tsx
5. Crear libreria/page.tsx
6. Crear componentes de secciones (SectionRenderer)
7. Crear componentes compartidos (Header, Footer, Nav)

### Integración con Componentes
```typescript
// Ejemplo de uso en página
import {getPageBySlug} from '@/sanity'
import {SectionRenderer} from '@/components/SectionRenderer'

export default async function PageView({params}: {params: {slug: string}}) {
  const page = await getPageBySlug(params.slug)
  
  return (
    <main>
      {page?.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  )
}
```

---

## Configuración Requerida

Asegurate de que `.env.local` tenga:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=tu_dataset
SANITY_API_READ_TOKEN=tu_token (opcional, para preview)
```

---

**Archivos Creados**: 6
**Total Líneas**: 905 líneas de código
**Commit**: [próximo]

*Fase 4 completada - Listo para Fase 5*
