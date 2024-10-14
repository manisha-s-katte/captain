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
      include: {
        gamePass: true,
        teams: {
          include: {
            captain: true,
          },
        },
        brackets: {
          include: {
            upperMatches: {
              include: {
                participants: true,
              },
            },
            lowerMatches: {
              include: {
                participants: true,
              },
            },
          },
        },
      },
    });

    // Transforming tournament data to extract brackets in a custom format
    // const customBrackets =
    //   tournament?.brackets.map((bracket) => ({
    //     id: bracket.id,
    //     upperMatches: bracket.upperMatches.map((match) => ({
    //       id: match.id,
    //       participants: match.participants,
    //     })),
    //     lowerMatches: bracket.lowerMatches.map((match) => ({
    //       id: match.id,
    //       participants: match.participants,
    //     })),
    //   })) || [];

    // console.log(customBrackets);
    const allUpperMatches =
      tournament?.brackets.flatMap((bracket) => bracket.upperMatches) || [];
    console.log(allUpperMatches);

    return NextResponse.json(
      { ...tournament, upperMatches: allUpperMatches, brackets: undefined },
      { status: 200 }
    );
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    console.error('Error fetching tournament details', error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
