import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function DELETE() {
  cookies().delete('token');
  return NextResponse.json({ message: 'User successfully logged out' }, { status: 200 });
}
