import './globals.css';

export const metadata = {
  title: 'Coventry Analytics | Business Reports for Local SMEs in Coventry',
  description:
    'Plain-English monthly business reports for cafés, restaurants, taxi operators and retailers in Coventry. Find out where your money is going — and what to do next.',
  keywords:
    'business analytics Coventry, monthly business report Coventry, café analytics, restaurant reporting, taxi business analytics, SME reporting Coventry, business intelligence Coventry',
  openGraph: {
    title: 'Coventry Analytics | Business Reports for Local SMEs',
    description:
      'A clear monthly report showing what changed in your business, why it matters, and what to do next. For busy owners in Coventry — not accountants.',
    type: 'website',
    locale: 'en_GB',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Coventry Analytics',
  url: 'https://coventryanalytics.co.uk',
  description:
    'Plain-English business reports and analytics for local SMEs in Coventry, including cafés, restaurants, taxi operators, and retail shops.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Coventry City Centre',
    addressLocality: 'Coventry',
    postalCode: 'CV1',
    addressRegion: 'West Midlands',
    addressCountry: 'GB',
  },
  areaServed: {
    '@type': 'City',
    name: 'Coventry',
  },
  email: 'info.coventryanalytics@gmail.com',
  sameAs: [
    'https://www.linkedin.com/company/coventry-analytics',
  ],
  priceRange: '££',
  serviceType: [
    'Business Clarity Audit',
    'Monthly Intelligence Report',
    'SME Business Analytics',
    'Business Reporting',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#f4f3ef' }}>
        {children}
      </body>
    </html>
  );
}
