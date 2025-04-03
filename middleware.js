import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const hostname = req.headers.get('host').replace('www.', '');
  const url = req.nextUrl;

  // Handle subdomain routing
  const domains = {
    'roadmap.cookfast.dev': '/roadmap',
    'learn.cookfast.dev': '/roadmap/vsl'
  };

  // Handle subdomain routing first
  if (domains[hostname]) {
    // Allow static assets to pass through
    if (url.pathname.startsWith('/_next/') || 
        url.pathname.startsWith('/assets/') ||
        url.pathname.startsWith('/public/')) {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL(domains[hostname], req.url));
  }

  // Only protect dashboard routes
  if (!url.pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  
  // Create Supabase client with ANON key only
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  // Handle authentication errors
  if (sessionError) {
    console.error('Auth error:', sessionError.message);
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // If not authenticated, redirect to signin
  if (!session) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {
    // Check access using RLS policies
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('has_access')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError.message);
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    // Handle dashboard access
    if (!profile?.has_access) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error.message);
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

// Update matcher to include all routes except static files
export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico).*)',
    // But do match paths starting with /assets and /public
    '/assets/:path*',
    '/public/:path*'
  ]
};