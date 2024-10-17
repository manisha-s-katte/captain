import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { memberId, action } = await req.json();

  try {
    const invitation = await prisma.teamMember.findUnique({
      where: { id: parseInt(memberId) },
      include: { user: true, team: true },
    });

    if (!invitation) {
      return NextResponse.json(
        { message: 'Invitation not found' },
        { status: 404 }
      );
    }

    if (invitation.user.email !== session.user?.email) {
      return NextResponse.json(
        { message: 'You are not authorized to respond to this invitation' },
        { status: 403 }
      );
    }

    if (invitation.status !== 'pending') {
      return NextResponse.json(
        { message: 'This invitation has already been responded to' },
        { status: 400 }
      );
    }

    if (action === 'accept') {
      await prisma.teamMember.update({
        where: { id: invitation.id },
        data: { status: 'accepted' },
      });

      // Notify the captain
      await prisma.notification.create({
        data: {
          userId: invitation.team.captainId,
          tournamentId: invitation.team.tournamentId,
          message: `${invitation.user.name} has accepted your invitation to join ${invitation.team.name}`,
          type: 'invite_accepted',
        },
      });
      return NextResponse.json(
        { message: 'Invitation accepted successfully' },
        { status: 200 }
      );
    } else if (action === 'reject') {
      await prisma.teamMember.update({
        where: { id: invitation.id },
        data: { status: 'rejected' },
      });

      // Notify the captain
      await prisma.notification.create({
        data: {
          userId: invitation.team.captainId,
          tournamentId: invitation.team.tournamentId,
          message: `${invitation.user.name} has rejected your invitation to join ${invitation.team.name}`,
          type: 'invite_rejected',
        },
      });

      //* remove the user from the team:
      await prisma.teamMember.delete({
        where: { id: invitation.id },
      });
      return NextResponse.json(
        { message: 'Invitation rejected successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    console.error('Error responding to invitation:', error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
