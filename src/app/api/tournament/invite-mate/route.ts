import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { sendInvitationEmail } from '@/services/email/nodemailer';
// import { sendInvitationEmail } from '@/services/email/nodemailer';
import { NextResponse, type NextRequest } from 'next/server';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { teamId, name, email, gender, phoneNumber, age } = await req.json();

  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(teamId) },
      include: { captain: true, tournament: true },
    });

    if (!team) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    // Check if the user is captain of another team in the same tournament
    const userAsCaptain = await prisma.user.findFirst({
      where: {
        email: email,
        captainedTeams: {
          some: {
            tournamentId: team.tournament.id, // Check if the user is a captain in the same tournament
          },
        },
      },
    });

    if (userAsCaptain) {
      return NextResponse.json(
        {
          message:
            'The user is already a captain of another team in the same tournament',
        },
        { status: 403 }
      );
    }

    // Check if the user is already a member of the team
    const existingMember = await prisma.teamMember.findFirst({
      where: {
        teamId: parseInt(teamId),
        user: { email },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        {
          message: 'This user is already a member or has a pending invitation',
        },
        { status: 400 }
      );
    }

    // Create or find the user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const hashedPassword = await hash(crypto.randomUUID(), 10);
      user = await prisma.user.create({
        data: {
          name,
          email,
          gender,
          phoneNumber,
          age: parseInt(age),
          role: 'virtual',
          password: hashedPassword,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          phoneNumber: phoneNumber,
          age: parseInt(age),
          gender: gender,
        },
      });
    }

    // Create the team member invitation
    const invitation = await prisma.teamMember.create({
      data: {
        teamId: parseInt(teamId),
        userId: user.id,
        status: 'pending',
      },
    });

    // Create notification for the invited user
    await prisma.notification.create({
      data: {
        userId: user.id,
        tournamentId: team.tournamentId,
        message: `You've been invited to join team ${team.name}`,
        type: 'invite_sent',
      },
    });

    // Create notification for the captain
    await prisma.notification.create({
      data: {
        userId: team.captainId,
        tournamentId: team.tournamentId,
        message: `You've invited ${name} to join your team ${team.name}`,
        type: 'invite_sent',
      },
    });

    // Send invitation email. we will implement soon.
    await sendInvitationEmail(
      email,
      team.name,
      team.captain.name,
      team.tournament.title
    );

    return NextResponse.json(
      { message: 'Invitation sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error inviting friend:', error);
    return NextResponse.json(
      { message: 'Failed to send invitation' },
      { status: 500 }
    );
  }
}
