export function buildSalarySchema({ role, location, entry, mid, senior }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Occupation',
    name: role.title,
    occupationLocation: {
      '@type': 'City',
      name: location.name,
      containedInPlace: {
        '@type': 'Country',
        name: 'United Kingdom',
      },
    },
    estimatedSalary: [
      {
        '@type': 'MonetaryAmountDistribution',
        name: 'Entry Level',
        currency: 'GBP',
        duration: 'P1Y',
        percentile10: Math.round(entry * 0.85),
        median: entry,
        percentile90: Math.round(entry * 1.15),
      },
      {
        '@type': 'MonetaryAmountDistribution',
        name: 'Mid Level',
        currency: 'GBP',
        duration: 'P1Y',
        percentile10: Math.round(mid * 0.85),
        median: mid,
        percentile90: Math.round(mid * 1.15),
      },
      {
        '@type': 'MonetaryAmountDistribution',
        name: 'Senior Level',
        currency: 'GBP',
        duration: 'P1Y',
        percentile10: Math.round(senior * 0.85),
        median: senior,
        percentile90: Math.round(senior * 1.15),
      },
    ],
    skills: role.skills,
    responsibilities: [
      `Performing core ${role.title} duties`,
      `Collaborating with cross-functional teams in ${location.name}`,
      'Delivering high-quality work aligned with organisational goals',
    ],
  };
}

export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
