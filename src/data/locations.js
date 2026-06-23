export const LOCATIONS = [
  { slug: 'london',       name: 'London',          region: 'Greater London',         multiplier: 1.35, population: 9100000,  tier: 1 },
  { slug: 'manchester',   name: 'Manchester',       region: 'Greater Manchester',     multiplier: 1.05, population: 560000,   tier: 2 },
  { slug: 'birmingham',   name: 'Birmingham',       region: 'West Midlands',          multiplier: 1.02, population: 1100000,  tier: 2 },
  { slug: 'leeds',        name: 'Leeds',            region: 'West Yorkshire',         multiplier: 1.03, population: 800000,   tier: 2 },
  { slug: 'bristol',      name: 'Bristol',          region: 'South West England',     multiplier: 1.08, population: 470000,   tier: 2 },
  { slug: 'edinburgh',    name: 'Edinburgh',        region: 'Scotland',               multiplier: 1.06, population: 530000,   tier: 2 },
  { slug: 'glasgow',      name: 'Glasgow',          region: 'Scotland',               multiplier: 0.97, population: 630000,   tier: 2 },
  { slug: 'liverpool',    name: 'Liverpool',        region: 'Merseyside',             multiplier: 0.98, population: 500000,   tier: 2 },
  { slug: 'sheffield',    name: 'Sheffield',        region: 'South Yorkshire',        multiplier: 0.96, population: 580000,   tier: 2 },
  { slug: 'nottingham',   name: 'Nottingham',       region: 'East Midlands',          multiplier: 0.97, population: 330000,   tier: 2 },
  { slug: 'coventry',     name: 'Coventry',         region: 'West Midlands',          multiplier: 0.97, population: 370000,   tier: 3 },
  { slug: 'leicester',    name: 'Leicester',        region: 'East Midlands',          multiplier: 0.96, population: 350000,   tier: 3 },
  { slug: 'cardiff',      name: 'Cardiff',          region: 'Wales',                  multiplier: 0.95, population: 360000,   tier: 3 },
  { slug: 'newcastle',    name: 'Newcastle',        region: 'Tyne and Wear',          multiplier: 0.95, population: 310000,   tier: 3 },
  { slug: 'cambridge',    name: 'Cambridge',        region: 'Cambridgeshire',         multiplier: 1.15, population: 130000,   tier: 2 },
  { slug: 'oxford',       name: 'Oxford',           region: 'Oxfordshire',            multiplier: 1.12, population: 160000,   tier: 2 },
  { slug: 'reading',      name: 'Reading',          region: 'Berkshire',              multiplier: 1.10, population: 170000,   tier: 2 },
  { slug: 'brighton',     name: 'Brighton',         region: 'East Sussex',            multiplier: 1.05, population: 280000,   tier: 2 },
  { slug: 'southampton',  name: 'Southampton',      region: 'Hampshire',              multiplier: 0.99, population: 260000,   tier: 3 },
  { slug: 'portsmouth',   name: 'Portsmouth',       region: 'Hampshire',              multiplier: 0.96, population: 210000,   tier: 3 },
  { slug: 'plymouth',     name: 'Plymouth',         region: 'Devon',                  multiplier: 0.90, population: 260000,   tier: 3 },
  { slug: 'stoke',        name: 'Stoke-on-Trent',   region: 'Staffordshire',          multiplier: 0.88, population: 260000,   tier: 3 },
  { slug: 'hull',         name: 'Hull',             region: 'East Yorkshire',         multiplier: 0.87, population: 260000,   tier: 3 },
  { slug: 'sunderland',   name: 'Sunderland',       region: 'Tyne and Wear',          multiplier: 0.88, population: 280000,   tier: 3 },
  { slug: 'wolverhampton',name: 'Wolverhampton',    region: 'West Midlands',          multiplier: 0.92, population: 260000,   tier: 3 },
];

export function getLocationBySlug(slug) {
  return LOCATIONS.find(l => l.slug === slug) || null;
}

export function getNearbyLocations(location, limit = 4) {
  return LOCATIONS
    .filter(l => l.slug !== location.slug && l.region === location.region)
    .concat(LOCATIONS.filter(l => l.slug !== location.slug && l.tier === location.tier && l.region !== location.region))
    .slice(0, limit);
}
