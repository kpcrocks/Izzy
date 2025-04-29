import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET /api/inventory - Get all products with their inventory levels
export async function GET() {
  try {
    // Get the user session to check if they're authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all products with their variants
    const products = await prisma.product.findMany({
      include: {
        variants: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

// POST /api/inventory - Add a new product with inventory
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      name,
      description,
      price,
      sku,
      stock,
      images,
      variants
    } = body;

    // Validate required fields
    if (!name || !description || !price || !sku) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the product with its variants
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        sku,
        stock: stock || 0,
        images: images || [],
        variants: {
          create: variants || [],
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 