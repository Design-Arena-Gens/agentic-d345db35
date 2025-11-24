import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import clsx from 'classnames';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agentic Social Manager',
  description:
    'Unified platform to automate content generation, scheduling, and engagement across Instagram, Facebook, and Pinterest.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'min-h-screen bg-slate-50')}>{children}</body>
    </html>
  );
}
