import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin route protection ───────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    // Login page is always accessible
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const response = NextResponse.next();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return response;
  }

  // ── i18n for everything else ─────────────────────────────────────────────
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/admin/:path*',
    // Match all pathnames except files with extensions and Next.js internals
    '/((?!_next|api|.*\\..*).*)',
  ],
};
