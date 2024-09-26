import { connectDB, GameId } from '@/lib/connectDB';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { gameId, word } = req.body;
      await connectDB();
      const { gameWord } = await GameId.findById(gameId);
      const letterPosition = checkLetterPosition(gameWord, word);
      if (gameWord === word) {
        return res.status(200).json({ message: 'Correct word', letterPosition });
      } else if (word.indexOf(' ') !== -1 || word === '' || word.length !== gameWord.length) {
        return res.status(201).json({ message: 'Invalid word' });
      } else {
        return res.status(202).json({ message: 'Incorrect word', letterPosition });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message || err });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

function checkLetterPosition(gameWord, currWord) {
  const letterPositionArray = Array(currWord.length).fill(' ');

  const gameWordMap = new Map();
  for (let i of gameWord) {
    gameWordMap.set(i, gameWordMap.get(i) + 1 || 1);
  }

  // Green
  for (let i = 0; i < currWord.length; i++) {
    if (gameWord[i] === currWord[i]) {
      letterPositionArray[i] = 'G';
      gameWordMap.set(gameWord[i], gameWordMap.get(gameWord[i]) - 1);
    }
  }
  // Yellow
  for (let i = 0; i < currWord.length; i++) {
    if (letterPositionArray[i] === ' ' && gameWord.indexOf(currWord[i]) !== -1 && gameWordMap.get(currWord[i]) > 0) {
      letterPositionArray[i] = 'Y';
      gameWordMap.set(currWord[i], gameWordMap.get(currWord[i]) - 1);
    }
  }
  // None
  for (let i = 0; i < currWord.length; i++) {
    if (letterPositionArray[i] === ' ') {
      letterPositionArray[i] = 'N';
    }
  }

  return letterPositionArray.join('');
}
