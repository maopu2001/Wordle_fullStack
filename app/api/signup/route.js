import { NextResponse } from 'next/server';
import { User, connectDB } from '@/lib/connectDB';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { fullName, username, email, password, confirmedPassword } = await req.json();
    if (password !== confirmedPassword) {
      return NextResponse.json({ message: `Passwords doesn't match` }, { status: 400 });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //
    const newUser = {
      fullName,
      username,
      email,
      password: hashedPassword,
    };

    if (!fullName || !username || !email || !password || !confirmedPassword) {
      return NextResponse.json({ message: 'Please fillup all fields.' }, { status: 400 });
    }
    await connectDB();
    let user = await User.findOne({ username });
    if (user) {
      return NextResponse.json({ message: 'User with the same username already exists' }, { status: 400 });
    }
    user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'User with the same email already exists' }, { status: 400 });
    }

    await User.create(newUser);
    return NextResponse.json({ message: 'User successfully Signed Up' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message || err }, { status: 500 });
  }
}
