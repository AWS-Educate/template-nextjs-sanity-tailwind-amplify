import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce al Grupo de Meditación de Self-Realization Fellowship en Bogotá, Colombia.',
}

export default async function NosotrosPage() {
  const page = await getPageBySlug('nosotros')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1>Sobre Nosotros</h1>
        <p className="text-lg text-neutral-600 mb-6">
          Somos el Grupo de Meditación de Self-Realization Fellowship (SRF) en Bogotá, Colombia.
          Nos reunimos para practicar las técnicas de meditación enseñadas por Paramahansa Yogananda,
          incluyendo el Kriya Yoga.
        </p>
        <h2>Nuestra Misión</h2>
        <p>
          Compartir las enseñanzas de Paramahansa Yogananda con todos los buscadores sinceros,
          ofreciendo un espacio de paz, meditación y comunidad espiritual en Bogotá.
        </p>
        <h2>Self-Realization Fellowship</h2>
        <p>
          Self-Realization Fellowship fue fundada en 1920 por Paramahansa Yogananda para difundir
          las antiguas enseñanzas y técnicas de meditación del Kriya Yoga. La organización tiene
          su sede en Los Ángeles, California, con centros, grupos y círculos de meditación en
          todo el mundo.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button href="/paramahansa-yogananda">Paramahansa Yogananda</Button>
          <Button href="/kriya-yoga" variant="outline">Kriya Yoga</Button>
        </div>
      </Container>
    </section>
  )
}
