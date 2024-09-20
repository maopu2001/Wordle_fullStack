'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function page() {
  const router = useRouter();

  useEffect(() => {
    jwtCheck();
  }, []);

  return <Image priority src="/loading.svg" alt="loading" height={100} width={100} />;

  async function jwtCheck() {
    try {
      const res = await fetch('/api/auth');
      if (res.status === 200) {
        router.push(`/homepage`);
      }
      if (res.status >= 400) {
        router.push('/login');
      }
    } catch (err) {
      console.error('Error during JWT check:', err);
    }
  }
}
