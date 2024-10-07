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
  console.log('teamId', teamId);
  console.log('name', name);
  console.log('email', email);
  console.log('gender', gender);
  console.log('phoneNumber', phoneNumber);
  console.log('age', age);

  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(teamId) },
      include: { captain: true, tournament: true },
    });

    if (!team) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    // handle on the front end
    // if (team.captainId !== session.user?.id) {
    //   return NextResponse.json(
    //     { message: 'Only the team captain can invite members' },
    //     { status: 403 }
    //   );
    // }

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
        message: `You've been invited to join team ${team.name}`,
        type: 'invite_sent',
      },
    });

    // Create notification for the captain
    await prisma.notification.create({
      data: {
        userId: team.captainId,
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
