import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { teamName, tournamentId, email, phoneNumber, age, gender, heardFrom } =
    await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        phoneNumber: phoneNumber,
        age: parseInt(age),
        gender: gender,
      },
    });

    // Check if the user already has a team for this tournament
    const existingTeam = await prisma.team.findFirst({
      where: {
        tournamentId: parseInt(tournamentId),
        captainId: user.id,
      },
    });

    if (existingTeam) {
      return NextResponse.json(
        { message: 'You already have a team for this tournament' },
        { status: 400 }
      );
    }

    //* check if the user is already a member of the tournament
    const existingMember = await prisma.teamMember.findFirst({
      where: {
        team: { tournamentId: parseInt(tournamentId) },
        userId: user.id,
      },
    });

    console.log('existingMember', existingMember);

    if (existingMember) {
      return NextResponse.json(
        {
          message:
            'You are  already a member or has a pending invitation of this tournament',
        },
        { status: 400 }
      );
    }

    const newTeam = await prisma.team.create({
      data: {
        name: teamName,
        tournamentId: parseInt(tournamentId),
        captainId: user.id,
        heardFrom: heardFrom,
      },
    });

    // Create the captain as a team member
    await prisma.teamMember.create({
      data: {
        teamId: newTeam.id,
        userId: user.id,
        status: 'accepted',
      },
    });

    return NextResponse.json(
      { message: 'Team created successfully', team: newTeam },
      { status: 201 }
    );
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    console.error('Error creating team:', error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
