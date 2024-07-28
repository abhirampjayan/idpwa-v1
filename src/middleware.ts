import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define which paths are considered public (no auth required)
  const publicPaths = ['/', '/login', '/api/auth'];

  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path.startsWith(publicPath) || path === publicPath
  );

  // Get the token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // If the path is public, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If there's no token and the path is not public, redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Special handling for /register page
  if (path === '/register') {
    // Only allow access if the user is new and has a session
    if (token?.isNewUser) {
      return NextResponse.next();
    } else {
      // If not a new user, redirect to home or dashboard
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If the user is new and trying to access a path other than /register, redirect to register
  if (token?.isNewUser && path !== '/register') {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  // For all other cases, allow access
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};