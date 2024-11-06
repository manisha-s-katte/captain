import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';


export async function POST(
  req: NextRequest,
) {

  const {email,userName} = await req.json();

  try {
    const user = await prisma.user.update({
        where:{
            email: email
        },
        data:{
            name: userName
        }
      })

    if (!user) {
      return NextResponse.json(
        { message: 'user not found' },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } 
  catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    console.error('Error fetching user details', error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
