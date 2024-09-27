'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function GameWordForm() {
  const router = useRouter();
  const [gameWord, setGameWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [gameId, setGameId] = useState('');
  const [gameIdUrl, setGameIdUrl] = useState('');
  const [step1, setStep1] = useState('block');
  const [step2, setStep2] = useState('hidden');

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-zinc-100 p-10 rounded-xl">
      <p className="text-center mb-2">Create a New Game using this word (3-7 letters)</p>

      <Input
        onChange={(e) => {
          setGameWord(e.target.value);
          setErrorMessage('');
        }}
        className={`${step1} shadow-none border-0 border-b-2 border-black bg-white`}
      />
      <span className="text-red-600">{errorMessage}</span>
      <Button onClick={createNewWordle} className={`${step1} uppercase w-36`}>
        create
      </Button>
      <div className={`${step2} gap-3`}>
        <Button onClick={gotoGamePage} className="uppercase w-36">
          Start
        </Button>
        <CopyToClipboard text={gameIdUrl}>
          <Button onClick={copyToClipboard} className="uppercase w-36">
            Copy Link
            <Image src="./content_copy.svg" width={20} height={20} alt="Copy to clipboard" />
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  );

  async function createNewWordle() {
    const res = await fetch('/api/gameId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameWord: gameWord }),
    });
    const resData = await res.json();
    if (res.status >= 400) {
      setErrorMessage(resData.message);
      return;
    }
    // if (res.status === 200) router.push(`/game/${resData.gameId}`);
    if (res.status === 200) {
      setStep1('hidden');
      setStep2('flex');
      setGameId(resData.gameId);
      setGameIdUrl(`${window.location.host}/game/${resData.gameId}`);
      setErrorMessage('');
    }
  }

  function gotoGamePage() {
    router.push(`/game/${gameId}`);
  }

  function copyToClipboard() {
    alert('Copied to clipboard!');
  }
}
