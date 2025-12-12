"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GameSelectForm() {
  const [selectedSize, setSelectedSize] = useState(5);
  const router = useRouter();

  async function createNewWordle() {
    const res = await fetch("/api/gameId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ temporary: true, selectedSize }),
    });
    const resData = await res.json();
    if (res.status === 200) router.push(`/game/${resData.gameId}`);
  }

  return (
    <div className="lg:row-span-2 flex flex-col w-[400px] items-center justify-center gap-4 bg-zinc-100 p-10 rounded-xl">
      <p className="text-center">Select a Word Size (3 to 7 letters)</p>
      <Select defaultValue="5" onValueChange={setSelectedSize}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Word Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">3 letters</SelectItem>
          <SelectItem value="4">4 letters</SelectItem>
          <SelectItem value="5">5 letters</SelectItem>
          <SelectItem value="6">6 letters</SelectItem>
          <SelectItem value="7">7 letters</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={createNewWordle} className="uppercase">
        Start
      </Button>
    </div>
  );
}
