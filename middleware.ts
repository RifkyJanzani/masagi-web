import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add a custom header to identify admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const response = NextResponse.next()
    response.headers.set('x-is-admin', 'true')
    return response
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
} 