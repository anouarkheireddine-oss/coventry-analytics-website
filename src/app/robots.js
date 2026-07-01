export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://coventryanalytics.co.uk/sitemap.xml',
  }
}
