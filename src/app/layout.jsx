import './globals.css';

export const metadata = {
  title: 'Coventry Analytics | Operational Control Systems for SMEs',
  description: 'We build real-time operational control systems that give SME leaders instant visibility into business performance — deployed in 5 days.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0a0f1e' }}>
        {children}
      </body>
    </html>
  );
}
