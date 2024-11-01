export const revalidate = 10;
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const heroPosts = await prisma.heroPost.findMany();

    return NextResponse.json(heroPosts, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';

    console.error('Error fetching game passes:', error);

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
