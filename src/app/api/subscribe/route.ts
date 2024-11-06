import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { sendWelcomeEmail } from '@/services/email/nodemailer';
import { NextResponse, type NextRequest } from 'next/server';



export async function POST(req: NextRequest) {
    const {email} = await req.json();

    //TODO: add to db

    
    try{
        await sendWelcomeEmail(
            email
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
