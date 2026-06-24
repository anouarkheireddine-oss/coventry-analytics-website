import './globals.css';
import Footer from '@/components/layout/Footer';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://salarystack.co.uk';

export const metadata = {
  title: {
    default: 'SalaryStack — UK Tech & Analytics Career Intelligence',
    template: '%s | SalaryStack',
  },
  description: 'Salary data, take-home calculators, and career intelligence for UK tech, data, and analytics professionals.',
  metadataBase: new URL(BASE_URL),
  openGraph: { siteName: 'SalaryStack', type: 'website', locale: 'en_GB' },
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
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`} crossOrigin="anonymous" />
        )}
      </head>
      <body className="bg-[#f8f7f5] text-gray-900 min-h-screen antialiased">
        {/* Persistent top nav */}
        <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#f8f7f5]/90 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
            <a href="/" className="text-base font-extrabold text-gray-900">
              Salary<span className="text-[#818cf8]">Stack</span>
            </a>
            <nav className="flex items-center gap-1">
              {[
                { href: '/salary',                   label: 'Salaries'    },
                { href: '/calculators/contractor',   label: 'Contractor'  },
                { href: '/calculators/offer',        label: 'Offers'      },
                { href: '/insights/london-tech-premium', label: 'Insights' },
              ].map(({ href, label }) => (
                <a key={href} href={href}
                  className="px-3 py-1.5 text-xs font-medium text-black/50 hover:text-gray-900 hover:bg-black/[0.04] rounded-lg transition-all">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
