// app/api/discord/redirect/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signIn } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    // Get the URL from the request to extract the code
    const searchParams = new URL(request.url).searchParams;
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    // Construct form data for token request
    const formData = new URLSearchParams({
      client_id: process.env.AUTH_DISCORD_ID!,
      client_secret: process.env.AUTH_DISCORD_SECRET!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.DISCORD_REDIRECT_URI}`,
    });

    // Exchange code for access token
    const tokenResponse = await fetch(
      'https://discord.com/api/v10/oauth2/token',
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      return NextResponse.json(
        { error: 'Failed to get access token', details: error },
        { status: tokenResponse.status }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user information using the access token
    const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to get user information' },
        { status: userResponse.status }
      );
    }

    const userData = await userResponse.json();

    // Check for existing user and update or create
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          email: userData.email,
          discordId: userData.id,
          name: userData.username,
          role: 'user',
        },
      });
    } else {
      await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.username,
          discordId: userData.id,
        },
      });
    }

    await signIn('credentials', {
      redirect: false,
      name: userData.username,
      email: userData.email,
      id: userData.id,
      image: userData?.avatar
        ? `https://cdn.discordapp.com/avatars/${userData?.id}/${userData?.avatar}.png`
        : null,
    });

    // Redirect after successful login
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Discord OAuth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
