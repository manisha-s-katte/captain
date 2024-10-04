import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET() {
  try {
    const posts = await prisma.socialMediaPost.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error getting social media posts', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
