import fs from "fs";
import { connectDB, Dictionary } from "@/lib/connectDB";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();
    const options = { ordered: true };
    const dictionaryCount = await Dictionary.countDocuments();
    if (dictionaryCount > 0) {
      return res.status(200).json({ message: "Dictionary already populated" });
    }

    const words = JSON.parse(fs.readFileSync("./words.json", "utf8"));
    await Dictionary.insertMany(words, options);
    return res
      .status(200)
      .json({ message: "Dictionary populated successfully" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
