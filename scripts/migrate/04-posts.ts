import {writeClient} from './config.js'
import {slugify, docExists, uploadImageFromUrl, makeImageField, log} from './utils.js'
import fs from 'fs'
import {CONTENT_DIR} from './config.js'

// Collect unique blog posts from home.json + programacion.json
function collectPosts(): Array<{title: string; slug: string; date: string; image?: string}> {
  const seen = new Set<string>()
  const posts: Array<{title: string; slug: string; date: string; image?: string}> = []

  // From home.json blog-feed
  const homeData = JSON.parse(fs.readFileSync(`${CONTENT_DIR}/home.json`, 'utf-8'))
  const blogFeed = homeData.sections?.find((s: any) => s.type === 'blog-feed')
  if (blogFeed?.posts) {
    for (const p of blogFeed.posts) {
      if (!seen.has(p.slug)) {
        seen.add(p.slug)
        posts.push({title: p.title, slug: p.slug, date: p.date, image: p.image})
      }
    }
  }

  // From programacion.json recentPosts
  const progData = JSON.parse(fs.readFileSync(`${CONTENT_DIR}/programacion.json`, 'utf-8'))
  if (progData.recentPosts) {
    for (const p of progData.recentPosts) {
      if (!seen.has(p.slug)) {
        seen.add(p.slug)
        posts.push({title: p.title, slug: p.slug, date: p.date, image: p.image})
      }
    }
  }

  return posts
}

function parseSpanishDate(dateStr: string): string {
  const months: Record<string, string> = {
    ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06',
    jul: '07', ago: '08', sept: '09', sep: '09', oct: '10', nov: '11', dic: '12',
  }
  // Format: "11 dic 2025"
  const parts = dateStr.trim().toLowerCase().split(/\s+/)
  if (parts.length < 3) return new Date().toISOString()
  const day = parts[0].padStart(2, '0')
  const month = months[parts[1]] || '01'
  const year = parts[2]
  return `${year}-${month}-${day}T12:00:00Z`
}

export async function migratePosts() {
  const posts = collectPosts()
  log('04-posts', `Migrating ${posts.length} blog post stubs...`)

  // Get "Eventos" category ref
  const eventsCat = await writeClient.fetch<{_id: string} | null>(
    `*[_type == "category" && slug.current == "eventos"][0]{_id}`,
  )

  for (const post of posts) {
    const slug = slugify(post.slug)
    if (await docExists('post', slug)) {
      log('04-posts', `Skip (exists): ${slug}`)
      continue
    }

    let mainImage
    if (post.image) {
      try {
        const assetRef = await uploadImageFromUrl(post.image)
        mainImage = makeImageField(assetRef, post.title)
      } catch (err) {
        log('04-posts', `Image upload failed for ${slug}: ${err}`)
      }
    }

    await writeClient.create({
      _type: 'post',
      title: post.title,
      slug: {_type: 'slug', current: slug},
      publishedAt: parseSpanishDate(post.date),
      ...(mainImage ? {mainImage} : {}),
      ...(eventsCat ? {category: {_ref: eventsCat._id, _type: 'reference'}} : {}),
    })

    log('04-posts', `Created stub: ${slug}`)
  }

  log('04-posts', 'Done')
}
