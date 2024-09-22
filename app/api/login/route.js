import { NextResponse } from 'next/server';
import { User, connectDB } from '@/lib/connectDB';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Provide both username and password' }, { status: 400 });
    }
    await connectDB();
    const savedUser = await User.findOne({ username });
    if (!savedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (!bcrypt.compareSync(password, savedUser.password)) {
      return NextResponse.json({ message: 'username or password is incorrect' }, { status: 400 });
    }

    const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);

    const res = NextResponse.json({ message: 'User successfully Logged in' }, { status: 200 });
    res.cookies.set('token', token, {
      maxAge: 3600 * 24, //24h
    });
    return res;
  } catch (err) {
    return NextResponse.json({ message: err.message || err }, { status: 500 });
  }
}
