'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function LogOut() {
  const router = useRouter();
  return (
    <Button onClick={logout} className="absolute top-5 right-5 font-bold">
      Log Out
    </Button>
  );

  async function logout() {
    await fetch('/api/logout', {
      method: 'DELETE',
    });
    router.refresh();
  }
}
