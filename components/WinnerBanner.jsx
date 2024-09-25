import Link from 'next/link';
import Image from 'next/image';

export default function WinnerBanner(props) {
  const { selected, className, gameWord } = props;
  return (
    <div
      className={`${className} absolute max-w-[90%] w-[500px] min-h-1/3 h-fit rounded-3xl bg-gray-200 flex flex-col justify-center items-center gap-2 p-5`}
    >
      <h1 className="text-3xl font-bold">Congratulation</h1>
      <h3 className="text-2xl ">Guess: {selected}</h3>
      <h3 className="text-2xl ">The Correct Word is</h3>
      <h1 className="text-2xl font-bold text-green-600 mb-4">"{gameWord}"</h1>
      <Link href="/homepage">
        <Image className="bg-black rounded-md" src="/home.svg" priority={false} alt="loading" height={30} width={30} />
      </Link>
    </div>
  );
}
