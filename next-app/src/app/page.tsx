import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SectionRenderer from '@/components/sections/SectionRenderer'
import {getHomePage, getAllPosts} from '@/sanity/lib'
import Card from '@/components/ui/Card'

export default async function HomePage() {
  const [page, posts] = await Promise.all([getHomePage(), getAllPosts()])

  // Si hay contenido en Sanity, renderizar secciones dinámicas
  if (page?.sections?.length) {
    return <SectionRenderer sections={page.sections} />
  }

  // Fallback: contenido estático hasta migración completa
  const recentPosts = posts.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary-900 via-primary-700 to-navy-800">
        <Container className="relative z-10 py-20">
          <div className="max-w-2xl text-white">
            <p className="text-secondary-400 font-medium mb-2">Self-Realization Fellowship</p>
            <h1 className="!text-white text-4xl sm:text-5xl lg:text-6xl mb-4">Grupo de Meditación Bogotá</h1>
            <p className="text-lg text-neutral-200 mb-8">
              Descubre la paz interior a través de las enseñanzas de Paramahansa Yogananda y la práctica del Kriya Yoga.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/programacion" size="lg">Ver Programación</Button>
              <Button href="/nosotros" variant="outline" size="lg" className="!border-white !text-white hover:!bg-white/10">
                Conócenos
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-20">
        <Container className="max-w-3xl text-center">
          <h2>Bienvenidos</h2>
          <p className="text-lg text-neutral-600">
            Somos un grupo de meditación de Self-Realization Fellowship (SRF) en Bogotá, dedicados a compartir
            las enseñanzas de Paramahansa Yogananda sobre la meditación y el Kriya Yoga como camino hacia la
            realización del Ser.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button href="/kriya-yoga" variant="secondary">Kriya Yoga</Button>
            <Button href="/lecciones-srf" variant="outline">Lecciones SRF</Button>
          </div>
        </Container>
      </section>

      {/* Quote */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <Container className="max-w-3xl text-center">
          <div className="text-5xl text-secondary-300 mb-4">&ldquo;</div>
          <p className="text-xl italic text-primary-700 leading-relaxed">
            La meditación es el esfuerzo por realizar y expresar lo que se sabe de la
            presencia de Dios dentro de uno mismo.
          </p>
          <p className="mt-4 font-semibold text-primary-600">Paramahansa Yogananda</p>
        </Container>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-center mb-10">Publicaciones Recientes</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map(post => (
                <Card
                  key={post._id}
                  title={post.title}
                  description={post.excerpt}
                  image={post.mainImage}
                  href={`/blog/${post.slug.current}`}
                  date={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-CO') : undefined}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button href="/blog" variant="outline">Ver Todo el Blog</Button>
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-secondary-500 text-white">
        <Container className="text-center max-w-2xl">
          <h2 className="!text-white">Únete a Nuestras Meditaciones</h2>
          <p className="text-lg opacity-90 mb-8">
            Participa en nuestras sesiones de meditación grupales presenciales y virtuales.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/programacion" variant="primary" size="lg">Ver Horarios</Button>
            <Button href="/contacto" variant="outline" size="lg" className="!border-white !text-white hover:!bg-white/10">
              Contacto
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
