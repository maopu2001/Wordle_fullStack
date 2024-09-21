import { NextResponse } from 'next/server';
import { User, connectDB } from '@/lib/connectDB';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) return NextResponse.json({ message: 'Token not found' }, { status: 404 });

  if (!jwt.verify(token, JWT_SECRET)) return NextResponse.json({ message: 'Token is invalid' }, { status: 400 });

  const jwtUser = jwt.decode(token)?.userId;
  await connectDB();
  const user = await User.findById(jwtUser);
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  return NextResponse.json({ message: jwtUser }, { status: 200 });
}
