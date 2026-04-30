import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - files with extensions (e.g. /favicon.ico)
    // - Next.js internals (_next)
    // - API routes
    '/((?!_next|api|.*\\..*).*)',
  ],
};
