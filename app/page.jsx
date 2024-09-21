import { redirect } from 'next/navigation';
import jwtCheck from '@/lib/jwtCheck';

export default async function page() {
  const isAuthenticated = await jwtCheck();
  if (!isAuthenticated) {
    redirect('/login');
  } else {
    redirect('/homepage');
  }
}
