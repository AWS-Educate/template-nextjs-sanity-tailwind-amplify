/**
 * Sanity Types - Synced with studio/schemas/
 * Run: cd studio && npx sanity typegen generate
 */

// Document Types
export interface Post {
  _id: string
  _type: 'post'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug
  excerpt?: string
  category?: {_ref: string; _type: 'reference'}
  tags?: string[]
  mainImage?: Image
  body?: PortableText
  publishedAt?: string
  seo?: SEO
}

export interface Category {
  _id: string
  _type: 'category'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug
  description?: string
}

export interface Page {
  _id: string
  _type: 'page'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug
  sections?: Section[]
  publishedAt?: string
  seo?: SEO
}

export interface Event {
  _id: string
  _type: 'event'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug
  description?: PortableText
  startDate: string
  endDate?: string
  location?: string
  zoomLink?: string
  registrationLink?: string
  image?: Image
  capacity?: number
  seo?: SEO
}

export interface Schedule {
  _id: string
  _type: 'schedule'
  _createdAt: string
  _updatedAt: string
  title: string
  week: number
  year: number
  items: ScheduleItem[]
  isActive?: boolean
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  title: string
  description?: string
  logo?: Image
  favicon?: Image
  contactEmail?: string
  contactPhone?: string
  address?: string
  socialMedia?: SocialLink[]
  navigation?: NavItem[]
  footerText?: string
}

export interface BookstoreItem {
  _id: string
  _type: 'bookstoreItem'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug
  author?: string
  description?: PortableText
  isbn?: string
  pages?: number
  language?: 'Spanish' | 'English' | 'Portuguese'
  price?: number
  inStock?: boolean
  image?: Image
  category?: string
  featured?: boolean
}

export interface LegacyRedirect {
  _id: string
  _type: 'legacyRedirect'
  oldPath: string
  newPath: string
  statusCode: 301 | 302 | 307 | 308
  description?: string
  isActive?: boolean
}

// Object Types
export interface SEO {
  _type: 'seo'
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: Image
}

export interface NavItem {
  _type: 'navItem'
  label: string
  href: string
  submenu?: {label: string; href: string}[]
}

export interface HeroSection {
  _type: 'heroSection'
  heading: string
  subheading?: string
  image: Image
  imageAlt: string
  cta?: {text?: string; href?: string; variant?: 'primary' | 'secondary'}
}

export interface TextSection {
  _type: 'textSection'
  heading?: string
  body: PortableText
  alignment?: 'left' | 'center' | 'right'
}

export interface CtaSection {
  _type: 'ctaSection'
  heading: string
  description?: string
  buttons: {text: string; href: string; variant?: 'primary' | 'secondary' | 'outline'}[]
  backgroundColor?: 'primary' | 'secondary' | 'neutral' | 'transparent'
}

export interface ImageTextSection {
  _type: 'imageTextSection'
  image: Image
  imageAlt?: string
  heading?: string
  body?: PortableText
  imagePosition?: 'left' | 'right'
}

export interface ScheduleSection {
  _type: 'scheduleSection'
  items: ScheduleSectionItem[]
}

export interface ScheduleSectionItem {
  day: string
  time: string
  title: string
  description?: string
}

export interface BlogFeedSection {
  _type: 'blogFeedSection'
  title?: string
  limit?: number
  categoryFilter?: {_ref: string; _type: 'reference'}
}

export interface ContactFormSection {
  _type: 'contactFormSection'
  heading: string
  description?: string
  formFields?: FormField[]
}

export interface DonationSection {
  _type: 'donationSection'
  heading: string
  description?: PortableText
  donationLink: string
}

export interface BannerSection {
  _type: 'bannerSection'
  message: string
  backgroundColor?: 'primary' | 'secondary' | 'warning'
  icon?: string
}

export interface QuoteSection {
  _type: 'quoteSection'
  text: PortableText
  author?: string
  role?: string
  image?: Image
}

export interface GallerySection {
  _type: 'gallerySection'
  images: GalleryItem[]
  layout?: 'grid' | 'carousel'
}

export interface GalleryItem {
  image: Image
  alt: string
  caption?: string
}

export interface EventRegistrationSection {
  _type: 'eventRegistrationSection'
  heading: string
  description?: string
  eventLink: string
  formFields?: FormField[]
}

// Shared Types
export type Section =
  | HeroSection
  | TextSection
  | CtaSection
  | ImageTextSection
  | ScheduleSection
  | BlogFeedSection
  | ContactFormSection
  | DonationSection
  | BannerSection
  | QuoteSection
  | GallerySection
  | EventRegistrationSection

export interface Slug {
  current: string
  _type: 'slug'
}

export interface Image {
  _type: 'image'
  asset: {_ref: string; _type: 'reference'}
  alt?: string
  hotspot?: {x: number; y: number; height: number; width: number}
  crop?: {top: number; bottom: number; left: number; right: number}
}

export interface PortableText {
  _type: 'block'
  _key: string
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children: {_type: 'span'; text: string; marks?: string[]}[]
  markDefs?: {_type: string; _key: string}[]
  list?: 'bullet' | 'number'
}[]

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'date'
  placeholder?: string
  required?: boolean
  options?: {label: string; value: string}[]
}

export interface ScheduleItem {
  day: string
  time: string
  title: string
  description?: string
  instructor?: string
  location?: string
  zoomLink?: string
}

export interface SocialLink {
  platform: 'Facebook' | 'Instagram' | 'Twitter' | 'YouTube' | 'LinkedIn'
  url: string
}

// API Response Types
export interface SanityResponse<T> {
  data: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
