import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SanityImage from '@/components/ui/SanityImage'
import type {HeroSection as HeroSectionType} from '@/sanity/types'

export default function HeroSection({data}: {data: HeroSectionType}) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <SanityImage image={data.image} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/50" />
      </div>
      <Container className="relative z-10 py-20">
        <div className="max-w-2xl text-white">
          <h1 className="!text-white text-4xl sm:text-5xl lg:text-6xl mb-4">{data.heading}</h1>
          {data.subheading && <p className="text-lg sm:text-xl text-neutral-200 mb-8">{data.subheading}</p>}
          {data.cta && (
            <Button href={data.cta.href} variant={data.cta.variant === 'secondary' ? 'secondary' : 'primary'} size="lg">
              {data.cta.text}
            </Button>
          )}
        </div>
      </Container>
    </section>
  )
}
