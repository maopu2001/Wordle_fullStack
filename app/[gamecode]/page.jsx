'use client';
import LetterBox from '@/components/gamepage/LetterBox';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function page({ params }) {
  const router = useRouter();
  const [wordTable, setWordTable] = useState(['', '', '', '', '', '']);
  const [selected, setSelected] = useState(0);
  const wordLength = params.gamecode.length;

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [wordTable, selected]);

  return (
    <div className="flex flex-col gap-2">
      {wordTable.map((word, i) => (
        <LetterBox key={i} index={i} wordLength={wordLength} wordle={word} selected={selected} />
      ))}
    </div>
  );

  async function handleKeyPress(e) {
    e.preventDefault();
    if (((e.key >= 'a' && e.key <= 'z') || e.key === ' ') && wordTable[selected].length < wordLength) {
      const newWordTable = [...wordTable];
      newWordTable[selected] += e.key.toUpperCase();
      setWordTable(newWordTable);
    } else if (e.key === 'Backspace') {
      const newWordTable = [...wordTable];
      newWordTable[selected] = newWordTable[selected].slice(0, -1);
      setWordTable(newWordTable);
    } else if (e.key === 'Enter') {
      const currWord = wordTable[selected];

      const win = await checkWin(currWord);
      if (!win) {
        if (wordValidationCheck(currWord)) {
          setSelected(selected + 1);
        } else {
          alert('invalid word');
        }
      } else {
        router.push('/homepage');
      }
    }
  }

  function wordValidationCheck(word) {
    if (word.indexOf(' ') !== -1 || word === '') return false;
    else return true;
  }

  async function checkWin(word) {
    const res = await fetch('/api/checkwin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameCode: params.gamecode, word }),
    });
    // console.log(res);
    const resData = await res.json();

    if (res.status === 201) {
      alert(resData.message);
      return true;
    } else {
      return false;
    }
  }
}
