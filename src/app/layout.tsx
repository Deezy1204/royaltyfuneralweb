import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Royalty Funeral Services | Dignity, Respect, Comfort",
  description: "Providing compassionate, respectful, and dignified funeral services, cremation, and grief support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background-cream text-text-main font-sans min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
