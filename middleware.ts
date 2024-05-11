import createMiddleware from 'next-intl/middleware';
import {locales, localePrefix} from './navigation';

console.log('Middleware config:', { localePrefix, locales });

export default createMiddleware({
  localePrefix,
  locales,
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(de|en)/:path*']
};