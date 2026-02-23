import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import {getAllPosts} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles, news, and updates.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-center mb-4">Blog</h1>
        <p className="text-center text-neutral-500 max-w-xl mx-auto mb-12">
          Our latest articles, news, and insights.
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
                date={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US') : undefined}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500">No posts yet. Create your first post in Sanity Studio.</p>
        )}
      </Container>
    </section>
  )
}
