import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, repetitions, weight, sets, date, category } = await req.json();
  try {
    const newExercise = await prisma.exercise.create({
      data: { name, repetitions, weight, sets, date: new Date(date), category },
    });
    return NextResponse.json(newExercise, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while creating the exercise' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany();
    return NextResponse.json(exercises, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching the exercises' }, { status: 500 });
  }
}
