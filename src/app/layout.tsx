import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { LoadingProvider } from "@/context/LoadingContext";
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
  metadataBase: new URL("https://www.royaltyfuneral.com"),
  title: {
    default: "Royalty Funeral Services | Dignity, Respect, Comfort",
    template: "%s | Royalty Funeral Services"
  },
  description: "Providing compassionate, respectful, and dignified funeral services, cremation, and grief support in Zimbabwe.",
  keywords: ["funeral services Zimbabwe", "funeral coverage", "funeral planning", "Royalty Funeral Services", "burial services", "funeral insurance"],
  openGraph: {
    title: "Royalty Funeral Services | Dignity, Respect, Comfort",
    description: "Providing compassionate, respectful, and dignified funeral services, cremation, and grief support.",
    url: "https://www.royaltyfuneral.com",
    siteName: "Royalty Funeral Services",
    locale: "en_ZW",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "Royalty Funeral Services",
    card: "summary_large_image",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE", // Replace with actual GSC token
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background-cream text-text-main font-sans min-h-screen flex flex-col`}>
        <LoadingProvider>
          <Preloader />
          <Header />
          <main className="flex-1 pt-[80px]">
            {children}
          </main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
