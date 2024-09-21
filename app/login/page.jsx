import LoginForm from '@/components/LoginForm';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import jwtCheck from '@/lib/jwtCheck';

export default async function pages() {
  const isAuthenticated = await jwtCheck();
  if (isAuthenticated) {
    redirect('/homepage');
  }
  return (
    <main className="bg-zinc-200 flex flex-col justify-center items-center rounded-2xl max-w-[400px] w-[90%] min-h-1/3 py-8">
      <h1 className="text-center text-2xl font-bold">Log In</h1>
      <LoginForm />
      <p className="text-center">
        New user?{' '}
        <Link href="/signup" className="italic font-bold">
          Sign Up
        </Link>
      </p>
    </main>
  );
}
