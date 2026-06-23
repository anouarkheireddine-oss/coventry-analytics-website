import { calcTakeHome } from '@/lib/tax/uk-income-tax';

// 2025/26 rates
const PERSONAL_ALLOWANCE = 12570;
const CORP_TAX_RATE = 0.19;          // Small profits rate
const EMPLOYER_NI_RATE = 0.138;
const EMPLOYER_NI_THRESHOLD = 9100;
const DIVIDEND_ALLOWANCE = 500;
const DIVIDEND_BASIC_RATE = 0.0875;
const DIVIDEND_HIGHER_RATE = 0.3375;
const BASIC_RATE_TOP = 50270;

export const DEFAULT_BILLING_DAYS = 227; // 260 working days minus 25 holiday + 8 bank holidays

export function calcOutsideIR35(dayRate, daysPerYear = DEFAULT_BILLING_DAYS, annualOverheads = 3000) {
  const grossAnnual = dayRate * daysPerYear;

  // Optimal director salary = personal allowance (avoids income tax; minimal employee NI)
  const salary = PERSONAL_ALLOWANCE;
  const employerNI = Math.round(Math.max(0, salary - EMPLOYER_NI_THRESHOLD) * EMPLOYER_NI_RATE);

  // Company profit available for distribution
  const companyProfit = grossAnnual - salary - employerNI - annualOverheads;
  const corpTax = Math.round(Math.max(0, companyProfit) * CORP_TAX_RATE);
  const distributable = companyProfit - corpTax;

  // Dividend tax
  const taxableDivs = Math.max(0, distributable - DIVIDEND_ALLOWANCE);
  const basicBandLeft = Math.max(0, BASIC_RATE_TOP - salary);
  const divInBasic = Math.min(taxableDivs, basicBandLeft);
  const divInHigher = Math.max(0, taxableDivs - basicBandLeft);
  const dividendTax = Math.round(divInBasic * DIVIDEND_BASIC_RATE + divInHigher * DIVIDEND_HIGHER_RATE);

  const netAnnual = Math.round(salary + distributable - dividendTax);
  const netMonthly = Math.round(netAnnual / 12);
  const effectiveRate = Math.round(((grossAnnual - netAnnual) / grossAnnual) * 100);

  return {
    type: 'outside',
    label: 'Outside IR35 (Ltd Co.)',
    dayRate,
    daysPerYear,
    grossAnnual,
    salary,
    employerNI,
    annualOverheads,
    corpTax,
    distributable,
    dividendTax,
    netAnnual,
    netMonthly,
    effectiveRate,
    breakdown: [
      { label: 'Gross Income',       value: grossAnnual,      sign: '+', color: '#22c55e' },
      { label: 'Director Salary',    value: -salary,          sign: '−', color: '#ffffff60' },
      { label: 'Employer NI',        value: -employerNI,      sign: '−', color: '#ef4444' },
      { label: 'Overheads',          value: -annualOverheads, sign: '−', color: '#ef4444' },
      { label: 'Corporation Tax',    value: -corpTax,         sign: '−', color: '#f59e0b' },
      { label: 'Dividend Tax',       value: -dividendTax,     sign: '−', color: '#f59e0b' },
      { label: 'Net Take-Home',      value: netAnnual,        sign: '=', color: '#00d4ff' },
    ],
  };
}

export function calcInsideIR35(dayRate, daysPerYear = DEFAULT_BILLING_DAYS, umbrellaFee = 1500) {
  const grossAnnual = dayRate * daysPerYear;
  // Inside IR35: PAYE via umbrella — umbrella charges a margin and pays PAYE on the rest
  const taxable = Math.max(0, grossAnnual - umbrellaFee);
  const tax = calcTakeHome(taxable);

  return {
    type: 'inside',
    label: 'Inside IR35 (Umbrella)',
    dayRate,
    daysPerYear,
    grossAnnual,
    umbrellaFee,
    ...tax,
    breakdown: [
      { label: 'Gross Income',    value: grossAnnual,          sign: '+', color: '#22c55e' },
      { label: 'Umbrella Fee',    value: -umbrellaFee,         sign: '−', color: '#ef4444' },
      { label: 'Income Tax',      value: -tax.incomeTax,       sign: '−', color: '#f59e0b' },
      { label: 'National Ins.',   value: -tax.ni,              sign: '−', color: '#f59e0b' },
      { label: 'Pension (5%)',    value: -tax.pensionContrib,  sign: '−', color: '#a78bfa' },
      { label: 'Net Take-Home',   value: tax.netAnnual,        sign: '=', color: '#00d4ff' },
    ],
  };
}

export function calcPermanent(salary) {
  const tax = calcTakeHome(salary);
  // Include employer pension (3%) and estimated benefits as total comp context
  const employerPension = Math.round(salary * 0.03);
  return {
    type: 'permanent',
    label: 'Permanent (PAYE)',
    grossAnnual: salary,
    employerPension,
    ...tax,
    breakdown: [
      { label: 'Gross Salary',       value: salary,               sign: '+', color: '#22c55e' },
      { label: 'Income Tax',         value: -tax.incomeTax,       sign: '−', color: '#f59e0b' },
      { label: 'National Ins.',      value: -tax.ni,              sign: '−', color: '#f59e0b' },
      { label: 'Pension (5%)',       value: -tax.pensionContrib,  sign: '−', color: '#a78bfa' },
      { label: 'Net Take-Home',      value: tax.netAnnual,        sign: '=', color: '#00d4ff' },
    ],
  };
}

// Rule of thumb: what day rate is equivalent to a perm salary?
export function salaryToDayRate(salary, daysPerYear = DEFAULT_BILLING_DAYS) {
  // Contractors need ~35% more to cover no benefits, holiday, risk
  return Math.round((salary / daysPerYear) * 1.35);
}

export function dayRateToSalary(dayRate, daysPerYear = DEFAULT_BILLING_DAYS) {
  return Math.round((dayRate * daysPerYear) / 1.35);
}
