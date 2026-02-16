import Container from '@/components/ui/Container'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import type {TextSection as TextSectionType} from '@/sanity/types'

export default function TextSection({data}: {data: TextSectionType}) {
  const align = data.alignment === 'center' ? 'text-center' : data.alignment === 'right' ? 'text-right' : 'text-left'
  return (
    <section className="py-16">
      <Container className={`max-w-3xl ${align}`}>
        {data.heading && <h2>{data.heading}</h2>}
        <PortableTextRenderer value={data.body} />
      </Container>
    </section>
  )
}
