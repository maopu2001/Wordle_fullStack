import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function DELETE() {
  cookies().delete('token');
  redirect('/login');
}
