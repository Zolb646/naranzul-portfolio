import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, Footer } from "@/components/chrome";
import "./globals.css";
const sans = localFont({
  src: "../public/fonts/plex-sans.woff2",
  variable: "--font-sans",
  weight: "400 500",
  display: "swap",
});
const serif = localFont({
  src: "../public/fonts/source-serif.woff2",
  variable: "--font-serif",
  weight: "400",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Thresholds — An interior exhibition",
    template: "%s — Thresholds",
  },
  description:
    "A concept preview exploring space, material and the passage between rooms. Project content is pending.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
