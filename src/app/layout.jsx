import './globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export const metadata = {
  title: {
    default: 'UKPayCheck — UK Salary Intelligence',
    template: '%s | UKPayCheck',
  },
  description: 'Accurate salary data for every UK job role and city. Make informed career decisions.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    siteName: 'UKPayCheck',
    type: 'website',
    locale: 'en_GB',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {adsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-[#0a0a0b] text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
