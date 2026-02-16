import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'jovlwcbx',
  dataset: 'production',
  apiVersion: '2025-02-16',
  useCdn: true,
})

const query = `
  *[_type == "post" && publishedAt != null] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author->{name},
    category->{title, slug},
    tags,
    _createdAt,
    _updatedAt
  }
`

try {
  const posts = await client.fetch(query)
  console.log(`\n📚 POSTS PUBLICADOS - Proyecto: jovlwcbx\n`)
  console.log(`Total: ${posts.length} posts\n`)
  console.log(JSON.stringify(posts, null, 2))
} catch (error) {
  console.error('Error al consultar Sanity:', error.message)
  process.exit(1)
}
