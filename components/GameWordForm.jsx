'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function GameWordForm() {
  const router = useRouter();
  const [gameWord, setGameWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-zinc-100 p-10 rounded-xl">
      <p className="text-center mb-2">Create a New Game using these words (upto 4 words)</p>

      <Input
        onChange={(e) => {
          setGameWord(e.target.value);
        }}
        className="shadow-none border-0 border-b-2 border-black bg-white"
      />
      <span>{errorMessage}</span>
      <Button onClick={createNewWordle} className="uppercase">
        create
      </Button>
    </div>
  );

  async function createNewWordle() {
    const res = await fetch('/api/gamecode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameWord: gameWord }),
    });
    const resData = await res.json();
    if (res.statusCode >= 400) {
      setErrorMessage(resData.message);
      return;
    }
    router.push(`/game/${resData.gameCode}`);
  }
}
