import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmationEmail } from '@/lib/email';
import Stripe from 'stripe';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        user: {
          email: session.user.email
        }
      },
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { sessionId, items, shipping, total, email, customerEmail, createdAt } = body;
    if (!sessionId || !items || !total || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Check if order already exists for this sessionId (idempotency)
    const existingOrder = await prisma.order.findFirst({ where: { id: sessionId } });
    if (existingOrder) {
      return NextResponse.json(existingOrder);
    }
    // Create order
    const order = await prisma.order.create({
      data: {
        id: sessionId,
        user: { connect: { email } },
        total,
        status: 'pending',
        customerEmail: customerEmail || email,
        createdAt: createdAt ? new Date(createdAt) : new Date(),
        shipping: shipping ? {
          create: {
            name: shipping.name,
            address: {
              create: {
                line1: shipping.address.line1,
                line2: shipping.address.line2,
                city: shipping.address.city,
                state: shipping.address.state,
                postalCode: shipping.address.postal_code,
                country: shipping.address.country,
              }
            }
          }
        } : undefined,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            variantId: item.variantId,
            name: item.name,
            description: item.description,
            image: item.image
          })),
        },
      },
      include: { 
        items: true,
        shipping: {
          include: {
            address: true
          }
        }
      },
    });

    // Log the saved order for demonstration
    console.log('Saved Order in Database:', JSON.stringify(order, null, 2));

    // Send confirmation email
    await sendOrderConfirmationEmail(email, order);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
} 