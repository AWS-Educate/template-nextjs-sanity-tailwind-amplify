import {generateKey, textToPortableText, uploadImageFromUrl, makeImageField} from './utils.js'

// Map extracted JSON section → Sanity section object
// Each mapper returns a section with _type and _key

type RawSection = Record<string, any>

export async function mapSection(section: RawSection): Promise<Record<string, any> | null> {
  const key = generateKey()

  switch (section.type) {
    case 'hero':
      return mapHero(section, key)
    case 'text':
      return mapText(section, key)
    case 'quote':
      return mapQuote(section, key)
    case 'image-text':
      return mapImageText(section, key)
    case 'cta':
      return mapCta(section, key)
    case 'gallery':
    case 'photo-grid':
      return mapGallery(section, key)
    case 'blog-feed':
      return mapBlogFeed(section, key)
    case 'featured-event':
    case 'featured-content':
      return mapImageText(section, key)
    case 'banner':
      return mapBanner(section, key)
    case 'contact-info':
      return mapContactText(section, key)
    case 'cta-sections':
      return mapCtaFromSections(section, key)
    case 'donation-methods':
      return mapDonationMethods(section, key)
    case 'three-columns':
      return mapThreeColumns(section, key)
    case 'registration-form':
      return mapRegistrationForm(section, key)
    case 'heading':
      return mapHeadingAsText(section, key)
    case 'blogFeed':
    case 'blog-index':
      return mapBlogFeed(section, key)
    case 'speaker':
    case 'topics':
      return mapText(section, key)
    default:
      console.warn(`[section-mapper] Unknown section type: ${section.type}`)
      return null
  }
}

async function mapHero(s: RawSection, key: string) {
  const imageUrl = s.image || s.backgroundImage
  if (!imageUrl) {
    // Hero without image → convert to textSection
    return {
      _type: 'textSection',
      _key: key,
      heading: s.heading || s.title || '',
      body: textToPortableText(s.subheading || s.body || s.subtitle || ''),
      alignment: 'center',
    }
  }
  const assetRef = await uploadImageFromUrl(imageUrl)
  const result: Record<string, any> = {
    _type: 'heroSection',
    _key: key,
    heading: s.heading || s.title || '',
    subheading: s.subheading || s.subtitle || undefined,
    image: makeImageField(assetRef),
    imageAlt: s.imageAlt || s.heading || s.title || 'Hero image',
  }
  if (s.cta?.text && s.cta?.href) {
    result.cta = {text: s.cta.text, href: s.cta.href, variant: 'primary'}
  }
  return result
}

async function mapText(s: RawSection, key: string) {
  const bodyText =
    s.body ||
    s.content ||
    s.description ||
    (s.paragraphs ? s.paragraphs.join('\n\n') : '') ||
    (s.goals ? s.goals.map((g: any) => `${g.title}\n${g.description}`).join('\n\n') : '') ||
    (s.items
      ? s.items.map((i: any) => `${i.title}\n${i.description || ''}`).join('\n\n')
      : '') ||
    s.name ||
    ''

  return {
    _type: 'textSection',
    _key: key,
    heading: s.heading || s.title || undefined,
    body: textToPortableText(bodyText),
    alignment: 'left',
  }
}

async function mapQuote(s: RawSection, key: string) {
  const quoteText = s.text || s.quote || ''
  return {
    _type: 'quoteSection',
    _key: key,
    text: textToPortableText(quoteText, 'blockquote'),
    author: s.author || 'Paramahansa Yogananda',
  }
}

async function mapImageText(s: RawSection, key: string) {
  const imageUrl = s.image
  if (!imageUrl) {
    // Fallback to text section if no image
    return mapText(s, key)
  }
  const assetRef = await uploadImageFromUrl(imageUrl)
  const bodyText = s.body || s.content || ''
  return {
    _type: 'imageTextSection',
    _key: key,
    image: makeImageField(assetRef),
    imageAlt: s.imageAlt || s.heading || '',
    heading: s.heading || s.subheading || undefined,
    body: bodyText ? textToPortableText(bodyText) : undefined,
    imagePosition: 'left',
  }
}

async function mapCta(s: RawSection, key: string) {
  return {
    _type: 'ctaSection',
    _key: key,
    heading: s.heading || '',
    description: s.body || s.description || undefined,
    buttons: [
      {
        _key: generateKey(),
        text: s.cta?.text || 'Más Información',
        href: s.cta?.href || s.cta?.url || '/lecciones-srf',
        variant: 'primary',
      },
    ],
    backgroundColor: 'secondary',
  }
}

