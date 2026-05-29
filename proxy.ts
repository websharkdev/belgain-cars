import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getSessionCookie } from 'better-auth/cookies';
import { routing } from '@/i18n/routing';
import { routes } from '@/lib/routes';

const intlMiddleware = createMiddleware(routing);

/**
 * Mapping of non-hyphenated auth paths to their hyphenated versions.
 */
const AUTH_REDIRECTS: Record<string, string> = {};

function getPathWithoutLocale(pathname: string) {
  const [, maybeLocale, ...rest] = pathname.split('/');

  if (
    routing.locales.includes(maybeLocale as (typeof routing.locales)[number])
  ) {
    return `/${rest.join('/')}` || '/';
  }

  return pathname;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameWithoutLocale = getPathWithoutLocale(pathname);

  // 1. Handle Auth Redirects (e.g., /auth/signin -> /auth/sign-in)
  // We check for exact matches in the redirect map
  const targetPath = AUTH_REDIRECTS[pathnameWithoutLocale.toLowerCase()];
  if (targetPath) {
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    return NextResponse.redirect(url, 301); // Permanent redirect for SEO and consistency
  }

  // 2. Static Assets & API (Should bypass BOTH Auth and Next-Intl)
  const isStaticAsset =
    pathname.startsWith('/_next') ||
    pathname.includes('email-test') ||
    pathname.includes('favicon.ico') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/background') ||
    pathname.startsWith('/api') ||
    /\.(.*)$/.test(pathname);

  if (isStaticAsset) {
    return NextResponse.next();
  }

  // 3. Public Pages (Bypass Auth, but RUN Next-Intl)
  const isPublicPage =
    pathnameWithoutLocale === '/' ||
    pathnameWithoutLocale.startsWith('/auth') ||
    pathnameWithoutLocale.startsWith('/terms') ||
    pathnameWithoutLocale.startsWith('/privacy');

  // 4. Auth Logic (Better Auth session cookie check)
  const sessionToken = getSessionCookie(request);

  if (!sessionToken && !isPublicPage) {
    const url = request.nextUrl.clone();
    url.pathname = routes.signIn;
    return NextResponse.redirect(url);
  }

  // 5. Run next-intl middleware for all pages (including public ones)
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons (public icons)
     * - background (public backgrounds)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icons|background).*)',
  ],
};
