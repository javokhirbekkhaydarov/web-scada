import { NextResponse } from 'next/server'

const protectedRoutes = ['/', '/addbuyout', 'buyout', '/accounts', '/dashboards', '/resource']
const authRoutes = ['/auth/login']

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value

  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [...protectedRoutes, ...authRoutes]
}
