# 📚 Documentación del Proyecto - Migración Yogananda Bogotá

Directorio centralizado para toda la documentación del proyecto de migración de Wix → Next.js + Sanity + AWS Amplify.

## 📁 Estructura

```
/doc/
├── README.md                          # Este archivo
├── MIGRATION-PLAN.md                  # Plan detallado de las 10 fases
├── PHASE-PROGRESS.md                  # Registro de progreso por fase
├── EXTRACTION-SUMMARY.md              # Resumen de extracción de contenido
├── content-extracted/                 # Contenido extraído del sitio Wix
│   ├── *.json                         # 14 páginas en formato JSON
│   ├── screenshots/                   # 13 screenshots completos
│   └── extracted-data/                # Datos auxiliares
└── extracted-data/                    # Imágenes y datos adicionales
```

## 📋 Archivos Clave

### 1. **MIGRATION-PLAN.md**
Plan maestro del proyecto con:
- ✅ Inventario del sitio Wix (15 páginas, 38 posts, 3 formularios)
- ✅ Tokens visuales (colores, fuentes)
- ✅ 10 fases de implementación (desde Setup hasta Post-Migración)
- ✅ Cronograma de 4 semanas
- ✅ Riesgos y mitigaciones

### 2. **PHASE-PROGRESS.md** (antes memory-log.md)
Registro detallado de cada fase:
- **Fase 0:** ✅ Setup Inicial - COMPLETADA
- **Fase 1:** ✅ Extracción de Contenido - COMPLETADA
- **Fase 2:** 🔄 Sistema de Diseño (próxima)

### 3. **EXTRACTION-SUMMARY.md**
Detalles completos de la extracción de Fase 1:
- 14 páginas estáticas extraídas
- 37+ libros catalogados
- 5 centros SRF identificados en Colombia
- Información legal completa

## 🔗 Contenido Extraído

### Páginas Estáticas (14 total)
```json
✅ home.json              (/home)
✅ nosotros.json         (/nosotros)
✅ paramahansa-yogananda.json
✅ kriya-yoga.json
✅ autobiografia-de.json
✅ lecciones-srf.json
✅ programacion.json     (blog feed)
✅ escuela-dominical.json
✅ libreria.json         (37+ libros)
✅ blog.json
✅ contacto.json         (5 centros)
✅ donar.json
✅ webinar-registration.json
✅ webinar-registration-1.json
```

### Screenshots
- Ubicación: `/doc/content-extracted/screenshots/`
- Formato: PNG completo (fullPage)
- Tamaño: ~85 MB total

## 🎨 Paleta de Colores
(Del sitio original Wix)
- **Azul profundo:** `#173981`
- **Naranja cálido:** `#DE6B2F`
- **Oliva/Salvia:** `#696C0E`
- **Crema:** `#F0F0E6`
- **Navy:** `#1E3650`

## 📞 Información Clave

**Centro Principal:**
- Dirección: Kra 3A No 46-48 Chapinero, Bogotá
- WhatsApp: +57 312 4202518
- Email: centro@yogananda-bogota.org

**Otros centros en Colombia:**
- Manizales, Cali, Medellín, Pereira (ver EXTRACTION-SUMMARY.md)

## 🚀 Próximas Fases

| Fase | Nombre | Archivo Objetivo |
|------|--------|-----------------|
| 2 | Sistema de Diseño | `next-app/src/app/globals.css` |
| 3 | Schemas Sanity | `studio/schemas/*.ts` |
| 4 | Cliente + Queries | `next-app/src/sanity/*` |
| 5 | Páginas Next.js | `next-app/src/app/**/*.tsx` |
| 6+ | Migración, Redirects, Testing, Deploy |  |

## 📌 Notas

- **Branch:** `development` (nunca editar `main`)
- **Documentación:** Consultar MIGRATION-PLAN.md antes de iniciar cada fase
- **Actualización:** Al finalizar cada fase, actualizar PHASE-PROGRESS.md
- **Contacto:** Edwin García Lozano (usuario del proyecto)

---

*Última actualización: 2026-02-16*
*Consolidación de `.claude/plans/` y `/doc/`*
