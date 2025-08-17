import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const Routing = defineRouting({
  locales: ['en', 'id'],
  defaultLocale: 'en', // Bahasa default
  pathnames: {},
});

export type Locale = (typeof Routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } = createNavigation(Routing);
