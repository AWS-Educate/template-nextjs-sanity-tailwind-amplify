import Image from 'next/image'
import {getSanityImageUrl} from '@/sanity/lib'
import type {Image as SanityImageType} from '@/sanity/types'

interface SanityImageProps {
  image: SanityImageType
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
}

export default function SanityImage({image, width = 800, height = 600, fill, sizes, className, priority}: SanityImageProps) {
  const ref = image.asset?._ref
  if (!ref) return null

  // Extract image ID from ref: image-xxx-widthxheight-format → xxx-widthxheight.format
  const parts = ref.replace('image-', '').split('-')
  const assetId = `${parts.slice(0, -1).join('-')}.${parts[parts.length - 1]}`

  const src = getSanityImageUrl(assetId, fill ? undefined : width, fill ? undefined : height)
  const alt = image.alt || ''

  if (fill) {
    return <Image src={src} alt={alt} fill sizes={sizes || '100vw'} className={className} priority={priority} />
  }

  return <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} />
}
