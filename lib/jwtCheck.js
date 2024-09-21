import { cookies } from 'next/headers';

const siteUrl = process.env.SITE_URL;

export default async function jwtCheck() {
  try {
    const Cookies = cookies().get('token');
    const res = await fetch(`${siteUrl}/api/auth`, {
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
