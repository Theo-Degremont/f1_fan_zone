import type { Metadata } from "next";
import "./globals.css";
import { TokenRefreshProvider } from "../src/components/TokenRefreshProvider";


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
    <html lang="fr">
      <body>
        <TokenRefreshProvider>
          {children}
        </TokenRefreshProvider>
      </body>
    </html>
  );
}
