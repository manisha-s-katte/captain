import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { sendRegisterTournamentEmail } from '@/services/email/nodemailer';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, gender, age, teamName, heardFrom, tournamentId } =
    await req.json();
  console.log(name, gender, age, teamName, heardFrom, tournamentId);
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { message: 'In order to join a tournament, you need to be logged in.' },
      { status: 401 }
    );
  }

  try {
    const parsedTournamentId = parseInt(tournamentId);
    const parsedAge = parseInt(age);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    await prisma.tournamentRegistration.create({
      data: {
        name,
        gender,
        age: parsedAge,
        teamName,
        heardFrom,
        tournamentId: parsedTournamentId,
        userId: user!.id,
      },
    });

    await sendRegisterTournamentEmail(user?.email as string);
    return NextResponse.json(
      { message: 'Joined successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error joining tournament', error);
    return NextResponse.json({ message: 'Failed to join' }, { status: 500 });
  }
}
