'use client';
import { Button } from '@/components/ui/button';

export default function Keyboard(props) {
  const { alphabet } = props;
  const r1 = 'QWERTYUIOP';
  const r2 = 'ASDFGHJKL';
  const r3 = 'ZXCVBNM';

  return (
    <div className="w-[416px] space-y-1 bg-slate-200 p-2 rounded-lg">
      <div className="grid grid-cols-10 gap-1">
        {r1.split('').map((letter, i) => (
          <Button
            onClick={(e) => eventHandler(e)}
            variant="secondary"
            className={`${setKeyColor(letter)} lg:pointer-events-none`}
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
            variant="secondary"
            className={`${setKeyColor(letter)} lg:pointer-events-none`}
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
            variant="secondary"
            className={`${setKeyColor(letter)} lg:pointer-events-none`}
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
        variant="secondary"
        className={`lg:pointer-events-none w-full`}
        value="Space"
      >
        Space
      </Button>
    </div>
  );

  function eventHandler(e) {
    e.preventDefault();
    const { value } = e.target;
    let code, key;
    if (value === 'Backspace' || value === 'Enter') {
      (key = value), (code = value);
    } else if (value === 'Space') {
      (key = ' '), (code = value);
    } else {
      (key = value.toLowerCase()), (code = `Key${value}`);
    }

    const event = new KeyboardEvent('keydown', {
      key: key,
      code: code,
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
        return '';
    }
  }
}
