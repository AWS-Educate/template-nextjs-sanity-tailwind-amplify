/**
 * Next.js Middleware
 * Handles URL redirects configured in Sanity CMS
 * Uses in-memory cache to avoid Sanity API calls on every request
 */

import {NextResponse, type NextRequest} from 'next/server'

type RedirectEntry = {newPath: string; statusCode: number}

let redirectCache: Map<string, RedirectEntry> | null = null
let cacheTimestamp = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function loadRedirects(): Promise<Map<string, RedirectEntry>> {
  if (redirectCache && Date.now() - cacheTimestamp < CACHE_TTL) {
    return redirectCache
  }

  try {
    const {getAllRedirects} = await import('@/sanity/lib')
    const redirects = await getAllRedirects()
    const map = new Map<string, RedirectEntry>()
    for (const r of redirects) {
      map.set(r.oldPath, {newPath: r.newPath, statusCode: r.statusCode})
    }
    redirectCache = map
    cacheTimestamp = Date.now()
    return map
  } catch {
    return redirectCache || new Map()
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const redirects = await loadRedirects()
  const redirect = redirects.get(pathname)

  if (redirect) {
    const newUrl = new URL(redirect.newPath, request.url)
    return NextResponse.redirect(newUrl, {status: redirect.statusCode})
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
