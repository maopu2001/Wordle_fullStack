'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loading from './LoadingScreen';

export default function LosserBanner(props) {
  const { className, gameId } = props;
  const [correctWord, setCorrectWord] = useState('');

  useEffect(() => {
    async function getCorrectWord() {
      const res = await fetch(`/api/correctword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: gameId }),
      });
      const resData = await res.json();
      setCorrectWord(resData.gameWord);
    }

    if (className.includes('block')) {
      getCorrectWord();
    }
  }, [className, gameId]);

  return (
    <div
      className={`${className} absolute w-4/5 h-1/3 rounded-3xl bg-gray-200 flex flex-col justify-center items-center gap-2`}
    >
      <h1 className="text-3xl font-bold">You lose.</h1>
      <h3 className="text-2xl ">The Correct Word is</h3>
      <h1 className="text-2xl font-bold text-green-600 mb-4">"{correctWord}"</h1>
      <Link href="/homepage">
        <Image className="bg-black rounded-md" src="/home.svg" priority={false} alt="loading" height={30} width={30} />
      </Link>
    </div>
  );
}
