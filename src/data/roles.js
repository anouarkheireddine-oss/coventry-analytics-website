export const ROLES = [
  // Technology
  { slug: 'software-engineer', title: 'Software Engineer', sector: 'Technology', nationalAverage: 65000, demand: 'high', growth: '+12%', skills: ['JavaScript', 'Python', 'AWS', 'React'], affiliateTag: 'tech' },
  { slug: 'data-scientist', title: 'Data Scientist', sector: 'Technology', nationalAverage: 70000, demand: 'high', growth: '+18%', skills: ['Python', 'ML', 'SQL', 'TensorFlow'], affiliateTag: 'tech' },
  { slug: 'data-engineer', title: 'Data Engineer', sector: 'Technology', nationalAverage: 68000, demand: 'high', growth: '+22%', skills: ['Python', 'Spark', 'Kafka', 'dbt'], affiliateTag: 'tech' },
  { slug: 'devops-engineer', title: 'DevOps Engineer', sector: 'Technology', nationalAverage: 72000, demand: 'high', growth: '+15%', skills: ['Kubernetes', 'Terraform', 'CI/CD', 'AWS'], affiliateTag: 'tech' },
  { slug: 'product-manager', title: 'Product Manager', sector: 'Technology', nationalAverage: 75000, demand: 'high', growth: '+10%', skills: ['Agile', 'Roadmapping', 'SQL', 'Jira'], affiliateTag: 'tech' },
  { slug: 'ux-designer', title: 'UX Designer', sector: 'Technology', nationalAverage: 55000, demand: 'medium', growth: '+8%', skills: ['Figma', 'User Research', 'Prototyping', 'Sketch'], affiliateTag: 'tech' },
  { slug: 'cybersecurity-analyst', title: 'Cybersecurity Analyst', sector: 'Technology', nationalAverage: 62000, demand: 'high', growth: '+25%', skills: ['SIEM', 'Penetration Testing', 'ISO 27001', 'CISSP'], affiliateTag: 'tech' },
  { slug: 'machine-learning-engineer', title: 'Machine Learning Engineer', sector: 'Technology', nationalAverage: 80000, demand: 'high', growth: '+30%', skills: ['Python', 'PyTorch', 'MLOps', 'Kubernetes'], affiliateTag: 'tech' },
  { slug: 'cloud-architect', title: 'Cloud Architect', sector: 'Technology', nationalAverage: 90000, demand: 'high', growth: '+20%', skills: ['AWS', 'Azure', 'GCP', 'Terraform'], affiliateTag: 'tech' },
  { slug: 'frontend-developer', title: 'Frontend Developer', sector: 'Technology', nationalAverage: 58000, demand: 'high', growth: '+10%', skills: ['React', 'TypeScript', 'CSS', 'Next.js'], affiliateTag: 'tech' },
  // Finance
  { slug: 'financial-analyst', title: 'Financial Analyst', sector: 'Finance', nationalAverage: 58000, demand: 'medium', growth: '+6%', skills: ['Excel', 'Financial Modelling', 'Bloomberg', 'CFA'], affiliateTag: 'finance' },
  { slug: 'investment-banker', title: 'Investment Banker', sector: 'Finance', nationalAverage: 95000, demand: 'medium', growth: '+5%', skills: ['M&A', 'DCF', 'Pitchbooks', 'CFA'], affiliateTag: 'finance' },
  { slug: 'accountant', title: 'Accountant', sector: 'Finance', nationalAverage: 45000, demand: 'medium', growth: '+4%', skills: ['ACCA', 'HMRC', 'Xero', 'Sage'], affiliateTag: 'finance' },
  { slug: 'compliance-officer', title: 'Compliance Officer', sector: 'Finance', nationalAverage: 55000, demand: 'medium', growth: '+8%', skills: ['FCA', 'AML', 'KYC', 'Risk'], affiliateTag: 'finance' },
  { slug: 'actuary', title: 'Actuary', sector: 'Finance', nationalAverage: 72000, demand: 'medium', growth: '+9%', skills: ['IFoA', 'Modelling', 'R', 'Statistics'], affiliateTag: 'finance' },
  // Healthcare
  { slug: 'nurse', title: 'Nurse', sector: 'Healthcare', nationalAverage: 38000, demand: 'high', growth: '+7%', skills: ['Clinical', 'NHS', 'Patient Care', 'NMC'], affiliateTag: 'healthcare' },
  { slug: 'doctor', title: 'Doctor (GP)', sector: 'Healthcare', nationalAverage: 78000, demand: 'high', growth: '+5%', skills: ['GMC', 'Clinical', 'Patient Management', 'NHS'], affiliateTag: 'healthcare' },
  { slug: 'physiotherapist', title: 'Physiotherapist', sector: 'Healthcare', nationalAverage: 42000, demand: 'high', growth: '+8%', skills: ['HCPC', 'MSK', 'Rehabilitation', 'Manual Therapy'], affiliateTag: 'healthcare' },
  { slug: 'pharmacist', title: 'Pharmacist', sector: 'Healthcare', nationalAverage: 52000, demand: 'medium', growth: '+4%', skills: ['GPhC', 'Clinical Pharmacology', 'Dispensing', 'NHS'], affiliateTag: 'healthcare' },
  { slug: 'paramedic', title: 'Paramedic', sector: 'Healthcare', nationalAverage: 36000, demand: 'high', growth: '+6%', skills: ['HCPC', 'Pre-hospital', 'ACLS', 'NHS'], affiliateTag: 'healthcare' },
  // Education
  { slug: 'teacher', title: 'Teacher (Secondary)', sector: 'Education', nationalAverage: 40000, demand: 'high', growth: '+3%', skills: ['QTS', 'Curriculum', 'Ofsted', 'Safeguarding'], affiliateTag: 'education' },
  { slug: 'university-lecturer', title: 'University Lecturer', sector: 'Education', nationalAverage: 48000, demand: 'medium', growth: '+2%', skills: ['PhD', 'Research', 'Teaching', 'REF'], affiliateTag: 'education' },
  { slug: 'headteacher', title: 'Headteacher', sector: 'Education', nationalAverage: 68000, demand: 'medium', growth: '+2%', skills: ['NPQH', 'Leadership', 'Ofsted', 'Budgeting'], affiliateTag: 'education' },
  // Legal
  { slug: 'solicitor', title: 'Solicitor', sector: 'Legal', nationalAverage: 62000, demand: 'medium', growth: '+5%', skills: ['SRA', 'Contract Law', 'Litigation', 'LPC'], affiliateTag: 'legal' },
  { slug: 'barrister', title: 'Barrister', sector: 'Legal', nationalAverage: 85000, demand: 'low', growth: '+3%', skills: ['Bar Council', 'Advocacy', 'BPTC', 'Legal Research'], affiliateTag: 'legal' },
  { slug: 'paralegal', title: 'Paralegal', sector: 'Legal', nationalAverage: 32000, demand: 'medium', growth: '+6%', skills: ['Research', 'Drafting', 'Case Management', 'Law Degree'], affiliateTag: 'legal' },
  // Engineering
  { slug: 'civil-engineer', title: 'Civil Engineer', sector: 'Engineering', nationalAverage: 52000, demand: 'medium', growth: '+7%', skills: ['AutoCAD', 'Revit', 'CEng', 'Infrastructure'], affiliateTag: 'engineering' },
  { slug: 'mechanical-engineer', title: 'Mechanical Engineer', sector: 'Engineering', nationalAverage: 50000, demand: 'medium', growth: '+6%', skills: ['SolidWorks', 'FEA', 'IMechE', 'CAD'], affiliateTag: 'engineering' },
  { slug: 'electrical-engineer', title: 'Electrical Engineer', sector: 'Engineering', nationalAverage: 54000, demand: 'medium', growth: '+8%', skills: ['CAD', 'IET', 'Power Systems', 'Autocad Electrical'], affiliateTag: 'engineering' },
  { slug: 'project-manager', title: 'Project Manager', sector: 'Engineering', nationalAverage: 58000, demand: 'high', growth: '+9%', skills: ['PMP', 'Prince2', 'Agile', 'MS Project'], affiliateTag: 'engineering' },
  // Business
  { slug: 'marketing-manager', title: 'Marketing Manager', sector: 'Business', nationalAverage: 52000, demand: 'medium', growth: '+7%', skills: ['SEO', 'PPC', 'Analytics', 'CRM'], affiliateTag: 'business' },
  { slug: 'hr-manager', title: 'HR Manager', sector: 'Business', nationalAverage: 48000, demand: 'medium', growth: '+5%', skills: ['CIPD', 'Employment Law', 'Recruitment', 'L&D'], affiliateTag: 'business' },
  { slug: 'operations-manager', title: 'Operations Manager', sector: 'Business', nationalAverage: 55000, demand: 'medium', growth: '+6%', skills: ['Lean', 'Six Sigma', 'Supply Chain', 'KPI'], affiliateTag: 'business' },
  { slug: 'business-analyst', title: 'Business Analyst', sector: 'Business', nationalAverage: 55000, demand: 'high', growth: '+10%', skills: ['Requirements', 'BPMN', 'SQL', 'Agile'], affiliateTag: 'business' },
  { slug: 'sales-manager', title: 'Sales Manager', sector: 'Business', nationalAverage: 58000, demand: 'medium', growth: '+5%', skills: ['B2B', 'CRM', 'Pipeline', 'Salesforce'], affiliateTag: 'business' },
  // Public Sector
  { slug: 'social-worker', title: 'Social Worker', sector: 'Public Sector', nationalAverage: 36000, demand: 'high', growth: '+6%', skills: ['SWE', 'Safeguarding', 'Social Care', 'HCPC'], affiliateTag: 'public' },
  { slug: 'police-officer', title: 'Police Officer', sector: 'Public Sector', nationalAverage: 38000, demand: 'high', growth: '+4%', skills: ['Law', 'Investigation', 'Community', 'PCSO'], affiliateTag: 'public' },
  // Creative
  { slug: 'graphic-designer', title: 'Graphic Designer', sector: 'Creative', nationalAverage: 36000, demand: 'medium', growth: '+5%', skills: ['Photoshop', 'Illustrator', 'InDesign', 'Figma'], affiliateTag: 'creative' },
  { slug: 'content-writer', title: 'Content Writer', sector: 'Creative', nationalAverage: 32000, demand: 'medium', growth: '+8%', skills: ['SEO', 'Copywriting', 'CMS', 'Research'], affiliateTag: 'creative' },
  // Logistics
  { slug: 'supply-chain-manager', title: 'Supply Chain Manager', sector: 'Logistics', nationalAverage: 58000, demand: 'high', growth: '+11%', skills: ['ERP', 'Procurement', 'Logistics', 'CIPS'], affiliateTag: 'logistics' },
  { slug: 'warehouse-manager', title: 'Warehouse Manager', sector: 'Logistics', nationalAverage: 38000, demand: 'medium', growth: '+5%', skills: ['WMS', 'Health & Safety', 'Forklift', 'Stock Control'], affiliateTag: 'logistics' },
];

export function getRoleBySlug(slug) {
  return ROLES.find(r => r.slug === slug) || null;
}

export function getRolesByTitle(title) {
  return ROLES.filter(r => r.title.toLowerCase().includes(title.toLowerCase()));
}

export function getRelatedRoles(role, limit = 5) {
  return ROLES
    .filter(r => r.slug !== role.slug && r.sector === role.sector)
    .slice(0, limit);
}
