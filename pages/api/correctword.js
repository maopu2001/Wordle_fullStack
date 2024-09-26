import { connectDB, GameId } from '@/lib/connectDB';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { gameId } = req.body;
      await connectDB();
      const { gameWord } = await GameId.findById(gameId);

      return res.status(200).json({ gameWord });
    } catch (err) {
      return res.status(500).json({ message: err.message || err });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
