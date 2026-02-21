import {writeClient} from './config.js'
import {slugify, docExists, uploadImageFromUrl, makeImageField, log} from './utils.js'
import fs from 'fs'
import {CONTENT_DIR} from './config.js'

export async function migrateBookstore() {
  const data = JSON.parse(fs.readFileSync(`${CONTENT_DIR}/libreria.json`, 'utf-8'))

  // Extract books from "books" section
  const booksSection = data.sections?.find((s: any) => s.type === 'books')
  const books: Array<{title: string; image?: string}> = booksSection?.books || []

  // Extract products from "products" section
  const productsSection = data.sections?.find((s: any) => s.type === 'products')
  const products: Array<{title: string; image?: string}> = productsSection?.items || []

  const allItems = [
    ...books.map((b) => ({...b, isBook: true})),
    ...products.map((p) => ({...p, isBook: false})),
  ]

  log('05-bookstore', `Migrating ${allItems.length} bookstore items (${books.length} books + ${products.length} products)...`)

  for (const item of allItems) {
    const slug = slugify(item.title)
    if (await docExists('bookstoreItem', slug)) {
      log('05-bookstore', `Skip (exists): ${item.title}`)
      continue
    }

    let image
    if (item.image) {
      try {
        const assetRef = await uploadImageFromUrl(item.image)
        image = makeImageField(assetRef, item.title)
      } catch (err) {
        log('05-bookstore', `Image upload failed for ${item.title}: ${err}`)
      }
    }

    await writeClient.create({
      _type: 'bookstoreItem',
      title: item.title,
      slug: {_type: 'slug', current: slug},
      author: item.isBook ? 'Paramahansa Yogananda' : undefined,
      language: 'Spanish',
      inStock: true,
      featured: false,
      ...(image ? {image} : {}),
    })

    log('05-bookstore', `Created: ${item.title}`)
  }

  log('05-bookstore', 'Done')
}
