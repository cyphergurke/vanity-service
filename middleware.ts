import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './navigation';


export default createMiddleware({
  localePrefix,
  locales,
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(de|en)/:path*']
};