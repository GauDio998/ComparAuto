// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/ui/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AutoCompare - Trova l\'auto perfetta',
  description: 'Confronta caratteristiche, prezzi e recensioni di migliaia di veicoli',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}