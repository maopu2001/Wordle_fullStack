export default function LetterBox(prop) {
  const { wordLength, wordle, selected, index } = prop;

  let focusLetter;
  if (selected === index) {
    focusLetter = wordle.length;
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length: wordLength }, (_, i) => (
        <span
          className={`text-5xl text-center ${
            i === focusLetter ? `bg-zinc-400` : `bg-zinc-300`
          } size-14 rounded-md cursor-pointer`}
          key={i}
        >
          {wordle[i]}
        </span>
      ))}
    </div>
  );
}
