import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { sendCancellationEmail } from '@/lib/email';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check if the order belongs to the user
    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if the order can be cancelled (e.g., within 24 hours and not already cancelled)
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const hoursSinceOrder = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);

    if (hoursSinceOrder > 24) {
      return NextResponse.json(
        { error: 'Orders can only be cancelled within 24 hours of purchase' },
        { status: 400 }
      );
    }

    if (order.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Order is already cancelled' },
        { status: 400 }
      );
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      return NextResponse.json(
        { error: 'Cannot cancel an order that has been shipped or delivered' },
        { status: 400 }
      );
    }

    // Process refund through Stripe
    try {
      await stripe.refunds.create({
        payment_intent: order.id, // Assuming the order ID is the payment intent ID
        reason: 'requested_by_customer',
      });
    } catch (stripeError) {
      console.error('Stripe refund error:', stripeError);
      return NextResponse.json(
        { error: 'Failed to process refund' },
        { status: 500 }
      );
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: {
        status: 'cancelled',
        updatedAt: new Date(),
      },
      include: { 
        items: true,
        user: true // Include user to get email
      },
    });

    // Send cancellation confirmation email
    await sendCancellationEmail(updatedOrder.user.email, updatedOrder);

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { error: 'Failed to cancel order' },
      { status: 500 }
    );
  }
} 