'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function GameIdForm() {
  const [gameId, setGameId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-2  bg-zinc-100 p-10 rounded-xl">
      <p className="text-center mb-2">Enter a Game Code</p>
      <Input
        onChange={(e) => {
          setGameId(e.target.value);
        }}
        className="shadow-none border-0 border-b-2 border-black bg-white"
      />
      <span className="text-rose-500">{errorMessage}</span>
      <Button className="uppercase" onClick={checkGameId}>
        Join
      </Button>
    </div>
  );

  async function checkGameId() {
    try {
      const res = await fetch(`/api/checkGameId`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId }),
      });
      const resData = await res.json();
      if (!res.ok) {
        return setErrorMessage(resData.message);
      }
      router.push(`/game/${gameId}`);
    } catch (err) {
      console.error(err.message || err);
    }
  }
}
