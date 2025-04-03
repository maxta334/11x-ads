import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import config from '@/config';

export async function GET(request) {
  const baseUrl = `https://${config.domainName}`;

  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            get(name) {
              return cookieStore.get(name)?.value;
            },
            set(name, value, options) {
              cookieStore.set(name, value, options);
            },
            remove(name, options) {
              cookieStore.set(name, '', { ...options, maxAge: 0 });
            },
          },
        }
      );

      // Exchange code for session
      await supabase.auth.exchangeCodeForSession(code);

      // Get user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session found');
      }

      // Check if user has access
      const { data: profile } = await supabase
        .from('profiles')
        .select('has_access')
        .eq('id', session.user.id)
        .single();

      // Redirect based on access status with replace
      const redirectUrl = profile?.has_access
        ? '/dashboard'
        : '/';

      const response = NextResponse.redirect(new URL(redirectUrl, baseUrl));
      return response;
    }

    // Default redirect with replace
    const response = NextResponse.redirect(new URL('/', baseUrl));
    return response;
  } catch (error) {
    console.error('Auth callback error:', error);
    const response = NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(error.message)}`, baseUrl)
    );
    return response;
  }
} 