/**
 * Security headers for `next dev` / server deployments.
 * Static export (`output: 'export'`) uses public/staticwebapp.config.json on Azure SWA.
 */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SECURITY_HEADERS } from './lib/security-headers'

export function middleware(_request: NextRequest) {
  const response = NextResponse.next()

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|favicon.svg|icons.svg|robots.txt).*)'],
}
