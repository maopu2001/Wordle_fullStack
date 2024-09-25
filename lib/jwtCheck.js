import { cookies } from 'next/headers';
import { User, connectDB } from '@/lib/connectDB';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export default async function jwtCheck() {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      console.log('Token not found');
      return false;
    }

    if (!jwt.verify(token, JWT_SECRET)) {
      console.log('Token is invalid');
      return false;
    }

    const jwtUser = jwt.decode(token)?.userId;
    await connectDB();
    const user = await User.findById(jwtUser);
    if (!user) {
      console.log('User not found');
      return false;
    }

    console.log('userId:', jwtUser);
    return true;
  } catch (err) {
    console.error('Error during JWT check:', err);
    return false;
  }
}
