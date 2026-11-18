import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import LenisScroll from "@/components/LenisScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KV Films | Production Studio, Vapi",
  description:
    "KV Films is a production partner driven by pursuit. We craft commercials, branded films, and campaigns from our base in Vapi, Gujarat.",
  metadataBase: new URL("https://kvfilms.in"),
  openGraph: {
    siteName: "KV Films",
    title: "KV Films | Production Studio, Vapi",
    description:
      "KV Films is a production partner driven by pursuit. We craft commercials, branded films, and campaigns from our base in Vapi, Gujarat.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KV Films | Production Studio, Vapi",
    description:
      "KV Films is a production partner driven by pursuit. We craft commercials, branded films, and campaigns from our base in Vapi, Gujarat.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col antialiased">
        <PageTransition>
          <LenisScroll>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisScroll>
        </PageTransition>
      </body>
    </html>
  );
}
