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

/*
import React from 'react';
import Head from 'next/head';
import { mainFontFamily } from './fonts'; // Certifique-se de que você importou corretamente a configuração da fonte

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        {/* Adicione o link para a fonte do Google Fonts }
        <link rel="stylesheet" href={mainFontFamily.href} />
      </Head>
      <html lang="en">
        <body style={{ fontFamily: mainFontFamily.family }}>
          {children}
        </body>
      </html>
    </>
  );
}
*/