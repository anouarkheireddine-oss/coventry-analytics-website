import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'AK APICE — Personal Performance OS',
  description: 'Al vertice. Ogni giorno.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AK APICE',
  },
};

export const viewport = {
  themeColor: '#00d4ff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-[#0a0a0b] text-white min-h-screen antialiased">
        <div className="relative min-h-screen">
          {/* Ambient background glow */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#00d4ff] opacity-[0.03] blur-3xl" />
            <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-[#00d4ff] opacity-[0.02] blur-3xl" />
          </div>

          {/* Main content */}
          <div className="relative z-10 pb-24 md:pb-0 md:pl-64">
            {children}
          </div>

          {/* Navigation */}
          <Navigation />
        </div>
      </body>
    </html>
  );
}
