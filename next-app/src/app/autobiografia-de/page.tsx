import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Button from '@/components/ui/Button'
import {getPageBySlug} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Autobiografía de un Yogui',
  description: 'Descubre el libro clásico de Paramahansa Yogananda, Autobiografía de un Yogui.',
}

export default async function AutobiografiaPage() {
  const page = await getPageBySlug('autobiografia-de')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1>Autobiografía de un Yogui</h1>
        <p className="text-lg text-neutral-600 mb-6">
          &ldquo;Autobiografía de un Yogui&rdquo; es el libro más conocido de Paramahansa Yogananda,
          publicado originalmente en 1946. Es considerado un clásico moderno de la literatura
          espiritual.
        </p>
        <h2>Sobre el Libro</h2>
        <p>
          Este libro narra la vida de Yogananda desde su infancia en India hasta su misión
          espiritual en Occidente. A través de relatos cautivadores, introduce al lector en
          los principios del yoga y la meditación, y presenta encuentros con grandes santos
          y maestros de India.
        </p>
        <h2>Un Clásico Espiritual</h2>
        <p>
          Traducido a más de 50 idiomas, el libro ha inspirado a millones de personas en todo
          el mundo, incluyendo a Steve Jobs, George Harrison y muchos otros buscadores
          espirituales. Se lo considera una puerta de entrada a las enseñanzas del yoga.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button href="/libreria">Ver en Librería</Button>
          <Button href="/paramahansa-yogananda" variant="outline">Sobre Yogananda</Button>
        </div>
      </Container>
    </section>
  )
}
