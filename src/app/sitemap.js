import { ROLES } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';
import { PRIORITY_PAGES } from '@/data/priority-pages';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/salary`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ];

  // Compare pages — new unique content type, high priority
  const comparePages = ROLES.map(role => ({
    url: `${BASE_URL}/compare/${role.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Priority salary pages — pre-built, highest quality
  const priorityPageUrls = PRIORITY_PAGES.map(({ role, location }) => ({
    url: `${BASE_URL}/salary/${role}/${location}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.80,
  }));

  // All other salary pages — served on-demand
  const prioritySet = new Set(PRIORITY_PAGES.map(p => `${p.role}/${p.location}`));
  const remainingPages = [];
  for (const role of ROLES) {
    for (const location of LOCATIONS) {
      if (!prioritySet.has(`${role.slug}/${location.slug}`)) {
        remainingPages.push({
          url: `${BASE_URL}/salary/${role.slug}/${location.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: location.tier === 1 ? 0.70 : location.tier === 2 ? 0.60 : 0.50,
        });
      }
    }
  }

  return [...staticPages, ...comparePages, ...priorityPageUrls, ...remainingPages];
}
