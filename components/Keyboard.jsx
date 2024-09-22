'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Keyboard(props) {
  const { alphabet } = props;
  const r1 = 'QWERTYUIOP';
  const r2 = 'ASDFGHJKL';
  const r3 = 'ZXCVBNM';

  useEffect(() => {
    window.addEventListener('keydown', setKeyColor);
    return () => {
      window.removeEventListener('keydown', setKeyColor);
    };
  }, [props.wordle]);

  return (
    <div className="w-[400px] space-y-1">
      <div className="grid grid-cols-10 gap-1">
        {r1.split('').map((letter, i) => (
          <Button
            onClick={(e) => eventHandler(e)}
            className={`${setKeyColor(letter)} text-black lg:pointer-events-none`}
            key={i}
            value={letter}
          >
            {letter}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-9 gap-1">
        {r2.split('').map((letter, i) => (
          <Button
            onClick={(e) => eventHandler(e)}
            className={`${setKeyColor(letter)} text-black lg:pointer-events-none`}
            key={i}
            value={letter}
          >
            {letter}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-11 gap-1">
        <Button onClick={(e) => eventHandler(e)} className={`lg:pointer-events-none col-span-2`} value="Enter">
          Enter
        </Button>

        {r3.split('').map((letter, i) => (
          <Button
            onClick={(e) => eventHandler(e)}
            className={`${setKeyColor(letter)} text-black lg:pointer-events-none`}
            key={i}
            value={letter}
          >
            {letter}
          </Button>
        ))}

        <Button onClick={(e) => eventHandler(e)} className={`lg:pointer-events-none col-span-2`} value="Backspace">
          Delete
        </Button>
      </div>
      <Button
        onClick={(e) => eventHandler(e)}
        className={`lg:pointer-events-none w-full bg-slate-300 text-black`}
        value="Space"
      >
        Space
      </Button>
    </div>
  );

  function eventHandler(e) {
    e.preventDefault();
    const key = e.target.value;
    if (key === 'Backspace' || key === 'Enter' || key === 'Space') {
      const event = new KeyboardEvent('keydown', {
        key: key,
        code: key,
      });
      return window.dispatchEvent(event);
    }
    const event = new KeyboardEvent('keydown', {
      key: key,
      code: `Key${key.toUpperCase()}`,
    });
    return window.dispatchEvent(event);
  }

  function setKeyColor(letter) {
    switch (alphabet[String(letter).charCodeAt(0) - 'A'.charCodeAt(0)]) {
      case 'G':
        return 'bg-green-300';
      case 'Y':
        return 'bg-yellow-300';
      case 'N':
        return 'bg-gray-500';
      default:
        return 'bg-slate-300';
    }
  }
}
