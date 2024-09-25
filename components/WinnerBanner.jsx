import Link from 'next/link';
import Image from 'next/image';

export default function WinnerBanner(props) {
  const { selected, className } = props;
  return (
    <div
      className={`${className} absolute w-4/5 h-1/3 rounded-3xl bg-gray-200 flex flex-col justify-center items-center gap-2`}
    >
      <h1 className="text-3xl font-bold">Congratulation. You Won</h1>
      <h3 className="text-2xl ">Guess: {selected}</h3>
      <Link href="/homepage">
        <Image className="bg-black rounded-md" src="/home.svg" priority={false} alt="loading" height={30} width={30} />
      </Link>
    </div>
  );
}
