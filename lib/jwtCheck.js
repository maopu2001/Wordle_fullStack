import { redirect } from 'next/navigation';
// import { useRouter } from 'next/navigation';

export default async function jwtCheck() {
  // const router = useRouter();
  try {
    const res = await fetch('/api/auth');
    if (res.status === 200) {
      const resData = await res.json();
      console.log(resData);
      redirect(`/homepage`);
      // router.push(`/homepage`);
    }
    if (res.status >= 400) {
      redirect('/login');
      // router.push(`/login`);
    }
  } catch (err) {
    console.error('Error during JWT check:', err);
  }
}
