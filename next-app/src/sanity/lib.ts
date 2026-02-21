/**
 * Sanity Helpers & Utilities
 * Fetch functions with error handling
 */

import {client} from './client'
import {
  SITE_SETTINGS_QUERY,
  ALL_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  RELATED_POSTS_QUERY,
  SEARCH_POSTS_QUERY,
  ALL_CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  PAGE_BY_SLUG_QUERY,
  HOME_PAGE_QUERY,
  UPCOMING_EVENTS_QUERY,
  EVENT_BY_SLUG_QUERY,
  CURRENT_SCHEDULE_QUERY,
  SCHEDULE_BY_WEEK_QUERY,
  ALL_BOOKS_QUERY,
  FEATURED_BOOKS_QUERY,
  BOOK_BY_SLUG_QUERY,
  BOOKS_BY_CATEGORY_QUERY,
  LEGACY_REDIRECT_QUERY,
  ALL_REDIRECTS_QUERY,
  ALL_POSTS_SLUGS_QUERY,
  ALL_PAGES_SLUGS_QUERY,
  ALL_EVENTS_SLUGS_QUERY,
  ALL_BOOKS_SLUGS_QUERY,
} from './queries'
import type {Post, Page, Event, Category, Schedule, BookstoreItem, SiteSettings} from './types'

/**
 * Generic fetch function with error handling
 */
async function fetchSanity<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    const result = await client.fetch<T>(query, params ?? {})
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
  return fetchSanity(SITE_SETTINGS_QUERY)
}

// ============================================================================
// BLOG POSTS
// ============================================================================

export async function getAllPosts(): Promise<Post[]> {
  return (await fetchSanity<Post[]>(ALL_POSTS_QUERY)) || []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return fetchSanity(POST_BY_SLUG_QUERY, {slug})
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  return (await fetchSanity<Post[]>(POSTS_BY_CATEGORY_QUERY, {categoryId})) || []
}

export async function getRelatedPosts(categoryId: string, postId: string): Promise<Post[]> {
  return (await fetchSanity<Post[]>(RELATED_POSTS_QUERY, {categoryId, postId})) || []
}

export async function searchPosts(searchTerm: string): Promise<Post[]> {
  return (await fetchSanity<Post[]>(SEARCH_POSTS_QUERY, {searchTerm: `${searchTerm}*`})) || []
}

// ============================================================================
// CATEGORIES
// ============================================================================

export async function getAllCategories(): Promise<Category[]> {
  return (await fetchSanity<Category[]>(ALL_CATEGORIES_QUERY)) || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return fetchSanity(CATEGORY_BY_SLUG_QUERY, {slug})
}

// ============================================================================
// PAGES
// ============================================================================

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return fetchSanity(PAGE_BY_SLUG_QUERY, {slug})
}

export async function getHomePage(): Promise<Page | null> {
  return fetchSanity(HOME_PAGE_QUERY)
}

// ============================================================================
// EVENTS
// ============================================================================

export async function getUpcomingEvents(): Promise<Event[]> {
  return (await fetchSanity<Event[]>(UPCOMING_EVENTS_QUERY)) || []
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return fetchSanity(EVENT_BY_SLUG_QUERY, {slug})
}

// ============================================================================
// MEDITATION SCHEDULE
// ============================================================================

export async function getCurrentSchedule(): Promise<Schedule | null> {
  return fetchSanity(CURRENT_SCHEDULE_QUERY)
}

export async function getScheduleByWeek(week: number, year: number): Promise<Schedule | null> {
  return fetchSanity(SCHEDULE_BY_WEEK_QUERY, {week, year})
}

// ============================================================================
// BOOKSTORE
// ============================================================================

export async function getAllBooks(): Promise<BookstoreItem[]> {
  return (await fetchSanity<BookstoreItem[]>(ALL_BOOKS_QUERY)) || []
}

export async function getFeaturedBooks(): Promise<BookstoreItem[]> {
  return (await fetchSanity<BookstoreItem[]>(FEATURED_BOOKS_QUERY)) || []
}

export async function getBookBySlug(slug: string): Promise<BookstoreItem | null> {
  return fetchSanity(BOOK_BY_SLUG_QUERY, {slug})
}

export async function getBooksByCategory(category: string): Promise<BookstoreItem[]> {
  return (await fetchSanity<BookstoreItem[]>(BOOKS_BY_CATEGORY_QUERY, {category})) || []
}

// ============================================================================
// REDIRECTS
// ============================================================================

export async function getLegacyRedirect(
  oldPath: string
): Promise<{newPath: string; statusCode: number} | null> {
  const redirect = await fetchSanity<{newPath: string; statusCode: number}>(LEGACY_REDIRECT_QUERY, {oldPath})
  return redirect
    ? {newPath: redirect.newPath, statusCode: redirect.statusCode}
    : null
}

export async function getAllRedirects(): Promise<{oldPath: string; newPath: string; statusCode: number}[]> {
  return (await fetchSanity<{oldPath: string; newPath: string; statusCode: number}[]>(ALL_REDIRECTS_QUERY)) || []
}

// ============================================================================
// STATIC GENERATION
// ============================================================================

export async function getAllPostsSlugs() {
  return (await fetchSanity<{params: {slug: string}}[]>(ALL_POSTS_SLUGS_QUERY)) || []
}

export async function getAllPagesSlugs() {
  return (await fetchSanity<{params: {slug: string}}[]>(ALL_PAGES_SLUGS_QUERY)) || []
}

export async function getAllEventsSlugs() {
  return (await fetchSanity<{params: {slug: string}}[]>(ALL_EVENTS_SLUGS_QUERY)) || []
}

export async function getAllBooksSlugs() {
  return (await fetchSanity<{params: {slug: string}}[]>(ALL_BOOKS_SLUGS_QUERY)) || []
}

// ============================================================================
// IMAGE UTILITIES
// ============================================================================

/**
 * Generate Sanity image URL with transformations
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
