'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <form onSubmit={(e) => submitForm(e)} className="my-2 flex flex-col gap-2 w-[80%] justify-center items-center">
      <Input
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        className="shadow-none border-0 border-b-2 border-black"
      />
      <Input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="shadow-none border-0 border-b-2 border-black"
      />
      <Input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="shadow-none border-0 border-b-2 border-black"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Create Password"
        className="shadow-none border-0 border-b-2 border-black"
      />
      <Input
        onChange={(e) => setConfirmedPassword(e.target.value)}
        type="password"
        placeholder="Retype Password"
        className="shadow-none border-0 border-b-2 border-black"
      />
      <span className="text-center text-red-500 italic">{errorMessage}</span>
      <Button className="rounded-xl w-full">Sign Up</Button>
    </form>
  );

  async function submitForm(e) {
    e.preventDefault();
    const newUser = {
      fullName,
      username,
      email,
      password,
      confirmedPassword,
    };
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!res.ok || res.status >= 400) {
        const resData = await res.json();
        setErrorMessage(resData.message);
      } else {
        const resData = await res.json();
        console.log(resData);
        router.push('/login');
      }
    } catch (err) {
      console.error('Error during POST request:', err);
    }
  }
}
