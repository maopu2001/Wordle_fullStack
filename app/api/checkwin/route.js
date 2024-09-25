import { connectDB, GameId } from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { gameId, word } = await req.json();

    await connectDB();
    const { gameWord } = await GameId.findById(gameId);
    const letterPosition = checkLetterPosition(gameWord, word);
    if (gameWord === word) return NextResponse.json({ message: 'Correct word', letterPosition }, { status: 200 });
    else if (word.indexOf(' ') !== -1 || word === '' || word.length !== gameWord.length)
      return NextResponse.json({ message: 'Invalid word' }, { status: 201 });
    else {
      return NextResponse.json({ message: 'Incorrect word', letterPosition }, { status: 202 });
    }
  } catch (err) {
    console.log(err.message || err);
    return NextResponse.json({ message: err.message || err }, { status: 500 });
  }
}

function checkLetterPosition(gameWord, currWord) {
  const letterPositionArray = [];
  for (let i = 0; i < currWord.length; i++) {
    if (gameWord[i] === currWord[i]) letterPositionArray.push('G');
    else if (gameWord.indexOf(currWord[i]) !== -1) letterPositionArray.push('Y');
    else letterPositionArray.push('N');
  }
  return letterPositionArray.join('');
}
