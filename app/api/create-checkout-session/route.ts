import { NextResponse } from 'next/server';
import Stripe from 'stripe';

let stripe: Stripe | null = null;

export async function POST(request: Request) {
  try {
    // Check if required environment variables are set
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is not set in environment variables' },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_BASE_URL is not set in environment variables' },
        { status: 500 }
      );
    }

    // Initialize Stripe if not already initialized
    if (!stripe) {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-02-24.acacia',
      });
    }

    const body = await request.json();
    const { items, shipping } = body;

    if (!items?.length) {
      return NextResponse.json(
        { error: 'No items provided in the request' },
        { status: 400 }
      );
    }

    // Ensure all required item fields are present
    for (const item of items) {
      if (!item.name || !item.price || !item.quantity) {
        return NextResponse.json(
          { error: 'Invalid item data: missing required fields' },
          { status: 400 }
        );
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [new URL(item.image, process.env.NEXT_PUBLIC_BASE_URL).toString()] : undefined,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(shipping * 100), // Convert to cents
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    if (!session?.url) {
      return NextResponse.json(
        { error: 'Failed to create Stripe checkout session URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error:', error);
    // Return more specific error message
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating the checkout session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 