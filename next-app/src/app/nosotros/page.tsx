import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about us and our mission.',
}

export default async function AboutPage() {
  const page = await getPageBySlug('nosotros')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1>About Us</h1>
        <p className="text-lg text-neutral-600 mb-6">
          Tell your story here. This is a placeholder for your About page content.
          Configure this page in Sanity Studio to add dynamic sections.
        </p>
        <h2>Our Mission</h2>
        <p>
          Describe your mission, vision, and values here.
          This content will be replaced when you configure the page in Sanity Studio.
        </p>
        <h2>Our Team</h2>
        <p>
          Introduce your team members and collaborators.
          Add images and bios through Sanity Studio sections.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button href="/contacto">Contact Us</Button>
          <Button href="/blog" variant="outline">Read Our Blog</Button>
        </div>
      </Container>
    </section>
  )
}
