export default function sitemap() {
  const baseUrl = 'https://coventryanalytics.co.uk'
  const routes = ['', '/solutions', '/pricing', '/book', '/about', '/case-studies', '/contact', '/resources', '/tools', '/tools/business-health-score']
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
