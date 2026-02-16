# Guía de Configuración - Sanity CMS

**Proyecto**: yogananda-bogota.org  
**Estado**: ✅ Configurado  
**Fecha**: 2026-02-16

---

## 🔧 Credenciales Configuradas

```
PROJECT_ID: jovlwcbx
DATASET:    production
```

---

## 📋 Checklist de Setup

### ✅ Completado

- [x] Sanity Project creado (PROJECT_ID: `jovlwcbx`)
- [x] Studio configurado (`studio/sanity.config.ts`)
- [x] CLI configurado (`studio/sanity.cli.ts`)
- [x] Schemas definidos (8 docs + 14 objects)
- [x] Cliente Next.js creado (`next-app/src/sanity/client.ts`)
- [x] GROQ queries definidas (20 queries)
- [x] TypeScript types generados (30+ types)
- [x] Environment variables configuradas

### ⏳ Pendiente

- [ ] Generar tipos TypeScript desde Sanity: `cd studio && npx sanity typegen generate`
- [ ] Crear contenido inicial en Sanity Studio
- [ ] Verificar conexión con `npm run dev`
- [ ] Deploy a producción

---

## 🚀 Próximos Pasos

### 1. Generar Tipos TypeScript (IMPORTANTE)

```bash
cd studio
npx sanity typegen generate
```

Esto generará los tipos reales desde tus esquemas en Sanity.

### 2. Iniciar Desarrollo Local

**Terminal 1 - Sanity Studio**:
```bash
cd studio
npm run dev
# Accesible en http://localhost:3333
```

**Terminal 2 - Next.js Frontend**:
```bash
cd next-app
npm run dev
# Accesible en http://localhost:3000
```

### 3. Crear Contenido en Sanity Studio

Una vez iniciado Sanity Studio, ve a:
- http://localhost:3333
- Crea documentos de prueba (posts, páginas, eventos)
- Los GROQ queries los fetcharán automáticamente

### 4. Verificar Conexión

En `next-app`, prueba crear una página:

```typescript
// next-app/src/app/test/page.tsx
import {getAllPosts} from '@/sanity'

export default async function TestPage() {
  const posts = await getAllPosts()
  return <pre>{JSON.stringify(posts, null, 2)}</pre>
}
```

Luego accede a http://localhost:3000/test

---

## 📦 Variables de Entorno

### Requeridas (Ya configuradas)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=jovlwcbx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=SRF Yogananda Bogotá
```

### Opcionales (Completar después)
```
SANITY_API_READ_TOKEN=        # Para preview/draft mode
SANITY_API_WRITE_TOKEN=        # Para mutations
NEXT_PUBLIC_GA4_ID=            # Google Analytics
NEXT_PUBLIC_SEGMENT_WRITE_KEY= # Segment Analytics
BETTER_AUTH_SECRET=            # Authentication
TURSO_DATABASE_URL=            # Database
TURSO_AUTH_TOKEN=              # Database Auth
```

---

## 🔗 URLs Importantes

| Recurso | URL |
|---------|-----|
| Sanity Studio (local) | http://localhost:3333 |
| Sanity Dashboard | https://manage.sanity.io |
| Next.js Frontend (local) | http://localhost:3000 |
| Sanity API | https://api.sanity.io |
| Sanity CDN | https://cdn.sanity.io |

---

## 🧪 Testing de Conexión

### Verificar que el cliente se inicializa correctamente

```bash
# En next-app/
npm run dev
# Busca en la consola que NO haya errores como:
# "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
```

### Verificar GROQ queries

Copia cualquier query en Sanity Vision (http://localhost:3333):

```groq
*[_type == "post"][0..5] {
  title,
  slug,
  publishedAt
}
```

Debería retornar posts si existen en Sanity.

---

## 📝 Archivos de Configuración

| Archivo | Propósito | Estado |
|---------|-----------|--------|
| `studio/sanity.config.ts` | Config Sanity Studio | ✅ Configurado |
| `studio/sanity.cli.ts` | CLI config | ✅ Configurado |
| `next-app/.env.local` | Vars locales | ✅ Creado |
| `next-app/.env.local.example` | Template | ✅ Actualizado |
| `next-app/src/sanity/client.ts` | Cliente | ✅ Listo |
| `next-app/src/sanity/queries.ts` | GROQ queries | ✅ 20 queries |
| `next-app/src/sanity/types.ts` | TypeScript | ✅ 30+ tipos |
| `next-app/src/sanity/lib.ts` | Helpers | ✅ 20+ funciones |

---

## ⚠️ Notas Importantes

1. **`.env.local` NO está en git** (en `.gitignore` por seguridad)
   - Se creó localmente pero no se commitea
   - Cada developer debe tener su propia copia

2. **TypeScript types** deben regenerarse después de cambios en schemas
   ```bash
   cd studio && npx sanity typegen generate
   ```

3. **CDN está habilitado** en el cliente público
   - Cachea agresivamente para mejor performance
   - Ideal para contenido público

4. **Middleware de redirects** está activo
   - Redirects 301/302/307/308 funcionan automáticamente
   - Basado en tabla `legacyRedirect` en Sanity

---

## 🔐 Seguridad

- ✅ API tokens no están en `.env.local` (no commitear)
- ✅ Proyecto ID es público (es normal)
- ✅ Dataset es público (es normal)
- ✅ Credenciales de escritura nunca en frontend

---

## 📞 Troubleshooting

### Error: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
- Verifica que `.env.local` tenga: `NEXT_PUBLIC_SANITY_PROJECT_ID=jovlwcbx`
- Reinicia `npm run dev`

### Error: "Cannot fetch from Sanity"
- Verifica que Sanity Studio esté en http://localhost:3333
- Verifica credenciales en `.env.local`
- Revisa console logs en browser

### Queries retornan datos vacíos
- Crea contenido primero en Sanity Studio
- Verifica que los documentos tengan fields requeridos
- Usa Vision en Studio para testear queries

---

## 🎯 Próxima Fase: Fase 5

Ahora que la configuración está lista, podemos:
1. Crear páginas Next.js (`page.tsx`, `blog/[slug]/page.tsx`, etc.)
2. Crear componentes (SectionRenderer, Header, Footer, etc.)
3. Integrar queries GROQ en páginas

Ver: [PHASE-PROGRESS.md](./PHASE-PROGRESS.md)

---

*Última actualización: 2026-02-16 - Sanity Setup Completo*
