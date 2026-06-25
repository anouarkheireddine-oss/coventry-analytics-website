export default function sitemap() {
  const base = 'https://coventryanalytics.co.uk';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/business-analytics-coventry-cafes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/business-analytics-coventry-restaurants`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/business-analytics-coventry-taxi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
