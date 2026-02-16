/**
 * Sanity Helpers & Utilities
 * Fetch functions with error handling and caching
 */

import {client} from './client'
import type {Post, Page, Event, Category, Schedule, BookstoreItem, SiteSettings} from './types'

/**
 * Generic fetch function with error handling
 */
async function fetchSanity<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    const result = await client.fetch<T>(query, params)
    return result
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}

// ============================================================================
// SITE SETTINGS
// ============================================================================

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const {SITE_SETTINGS_QUERY} = await import('./queries')
  return fetchSanity(SITE_SETTINGS_QUERY)
}

// ============================================================================
// BLOG POSTS
// ============================================================================

export async function getAllPosts(): Promise<Post[]> {
  const {ALL_POSTS_QUERY} = await import('./queries')
  return (await fetchSanity(ALL_POSTS_QUERY)) || []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const {POST_BY_SLUG_QUERY} = await import('./queries')
  return fetchSanity(POST_BY_SLUG_QUERY, {slug})
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  const {POSTS_BY_CATEGORY_QUERY} = await import('./queries')
  return (await fetchSanity(POSTS_BY_CATEGORY_QUERY, {categoryId})) || []
}

export async function getRelatedPosts(categoryId: string, postId: string): Promise<Post[]> {
  const {RELATED_POSTS_QUERY} = await import('./queries')
  return (await fetchSanity(RELATED_POSTS_QUERY, {categoryId, postId})) || []
}

export async function searchPosts(searchTerm: string): Promise<Post[]> {
  const {SEARCH_POSTS_QUERY} = await import('./queries')
  return (await fetchSanity(SEARCH_POSTS_QUERY, {searchTerm})) || []
}

// ============================================================================
// CATEGORIES
// ============================================================================

export async function getAllCategories(): Promise<Category[]> {
  const {ALL_CATEGORIES_QUERY} = await import('./queries')
  return (await fetchSanity(ALL_CATEGORIES_QUERY)) || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const {CATEGORY_BY_SLUG_QUERY} = await import('./queries')
  return fetchSanity(CATEGORY_BY_SLUG_QUERY, {slug})
}

// ============================================================================
// PAGES
// ============================================================================

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const {PAGE_BY_SLUG_QUERY} = await import('./queries')
  return fetchSanity(PAGE_BY_SLUG_QUERY, {slug})
}

export async function getHomePage(): Promise<Page | null> {
  const {HOME_PAGE_QUERY} = await import('./queries')
  return fetchSanity(HOME_PAGE_QUERY)
}

// ============================================================================
// EVENTS
// ============================================================================

export async function getUpcomingEvents(): Promise<Event[]> {
  const {UPCOMING_EVENTS_QUERY} = await import('./queries')
  return (await fetchSanity(UPCOMING_EVENTS_QUERY)) || []
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const {EVENT_BY_SLUG_QUERY} = await import('./queries')
  return fetchSanity(EVENT_BY_SLUG_QUERY, {slug})
}

// ============================================================================
// MEDITATION SCHEDULE
// ============================================================================

export async function getCurrentSchedule(): Promise<Schedule | null> {
  const {CURRENT_SCHEDULE_QUERY} = await import('./queries')
  return fetchSanity(CURRENT_SCHEDULE_QUERY)
}

export async function getScheduleByWeek(week: number, year: number): Promise<Schedule | null> {
  const {SCHEDULE_BY_WEEK_QUERY} = await import('./queries')
  return fetchSanity(SCHEDULE_BY_WEEK_QUERY, {week, year})
}

// ============================================================================
// BOOKSTORE
// ============================================================================

export async function getAllBooks(): Promise<BookstoreItem[]> {
  const {ALL_BOOKS_QUERY} = await import('./queries')
  return (await fetchSanity(ALL_BOOKS_QUERY)) || []
}

export async function getFeaturedBooks(): Promise<BookstoreItem[]> {
  const {FEATURED_BOOKS_QUERY} = await import('./queries')
  return (await fetchSanity(FEATURED_BOOKS_QUERY)) || []
}

export async function getBookBySlug(slug: string): Promise<BookstoreItem | null> {
  const {BOOK_BY_SLUG_QUERY} = await import('./queries')
  return fetchSanity(BOOK_BY_SLUG_QUERY, {slug})
}

export async function getBooksByCategory(category: string): Promise<BookstoreItem[]> {
  const {BOOKS_BY_CATEGORY_QUERY} = await import('./queries')
  return (await fetchSanity(BOOKS_BY_CATEGORY_QUERY, {category})) || []
}

// ============================================================================
// REDIRECTS
// ============================================================================

export async function getLegacyRedirect(
  oldPath: string
): Promise<{newPath: string; statusCode: number} | null> {
  const {LEGACY_REDIRECT_QUERY} = await import('./queries')
  const redirect = await fetchSanity(LEGACY_REDIRECT_QUERY, {oldPath})
  return redirect
    ? {newPath: redirect.newPath, statusCode: redirect.statusCode}
    : null
}

// ============================================================================
// STATIC GENERATION
// ============================================================================

export async function getAllPostsSlugs() {
  const {ALL_POSTS_SLUGS_QUERY} = await import('./queries')
  return (await fetchSanity(ALL_POSTS_SLUGS_QUERY)) || []
}

export async function getAllPagesSlugs() {
  const {ALL_PAGES_SLUGS_QUERY} = await import('./queries')
  return (await fetchSanity(ALL_PAGES_SLUGS_QUERY)) || []
}

export async function getAllEventsSlugs() {
  const {ALL_EVENTS_SLUGS_QUERY} = await import('./queries')
  return (await fetchSanity(ALL_EVENTS_SLUGS_QUERY)) || []
}

export async function getAllBooksSlugs() {
  const {ALL_BOOKS_SLUGS_QUERY} = await import('./queries')
  return (await fetchSanity(ALL_BOOKS_SLUGS_QUERY)) || []
}

// ============================================================================
// IMAGE UTILITIES
// ============================================================================

/**
 * Generate Sanity image URL with transformations
 * @param imageAssetId - Asset ID from Sanity
 * @param width - Image width (optional)
 * @param height - Image height (optional)
 * @param fit - Fit mode: 'max' | 'scale' (optional)
 */
export function getSanityImageUrl(
  imageAssetId: string,
  width?: number,
  height?: number,
  fit?: 'max' | 'scale'
): string {
  let url = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${imageAssetId}`

  const params = new URLSearchParams()
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  if (fit) params.append('fit', fit)
  params.append('auto', 'format')

  const queryString = params.toString()
  return queryString ? `${url}?${queryString}` : url
}
