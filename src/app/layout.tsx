import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE_URL, site } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/CustomCursor";
import { OrganizationJsonLd } from "@/components/StructuredData";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Immobilienmakler Zürich – provisionsfrei verkaufen | Optimal Immobilien AG",
    template: "%s | Optimal Immobilien AG",
  },
  description: site.description,
  applicationName: "Optimal Immobilien AG",
  authors: [{ name: "Optimal Immobilien AG", url: SITE_URL }],
  creator: "Optimal Immobilien AG",
  publisher: "Optimal Immobilien AG",
  keywords: [
    "Immobilienmakler Zürich",
    "Immobilien verkaufen Zürich",
    "Haus verkaufen Zürich",
    "Wohnung verkaufen Zürich",
    "provisionsfrei verkaufen",
    "Immobilienbewertung Zürich",
    "Makler Goldküste",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: SITE_URL,
    siteName: "Optimal Immobilien AG",
    title: "Immobilienmakler Zürich – provisionsfrei zum Fixpreis verkaufen",
    description: site.description,
    images: [
      {
        url: "/projekte/residenz-aussenansicht-1.jpg",
        width: 2400,
        height: 1371,
        alt: "Moderne Neubau-Residenz mit Seesicht – Optimal Immobilien AG, Zürich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Immobilienmakler Zürich – Optimal Immobilien AG",
    description: site.usp,
    images: ["/projekte/residenz-aussenansicht-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-CH" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${playfair.variable} antialiased`}>
        {/* Progressive-enhancement flag: only when JS is present do we arm
            the scroll-reveal (content stays visible for crawlers / no-JS). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <SmoothScrolling>
          <CustomCursor />
          <OrganizationJsonLd />
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScrolling>
      </body>
    </html>
  );
}
