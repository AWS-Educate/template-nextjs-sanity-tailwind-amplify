import Container from '@/components/ui/Container'
import type {BannerSection as BannerSectionType} from '@/sanity/types'

const bgColors = {
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-secondary-500 text-white',
  warning: 'bg-warning-500 text-neutral-900',
} as const

export default function BannerSection({data}: {data: BannerSectionType}) {
  const bg = bgColors[data.backgroundColor || 'primary']
  return (
    <section className={`py-4 ${bg}`}>
      <Container className="text-center">
        <p className="text-sm font-medium m-0">{data.message}</p>
      </Container>
    </section>
  )
}
