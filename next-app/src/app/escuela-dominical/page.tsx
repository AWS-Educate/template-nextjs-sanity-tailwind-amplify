import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Escuela Dominical',
  description: 'Escuela Dominical SRF para niños y jóvenes en Bogotá.',
}

export default async function EscuelaDominicalPage() {
  const page = await getPageBySlug('escuela-dominical')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1>Escuela Dominical</h1>
        <p className="text-lg text-neutral-600 mb-6">
          La Escuela Dominical de SRF ofrece enseñanzas espirituales adaptadas para niños y
          jóvenes, basadas en los principios universales de Paramahansa Yogananda.
        </p>
        <h2>Para Niños y Jóvenes</h2>
        <p>
          A través de actividades creativas, historias inspiradoras y técnicas de meditación
          sencillas, los niños aprenden valores universales como la paz, el amor y la compasión.
        </p>
        <h2>Horarios</h2>
        <p>
          Las clases se realizan los domingos. Consulta la programación para conocer los
          horarios actuales.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button href="/programacion">Ver Horarios</Button>
          <Button href="/contacto" variant="outline">Más Información</Button>
        </div>
      </Container>
    </section>
  )
}
