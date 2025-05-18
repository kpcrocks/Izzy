import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });
    return NextResponse.json(contactMessage);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 