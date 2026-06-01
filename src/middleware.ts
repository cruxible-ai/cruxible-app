import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOCKED_PREFIXES = [
  '/dashboard',
  '/audits',
  '/settings',
  '/product-graph',
  '/runs',
  '/chat',
  '/demo',
  '/promo',
  '/showcase',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (BLOCKED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/audits/:path*',
    '/settings/:path*',
    '/product-graph/:path*',
    '/runs/:path*',
    '/chat/:path*',
    '/demo/:path*',
    '/promo/:path*',
    '/showcase/:path*',
  ],
};
