import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://salarystack.co.uk';

export const metadata = {
  title: 'How We Calculate Salary and Take-Home Pay',
  description: 'How SalaryStack calculates UK salary data, income tax, National Insurance, and disposable income. Methodology, data sources, and limitations explained.',
  alternates: { canonical: `${BASE_URL}/methodology` },
};

const INCOME_TAX_BANDS = [
  { band: 'Personal Allowance', range: 'Up to £12,570', rate: '0%', note: 'Tapers above £100,000' },
  { band: 'Basic Rate', range: '£12,571 – £50,270', rate: '20%', note: '' },
  { band: 'Higher Rate', range: '£50,271 – £125,140', rate: '40%', note: '' },
  { band: 'Additional Rate', range: 'Over £125,140', rate: '45%', note: 'Personal Allowance lost entirely' },
];

const NI_BANDS = [
  { band: 'Below Primary Threshold', range: 'Up to £12,570', rate: '0%' },
  { band: 'Main Rate', range: '£12,571 – £50,270', rate: '8%' },
  { band: 'Upper Rate', range: 'Over £50,270', rate: '2%' },
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <article className="max-w-3xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-xs text-white/30 mb-8">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Methodology</span>
        </nav>

        <div className="mb-10">
          <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] font-semibold text-white/50 uppercase tracking-wider">Transparency</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-3 leading-tight">
            How We Calculate Salary<br />and Take-Home Pay
          </h1>
          <p className="text-white/55 text-[15px] leading-relaxed">
            Every number on SalaryStack comes from a specific formula. This page explains exactly what those formulas are,
            where the underlying data comes from, and — critically — what the numbers can and can't tell you.
          </p>
        </div>

        {/* Salary data */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Salary Data</h2>

          <div className="space-y-4 text-white/60 text-[15px] leading-relaxed">
            <p>
              Salary figures are modelled estimates, not live job posting data. We start with a national average for each role,
              derived from publicly available sources including ONS Annual Survey of Hours and Earnings (ASHE), tech industry salary
              surveys, and recruiter market reports. These are cross-referenced and adjusted to reflect the 2025/26 market.
            </p>
            <p>
              City figures are calculated by applying a location multiplier to the national average.
              London carries a multiplier of ~1.35 (35% above national average). Manchester ~0.92. Edinburgh ~0.95.
              These multipliers are based on ONS regional pay data and corroborated against job posting data.
            </p>
            <p>
              Salary bands (entry, mid, senior, lead) are calculated as percentages of the city mid-point:
            </p>
            <div className="rounded-xl border border-white/[0.07] overflow-hidden mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    {['Level', 'Multiplier', 'Example (£65k mid)'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { level: 'Entry', mult: '~70%', ex: '£45,500' },
                    { level: 'Mid', mult: '100%', ex: '£65,000' },
                    { level: 'Senior', mult: '~140%', ex: '£91,000' },
                    { level: 'Lead / Principal', mult: '~175%', ex: '£113,750' },
                  ].map(({ level, mult, ex }) => (
                    <tr key={level} className="border-b border-white/[0.04]">
                      <td className="px-4 py-2.5 text-white/70 font-medium">{level}</td>
                      <td className="px-4 py-2.5 text-white/45">{mult}</td>
                      <td className="px-4 py-2.5 text-white/45">{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-white/40 mt-2">
              We add a small deterministic variance per role/city combination so that figures vary realistically rather than being mechanically identical.
            </p>
          </div>
        </section>

        {/* Income tax */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-2">Income Tax (2025/26)</h2>
          <p className="text-white/55 text-[15px] leading-relaxed mb-4">
            We use HMRC&apos;s 2025/26 income tax bands for England, Wales and Northern Ireland.
            Scottish income tax rates differ — our calculator uses the UK-wide rates as a baseline.
          </p>
          <div className="rounded-xl border border-white/[0.07] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                  {['Band', 'Taxable Income', 'Rate', 'Notes'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INCOME_TAX_BANDS.map(({ band, range, rate, note }) => (
                  <tr key={band} className="border-b border-white/[0.04]">
                    <td className="px-4 py-2.5 text-white/70 font-medium">{band}</td>
                    <td className="px-4 py-2.5 text-white/45">{range}</td>
                    <td className="px-4 py-2.5 font-bold text-[#00d4ff]">{rate}</td>
                    <td className="px-4 py-2.5 text-white/35 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-white/40 mt-3">
            The Personal Allowance tapers at £1 for every £2 earned above £100,000, reaching zero at £125,140.
            This creates an effective 60% marginal tax rate between £100,000 and £125,140.
          </p>
        </section>

        {/* NI */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-2">National Insurance (2025/26)</h2>
          <p className="text-white/55 text-[15px] leading-relaxed mb-4">
            Employee Class 1 National Insurance contributions, using 2025/26 rates.
          </p>
          <div className="rounded-xl border border-white/[0.07] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                  {['Band', 'Earnings', 'Rate'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {NI_BANDS.map(({ band, range, rate }) => (
                  <tr key={band} className="border-b border-white/[0.04]">
                    <td className="px-4 py-2.5 text-white/70 font-medium">{band}</td>
                    <td className="px-4 py-2.5 text-white/45">{range}</td>
                    <td className="px-4 py-2.5 font-bold text-[#00d4ff]">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pension + student loan */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Pension and Student Loan</h2>
          <div className="space-y-4 text-white/60 text-[15px] leading-relaxed">
            <p>
              <strong className="text-white/80">Pension:</strong> Default assumption is a 5% employee contribution via salary sacrifice.
              This means pension is deducted before income tax and NI are calculated — reducing your taxable income.
              You can adjust this in the interactive calculator on any salary page.
            </p>
            <p>
              <strong className="text-white/80">Student Loan:</strong> Default is Plan 2 (post-2012 undergraduates in England/Wales).
              Repayments are 9% on earnings above £27,295/year. Plan 1 and Plan 5 thresholds differ and can be selected in the calculator.
            </p>
          </div>
        </section>

        {/* Living costs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Living Cost Estimates</h2>
          <div className="space-y-4 text-white/60 text-[15px] leading-relaxed">
            <p>
              Disposable income figures subtract estimated monthly living costs from net pay.
              The three components we include:
            </p>
            <ul className="space-y-2">
              {[
                { item: 'Rent (1-bed flat)', detail: 'Rightmove/Zoopla median asking rent by city, 2025 data. London: £2,100/mo. Manchester: £1,050/mo.' },
                { item: 'Transport', detail: 'Monthly public transport pass or equivalent. London: £165/mo (Zone 1–2 Travelcard). Other cities: £60–£100/mo.' },
                { item: 'Groceries', detail: 'ONS household expenditure estimates for a single adult. £250–£320/mo depending on city.' },
              ].map(({ item, detail }) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00d4ff] flex-shrink-0" />
                  <span><strong className="text-white/70">{item}:</strong> {detail}</span>
                </li>
              ))}
            </ul>
            <p>
              These are averages. Shared accommodation, car ownership, eating out, childcare, and other personal expenses
              are not included. Disposable income figures are a starting point for comparison, not a personal budget.
            </p>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">What These Numbers Don&apos;t Cover</h2>
          <div className="rounded-2xl border border-[#f59e0b20] bg-[#f59e0b06] p-5">
            <ul className="space-y-3 text-sm text-white/60 leading-relaxed">
              {[
                'Salary figures are modelled estimates. Your actual offer will depend on company, experience level, negotiation, and the current hiring market.',
                'Scottish Income Tax rates differ from the rest of the UK. Our default calculations use England/Wales rates.',
                'Contractor calculations assume standard outside IR35 Ltd company structure with optimal director salary. Actual tax will vary.',
                'Bonus, equity, and other benefits are not included in base salary calculations unless you use the Offer Comparison tool.',
                'These figures are for employed workers (PAYE). Self-employed, partnership, and other income structures are not covered.',
                'None of this is financial or tax advice. For personal tax planning, speak to a qualified accountant.',
              ].map(point => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#f59e0b60] flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/calculators/contractor', label: 'Contractor Calculator', desc: 'IR35, Ltd company vs PAYE' },
            { href: '/salary/software-engineer/london', label: 'See a Salary Page', desc: 'Full breakdown with interactive calc' },
          ].map(({ href, label, desc }) => (
            <Link key={href} href={href}
              className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <p className="text-sm font-semibold text-white mb-1">{label}</p>
              <p className="text-xs text-white/40">{desc}</p>
            </Link>
          ))}
        </div>
      </article>
    </main>
  );
}
