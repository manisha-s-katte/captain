import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/auth';
import type { CustomUser } from './types';

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = new URL(req.nextUrl);
  const user = session?.user as CustomUser;

  const publicPaths = [
    '/login',
    '/signup',
    '/reset-password',
    '/forgot-password',
  ];

  console.log('session', session, 'user', user, 'pathname', pathname);
  if (!user) {
    if (publicPaths.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
