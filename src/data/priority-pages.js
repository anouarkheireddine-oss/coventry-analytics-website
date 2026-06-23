// The 30 pages we pre-build at launch. Quality over quantity.
// Rest of the 1,025 combinations are served on-demand (ISR).
export const PRIORITY_PAGES = [
  // Technology — highest RPM, highest demand
  { role: 'software-engineer',       location: 'london'      },
  { role: 'software-engineer',       location: 'manchester'  },
  { role: 'software-engineer',       location: 'birmingham'  },
  { role: 'data-scientist',          location: 'london'      },
  { role: 'machine-learning-engineer', location: 'london'   },
  { role: 'devops-engineer',         location: 'london'      },
  { role: 'product-manager',         location: 'london'      },
  { role: 'frontend-developer',      location: 'london'      },
  { role: 'cybersecurity-analyst',   location: 'london'      },
  { role: 'cloud-architect',         location: 'london'      },
  // Healthcare — mass search volume, NHS brand recognition
  { role: 'nurse',                   location: 'london'      },
  { role: 'nurse',                   location: 'manchester'  },
  { role: 'nurse',                   location: 'birmingham'  },
  { role: 'doctor',                  location: 'london'      },
  { role: 'physiotherapist',         location: 'london'      },
  { role: 'pharmacist',              location: 'london'      },
  // Finance — high CPM advertisers
  { role: 'investment-banker',       location: 'london'      },
  { role: 'financial-analyst',       location: 'london'      },
  { role: 'accountant',              location: 'london'      },
  { role: 'actuary',                 location: 'london'      },
  // Education — extremely high volume ("teacher salary" = 100k+ searches/mo)
  { role: 'teacher',                 location: 'london'      },
  { role: 'teacher',                 location: 'manchester'  },
  { role: 'headteacher',             location: 'london'      },
  { role: 'university-lecturer',     location: 'london'      },
  // Legal — high CPC, affiliate value
  { role: 'solicitor',               location: 'london'      },
  { role: 'barrister',               location: 'london'      },
  // Business
  { role: 'project-manager',         location: 'london'      },
  { role: 'marketing-manager',       location: 'london'      },
  { role: 'business-analyst',        location: 'london'      },
  { role: 'operations-manager',      location: 'london'      },
];
