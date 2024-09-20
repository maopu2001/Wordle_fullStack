import Link from 'next/link';
import SignUpForm from '@/components/SignUpForm';

export default function pages() {
  return (
    <main className=" bg-zinc-200 flex flex-col justify-center items-center rounded-2xl max-w-[400px] w-[90%] min-h-1/3 py-8">
      <h1 className="text-center text-2xl font-bold">SignUp</h1>
      <SignUpForm />
      <p className="text-center">
        Already have an account?{' '}
        <Link href="/login" className="italic font-bold">
          Log In
        </Link>
      </p>
    </main>
  );
}
