import type { Metadata } from "next";
import "./globals.css";
import { TokenRefreshProvider } from "../src/components/TokenRefreshProvider";
import localFont from 'next/font/local'

const formula1 = localFont({
  src: [
    {
      path: '../public/fonts/Formula1-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Formula1-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-formula1',
  display: 'swap',
})

const spaceGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/SpaceGrotesk-Medium.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SpaceGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const titillium = localFont({
  src: [
    {
      path: '../public/fonts/Titillium-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Titillium-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-titillium',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "F1 Fan Zone",
  description: "La communauté ultime des fans de Formule 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${formula1.variable} ${spaceGrotesk.variable} ${titillium.variable}`}>
      <body className="font-space-grotesk">
        <TokenRefreshProvider>
          {children}
        </TokenRefreshProvider>
      </body>
    </html>
  );
}
