export const revalidate = 10;
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const gamePasses = await prisma.gamePass.findMany({
      where: {
        status: 'active',
      },
    });

    return NextResponse.json(gamePasses, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';

    console.error('Error fetching game passes:', error);

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
