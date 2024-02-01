import createMiddleware from 'next-intl/middleware';
import { locales } from '../i18n.config';

export default createMiddleware({
  defaultLocale: locales[0],
  localeDetection: false,
  locales,
});

export const config = {
  matcher: ['/', '/(sv|en)/:path*'],
};
