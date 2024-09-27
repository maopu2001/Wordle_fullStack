import GameIdForm from '@/components/GameIdForm';
import GameSelectForm from '@/components/GameSelectForm';
import GameWordForm from '@/components/GameWordForm';
import { redirect } from 'next/navigation';
import jwtCheck from '@/lib/jwtCheck';
import LogOut from '@/components/LogOut';

export default async function page() {
  const isAuthenticated = await jwtCheck();
  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div>
      <LogOut />
      {/* <div className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-3"> */}
      <div className="mt-10">
        <GameWordForm />
        {/* <GameSelectForm /> */}
        {/* <GameIdForm /> */}
      </div>
    </div>
  );
}
