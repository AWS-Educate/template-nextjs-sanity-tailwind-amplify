import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import type {DonationSection as DonationSectionType} from '@/sanity/types'

export default function DonationSection({data}: {data: DonationSectionType}) {
  return (
    <section className="py-16 bg-primary-50">
      <Container className="max-w-2xl text-center">
        <h2>{data.heading}</h2>
        <PortableTextRenderer value={data.description} />
        {data.donationLink && (
          <Button href={data.donationLink} variant="secondary" size="lg" className="mt-6">
            Donar Ahora
          </Button>
        )}
      </Container>
    </section>
  )
}
