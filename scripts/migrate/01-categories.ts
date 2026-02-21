import {writeClient} from './config.js'
import {slugify, docExists, log} from './utils.js'

const CATEGORIES = [
  {title: 'Eventos', description: 'Eventos y actividades del centro de meditación'},
  {title: 'Junio', description: 'Contenido especial del mes de junio'},
]

export async function migrateCategories() {
  log('01-categories', `Migrating ${CATEGORIES.length} categories...`)

  for (const cat of CATEGORIES) {
    const slug = slugify(cat.title)
    if (await docExists('category', slug)) {
      log('01-categories', `Skip (exists): ${cat.title}`)
      continue
    }

    await writeClient.create({
      _type: 'category',
      title: cat.title,
      slug: {_type: 'slug', current: slug},
      description: cat.description,
    })
    log('01-categories', `Created: ${cat.title}`)
  }

  log('01-categories', 'Done')
}
