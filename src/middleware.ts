import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'id'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());

    for (const lang of preferredLanguages) {
      const shortLang = lang.split('-')[0];
      if (locales.includes(shortLang)) {
        return shortLang;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.includes('.') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return response;
  }

  const locale = getLocale(request);
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(newUrl);
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt).*)'],
};
