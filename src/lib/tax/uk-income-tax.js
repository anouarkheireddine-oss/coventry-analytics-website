// UK Income Tax + NI rates 2025/26
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const PA_TAPER_THRESHOLD = 100000;

const NI_PRIMARY_THRESHOLD = 12570;
const NI_UPPER_EARNINGS_LIMIT = 50270;
const NI_MAIN_RATE = 0.08;
const NI_UPPER_RATE = 0.02;

const PENSION_QUALIFYING_LOWER = 6240;
const PENSION_QUALIFYING_UPPER = 50270;

const STUDENT_LOAN_THRESHOLDS = {
  none: Infinity,
  plan1: 24990,
  plan2: 27295,
  plan4: 31395,
  plan5: 25000,
};

export function calcTakeHome(grossAnnual, {
  studentLoan = 'plan2',
  pensionPct = 5,
} = {}) {
  // Pension deducted before tax (salary sacrifice)
  const pensionContrib = Math.round(grossAnnual * (pensionPct / 100));
  const taxableIncome = grossAnnual - pensionContrib;

  // Personal allowance tapers above £100k
  let pa = PERSONAL_ALLOWANCE;
  if (taxableIncome > PA_TAPER_THRESHOLD) {
    pa = Math.max(0, PERSONAL_ALLOWANCE - Math.floor((taxableIncome - PA_TAPER_THRESHOLD) / 2));
  }

  // Income tax
  const taxable = Math.max(0, taxableIncome - pa);
  let incomeTax = 0;
  if (taxable > 0) {
    const basicBand = Math.min(taxable, BASIC_RATE_LIMIT - pa);
    incomeTax += Math.max(0, basicBand) * 0.20;
  }
  if (taxableIncome > BASIC_RATE_LIMIT) {
    const higherBand = Math.min(taxableIncome, HIGHER_RATE_LIMIT) - BASIC_RATE_LIMIT;
    incomeTax += Math.max(0, higherBand) * 0.40;
  }
  if (taxableIncome > HIGHER_RATE_LIMIT) {
    incomeTax += (taxableIncome - HIGHER_RATE_LIMIT) * 0.45;
  }
  incomeTax = Math.round(incomeTax);

  // National Insurance
  let ni = 0;
  if (grossAnnual > NI_PRIMARY_THRESHOLD) {
    const mainBand = Math.min(grossAnnual, NI_UPPER_EARNINGS_LIMIT) - NI_PRIMARY_THRESHOLD;
    ni += Math.max(0, mainBand) * NI_MAIN_RATE;
  }
  if (grossAnnual > NI_UPPER_EARNINGS_LIMIT) {
    ni += (grossAnnual - NI_UPPER_EARNINGS_LIMIT) * NI_UPPER_RATE;
  }
  ni = Math.round(ni);

  // Student loan
  const slThreshold = STUDENT_LOAN_THRESHOLDS[studentLoan] ?? Infinity;
  const studentLoanDeduction = grossAnnual > slThreshold
    ? Math.round((grossAnnual - slThreshold) * 0.09)
    : 0;

  const netAnnual = grossAnnual - incomeTax - ni - pensionContrib - studentLoanDeduction;
  const netMonthly = Math.round(netAnnual / 12);
  const effectiveRate = Math.round(((incomeTax + ni) / grossAnnual) * 100);

  return {
    gross: grossAnnual,
    incomeTax,
    ni,
    pensionContrib,
    studentLoanDeduction,
    netAnnual,
    netMonthly,
    effectiveRate,
    // breakdown as % of gross
    taxPct: Math.round((incomeTax / grossAnnual) * 100),
    niPct: Math.round((ni / grossAnnual) * 100),
    pensionPct: Math.round((pensionContrib / grossAnnual) * 100),
    takeHomePct: Math.round((netAnnual / grossAnnual) * 100),
  };
}

export function formatGBP(n) {
  return `£${Math.round(n).toLocaleString('en-GB')}`;
}
