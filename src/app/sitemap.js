import { ROLES } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/salary`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ];

  const salaryPages = [];
  for (const role of ROLES) {
    for (const location of LOCATIONS) {
      salaryPages.push({
        url: `${BASE_URL}/salary/${role.slug}/${location.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: location.tier === 1 ? 0.8 : location.tier === 2 ? 0.7 : 0.6,
      });
    }
  }

  return [...staticPages, ...salaryPages];
}
