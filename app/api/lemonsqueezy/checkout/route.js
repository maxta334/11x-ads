import { NextResponse } from 'next/server';
import { LEMONSQUEEZY } from "@/config";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const variantId = LEMONSQUEEZY.boilerplate.variantId;

    if (!process.env.LEMONSQUEEZY_API_KEY) {
      throw new Error('LEMONSQUEEZY_API_KEY is not set');
    }

    if (!process.env.LEMONSQUEEZY_STORE_ID) {
      throw new Error('LEMONSQUEEZY_STORE_ID is not set');
    }

    // Create checkout URL using Lemon Squeezy API
    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: email,
              discount_code: "LAUNCH"
            },
            checkout_options: {
              discount: true
            },
            product_options: {
              redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
              receipt_button_text: "Go to Dashboard",
              receipt_link_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
              receipt_thank_you_note: "Thank you for your purchase! Click below to access your dashboard."
            }
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMONSQUEEZY_STORE_ID.toString()
              }
            },
            variant: {
              data: {
                type: "variants",
                id: variantId.toString()
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create checkout');
    }

    const checkout = await response.json();
    const url = checkout.data.attributes.url;

    return new NextResponse(
      JSON.stringify({ url }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return new NextResponse(
      JSON.stringify({ message: error.message || 'Failed to create checkout session' }), 
      { status: 500 }
    );
  }
} 