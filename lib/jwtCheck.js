import { cookies, headers } from 'next/headers';

export default async function jwtCheck() {
  const siteUrl = headers().get('host');
  try {
    const Cookies = cookies().get('token');
    const res = await fetch(`http://${siteUrl}/api/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${Cookies?.name}=${Cookies?.value}`,
      },
    });
    return res.ok;
  } catch (err) {
    console.error('Error during JWT check:', err);
    return false;
  }
}
