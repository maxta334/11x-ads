import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Configure route options for App Router
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Helper function to convert string to Uint8Array
function stringToUint8Array(str) {
  return new TextEncoder().encode(str);
}

// Helper function to convert ArrayBuffer to hex string
function arrayBufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function POST(req) {
  try {
    // 1. Get and verify webhook signature
    const rawBody = await req.text();
    const headersList = headers();
    const signature = headersList.get("x-signature");
    
    if (!signature) {
      console.error('[WEBHOOK] No signature provided', {
        headers: Object.fromEntries(headersList.entries())
      });
      return new Response('No signature provided', { status: 401 });
    }

    if (!process.env.LEMONSQUEEZY_SIGNING_SECRET) {
      console.error('[WEBHOOK] LEMONSQUEEZY_SIGNING_SECRET not configured');
      return new Response('Webhook secret not configured', { status: 500 });
    }

    // Compute HMAC signature using Web Crypto API
    const key = await crypto.subtle.importKey(
      'raw',
      stringToUint8Array(process.env.LEMONSQUEEZY_SIGNING_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      stringToUint8Array(rawBody)
    );

    const computedSignature = arrayBufferToHex(signatureBuffer);

    if (signature !== computedSignature) {
      console.error('[WEBHOOK] Invalid signature', {
        expected: computedSignature,
        received: signature
      });
      return new Response('Invalid signature', { status: 401 });
    }

    // 2. Parse webhook payload after signature verification
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('[WEBHOOK] Failed to parse payload:', parseError);
      return new Response('Invalid JSON payload', { status: 400 });
    }

    const { 
      meta: { event_name },
      data: { attributes }
    } = payload;

    console.log('[WEBHOOK] Received event:', event_name, {
      user_email: attributes.user_email
    });

    // 3. Handle order events
    if (event_name === "order_created" || event_name === "order_paid") {
      // Get customer email from correct location in payload
      const customerEmail = attributes.user_email;
      const customerId = attributes.customer_id?.toString();

      if (!customerEmail) {
        console.error('[WEBHOOK] No customer email in payload', { attributes });
        return new Response('No customer email provided', { status: 400 });
      }

      // Find user by email
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .single();

      if (profileError) {
        console.error('[WEBHOOK] Error finding profile:', profileError);
        return new Response('Profile not found', { status: 404 });
      }

      // Update profile access
      const updateData = {
        has_access: true,
        customer_id: customerId
      };

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', profile.id);

      if (updateError) {
        console.error('[WEBHOOK] Profile update failed:', {
          error: updateError,
          userId: profile.id,
          customer_id: customerId
        });
        return new Response(
          JSON.stringify({ error: 'Failed to update profile' }), 
          { status: 500 }
        );
      }

      console.log('[WEBHOOK] Successfully updated access for:', {
        email: customerEmail,
        customer_id: customerId
      });
      return new Response('OK', { status: 200 });
    }

    // Acknowledge other events
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('[WEBHOOK] Error:', error);
    return new Response('Server error', { status: 500 });
  }
} 