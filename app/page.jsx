// import GameIdForm from "@/components/GameIdForm";
import GameSelectForm from "@/components/GameSelectForm";
import GameWordForm from "@/components/GameWordForm";
import jwtCheck from "@/lib/jwtCheck";
import LogOut from "@/components/LogOut";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function page() {
  const isAuthenticated = await jwtCheck();

  return (
    <div>
      {(isAuthenticated && <LogOut />) || (
        <>
          <Link href="/login">
            <Button className="absolute top-5 right-5 font-bold">Log In</Button>
          </Link>
          <h1 className="text-green-800 text-2xl text-center ">
            You are a guest
          </h1>
        </>
      )}

      <div className="mt-10 flex flex-wrap gap-3 justify-center">
        <GameSelectForm />
        {isAuthenticated && <GameWordForm />}
      </div>
    </div>
  );
}
