import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        tournaments: true,
        teamMembers: {
          include: {
            team: {
              include: {
                tournament: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Collect tournaments from user's created tournaments and team memberships
    const tournaments = [
      ...user.tournaments,
      ...user.teamMembers.map((member) => member.team.tournament),
    ]

    // Remove duplicates
    const uniqueTournaments = Array.from(new Set(tournaments.map((t) => t.id))).map(
      (id) => tournaments.find((t) => t.id === id)
    )

    return NextResponse.json({ tournaments: uniqueTournaments })
  } catch (error) {
    console.error('Error fetching user tournaments:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching tournaments' },
      { status: 500 }
    )
  } 
}