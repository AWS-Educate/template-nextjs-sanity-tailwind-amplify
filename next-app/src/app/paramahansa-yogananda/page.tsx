import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Paramahansa Yogananda',
  description: 'Conoce la vida y enseñanzas de Paramahansa Yogananda, autor de Autobiografía de un Yogui.',
}

export default async function YoganandaPage() {
  const page = await getPageBySlug('paramahansa-yogananda')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1>Paramahansa Yogananda</h1>
        <p className="text-lg text-neutral-600 mb-6">
          Paramahansa Yogananda (1893–1952) fue un maestro espiritual y yogui indio que introdujo
          las enseñanzas del Kriya Yoga en Occidente. Es ampliamente reconocido como uno de los
          grandes maestros espirituales del siglo XX.
        </p>
        <h2>Su Vida</h2>
        <p>
          Nacido como Mukunda Lal Ghosh en Gorakhpur, India, Yogananda mostró desde temprana edad
          una intensa búsqueda espiritual. Fue discípulo de Swami Sri Yukteswar Giri y recibió
          el encargo de difundir las enseñanzas del Kriya Yoga en Occidente.
        </p>
        <h2>Su Legado</h2>
        <p>
          En 1920, Yogananda viajó a Estados Unidos donde fundó Self-Realization Fellowship.
          Su libro &ldquo;Autobiografía de un Yogui&rdquo; ha sido traducido a más de 50 idiomas
          y es considerado un clásico espiritual moderno.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button href="/autobiografia-de">Autobiografía de un Yogui</Button>
          <Button href="/kriya-yoga" variant="outline">Kriya Yoga</Button>
        </div>
      </Container>
    </section>
  )
}
