import { connectDB, GameId } from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { gameWord } = await req.json();
    if (gameWord === '') {
      return NextResponse.json({ message: 'Word Field must not be empty' }, { status: 400 });
    }

    await connectDB();

    const newGame = new GameId({ gameWord: gameWord.toUpperCase() });
    await newGame.save();

    return NextResponse.json({ gameId: newGame._id }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message || err }, { status: 500 });
  }
}
