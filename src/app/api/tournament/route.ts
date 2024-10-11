import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filterType = searchParams.get('type'); // Get the filter type from query string
  const today = new Date();

  console.log('searchParams', searchParams);

  let whereClause = {
    status: 'active',
    startDate: {},
    endDate: {},
  };

  if (filterType === 'ongoing') {
    whereClause = {
      ...whereClause,
      startDate: {
        lte: today, // Start date is less than or equal to today
      },
      endDate: {
        gte: today, // End date is greater than or equal to today
      },
    };
  } else if (filterType === 'upcoming') {
    whereClause = {
      ...whereClause,
      startDate: {
        gt: today, // Start date is greater than today
      },
    };
  } else if (filterType === 'previous') {
    whereClause = {
      ...whereClause,
      endDate: {
        lt: today, // End date is less than today
      },
    };
  }

  const tournaments = await prisma.tournament.findMany({
    where: whereClause,
    include: {
      gamePass: true,
      teams: true,
    },
  });

  return NextResponse.json(tournaments, { status: 200 });
}
