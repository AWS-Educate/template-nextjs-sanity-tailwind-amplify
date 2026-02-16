import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Lecciones SRF',
  description: 'Las Lecciones de Self-Realization Fellowship: un curso completo de meditación y vida espiritual.',
}

export default async function LeccionesSrfPage() {
  const page = await getPageBySlug('lecciones-srf')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1>Lecciones de Self-Realization Fellowship</h1>
        <p className="text-lg text-neutral-600 mb-6">
          Las Lecciones de SRF son un curso completo de estudio en el hogar sobre las técnicas
          de meditación y los principios de vida espiritual equilibrada enseñados por Paramahansa
          Yogananda.
        </p>
        <h2>Contenido de las Lecciones</h2>
        <p>
          Las lecciones incluyen instrucciones paso a paso sobre las técnicas de meditación del
          Kriya Yoga, así como guía práctica para llevar una vida equilibrada y significativa.
          Se envían periódicamente a los estudiantes inscritos.
        </p>
        <h2>Cómo Inscribirse</h2>
        <p>
          Cualquier persona sinceramente interesada puede solicitar las Lecciones de SRF directamente
          a través del sitio web oficial de Self-Realization Fellowship.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button href="https://www.yogananda.org/lessons" className="!no-underline">Solicitar Lecciones</Button>
          <Button href="/contacto" variant="outline">Preguntas</Button>
        </div>
      </Container>
    </section>
  )
}
