export default function LetterBox(prop) {
  const { wordLength, wordle, selected, index, letterPosition } = prop;

  const focusLetter = selected === index ? wordle.length : -1;

  function letterBgColor(i) {
    if (i !== focusLetter) {
      switch (letterPosition[i]) {
        case 'G':
          return 'bg-green-300';
        case 'Y':
          return 'bg-yellow-300';
        case 'N':
          return 'bg-zinc-400';
        default:
          return 'bg-slate-300';
      }
    } else {
      return 'bg-slate-400';
    }
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length: wordLength }, (_, i) => (
        <span className={`${letterBgColor(i)} text-3xl text-center size-10 rounded-md cursor-pointer`} key={i}>
          {wordle[i] || ''}
        </span>
      ))}
    </div>
  );
}
