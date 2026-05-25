import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from './providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'CampusCompass - College Discovery & Comparison Platform',
  description: 'Explore, filter, and compare top universities, fee structures, student ratings, and placement packages across India. Make your college decisions with data-driven clarity.',
  keywords: ['colleges in india', 'engineering colleges', 'management schools', 'mba admission', 'college comparison', 'placement packages']
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50/30 text-slate-800 selection:bg-primary/20">
        <Providers>
          <Header />
          <main className="flex-grow flex flex-col w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
