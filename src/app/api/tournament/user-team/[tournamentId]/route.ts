import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { tournamentId: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const tournamentId = params.tournamentId;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const team = await prisma.team.findFirst({
      where: {
        tournamentId: parseInt(tournamentId),
        OR: [
          { captainId: user.id },
          {
            members: {
              some: {
                userId: user.id,
                status: { in: ['accepted', 'pending'] },
              },
            },
          },
        ],
      },
      include: {
        captain: true,
        members: {
          include: { user: true },
        },
      },
    });

    return NextResponse.json(team, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    console.error('Error fetching user team:', error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