async function mapGallery(s: RawSection, key: string) {
  const imageUrls: string[] = s.images || []
  const images = await Promise.all(
    imageUrls.map(async (url: string, i: number) => {
      const assetRef = await uploadImageFromUrl(url)
      return {
        _key: generateKey(),
        image: makeImageField(assetRef),
        alt: s.heading ? `${s.heading} ${i + 1}` : `Gallery image ${i + 1}`,
      }
    }),
  )
  return {
    _type: 'gallerySection',
    _key: key,
    images,
    layout: 'grid',
  }
}

async function mapBlogFeed(s: RawSection, key: string) {
  return {
    _type: 'blogFeedSection',
    _key: key,
    title: s.heading || s.title || 'Actividades y Eventos',
    limit: 6,
  }
}

async function mapBanner(s: RawSection, key: string) {
  // If banner has an image + CTA, map as imageTextSection
  if (s.image && s.cta) {
    const assetRef = await uploadImageFromUrl(s.image)
    return {
      _type: 'imageTextSection',
      _key: key,
      image: makeImageField(assetRef),
      imageAlt: s.imageAlt || 'Banner',
      heading: s.cta.text || 'Visitar',
      body: undefined,
      imagePosition: 'left',
    }
  }
  return {
    _type: 'bannerSection',
    _key: key,
    message: s.message || s.heading || s.cta?.text || '',
    backgroundColor: 'primary',
  }
}

async function mapContactText(s: RawSection, key: string) {
  const bodyText = [
    s.center || '',
    s.phone ? `Tel: ${s.phone}` : '',
    s.address || '',
    s.email ? `Email: ${s.email}` : '',
  ]
    .filter(Boolean)
    .join('\n\n')

  return {
    _type: 'textSection',
    _key: key,
    heading: 'Información de Contacto',
    body: textToPortableText(bodyText),
    alignment: 'center',
  }
}

async function mapCtaFromSections(s: RawSection, key: string) {
  const items = s.items || []
  return {
    _type: 'ctaSection',
    _key: key,
    heading: items[0]?.title || 'Contacto',
    description: undefined,
    buttons: items.map((item: any) => ({
      _key: generateKey(),
      text: item.title,
      href: item.type === 'map' ? '#mapa' : '#formulario',
      variant: item.type === 'map' ? 'primary' : 'secondary',
    })),
    backgroundColor: 'neutral',
  }
}

async function mapDonationMethods(s: RawSection, key: string) {
  if (s.image) {
    const assetRef = await uploadImageFromUrl(s.image)
    return {
      _type: 'imageTextSection',
      _key: key,
      image: makeImageField(assetRef),
      imageAlt: 'Métodos de donación',
      heading: 'Métodos de Donación',
      imagePosition: 'left',
    }
  }
  return {
    _type: 'textSection',
    _key: key,
    heading: 'Métodos de Donación',
    body: textToPortableText(s.note || ''),
    alignment: 'center',
  }
}

async function mapThreeColumns(s: RawSection, key: string) {
  // Map three-column layout as multiple imageText sections
  // Return the first column as imageText, and we'll handle the rest in the page mapper
  const columns = s.columns || []
  if (columns.length === 0) return null

  const sections = await Promise.all(
    columns.map(async (col: any) => {
      const colKey = generateKey()
      if (col.image) {
        const assetRef = await uploadImageFromUrl(col.image)
        return {
          _type: 'imageTextSection',
          _key: colKey,
          image: makeImageField(assetRef),
          imageAlt: col.imageAlt || col.heading || '',
          heading: col.heading,
          body: col.body ? textToPortableText(col.body) : undefined,
          imagePosition: 'left',
        }
      }
      return {
        _type: 'textSection',
        _key: colKey,
        heading: col.heading,
        body: col.body ? textToPortableText(col.body) : undefined,
        alignment: 'center',
      }
    }),
  )

  // Return array to be spread into page sections
  return sections
}

async function mapRegistrationForm(s: RawSection, key: string) {
  const fields = (s.fields || []).map((f: any) => ({
    _key: generateKey(),
    name: f.name,
    label: f.label,
    type: f.type === 'tel' ? 'phone' : f.type,
    required: f.required ?? false,
  }))

  return {
    _type: 'eventRegistrationSection',
    _key: key,
    heading: s.heading || 'Registro',
    eventLink: '#registro',
    formFields: fields.length > 0 ? fields : undefined,
  }
}

async function mapHeadingAsText(s: RawSection, key: string) {
  return {
    _type: 'textSection',
    _key: key,
    heading: s.text || s.heading || '',
    body: textToPortableText(' '), // minimal body (required field)
    alignment: 'center',
  }
}

export async function mapSections(rawSections: RawSection[]): Promise<Record<string, any>[]> {
  const results: Record<string, any>[] = []
  for (const section of rawSections) {
    const mapped = await mapSection(section)
    if (mapped === null) continue
    if (Array.isArray(mapped)) {
      results.push(...mapped)
    } else {
      results.push(mapped)
    }
  }
  return results
}
