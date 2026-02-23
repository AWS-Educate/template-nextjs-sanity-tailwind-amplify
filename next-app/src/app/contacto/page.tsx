import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with us. We would love to hear from you.',
}

export default async function ContactPage() {
  const page = await getPageBySlug('contacto')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-center mb-4">Contact</h1>
        <p className="text-center text-neutral-500 max-w-xl mx-auto mb-12">
          Get in touch with us for more information about our activities.
        </p>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div>
            <h2>Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-base">Email</h3>
                <a href="mailto:{{CONTACT_EMAIL}}" className="text-secondary-500">
                  {'{{CONTACT_EMAIL}}'}
                </a>
              </div>
              <div>
                <h3 className="text-base">Phone</h3>
                <a href="tel:{{CONTACT_PHONE}}" className="text-secondary-500">
                  {'{{CONTACT_PHONE}}'}
                </a>
              </div>
              <div>
                <h3 className="text-base">Social Media</h3>
                <div className="flex gap-4">
                  {/* Add your social media links here */}
                </div>
              </div>
            </div>
          </div>

          {/* Simple form */}
          <div>
            <h2>Send Us a Message</h2>
            <form className="space-y-4" action="mailto:{{CONTACT_EMAIL}}" method="GET">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                <input type="text" name="subject" placeholder="Your name" className="w-full rounded-lg border border-neutral-300 px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                <textarea name="body" rows={4} placeholder="Your message..." className="w-full rounded-lg border border-neutral-300 px-4 py-2" />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
