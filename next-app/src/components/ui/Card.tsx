import Link from 'next/link'
import {clsx} from 'clsx'
import SanityImage from './SanityImage'
import type {Image} from '@/sanity/types'

interface CardProps {
  title: string
  description?: string
  image?: Image
  href?: string
  badge?: string
  date?: string
  className?: string
}

export default function Card({title, description, image, href, badge, date, className}: CardProps) {
  const content = (
    <div className={clsx(
      'group overflow-hidden rounded-xl bg-white shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]',
      className,
    )}>
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <SanityImage image={image} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="p-5">
        {(badge || date) && (
          <div className="mb-2 flex items-center gap-2 text-sm text-neutral-500">
            {badge && <span className="rounded-full bg-primary-50 px-3 py-0.5 text-xs font-medium text-primary-600">{badge}</span>}
            {date && <time>{date}</time>}
          </div>
        )}
        <h3 className="mb-1 text-lg font-semibold text-primary-700 group-hover:text-secondary-500 transition-colors">{title}</h3>
        {description && <p className="text-sm text-neutral-600 line-clamp-3">{description}</p>}
      </div>
    </div>
  )

  if (href) return <Link href={href} className="block">{content}</Link>
  return content
}
