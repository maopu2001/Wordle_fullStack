'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function GameCodeForm() {
  const [gameCode, setGameCode] = useState('');

  return (
    <div className="flex flex-col items-center justify-center gap-2  bg-zinc-100 p-10 rounded-xl">
      <p className="text-center mb-2">Enter a Game Code</p>
      <Input
        onChange={(e) => {
          setGameCode(e.target.value);
        }}
        className="shadow-none border-0 border-b-2 border-black bg-white"
      />
      <Button className="uppercase">Join</Button>
    </div>
  );
}
