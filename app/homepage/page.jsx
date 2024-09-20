'use client';
import GameCodeForm from '@/components/GameCodeForm';
import GameSelectForm from '@/components/GameSelectForm';
import GameWordForm from '@/components/GameWordForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function page() {
  const router = useRouter();

  useEffect(() => {
    jwtCheck();
  }, []);

  return (
    <div className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-3">
      <GameWordForm />
      <GameSelectForm />
      <GameCodeForm />
    </div>
  );

  async function jwtCheck() {
    try {
      const res = await fetch('/api/auth');
      if (res.status >= 400) {
        router.push('/login');
      }
    } catch (err) {
      console.error('Error during JWT check:', err);
    }
  }
}
