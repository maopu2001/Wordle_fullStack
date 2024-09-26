import { User, connectDB } from '@/lib/connectDB';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fullName, username, email, password, confirmedPassword } = req.body;
      if (password !== confirmedPassword) {
        return res.status(400).json({ message: `Passwords doesn't match` });
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = {
        fullName,
        username,
        email,
        password: hashedPassword,
      };

      if (!fullName || !username || !email || !password || !confirmedPassword) {
        return res.status(400).json({ message: 'Please fillup all fields.' });
      }
      await connectDB();
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'User with the same username already exists' });
      }
      user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User with the same email already exists' });
      }

      await User.create(newUser);
      return res.status(200).json({ message: 'User successfully Signed Up' });
    } catch (err) {
      return res.status(500).json({ message: err.message || err });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
