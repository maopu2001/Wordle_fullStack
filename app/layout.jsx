import Link from "next/link";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Wordle",
  description: "A game to increase your vocabulary",
  icons: {
    icon: "/favicon.svg",
    sizes: "32x32",
    type: "image/svg+xml",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex flex-col justify-center items-center">
        <header className="absolute top-5 w-full text-center">
          <Link href="/" className="text-4xl font-bold uppercase">
            wordle
          </Link>
        </header>
        <div className="w-screen px-10 py-20 flex flex-col justify-center items-center gap-3">
          {children}
        </div>
        <footer className="fixed bottom-0 bg-black text-white w-full h-8 p-1 text-center">
          &copy; Copyright {new Date().getFullYear()} |{" "}
          <Link
            className="hover:text-blue-600"
            href="https://maopu.com.bd"
            target="blank"
          >
            M. Aktaruzzaman Opu
          </Link>
        </footer>
        <Toaster
          richColors="true"
          closeButton="true"
          theme="light"
          position="top-left"
        />
      </body>
    </html>
  );
}
