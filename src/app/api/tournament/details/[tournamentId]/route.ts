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
    const parsedTournamentId = parseInt(tournamentId);
    const tournament = await prisma.tournament.findUnique({
      where: { id: parsedTournamentId },
      include: { gamePass: true, registrations: true },
    });

    return NextResponse.json(tournament, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    console.error('Error fetching tournament details', error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
