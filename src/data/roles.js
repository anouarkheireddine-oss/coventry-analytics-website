// Focused on tech, analytics, and business careers — the high-RPM, high-expertise niche.
export const ROLES = [
  // ── Software & Engineering ──────────────────────────────────────────────────
  { slug: 'software-engineer',         title: 'Software Engineer',         sector: 'Software',   nationalAverage: 65000, demand: 'high',   growth: '+12%', skills: ['JavaScript', 'Python', 'AWS', 'React'],           affiliateTag: 'tech' },
  { slug: 'frontend-developer',        title: 'Frontend Developer',        sector: 'Software',   nationalAverage: 58000, demand: 'high',   growth: '+10%', skills: ['React', 'TypeScript', 'Next.js', 'CSS'],          affiliateTag: 'tech' },
  { slug: 'devops-engineer',           title: 'DevOps / Platform Engineer',sector: 'Software',   nationalAverage: 72000, demand: 'high',   growth: '+15%', skills: ['Kubernetes', 'Terraform', 'CI/CD', 'AWS'],        affiliateTag: 'tech' },
  { slug: 'cloud-architect',           title: 'Cloud Architect',           sector: 'Software',   nationalAverage: 90000, demand: 'high',   growth: '+20%', skills: ['AWS', 'Azure', 'GCP', 'Terraform'],               affiliateTag: 'tech' },
  { slug: 'cybersecurity-analyst',     title: 'Cybersecurity Analyst',     sector: 'Software',   nationalAverage: 62000, demand: 'high',   growth: '+25%', skills: ['SIEM', 'Pen Testing', 'ISO 27001', 'CISSP'],      affiliateTag: 'tech' },
  // ── Data & AI ───────────────────────────────────────────────────────────────
  { slug: 'data-analyst',              title: 'Data Analyst',              sector: 'Data & AI',  nationalAverage: 45000, demand: 'high',   growth: '+14%', skills: ['SQL', 'Python', 'Power BI', 'Tableau'],           affiliateTag: 'data' },
  { slug: 'data-scientist',            title: 'Data Scientist',            sector: 'Data & AI',  nationalAverage: 70000, demand: 'high',   growth: '+18%', skills: ['Python', 'ML', 'SQL', 'TensorFlow'],              affiliateTag: 'data' },
  { slug: 'data-engineer',             title: 'Data Engineer',             sector: 'Data & AI',  nationalAverage: 68000, demand: 'high',   growth: '+22%', skills: ['Python', 'Spark', 'Kafka', 'dbt'],                affiliateTag: 'data' },
  { slug: 'machine-learning-engineer', title: 'Machine Learning Engineer', sector: 'Data & AI',  nationalAverage: 80000, demand: 'high',   growth: '+30%', skills: ['Python', 'PyTorch', 'MLOps', 'Kubernetes'],       affiliateTag: 'data' },
  // ── Product & Design ────────────────────────────────────────────────────────
  { slug: 'product-manager',           title: 'Product Manager',           sector: 'Product',    nationalAverage: 75000, demand: 'high',   growth: '+10%', skills: ['Agile', 'Roadmapping', 'SQL', 'Figma'],           affiliateTag: 'tech' },
  { slug: 'ux-designer',               title: 'UX Designer',               sector: 'Product',    nationalAverage: 55000, demand: 'medium', growth: '+8%',  skills: ['Figma', 'User Research', 'Prototyping', 'CSS'],   affiliateTag: 'tech' },
  // ── Business & Strategy ─────────────────────────────────────────────────────
  { slug: 'business-analyst',          title: 'Business Analyst',          sector: 'Business',   nationalAverage: 55000, demand: 'high',   growth: '+10%', skills: ['Requirements', 'SQL', 'BPMN', 'Agile'],           affiliateTag: 'business' },
  { slug: 'project-manager',           title: 'Project Manager',           sector: 'Business',   nationalAverage: 58000, demand: 'high',   growth: '+9%',  skills: ['Prince2', 'PMP', 'Agile', 'MS Project'],          affiliateTag: 'business' },
  { slug: 'management-consultant',     title: 'Management Consultant',     sector: 'Business',   nationalAverage: 72000, demand: 'medium', growth: '+7%',  skills: ['Strategy', 'Financial Modelling', 'PowerPoint', 'SQL'], affiliateTag: 'business' },
  { slug: 'operations-manager',        title: 'Operations Manager',        sector: 'Business',   nationalAverage: 55000, demand: 'medium', growth: '+6%',  skills: ['Lean', 'Six Sigma', 'ERP', 'KPI'],                affiliateTag: 'business' },
  { slug: 'marketing-manager',         title: 'Marketing Manager',         sector: 'Business',   nationalAverage: 52000, demand: 'medium', growth: '+7%',  skills: ['SEO', 'PPC', 'Analytics', 'CRM'],                 affiliateTag: 'business' },
  // ── Finance & Quant ─────────────────────────────────────────────────────────
  { slug: 'financial-analyst',         title: 'Financial Analyst',         sector: 'Finance',    nationalAverage: 58000, demand: 'medium', growth: '+6%',  skills: ['Excel', 'Financial Modelling', 'Bloomberg', 'CFA'], affiliateTag: 'finance' },
  { slug: 'investment-banker',         title: 'Investment Banker',         sector: 'Finance',    nationalAverage: 95000, demand: 'medium', growth: '+5%',  skills: ['M&A', 'DCF', 'Pitchbooks', 'CFA'],               affiliateTag: 'finance' },
  { slug: 'actuary',                   title: 'Actuary',                   sector: 'Finance',    nationalAverage: 72000, demand: 'medium', growth: '+9%',  skills: ['IFoA', 'Modelling', 'R', 'Statistics'],           affiliateTag: 'finance' },
  { slug: 'compliance-officer',        title: 'Compliance Officer',        sector: 'Finance',    nationalAverage: 55000, demand: 'medium', growth: '+8%',  skills: ['FCA', 'AML', 'KYC', 'Risk Management'],           affiliateTag: 'finance' },
  { slug: 'accountant',                title: 'Accountant',                sector: 'Finance',    nationalAverage: 45000, demand: 'medium', growth: '+4%',  skills: ['ACCA', 'HMRC', 'Xero', 'Excel'],                  affiliateTag: 'finance' },
  // ── Legal & Professional ────────────────────────────────────────────────────
  { slug: 'solicitor',                 title: 'Solicitor',                 sector: 'Legal',      nationalAverage: 62000, demand: 'medium', growth: '+5%',  skills: ['SRA', 'Contract Law', 'LPC', 'Due Diligence'],    affiliateTag: 'legal' },
];

export function getRoleBySlug(slug) {
  return ROLES.find(r => r.slug === slug) || null;
}

export function getRelatedRoles(role, limit = 5) {
  return ROLES
    .filter(r => r.slug !== role.slug && r.sector === role.sector)
    .slice(0, limit);
}

export const SECTORS = [...new Set(ROLES.map(r => r.sector))];
