import { connectDB, GameId } from '@/lib/connectDB';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { gameId } = req.body;
    try {
      await connectDB();
      if (await GameId.findById(gameId)) {
        return res.status(200).json({ gameId });
      }
      return res.status(404).json({ message: 'Invalid Game ID' });
    } catch (err) {
      return res.status(500).json({ message: 'Invalid Game ID' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
