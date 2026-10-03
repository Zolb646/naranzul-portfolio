import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Portfolio brief — Дизайнерын мэдээлэл",
  description:
    "A private, local-first content worksheet for your interior design portfolio. Fill in, save and share your brief.",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
