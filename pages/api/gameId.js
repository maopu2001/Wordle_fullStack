import { connectDB, GameId } from '@/lib/connectDB';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { gameWord } = req.body;

      if (gameWord === '') {
        return res.status(400).json({ message: 'Word Field must not be empty' });
      }
      if (gameWord.length < 3 && gameWord.length < 8)
        return res.status(400).json({ message: 'Word must contain 3 to 7 letters' });

      for (let i of gameWord) {
        if ((i.charCodeAt(0) >= 65 && i.charCodeAt(0) <= 90) || (i.charCodeAt(0) >= 97 && i.charCodeAt(0) <= 122)) {
          continue;
        }
        return res.status(400).json({ message: 'Word must contain only letters' });
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
