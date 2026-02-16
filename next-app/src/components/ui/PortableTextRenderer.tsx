import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {PortableText as PortableTextType} from '@/sanity/types'

const components: PortableTextComponents = {
  block: {
    h1: ({children}) => <h1>{children}</h1>,
    h2: ({children}) => <h2>{children}</h2>,
    h3: ({children}) => <h3>{children}</h3>,
    h4: ({children}) => <h4 className="text-lg font-semibold">{children}</h4>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-secondary-500 pl-4 italic text-neutral-600 my-4">
        {children}
      </blockquote>
    ),
    normal: ({children}) => <p>{children}</p>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-6 space-y-1 mb-4">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-6 space-y-1 mb-4">{children}</ol>,
  },
  marks: {
    strong: ({children}) => <strong className="font-bold">{children}</strong>,
    em: ({children}) => <em>{children}</em>,
    link: ({value, children}) => (
      <a href={value?.href} className="text-secondary-500 underline hover:text-secondary-600" target={value?.href?.startsWith('http') ? '_blank' : undefined} rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    ),
  },
}

interface PortableTextRendererProps {
  value: PortableTextType | undefined | null
  className?: string
}

export default function PortableTextRenderer({value, className = ''}: PortableTextRendererProps) {
  if (!value) return null
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={value as any} components={components} />
    </div>
  )
}
