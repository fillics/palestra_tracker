import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!startDate || !endDate) {
    console.error('Invalid date range', { startDate, endDate });
    return NextResponse.json({ error: 'Invalid date range' }, { status: 400 });
  }

  try {
    const summary = await prisma.exercise.groupBy({
      by: ['category'],
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      _count: {
        _all: true,
      },
    });
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error('Error fetching summary', error);
    return NextResponse.json({ error: 'An error occurred while fetching the summary' }, { status: 500 });
  }
}
