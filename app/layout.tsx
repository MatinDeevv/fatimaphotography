// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import './globals.css';
import { Italiana } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Fatima Photography',
  description: "Capturing life's precious moments",
};

const italiana = Italiana({
  weight: '400',      // <--- REQUIRED
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={italiana.className}>
      <head>
        <SpeedInsights />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
