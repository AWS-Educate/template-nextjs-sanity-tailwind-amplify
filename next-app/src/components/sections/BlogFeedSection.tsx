import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import {getAllPosts} from '@/sanity/lib'

export default async function BlogFeedSection({data}: {data: {_type: 'blogFeedSection'; title?: string; limit?: number}}) {
  const posts = await getAllPosts()
  const limited = posts.slice(0, data.limit || 6)

  return (
    <section className="py-16">
      <Container>
        <h2 className="text-center mb-10">{data.title || 'Publicaciones Recientes'}</h2>
        {limited.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {limited.map(post => (
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
          <p className="text-center text-neutral-500">No hay publicaciones aún.</p>
        )}
      </Container>
    </section>
  )
}
