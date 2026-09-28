import type { Metadata, Viewport } from 'next';
import { display, body, script } from '@/lib/fonts';
import { LangProvider } from '@/hooks/useLang';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ying & Anh — 20.12.2026',
  description: 'We are getting married in Ho Chi Minh, Vietnam.',
  openGraph: {
    title: 'Ying & Anh',
    description: 'Save the date — 20 December 2026, Ho Chi Minh.',
    type: 'website',
    images: [
      {
        url: '/images/moment-01.webp',
        width: 998,
        height: 1500,
        alt: 'Ying & Anh',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#EAF1F9',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
