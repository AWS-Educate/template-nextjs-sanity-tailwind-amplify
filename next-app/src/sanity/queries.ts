/**
 * GROQ Queries for Sanity CMS
 * Optimized projection to minimize data transfer
 */

// ============================================================================
// SITE SETTINGS
// ============================================================================

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    title,
    description,
    "logo": logo.asset->url,
    "favicon": favicon.asset->url,
    contactEmail,
    contactPhone,
    address,
    socialMedia[] {
      platform,
      url
    },
    navigation[] {
      label,
      href,
      submenu[] {
        label,
        href
      }
    },
    footerText
  }
`

// ============================================================================
// BLOG POSTS
// ============================================================================

export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "category": category->title,
    seo {
      title,
      description,
      keywords
    }
  }
`

export const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && category._ref == $categoryId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "category": category->title,
    seo {
      title,
      description
    }
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    "mainImage": mainImage.asset->url,
    body,
    publishedAt,
    "category": category-> {
      _id,
      title,
      slug
    },
    tags,
    seo {
      title,
      description,
      keywords,
      "ogImage": ogImage.asset->url
    }
  }
`

export const RELATED_POSTS_QUERY = `
  *[_type == "post" && category._ref == $categoryId && _id != $postId] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    excerpt,
    "mainImage": mainImage.asset->url,
    publishedAt
  }
`

// ============================================================================
// CATEGORIES
// ============================================================================

export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const CATEGORY_BY_SLUG_QUERY = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description
  }
`

// ============================================================================
// PAGES
// ============================================================================

export const PAGE_BY_SLUG_QUERY = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    sections[] {
      _type,
      _key,
      ...,
      "image": image.asset->url,
      images[] {
        "image": image.asset->url,
        alt,
        caption
      }
    },
    publishedAt,
    seo {
      title,
      description,
      keywords,
      "ogImage": ogImage.asset->url
    }
  }
`

export const HOME_PAGE_QUERY = `
  *[_type == "page" && slug.current == "home"][0] {
    _id,
    title,
    sections[] {
      _type,
      _key,
      ...,
      "image": image.asset->url,
      images[] {
        "image": image.asset->url,
        alt,
        caption
      }
    },
    seo {
      title,
      description,
      keywords,
      "ogImage": ogImage.asset->url
    }
  }
`

// ============================================================================
// EVENTS
// ============================================================================

export const UPCOMING_EVENTS_QUERY = `
  *[_type == "event" && startDate > now()] | order(startDate asc) {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    zoomLink,
    "image": image.asset->url,
    seo {
      title,
      description
    }
  }
`

export const EVENT_BY_SLUG_QUERY = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    zoomLink,
    registrationLink,
    "image": image.asset->url,
    capacity,
    seo {
      title,
      description,
      "ogImage": ogImage.asset->url
    }
  }
`

// ============================================================================
// MEDITATION SCHEDULE
// ============================================================================

export const CURRENT_SCHEDULE_QUERY = `
  *[_type == "schedule" && isActive == true] | order(year desc, week desc)[0] {
    _id,
    title,
    week,
    year,
    items[] {
      day,
      time,
      title,
      description,
      instructor,
      location,
      zoomLink
    }
  }
`

export const SCHEDULE_BY_WEEK_QUERY = `
  *[_type == "schedule" && week == $week && year == $year][0] {
    _id,
    title,
    week,
    year,
    items[] {
      day,
      time,
      title,
      description,
      instructor,
      location,
      zoomLink
    }
  }
`

// ============================================================================
// BOOKSTORE
// ============================================================================

export const ALL_BOOKS_QUERY = `
  *[_type == "bookstoreItem" && inStock == true] | order(featured desc, title asc) {
    _id,
    title,
    slug,
    author,
    "image": image.asset->url,
    price,
    category,
    featured
  }
`

export const FEATURED_BOOKS_QUERY = `
  *[_type == "bookstoreItem" && inStock == true && featured == true] | order(title asc)[0..5] {
    _id,
    title,
    slug,
    author,
    "image": image.asset->url,
    price,
    category
  }
`

export const BOOK_BY_SLUG_QUERY = `
  *[_type == "bookstoreItem" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    description,
    isbn,
    pages,
    language,
    price,
    inStock,
    "image": image.asset->url,
    category,
    featured
  }
`

export const BOOKS_BY_CATEGORY_QUERY = `
  *[_type == "bookstoreItem" && category == $category && inStock == true] | order(title asc) {
    _id,
    title,
    slug,
    author,
    "image": image.asset->url,
    price,
    category
  }
`

// ============================================================================
// LEGACY REDIRECTS
// ============================================================================

export const LEGACY_REDIRECT_QUERY = `
  *[_type == "legacyRedirect" && oldPath == $oldPath && isActive == true][0] {
    oldPath,
    newPath,
    statusCode
  }
`

export const ALL_REDIRECTS_QUERY = `
  *[_type == "legacyRedirect" && isActive == true] {
    oldPath,
    newPath,
    statusCode
  }
`

// ============================================================================
// UTILITY QUERIES
// ============================================================================

export const ALL_PAGES_SLUGS_QUERY = `
  *[_type == "page"] {
    "params": {
      "slug": slug.current
    }
  }
`

export const ALL_POSTS_SLUGS_QUERY = `
  *[_type == "post"] {
    "params": {
      "slug": slug.current
    }
  }
`

export const ALL_EVENTS_SLUGS_QUERY = `
  *[_type == "event"] {
    "params": {
      "slug": slug.current
    }
  }
`

export const ALL_BOOKS_SLUGS_QUERY = `
  *[_type == "bookstoreItem"] {
    "params": {
      "slug": slug.current
    }
  }
`

export const SEARCH_POSTS_QUERY = `
  *[_type == "post" && (title match $searchTerm || excerpt match $searchTerm)] | order(publishedAt desc)[0..9] {
    _id,
    title,
    slug,
    excerpt,
    "mainImage": mainImage.asset->url,
    publishedAt
  }
`
