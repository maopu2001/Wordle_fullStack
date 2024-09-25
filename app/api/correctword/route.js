import { connectDB, GameId } from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { gameId } = await req.json();
    await connectDB();
    const { gameWord } = await GameId.findById(gameId);

    return NextResponse.json({ gameWord }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message || err }, { status: 500 });
  }
}
