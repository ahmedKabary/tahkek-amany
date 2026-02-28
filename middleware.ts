import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  if (!session) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  try {
    const verifyUrl = new URL('/api/sessionVerify', request.url)
    const res = await fetch(verifyUrl, {
      headers: {
        cookie: `session=${encodeURIComponent(session)}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  } catch {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/form/:path*', '/profile/:path*'],
}
