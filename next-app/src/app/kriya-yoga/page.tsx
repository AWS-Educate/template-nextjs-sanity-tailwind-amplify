import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Kriya Yoga',
  description: 'Aprende sobre el Kriya Yoga, la ciencia sagrada de la meditación enseñada por Paramahansa Yogananda.',
}

export default async function KriyaYogaPage() {
  const page = await getPageBySlug('kriya-yoga')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1>Kriya Yoga</h1>
        <p className="text-lg text-neutral-600 mb-6">
          El Kriya Yoga es una avanzada técnica de meditación que acelera la evolución espiritual
          del ser humano. Fue revivida en la era moderna por Mahavatar Babaji y transmitida a
          través del linaje de grandes maestros.
        </p>
        <h2>La Ciencia del Kriya Yoga</h2>
        <p>
          El Kriya Yoga trabaja directamente con la energía y la conciencia, utilizando técnicas
          de pranayama (control de la energía vital) y meditación para acelerar el desarrollo
          espiritual. Paramahansa Yogananda describió el Kriya Yoga como &ldquo;el avión de ruta
          hacia Dios&rdquo;.
        </p>
        <h2>Cómo Aprender Kriya Yoga</h2>
        <p>
          Las técnicas del Kriya Yoga se enseñan a través de las Lecciones de Self-Realization
          Fellowship. Después de un período de preparación y práctica de técnicas preliminares,
          los estudiantes pueden solicitar la iniciación en el Kriya Yoga.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button href="/lecciones-srf">Lecciones SRF</Button>
          <Button href="/contacto" variant="outline">Más Información</Button>
        </div>
      </Container>
    </section>
  )
}
