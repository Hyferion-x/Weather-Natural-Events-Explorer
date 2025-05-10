import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Weather & Natural Events Explorer",
  description: "A beautiful weather and natural events app using NASA, OpenWeatherMap, and OpenStreetMap.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className} bg-[#10131a] bg-gradient-to-br from-[#10131a] to-[#232946] min-h-screen`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10131a" />
        <meta property="og:title" content="Weather & Natural Events Explorer" />
        <meta property="og:description" content="A beautiful weather and natural events app using NASA, OpenWeatherMap, and OpenStreetMap." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon.ico" />
      </head>
      <body className="bg-[#10131a] bg-gradient-to-br from-[#10131a] to-[#232946] min-h-screen">{children}</body>
    </html>
  );
}
