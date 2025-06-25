import './globals.css';
import { Barlow_Condensed } from 'next/font/google';
import AuthGuard from '../components/AuthGuard'; 

export const metadata = {
  title: 'Sonic Golf',
  description: 'Live golf scoring web app for events.',
  manifest: '/manifest.json',
  themeColor: '#008000',
};

const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#008000" />
      </head>
      <body className={barlowCondensed.className}>
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
