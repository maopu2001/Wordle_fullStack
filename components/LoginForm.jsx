'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function submitForm(e) {
    e.preventDefault();
    const User = {
      username,
      password,
    };
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(User),
      });

      if (!res.ok || res.status >= 400) {
        const resData = await res.json();
        setErrorMessage(resData.message);
      } else {
        const resData = await res.json();
        console.log(resData.message);
        router.replace(`/homepage`);

      }
    } catch (err) {
      console.error('Error during POST request:', err);
    }
  }

  return (
    <form onSubmit={(e) => submitForm(e)} className="my-2 flex flex-col gap-2 w-[80%]">
      <Input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Username"
        className="shadow-none border-0 border-b-2 border-black"
      />
      <Input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password"
        className="shadow-none border-0 border-b-2 border-black"
      />
      <span className="text-center text-red-500">{errorMessage}</span>
      <Button className="rounded-xl">Log In</Button>
    </form>
  );
}
