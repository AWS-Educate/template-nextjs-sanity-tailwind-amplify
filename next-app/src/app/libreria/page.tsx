import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Card from '@/components/ui/Card'
import {getPageBySlug, getAllBooks} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Librería',
  description: 'Libros de Paramahansa Yogananda y Self-Realization Fellowship disponibles en Bogotá.',
}

export default async function LibreriaPage() {
  const page = await getPageBySlug('libreria')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  const books = await getAllBooks()

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-center mb-4">Librería</h1>
        <p className="text-center text-neutral-500 max-w-xl mx-auto mb-12">
          Libros y publicaciones de Paramahansa Yogananda y Self-Realization Fellowship.
        </p>
        {books.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map(book => (
              <Card
                key={book._id}
                title={book.title}
                description={book.author ? `Por ${book.author}` : undefined}
                image={book.image}
                badge={book.language || undefined}
                href={`/libreria/${book.slug.current}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500">El catálogo se actualizará próximamente.</p>
        )}
      </Container>
    </section>
  )
}
