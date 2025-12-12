import { connectDB, Dictionary, GameId } from "@/lib/connectDB";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { gameWord, temporary, selectedSize } = req.body;
      await connectDB();

      //Temp
      if (temporary && selectedSize) {
        if (selectedSize < 3 || selectedSize > 7)
          return res
            .status(400)
            .json({ message: "Word must contain 3 to 7 letters" });

        const randomWord = await Dictionary.aggregate([
          { $match: { length: parseInt(selectedSize) } },
          { $sample: { size: 1 } },
        ]);

        const newGame = new GameId({
          gameWord: randomWord[0].word.toUpperCase(),
          expireAt: new Date(Date.now() + 24 * 3600 * 1000), // auto delete after 24 hours
        });

        await newGame.save();

        return res.status(200).json({ gameId: newGame._id });
      }
      //Permanent
      else {
        if (gameWord === "") {
          return res
            .status(400)
            .json({ message: "Word Field must not be empty" });
        }

        if (gameWord.length < 3 || gameWord.length > 7)
          return res
            .status(400)
            .json({ message: "Word must contain 3 to 7 letters" });

        for (let i of gameWord) {
          if (
            (i.charCodeAt(0) >= 65 && i.charCodeAt(0) <= 90) ||
            (i.charCodeAt(0) >= 97 && i.charCodeAt(0) <= 122)
          )
            continue;

          return res
            .status(400)
            .json({ message: "Word must contain only letters" });
        }

        const newGame = new GameId({ gameWord: gameWord.toUpperCase() });
        await newGame.save();

        return res.status(200).json({ gameId: newGame._id });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message || err });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
