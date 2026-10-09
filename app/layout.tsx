import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'IEDC GPC Pala — Ideas Become Impact',
  description: 'Innovation, entrepreneurship, and technology at Government Polytechnic College, Pala.',
  openGraph: { title: 'IEDC GPC Pala — Ideas Become Impact', description: 'A campus for curious minds, bold experiments, and the next generation of makers.', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body>{children}</body></html>; }
