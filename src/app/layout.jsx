import './globals.css';

export const metadata = {
  metadataBase: new URL('https://coventryanalytics.co.uk'),
  title: 'Coventry Analytics | Business Reports for Local SMEs in Coventry',
  description:
    'Plain-English monthly business reports for cafés, restaurants, taxi operators and retailers in Coventry. Find out where your money is going — and what to do next.',
  keywords:
    'business analytics Coventry, monthly business report Coventry, café analytics Coventry, restaurant reporting Coventry, taxi business analytics Coventry, SME reporting Coventry, business intelligence Coventry, small business reports Warwickshire, business analytics Earlsdon, business analytics Foleshill, local business reporting West Midlands, business clarity audit Coventry',
  alternates: {
    canonical: 'https://coventryanalytics.co.uk',
  },
  openGraph: {
    title: 'Coventry Analytics | Business Reports for Local SMEs',
    description:
      'A clear monthly report showing what changed in your business, why it matters, and what to do next. For busy owners in Coventry — not accountants.',
    url: 'https://coventryanalytics.co.uk',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Coventry Analytics',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Coventry Analytics — Plain-English Business Reports for Local SMEs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coventry Analytics | Business Reports for Local SMEs',
    description:
      'A clear monthly report showing what changed in your business, why it matters, and what to do next. For busy owners in Coventry.',
    images: ['/og-image.svg'],
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.4068,
    longitude: -1.5197,
  },
  areaServed: [
    { '@type': 'City', name: 'Coventry' },
    { '@type': 'Place', name: 'Earlsdon' },
    { '@type': 'Place', name: 'Foleshill' },
    { '@type': 'Place', name: 'Tile Hill' },
    { '@type': 'Place', name: 'Binley' },
    { '@type': 'Place', name: 'Coundon' },
    { '@type': 'Place', name: 'Cheylesmore' },
    { '@type': 'Place', name: 'Canley' },
    { '@type': 'City', name: 'Kenilworth' },
    { '@type': 'City', name: 'Rugby' },
    { '@type': 'City', name: 'Warwick' },
    { '@type': 'City', name: 'Leamington Spa' },
    { '@type': 'AdministrativeArea', name: 'Warwickshire' },
    { '@type': 'AdministrativeArea', name: 'West Midlands' },
  ],
  email: 'info.coventryanalytics@gmail.com',
  telephone: '+44-24-0000-0000',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/coventry-analytics',
  ],
  priceRange: '££',
  knowsAbout: [
    'Business Analytics',
    'Small Business Reporting',
    'Café Analytics',
    'Restaurant Business Intelligence',
    'Taxi Operator Analytics',
    'Retail Business Reports',
    'SME Financial Reporting',
    'Business KPIs',
  ],
  serviceType: [
    'Business Clarity Audit',
    'Monthly Intelligence Report',
    'SME Business Analytics',
    'Business Reporting',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a business report cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We don't publish prices on the site because every business is different. The free audit call lets us give you an exact figure. Most clients tell us the first month pays for itself.",
      },
    },
    {
      '@type': 'Question',
      name: 'What data do I need to provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you use a till system like Square, Zettle, or Lightspeed — one data export is enough. No specialist software needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this right for a café with just one location?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most of our clients are single-location businesses in Coventry. The reports are most valuable when you\'re too busy running the business to analyse it yourself.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from my accountant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your accountant tells you what happened after the year ends — for tax purposes. We tell you what\'s happening now, month by month, in plain English, with one specific action to take.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with businesses outside Coventry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Right now we focus exclusively on Coventry and the immediate surrounding area — Earlsdon, Foleshill, Kenilworth, Rugby.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I want to cancel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No contracts. No lock-in. Cancel the monthly report with one email, any time. We ask for 30 days\' notice so we can finalise your last report properly.',
      },
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#FAF7F2' }}>
        {children}
      </body>
    </html>
  );
}
