import { signIn } from '@/auth';
import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 400 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        {
          message:
            'This email is associated with a Google account. Please sign in with Google.',
        },
        { status: 400 }
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 400 }
      );
    }

    await signIn('credentials', {
      redirect: false,
      name: user.name,
      email: user.email,
      id: user.id,
    });

    return NextResponse.json(
      { message: 'User LoggedIn successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging user', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
