import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'shipping'],
    });

    // Get the line items
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    // Format the order details
    const orderDetails = {
      id: session.id,
      amount_total: session.amount_total,
      customer_email: session.customer_details?.email,
      shipping: session.shipping_details,
      items: lineItems.data.map(item => {
        const product = item.price?.product;
        const image = product && typeof product === 'object' && 'images' in product
          ? product.images?.[0]
          : undefined;

        return {
          name: item.description,
          quantity: item.quantity,
          amount: item.amount_total,
          image,
        };
      }),
      created: new Date(session.created * 1000).toLocaleDateString(),
    };

    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order details' },
      { status: 500 }
    );
  }
} 