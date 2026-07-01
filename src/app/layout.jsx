import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Coventry Analytics | Business Intelligence for UK SMEs',
    template: '%s | Coventry Analytics',
  },
  description: 'Stop flying blind. Start running on data. Coventry Analytics delivers operational control systems and business intelligence dashboards for UK SMEs in 5 days.',
  keywords: ['business intelligence', 'analytics', 'SME', 'UK', 'dashboard', 'KPI', 'operational control'],
  authors: [{ name: 'Coventry Analytics' }],
  creator: 'Coventry Analytics',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://coventryanalytics.co.uk',
    siteName: 'Coventry Analytics',
    title: 'Coventry Analytics | Business Intelligence for UK SMEs',
    description: 'Stop flying blind. Start running on data. Operational control systems delivered in 5 days.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Coventry Analytics' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coventry Analytics | Business Intelligence for UK SMEs',
    description: 'Stop flying blind. Start running on data.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-navy-950 text-white antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
