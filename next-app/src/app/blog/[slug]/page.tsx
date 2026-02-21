import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import {getPostBySlug, getAllPostsSlugs} from '@/sanity/lib'

interface Props {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const slugs = await getAllPostsSlugs()
  return (slugs as {params: {slug: string}}[]).map(s => ({slug: s.params.slug}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const post = await getPostBySlug(slug)
  if (!post) return {title: 'Post no encontrado'}
  return {
    title: post.title,
    description: post.excerpt || `Lee ${post.title} en el blog de SRF Bogotá.`,
  }
}

export default async function BlogPostPage({params}: Props) {
  const {slug} = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="py-16">
      <Container className="max-w-3xl">
        {post.tags?.length && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
          </div>
        )}
        <h1>{post.title}</h1>
        {post.publishedAt && (
          <p className="text-neutral-500 mb-8">
            <time>{new Date(post.publishedAt).toLocaleDateString('es-CO', {year: 'numeric', month: 'long', day: 'numeric'})}</time>
          </p>
        )}
        {post.mainImage && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
            <SanityImage image={post.mainImage} fill sizes="(max-width:768px) 100vw, 768px" priority />
          </div>
        )}
        <PortableTextRenderer value={post.body} />
        <div className="mt-12 pt-8 border-t border-neutral-200 text-center">
          <Button href="/blog" variant="outline">Volver al Blog</Button>
        </div>
      </Container>
    </article>
  )
}
