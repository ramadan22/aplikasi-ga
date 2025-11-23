import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { Role, roleAccess } from './constants/Role';
import { navItems } from './data/Menus';

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

function getAllNavPaths(): string[] {
  const paths: string[] = [];

  navItems.forEach(item => {
    if (item.path) paths.push(item.path);

    if (item.subItems) {
      item.subItems.forEach(sub => {
        if (sub.path) paths.push(sub.path);
      });
    }
  });

  return paths;
}

function getAllowedRolesForPath(pathname: string): Role[] | undefined {
  const normalized = pathname === '' ? '/' : pathname;

  const allPaths = getAllNavPaths();

  const matched = allPaths.find(p => normalized.startsWith(p));

  if (!matched) return undefined;

  const allowedRoles = Object.entries(roleAccess)
    .filter(([, paths]) => paths.includes(matched))
    .map(([role]) => role as Role);

  return allowedRoles.length ? allowedRoles : undefined;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  let response = NextResponse.next();

  if (pathname.startsWith('/_next') || pathname.includes('.') || pathname.startsWith('/api')) {
    return response;
  }

  const pathnameHasLocale = locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  response.headers.set('x-pathname', `${pathname}`);

  if (!pathnameHasLocale) {
    const locale = getLocale(req);
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = `/${locale}${pathname}`;
    response.headers.set('x-pathname', `${newUrl}`);
    response = NextResponse.redirect(newUrl);
  }

  const segments = pathname.split('/');
  const currentLocale = locales.includes(segments[1]) ? segments[1] : defaultLocale;

  const isAuthPage = pathname.includes('/login');
  const isChangePasswordPage = pathname.includes('/change-password');
  const isUpdateProfileFirstPage = pathname.includes('/update-profile');

  if (!isAuth && !isAuthPage) {
    let from = pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    response = NextResponse.redirect(
      new URL(`/${currentLocale}/login?from=${encodeURIComponent(from)}`, req.url),
    );
  }

  if (isAuthPage && isAuth) {
    response = NextResponse.redirect(new URL(`/${currentLocale}`, req.url));
  }

  if (!isChangePasswordPage && !isUpdateProfileFirstPage && isAuth && !token?.isActive) {
    response = NextResponse.redirect(new URL(`/${currentLocale}/change-password`, req.url));
  }

  if (isChangePasswordPage && isAuth && token?.isActive) {
    response = NextResponse.redirect(new URL(`/${currentLocale}/update-profile`, req.url));
  }

  if (isAuth) {
    const cleanPath = pathname.replace(`/${currentLocale}`, '');
    const userRole = token?.role as Role;
    const allowedRoles = getAllowedRolesForPath(cleanPath);

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL(`/${currentLocale}/403`, req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt).*)'],
};
