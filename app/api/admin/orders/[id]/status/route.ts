import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json();
    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }
    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
      include: { items: true },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
} 