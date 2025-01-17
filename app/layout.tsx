// app/layout.tsx

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import type { PropsWithChildren } from 'react'
import './globals.css'
import { Italiana } from 'next/font/google'

// 1) Import the JSON directly from public/seo.json
//    Adjust this relative path if needed in your project.
import seoData from '@/public/seo.json'

// 2) Set up Google Font (Italiana). Ensure "weight" is set:
const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// 3) RootLayout: Applies to *all* pages
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    
    <html lang="en" className={italiana.className}>
      <head>
        {/* === Primary Meta Tags === */}
        <title>{seoData.defaultTitle}</title>
        <meta name="description" content={seoData.defaultDescription} />
        <link rel="icon" href="/logofav.png" />
        {/* === Keywords (very large list) === */}
        <meta name="keywords" content={seoData.keywords.join(', ')} />

        {/* === Open Graph (Facebook, LinkedIn, etc.) === */}
        <meta property="og:title" content={seoData.defaultTitle} />
        <meta property="og:description" content={seoData.defaultDescription} />
        <meta
          property="og:image"
          content={seoData.contact?.social?.ogImage ?? '/default-og-image.jpg'}
        />

        {/* === Twitter Card === */}
        <meta
          name="twitter:card"
          content={seoData.contact?.social?.twitterCard ?? 'summary_large_image'}
        />

        {/* === JSON-LD Structured Data === */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.structuredData),
          }}
        />

        {/* === Optional: Additional "contact" fields as meta tags === */}
        <meta name="fatima:phone" content={seoData.contact.phone} />
        <meta name="fatima:email" content={seoData.contact.email} />
        <meta name="fatima:website" content={seoData.contact.website} />

        {/* === SpeedInsights from @vercel/speed-insights === */}
        <SpeedInsights />
      </head>

      <body className="antialiased">
        {/* Main content (every page in /app/ is rendered here) */}
        {children}

        {/* === Vercel Analytics at the bottom of the body === */}
        <Analytics />
      </body>
    </html>
  )
}
