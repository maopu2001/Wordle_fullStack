import { encrypt } from '@/lib/simpleEncrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { gameWord } = await req.json();
    if (gameWord === '') {
      return NextResponse.json({ message: 'Word Field must not be empty' }, { status: 400 });
    }

    const gameCode = encrypt(gameWord);

    return NextResponse.json({ gameCode }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message || err }, { status: 500 });
  }
}
