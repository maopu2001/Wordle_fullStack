import fs from 'fs';
import { connectDB, Dictionary } from '@/lib/connectDB';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const arr = Object.keys(JSON.parse(fs.readFileSync('./dictionary.json', 'utf8')));
    const result = [];
    for (let i of arr) {
      if (i.length > 2 && i.length <= 7) {
        const newWord = {
          word: i.toUpperCase(),
          length: i.length,
        };
        result.push(newWord);
      }
    }

    await connectDB();
    const options = { ordered: true };
    await Dictionary.insertMany(result, options);
    return res.status(200).json({ message: 'OK' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
