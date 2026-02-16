import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import type {CtaSection as CtaSectionType} from '@/sanity/types'

const bgColors = {
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-secondary-500 text-white',
  neutral: 'bg-neutral-100',
  transparent: '',
} as const

export default function CtaSection({data}: {data: CtaSectionType}) {
  const bg = bgColors[data.backgroundColor || 'transparent']
  return (
    <section className={`py-16 ${bg}`}>
      <Container className="text-center max-w-2xl">
        <h2 className={data.backgroundColor === 'primary' || data.backgroundColor === 'secondary' ? '!text-white' : ''}>{data.heading}</h2>
        {data.description && <p className="text-lg mb-8 opacity-90">{data.description}</p>}
        <div className="flex flex-wrap justify-center gap-4">
          {data.buttons?.map((btn, i) => (
            <Button key={i} href={btn.href} variant={btn.variant}>{btn.text}</Button>
          ))}
        </div>
      </Container>
    </section>
  )
}
