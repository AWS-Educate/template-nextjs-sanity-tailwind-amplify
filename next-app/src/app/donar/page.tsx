import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support our work with your donation.',
}

export default async function DonatePage() {
  const page = await getPageBySlug('donar')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container className="max-w-2xl text-center">
        <h1>Support Our Work</h1>
        <p className="text-lg text-neutral-600 mb-8">
          Your donation helps us maintain our activities and continue our mission.
          Configure this page in Sanity Studio to add donation methods and details.
        </p>
        <div className="bg-primary-50 rounded-xl p-8 mb-8">
          <h2>How to Donate</h2>
          <p className="text-neutral-600">
            Add your donation methods here — bank transfer, payment links,
            or integrate with a payment provider. Contact us for more information.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contacto" size="lg">Contact to Donate</Button>
        </div>
      </Container>
    </section>
  )
}
