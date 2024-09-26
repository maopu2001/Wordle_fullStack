import { connectDB, GameId } from '@/lib/connectDB';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { gameWord } = req.body;
      if (gameWord === '') {
        return res.status(400).json({ message: 'Word Field must not be empty' });
      }

      await connectDB();

      const newGame = new GameId({ gameWord: gameWord.toUpperCase() });
      await newGame.save();

      return res.status(200).json({ gameId: newGame._id });
    } catch (err) {
      return res.status(500).json({ message: err.message || err });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
