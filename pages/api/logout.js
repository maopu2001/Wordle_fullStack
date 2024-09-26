import { cookies } from 'next/headers';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', `token=;path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`);
    return res.status(200).json({ message: 'User successfully logged out' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
