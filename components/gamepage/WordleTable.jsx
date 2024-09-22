'use client';
import LetterBox from '@/components/gamepage/LetterBox';
import Keyboard from '@/components/Keyboard';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function WordleTable(props) {
  const router = useRouter();
  const { wordLength, gameId } = props;
  const [wordTable, setWordTable] = useState(['', '', '', '', '', '']);
  const [selected, setSelected] = useState(0);
  const [letterPositionArray, setLetterPositionArray] = useState(['', '', '', '', '', '']);
  const [alphabet, setAlphabet] = useState(Array(26).fill(''));

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [wordTable, selected]);

  async function handleKeyPress(e) {
    e.preventDefault();

    // Letter or Spcae
    if (((e.key >= 'a' && e.key <= 'z') || e.key === ' ') && wordTable[selected].length < wordLength) {
      const newWordTable = [...wordTable];
      newWordTable[selected] += e.key.toUpperCase();
      return setWordTable(newWordTable);
    }

    //Backspace
    if (e.key === 'Backspace') {
      const newWordTable = [...wordTable];
      newWordTable[selected] = newWordTable[selected].slice(0, -1);
      return setWordTable(newWordTable);
    }
    // Enter
    if (e.key === 'Enter') {
      const currWord = wordTable[selected];
      return await checkWin(currWord);
    }
  }

  async function checkWin(word) {
    const res = await fetch('/api/checkwin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, word }),
    });

    const resData = await res.json();

    if (res.status === 200) {
      // Correct
      alert(resData.message);
      router.push('/homepage');
    } else if (res.status === 201) {
      //Invalid
      alert(resData.message);
    } else if (res.status === 202) {
      // Incorrect
      const word = wordTable[selected];
      const newAlphabet = [...alphabet];
      for (let i = 0; i < word.length; i++) {
        if (newAlphabet[word[i].charCodeAt(0) - 'A'.charCodeAt(0)] === 'G') continue;
        newAlphabet[word[i].charCodeAt(0) - 'A'.charCodeAt(0)] = resData.letterPosition[i];
      }
      setAlphabet(newAlphabet);

      const newLetterPositionArray = [...letterPositionArray];
      newLetterPositionArray[selected] = resData.letterPosition;
      setLetterPositionArray(newLetterPositionArray);
      return setSelected(selected + 1);
    } else {
      console.log(resData.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="flex flex-col gap-2">
        {wordTable.map((word, i) => (
          <LetterBox
            key={i}
            index={i}
            wordLength={wordLength}
            wordle={word}
            selected={selected}
            letterPosition={letterPositionArray[i]}
          />
        ))}
      </div>
      <Keyboard alphabet={alphabet} />
    </div>
  );
}
