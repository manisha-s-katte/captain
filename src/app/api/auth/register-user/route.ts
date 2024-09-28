import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, confirmPassword } =
    await req.json();
  console.log(firstName, lastName, email, password, confirmPassword);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      {
        message: 'User registered successfully',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error registering user', error);

    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      {
        status: 500,
      }
    );
  }
}
