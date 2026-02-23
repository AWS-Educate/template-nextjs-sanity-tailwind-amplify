import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import Card from '@/components/ui/Card'
import {getPageBySlug, getAllBooks} from '@/sanity/lib'

export const metadata: Metadata = {
  title: 'Store',
  description: 'Browse our products and publications.',
}

export default async function StorePage() {
  const page = await getPageBySlug('libreria')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  const books = await getAllBooks()

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-center mb-4">Store</h1>
        <p className="text-center text-neutral-500 max-w-xl mx-auto mb-12">
          Browse our products and publications.
        </p>
        {books.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map(book => (
              <Card
                key={book._id}
                title={book.title}
                description={book.author ? `By ${book.author}` : undefined}
                image={book.image}
                badge={book.language || undefined}
                href={`/libreria/${book.slug.current}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500">No products yet. Add items in Sanity Studio.</p>
        )}
      </Container>
    </section>
  )
}
