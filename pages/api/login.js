import { User, connectDB } from '@/lib/connectDB';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'Provide both username and password' });
      }
      await connectDB();
      const savedUser = await User.findOne({ username });
      if (!savedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!bcrypt.compareSync(password, savedUser.password)) {
        return res.status(400).json({ message: 'username or password is incorrect' });
      }

      const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);

      res.setHeader(
        'Set-Cookie',
        serialize('token', token, {
          path: '/',
          maxAge: 60 * 60 * 24, // 1 day
        })
      );

      return res.status(200).json({ message: 'User successfully Logged in' });
    } catch (err) {
      return res.status(500).json({ message: err.message || err });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
