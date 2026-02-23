import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import {getPageBySlug, getAllPagesSlugs} from '@/sanity/lib'

/**
 * Dynamic page route — renders any Sanity "page" document by its slug.
 * Create pages in Sanity Studio and they will automatically appear here.
 */

// Reserved slugs that have their own route folders
const RESERVED_SLUGS = ['blog', 'contacto', 'donar', 'libreria', 'nosotros', 'programacion']

interface Props {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const slugs = await getAllPagesSlugs()
  return (slugs as {params: {slug: string}}[])
    .map(s => ({slug: s.params.slug}))
    .filter(s => !RESERVED_SLUGS.includes(s.slug) && s.slug !== 'home')
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const page = await getPageBySlug(slug)
  if (!page) return {title: 'Page not found'}
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || `${page.title} — {{PROJECT_NAME}}`,
  }
}

export default async function DynamicPage({params}: Props) {
  const {slug} = await params
  const page = await getPageBySlug(slug)
  if (!page) notFound()

  // If the page has sections configured in Sanity, render them
  if (page.sections?.length) {
    return <SectionRenderer sections={page.sections} />
  }

  // Fallback: empty page shell
  return (
    <section className="py-16">
      <Container className="max-w-3xl text-center">
        <h1>{page.title}</h1>
        <p className="text-neutral-500">
          This page has no sections configured yet. Add content in Sanity Studio.
        </p>
      </Container>
    </section>
  )
}

