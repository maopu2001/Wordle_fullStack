"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

export default function WinnerBanner(props) {
  const { selected, className, gameWord } = props;
  return (
    <div
      className={`${className} absolute max-w-[90%] w-[500px] min-h-1/3 h-fit rounded-3xl bg-gray-200 flex flex-col justify-center items-center gap-2 p-5 border-4 border-green-400`}
    >
      <h1 className="text-3xl font-bold">Congratulation</h1>
      <h3 className="text-2xl ">Guess: {selected}</h3>
      <h3 className="text-2xl ">The Correct Word is</h3>
      <h1 className="text-2xl font-bold text-green-600 mb-4">"{gameWord}"</h1>

      {gameWord && (
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Button className="w-36 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700">
            <Link href="/" className="flex justify-center items-center gap-1">
              <Image
                src="/home.svg"
                priority={false}
                alt="Homepage"
                height={30}
                width={30}
              />
              <span>Home</span>
            </Link>
          </Button>

          <Button className="w-36 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Link
              href={`https://www.oxfordlearnersdictionaries.com/definition/english/${gameWord.toLowerCase()}`}
              target="_blank"
              className="flex justify-center items-center gap-1"
            >
              <Image
                src="/circle-question.svg"
                alt="Meaning"
                height={30}
                width={30}
              />
              <span>Meaning</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
