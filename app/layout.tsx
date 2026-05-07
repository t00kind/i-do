import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "I DO — Студия разработки и маркетинга",
  description:
    "I DO — студия разработки и маркетинга. Для тех, кто выбирает лучшее.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#efece4] text-[#0b0b0b] font-sans">
        {children}
      </body>
    </html>
  );
}
