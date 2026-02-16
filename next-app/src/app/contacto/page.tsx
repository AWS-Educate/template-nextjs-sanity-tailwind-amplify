import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta al Grupo de Meditación SRF Bogotá. Información de centros y grupos de meditación.',
}

export default async function ContactoPage() {
  const page = await getPageBySlug('contacto')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-center mb-4">Contacto</h1>
        <p className="text-center text-neutral-500 max-w-xl mx-auto mb-12">
          Ponte en contacto con nosotros para más información sobre nuestras actividades.
        </p>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div>
            <h2>Información de Contacto</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-base">Correo Electrónico</h3>
                <a href="mailto:centro@yogananda-bogota.org" className="text-secondary-500">
                  centro@yogananda-bogota.org
                </a>
              </div>
              <div>
                <h3 className="text-base">WhatsApp</h3>
                <a href="https://wa.me/573124202518" className="text-secondary-500" target="_blank" rel="noopener noreferrer">
                  +57 312 4202518
                </a>
              </div>
              <div>
                <h3 className="text-base">Redes Sociales</h3>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/SRFBogota" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-secondary-500">Facebook</a>
                  <a href="https://www.instagram.com/srfbogota" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-secondary-500">Instagram</a>
                  <a href="https://www.youtube.com/@srfbogota" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-secondary-500">YouTube</a>
                </div>
              </div>
            </div>
          </div>

          {/* Simple form */}
          <div>
            <h2>Envíanos un Mensaje</h2>
            <form className="space-y-4" action="mailto:centro@yogananda-bogota.org" method="GET">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre</label>
                <input type="text" name="subject" placeholder="Tu nombre" className="w-full rounded-lg border border-neutral-300 px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Mensaje</label>
                <textarea name="body" rows={4} placeholder="Tu mensaje..." className="w-full rounded-lg border border-neutral-300 px-4 py-2" />
              </div>
              <Button type="submit">Enviar Mensaje</Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
