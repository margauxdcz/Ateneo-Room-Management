import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ARM — Ateneo Room Manager",
  description: "Find a room. Book it in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${dmSerif.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}