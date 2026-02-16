import type {Section} from '@/sanity/types'
import HeroSection from './HeroSection'
import TextSection from './TextSection'
import CtaSection from './CtaSection'
import ImageTextSection from './ImageTextSection'
import ScheduleSection from './ScheduleSection'
import BlogFeedSection from './BlogFeedSection'
import ContactFormSection from './ContactFormSection'
import DonationSection from './DonationSection'
import BannerSection from './BannerSection'
import QuoteSection from './QuoteSection'
import GallerySection from './GallerySection'
import EventRegistrationSection from './EventRegistrationSection'

const sectionMap: Record<string, React.ComponentType<{data: never}>> = {
  heroSection: HeroSection,
  textSection: TextSection,
  ctaSection: CtaSection,
  imageTextSection: ImageTextSection,
  scheduleSection: ScheduleSection,
  blogFeedSection: BlogFeedSection,
  contactFormSection: ContactFormSection,
  donationSection: DonationSection,
  bannerSection: BannerSection,
  quoteSection: QuoteSection,
  gallerySection: GallerySection,
  eventRegistrationSection: EventRegistrationSection,
}

interface SectionRendererProps {
  sections: Section[] | undefined
}

export default function SectionRenderer({sections}: SectionRendererProps) {
  if (!sections?.length) return null
  return (
    <>
      {sections.map((section, i) => {
        const Component = sectionMap[section._type]
        if (!Component) return null
        return <Component key={i} data={section as never} />
      })}
    </>
  )
}
