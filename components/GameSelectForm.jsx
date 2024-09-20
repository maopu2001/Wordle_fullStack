import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function GameSelectForm() {
  return (
    <div className="lg:row-span-2 flex flex-col items-center justify-center gap-2  bg-zinc-100 p-10 rounded-xl">
      <p className="text-center mb-2">Select a Game Level (Easy, Medium, Hard)</p>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Game Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
      <Button className="uppercase">start</Button>
    </div>
  );
}
