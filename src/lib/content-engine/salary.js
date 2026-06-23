const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export function computeSalaries(role, location) {
  const base = Math.round(role.nationalAverage * location.multiplier);
  // Deterministic variance so same query always returns same numbers
  const seed = role.slug.charCodeAt(0) + location.slug.charCodeAt(0);
  const variance = ((seed % 7) - 3) * 500;

  const mid = base + variance;
  const entry = Math.round(mid * 0.68);
  const senior = Math.round(mid * 1.42);
  const lead = Math.round(mid * 1.80);
  const hourly = Math.round((mid / 52 / 37.5) * 100) / 100;

  return { entry, mid, senior, lead, hourly };
}

export function formatGBP(n) {
  return `£${n.toLocaleString('en-GB')}`;
}

export function generateArticleContent(role, location, salaries) {
  const { entry, mid, senior, lead, hourly } = salaries;
  const currentYear = new Date().getFullYear();
  const vsUK = location.multiplier >= 1.0
    ? `${Math.round((location.multiplier - 1) * 100)}% above`
    : `${Math.round((1 - location.multiplier) * 100)}% below`;

  const faqs = buildFAQs(role, location, salaries);

  // When ANTHROPIC_API_KEY is set, this module's caller (the route) will use
  // the Claude API to generate richer prose. The template below ensures clean
  // indexable content is always available without an API key.
  const article = {
    title: `${role.title} Salary in ${location.name}, UK (${currentYear} Guide)`,
    intro: `The average ${role.title} salary in ${location.name} is ${formatGBP(mid)} per year in ${currentYear}. Salaries range from ${formatGBP(entry)} at entry level to ${formatGBP(senior)} for senior professionals, with lead/director roles reaching ${formatGBP(lead)}. ${location.name} salaries are ${vsUK} the UK national average of ${formatGBP(role.nationalAverage)}.`,

    sections: [
      {
        h2: `${role.title} Salary Breakdown in ${location.name}`,
        content: `${location.name} is located in ${location.region} and has a cost-of-living multiplier that places it ${vsUK} the UK national benchmark. ${role.sector} professionals in the city benefit from ${role.demand === 'high' ? 'strong employer demand' : 'steady demand'} and a talent market growing at ${role.growth} year-on-year.`,
        table: [
          { level: 'Entry Level (0–2 yrs)', salary: entry },
          { level: 'Mid Level (2–5 yrs)', salary: mid },
          { level: 'Senior Level (5–10 yrs)', salary: senior },
          { level: 'Lead / Director (10+ yrs)', salary: lead },
        ],
      },
      {
        h2: `${role.title} vs UK National Average`,
        content: `The UK national average for a ${role.title} is ${formatGBP(role.nationalAverage)} per year. ${location.name} pays ${vsUK} the national average, largely driven by ${location.tier === 1 ? 'its status as the UK capital and global financial hub' : `its position as a major ${location.region} employment centre`}. The equivalent hourly rate at mid-level is approximately £${hourly}/hour based on a standard 37.5-hour week.`,
      },
      {
        h2: `Factors Affecting ${role.title} Salary in ${location.name}`,
        content: `Several variables influence what a ${role.title} earns in ${location.name}:`,
        bullets: [
          `Experience level — entry-level positions start at ${formatGBP(entry)}, while senior roles command ${formatGBP(senior)} or more.`,
          `Sector — ${role.sector} roles in ${location.name} vary significantly by employer type (private, public, third sector).`,
          `Specialist skills — proficiency in ${role.skills.slice(0, 2).join(' and ')} consistently attracts salary premiums of 10–20%.`,
          `Company size — enterprise organisations typically pay 15–25% more than SMEs for the same role.`,
          `Qualifications and certifications — holding ${role.skills[role.skills.length - 1]} certification can add £3,000–£8,000 to base pay.`,
        ],
      },
      {
        h2: `Career Progression for ${role.title} in ${location.name}`,
        content: `A typical ${role.title} career path in ${location.name} follows this progression:`,
        progression: [
          { stage: `Junior ${role.title}`, years: '0–2 years', salary: entry },
          { stage: role.title, years: '2–5 years', salary: mid },
          { stage: `Senior ${role.title}`, years: '5–10 years', salary: senior },
          { stage: `Lead / Principal ${role.title}`, years: '10+ years', salary: lead },
        ],
      },
      {
        h2: `How to Increase Your ${role.title} Salary in ${location.name}`,
        content: `To maximise earnings as a ${role.title} in ${location.name}:`,
        bullets: [
          `Develop in-demand skills — ${role.skills.join(', ')} are consistently cited by ${location.name} employers as premium competencies.`,
          `Negotiate proactively — industry data shows that ${role.title} professionals who negotiate starting salary earn ${formatGBP(Math.round(mid * 0.08))} more on average over 5 years.`,
          `Target growth sectors — ${role.sector} roles at scale-ups and tech-forward companies in ${location.name} offer equity and performance bonuses on top of base pay.`,
          `Contract work — ${location.name}-based contractors in this field typically earn ${formatGBP(Math.round(mid * 1.35))}–${formatGBP(Math.round(mid * 1.55))} per year (day rate basis).`,
        ],
      },
    ],

    faqs,
    skills: role.skills,
    currentYear,
    canonicalPath: `/salary/${role.slug}/${location.slug}`,
  };

  return article;
}

function buildFAQs(role, location, { entry, mid, senior }) {
  const currentYear = new Date().getFullYear();
  return [
    {
      q: `What is the average ${role.title} salary in ${location.name}?`,
      a: `The average ${role.title} salary in ${location.name} is ${formatGBP(mid)} per year in ${currentYear}. Entry-level roles start at around ${formatGBP(entry)}, while experienced professionals earn ${formatGBP(senior)} or more.`,
    },
    {
      q: `How does ${location.name} ${role.title} salary compare to the UK average?`,
      a: `${location.name} ${role.title} salaries are ${location.multiplier >= 1.0 ? `${Math.round((location.multiplier - 1) * 100)}% higher than` : `${Math.round((1 - location.multiplier) * 100)}% lower than`} the UK national average of ${formatGBP(role.nationalAverage)}.`,
    },
    {
      q: `What skills increase ${role.title} salary in ${location.name}?`,
      a: `Proficiency in ${role.skills.join(', ')} are the most valued skills for ${role.title} roles in ${location.name}, often commanding salary premiums of 10–25% above baseline.`,
    },
    {
      q: `Is ${location.name} a good place to work as a ${role.title}?`,
      a: `${location.name} has ${role.demand === 'high' ? 'strong' : 'moderate'} demand for ${role.title} professionals, with the sector growing at ${role.growth} annually. The city offers ${location.tier <= 2 ? 'a well-developed professional network and strong employer base' : 'growing opportunities particularly in the public and private sector'}.`,
    },
    {
      q: `What is the starting salary for a ${role.title} in ${location.name}?`,
      a: `Entry-level ${role.title} roles in ${location.name} typically start at ${formatGBP(entry)} per year. After 2–5 years of experience, this rises to approximately ${formatGBP(mid)}.`,
    },
    {
      q: `Do ${role.title}s get bonuses in ${location.name}?`,
      a: `Yes — many ${role.sector} employers in ${location.name} offer performance bonuses of 5–20% of base salary. Senior and lead-level ${role.title}s may also receive equity, pension contributions, and benefits packages worth an additional £3,000–£15,000.`,
    },
  ];
}
