import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Immobilienmakler Zürich | Optimal Immobilien AG",
  description: "Verkaufen Sie Ihre Immobilie in Zürich zum Höchstpreis. Optimal Immobilien AG ist Ihr persönlicher und erfahrener Immobilienmakler für Zürich und Umgebung.",
  keywords: "Immobilienmakler Zürich, Immobilien Zürich, Haus verkaufen Zürich, Wohnung verkaufen Zürich",
};

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased bg-stone-50 text-stone-900 selection:bg-amber-500/30 selection:text-amber-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
