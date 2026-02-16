import Container from '@/components/ui/Container'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import type {QuoteSection as QuoteSectionType} from '@/sanity/types'

export default function QuoteSection({data}: {data: QuoteSectionType}) {
  return (
    <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
      <Container className="max-w-3xl text-center">
        <div className="text-5xl text-secondary-300 mb-4">&ldquo;</div>
        <div className="text-xl italic text-primary-700 leading-relaxed">
          <PortableTextRenderer value={data.text} />
        </div>
        {data.author && (
          <div className="mt-6">
            <p className="font-semibold text-primary-600 m-0">{data.author}</p>
            {data.role && <p className="text-sm text-neutral-500 m-0">{data.role}</p>}
          </div>
        )}
      </Container>
    </section>
  )
}
