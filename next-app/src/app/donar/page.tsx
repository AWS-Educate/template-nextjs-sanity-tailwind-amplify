import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Donar',
  description: 'Apoya al Grupo de Meditación SRF Bogotá con tu donación.',
}

export default async function DonarPage() {
  const page = await getPageBySlug('donar')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container className="max-w-2xl text-center">
        <h1>Apoya Nuestra Labor</h1>
        <p className="text-lg text-neutral-600 mb-8">
          Tu donación nos ayuda a mantener las actividades del grupo de meditación,
          los servicios de inspiración y la difusión de las enseñanzas de Paramahansa Yogananda
          en Bogotá.
        </p>
        <div className="bg-primary-50 rounded-xl p-8 mb-8">
          <h2>Formas de Donar</h2>
          <p className="text-neutral-600">
            Puedes realizar tu donación a través de transferencia bancaria o en persona
            durante nuestras actividades. Contacta con nosotros para más información.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contacto" size="lg">Contactar para Donar</Button>
          <Button href="https://www.yogananda.org/donate" variant="outline" size="lg" className="!no-underline">
            Donar a SRF Internacional
          </Button>
        </div>
      </Container>
    </section>
  )
}
