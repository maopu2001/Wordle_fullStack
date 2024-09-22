import WordleTable from '@/components/gamepage/WordleTable';
import { GameId } from '@/lib/connectDB';
import { redirect } from 'next/navigation';

export default async function page({ params }) {
  const gameId = params.gameId;
  try {
    const game = await GameId.findById(gameId);
    const wordLength = game.gameWord.length;

    return <WordleTable wordLength={wordLength} gameId={gameId} />;
  } catch (err) {
    redirect('/');
  }
}
