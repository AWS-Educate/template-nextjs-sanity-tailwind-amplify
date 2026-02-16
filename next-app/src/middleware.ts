/**
 * Next.js Middleware
 * Handles legacy URL redirects from Wix migration
 */

import {NextResponse, type NextRequest} from 'next/server'
import {getLegacyRedirect} from '@/sanity/lib'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check for legacy redirects from Wix
  const redirect = await getLegacyRedirect(pathname)

  if (redirect) {
    const newUrl = new URL(redirect.newPath, request.url)
    return NextResponse.redirect(newUrl, {status: redirect.statusCode})
  }

  return NextResponse.next()
}

/**
 * Matcher for middleware
 * Run middleware for all routes except static assets
 */
export const config = {
  matcher: [
    // Run on all routes except:
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
