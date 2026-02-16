import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import {getAllPosts} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos sobre meditación, Kriya Yoga y las enseñanzas de Paramahansa Yogananda.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-center mb-4">Blog</h1>
        <p className="text-center text-neutral-500 max-w-xl mx-auto mb-12">
          Artículos sobre meditación, espiritualidad y las enseñanzas de Paramahansa Yogananda.
        </p>
        {posts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <Card
                key={post._id}
                title={post.title}
                description={post.excerpt}
                image={post.mainImage}
                href={`/blog/${post.slug.current}`}
                date={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-CO') : undefined}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500">No hay publicaciones aún. Pronto agregaremos contenido.</p>
        )}
      </Container>
    </section>
  )
}
