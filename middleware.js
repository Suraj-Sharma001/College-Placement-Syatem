import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const COOKIE = 'placement_token'
const SECRET = process.env.JWT_SECRET

export function middleware(req) {
  const { pathname } = req.nextUrl
  const isProtected = pathname.startsWith('/student') || pathname.startsWith('/faculty')
  if (!isProtected) return NextResponse.next()

  const token = req.cookies.get(COOKIE)?.value
  if (!token) return NextResponse.redirect(new URL('/login', req.url))
  try {
    const payload = jwt.verify(token, SECRET)
    if (pathname.startsWith('/student') && payload.role !== 'STUDENT') return NextResponse.redirect(new URL('/login', req.url))
    if (pathname.startsWith('/faculty') && payload.role !== 'FACULTY') return NextResponse.redirect(new URL('/login', req.url))
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = { matcher: ['/student/:path*', '/faculty/:path*'] }