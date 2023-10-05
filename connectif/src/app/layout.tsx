import { Nunito } from 'next/font/google';
const mainFontFamily = Nunito({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

import type { Metadata } from "next";
// import { Nunito, Oswald } from "next/font/google";
import "./globals.css";

// const nunito = Nunito({ subsets: ["latin"] });
// const oswald = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConnectIF",
  description: "A melhor rede social para os estudantes do IFRS - Campus Feliz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body /* className={`${nunito.className} ${oswald.className}`} */>
        {children}
      </body>
    </html>
  );
}
