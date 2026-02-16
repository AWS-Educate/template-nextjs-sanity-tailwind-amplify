import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2025-02-16'

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!dataset) throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')

/**
 * Sanity Client for frontend (read-only)
 * Used for fetching content in Next.js pages and components
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

/**
 * Sanity Client for server-side operations (with token)
 * Used for mutations and authenticated operations
 */
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
})
