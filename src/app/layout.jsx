import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Coventry Analytics — Operational Control Systems for SMEs',
  description: 'We deploy real-time Operational Control Systems for SME leaders in logistics, operations, and e-commerce. Instant business visibility in 5 days.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0a0a0b] text-white min-h-screen antialiased">
        <div className="relative min-h-screen">
          {/* Ambient background */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-60 -right-60 w-[600px] h-[600px] rounded-full bg-[#00d4ff] opacity-[0.025] blur-3xl" />
            <div className="absolute top-1/2 -left-60 w-96 h-96 rounded-full bg-[#00d4ff] opacity-[0.015] blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-[#00d4ff] opacity-[0.01] blur-3xl" />
          </div>

          <div className="relative z-10">
            <Navigation />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
