import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/products - Get all products
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const products = await prisma.product.findMany({
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST /api/admin/products - Create a new product
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      description,
      price,
      images,
      sku,
      stock,
      status,
      variants,
    } = body;

    // Validate required fields
    if (!name || !description || !price || !sku) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Create product with variants
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        images,
        sku,
        stock,
        status: status || 'active',
        variants: {
          create: variants?.map((variant: any) => ({
            size: variant.size,
            color: variant.color,
            stock: variant.stock,
            sku: variant.sku,
          })) || [],
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 