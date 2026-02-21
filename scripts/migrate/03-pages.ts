import {writeClient} from './config.js'
import {slugify, docExists, log} from './utils.js'
import {mapSections} from './section-mapper.js'
import fs from 'fs'
import path from 'path'
import {CONTENT_DIR} from './config.js'

// All 14 extracted JSON files and their page slugs
const PAGE_FILES = [
  {file: 'home.json', slug: 'inicio', titleOverride: 'Inicio'},
  {file: 'nosotros.json', slug: 'nosotros'},
  {file: 'paramahansa-yogananda.json', slug: 'paramahansa-yogananda'},
  {file: 'kriya-yoga.json', slug: 'kriya-yoga'},
  {file: 'autobiografia-de.json', slug: 'autobiografia-de'},
  {file: 'lecciones-srf.json', slug: 'lecciones-srf'},
  {file: 'programacion.json', slug: 'programacion'},
  {file: 'escuela-dominical.json', slug: 'escuela-dominical'},
  {file: 'libreria.json', slug: 'libreria'},
  {file: 'blog.json', slug: 'blog'},
  {file: 'contacto.json', slug: 'contacto'},
  {file: 'donar.json', slug: 'donar'},
  {file: 'webinar-registration.json', slug: 'webinar-registration'},
  {file: 'webinar-registration-1.json', slug: 'webinar-registration-1'},
]

export async function migratePages() {
  log('03-pages', `Migrating ${PAGE_FILES.length} pages...`)

  for (const pageDef of PAGE_FILES) {
    if (await docExists('page', pageDef.slug)) {
      log('03-pages', `Skip (exists): ${pageDef.slug}`)
      continue
    }

    const filePath = path.join(CONTENT_DIR, pageDef.file)
    if (!fs.existsSync(filePath)) {
      log('03-pages', `Skip (file not found): ${pageDef.file}`)
      continue
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const rawSections = data.sections || []

    // For libreria, skip the "books" and "products" sections (handled by 05-bookstore)
    const filteredSections = rawSections.filter(
      (s: any) => s.type !== 'books' && s.type !== 'products',
    )

    let sections
    try {
      sections = await mapSections(filteredSections)
    } catch (err) {
      log('03-pages', `Error mapping sections for ${pageDef.slug}: ${err}`)
      continue
    }

    if (sections.length === 0) {
      // Add a minimal text section for pages with no mappable sections (e.g., blog index)
      sections = [
        {
          _type: 'blogFeedSection',
          _key: 'blogfeed',
          title: data.title || 'Blog',
          limit: 6,
        },
      ]
    }

    const title = pageDef.titleOverride || data.title || pageDef.slug

    const seo = data.metaDescription
      ? {
          _type: 'seo',
          title: title.slice(0, 60),
          description: data.metaDescription.slice(0, 160),
        }
      : undefined

    await writeClient.create({
      _type: 'page',
      title,
      slug: {_type: 'slug', current: pageDef.slug},
      sections,
      publishedAt: new Date().toISOString(),
      ...(seo ? {seo} : {}),
    })

    log('03-pages', `Created: ${pageDef.slug} (${sections.length} sections)`)
  }

  log('03-pages', 'Done')
}
