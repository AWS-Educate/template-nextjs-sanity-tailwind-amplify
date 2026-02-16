import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import type {ImageTextSection as ImageTextSectionType} from '@/sanity/types'

export default function ImageTextSection({data}: {data: ImageTextSectionType}) {
  const imgRight = data.imagePosition === 'right'
  return (
    <section className="py-16">
      <Container>
        <div className={`flex flex-col md:flex-row items-center gap-10 ${imgRight ? 'md:flex-row-reverse' : ''}`}>
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <SanityImage image={data.image} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg leading-relaxed text-neutral-700">{data.text}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
