import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import type {GallerySection as GallerySectionType} from '@/sanity/types'

export default function GallerySection({data}: {data: GallerySectionType}) {
  return (
    <section className="py-16">
      <Container>
        <div className={`grid gap-4 ${data.layout === 'carousel' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
          {data.images?.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
              <SanityImage image={img.image} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm m-0">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
