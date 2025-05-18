import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      select: { stock: true },
    });
    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }
    return NextResponse.json({ stock: product.stock });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 