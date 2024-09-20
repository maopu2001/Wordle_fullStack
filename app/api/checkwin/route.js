import { decrypt } from '@/lib/simpleEncrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { gameCode, word } = await req.json();
    const decryptedGameCode = decrypt(gameCode);
    if (decryptedGameCode === word) return NextResponse.json({ message: 'Correct word' }, { status: 201 });
    else return NextResponse.json({ message: 'Incorrect word' }, { status: 202 });
  } catch (err) {
    return NextResponse.json({ message: err.message || err }, { status: 500 });
  }
}
