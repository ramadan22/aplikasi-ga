import { Locale, Routing } from '@/lib/next-intl/Routing';
import { getRequestConfig } from 'next-intl/server';

const GetRequestConfigHandler = getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !Routing.locales.includes(locale as Locale)) {
    locale = Routing.defaultLocale;
  }

  const messages = {
    ...(await import(`@/language/sidebar-menu/${locale}.json`)).default,
  };

  return { locale, messages };
});

export default GetRequestConfigHandler;
