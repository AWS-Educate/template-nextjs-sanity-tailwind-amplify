import {writeClient} from './config.js'
import {
  slugify,
  docExists,
  textToPortableText,
  uploadImageFromUrl,
  makeImageField,
  log,
} from './utils.js'
import fs from 'fs'
import {CONTENT_DIR} from './config.js'

export async function migrateEvents() {
  log('07-events', 'Migrating events...')

  const homeData = JSON.parse(fs.readFileSync(`${CONTENT_DIR}/home.json`, 'utf-8'))

  // Extract featured-event sections from home.json
  const eventSections = homeData.sections?.filter(
    (s: any) => s.type === 'featured-event',
  ) || []

  log('07-events', `Found ${eventSections.length} events`)

  for (const ev of eventSections) {
    const slug = slugify(ev.heading || 'event')
    if (await docExists('event', slug)) {
      log('07-events', `Skip (exists): ${slug}`)
      continue
    }

    let image
    if (ev.image) {
      try {
        const assetRef = await uploadImageFromUrl(ev.image)
        image = makeImageField(assetRef, ev.heading)
      } catch (err) {
        log('07-events', `Image upload failed for ${slug}: ${err}`)
      }
    }

    const bodyText = ev.body || ''
    const description = bodyText ? textToPortableText(bodyText) : undefined

    await writeClient.create({
      _type: 'event',
      title: ev.heading || 'Evento',
      slug: {_type: 'slug', current: slug},
      description,
      startDate: '2025-10-18T09:00:00Z',
      endDate: '2025-10-20T23:59:00Z',
      location: 'En línea (Zoom)',
      ...(ev.cta?.href ? {registrationLink: ev.cta.href} : {}),
      ...(image ? {image} : {}),
    })

    log('07-events', `Created: ${slug}`)
  }

  log('07-events', 'Done')
}
