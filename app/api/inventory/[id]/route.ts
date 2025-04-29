import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET /api/inventory/[id] - Get a specific product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const productId = params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PATCH /api/inventory/[id] - Update product inventory
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const productId = params.id;
    const body = await request.json();
    const { stock, variants } = body;

    // Update the main product stock if provided
    let updateData: any = {};
    if (typeof stock === 'number') {
      updateData.stock = stock;
    }

    // Update the product
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: updateData,
    });

    // Update variants if provided
    if (variants && Array.isArray(variants)) {
      for (const variant of variants) {
        if (variant.id && typeof variant.stock === 'number') {
          await prisma.variant.update({
            where: {
              id: variant.id,
            },
            data: {
              stock: variant.stock,
            },
          });
        }
      }
    }

    // Fetch the updated product with its variants
    const updatedProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating inventory:', error);
    return NextResponse.json(
      { error: 'Failed to update inventory' },
      { status: 500 }
    );
  }
}

// DELETE /api/inventory/[id] - Delete a product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const productId = params.id;
    // Delete the product (this will also delete associated variants due to cascade)
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 