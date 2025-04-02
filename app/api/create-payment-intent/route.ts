import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

// initialize stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia'
  });

export async function POST(request: Request) {
  try {
    // Create the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // Amount in cents (e.g., 2000 = $20.00)
      currency: 'usd',
      // Add any additional options like:
      // payment_method_types: ['card'],
      // metadata: { order_id: '123', ... }
    });

    // Return the client_secret to the frontend
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Handle any errors
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
}

