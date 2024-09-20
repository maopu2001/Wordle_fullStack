import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Wordle',
  description: 'A game to increase your vocabulary',
  icons: {
    icon: '/favicon.svg',
    sizes: '32x32',
    type: 'image/svg+xml',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <div className="h-screen px-10 py-20 flex flex-col justify-center items-center gap-3 ">
          <Link href="/" className="text-4xl font-bold uppercase">
            wordle
          </Link>
          {children}
        </div>
        <footer className="fixed bottom-0 bg-black text-white w-full h-8 p-1 text-center">
          &copy; Copyright 2024 | M. Aktaruzzaman Opu
        </footer>
      </body>
    </html>
  );
}
