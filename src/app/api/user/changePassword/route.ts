import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { tournamentId: string } }
) {


  const userName = await req.json();
  const user = await prisma.user.findFirst({
    where:{
        name: userName
    }
  })
  

  try {
    const tournaments = await prisma.tournament.findMany({
      where: { 
            user: user
       },
     
    });

    if (!tournaments) {
      return NextResponse.json(
        { message: 'Tournament not found' },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(tournaments, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    console.error('Error fetching tournament details', error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
