import Link from 'next/link';
import { ROLES } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://salarystack.co.uk';

export const metadata = {
  title: 'About SalaryStack — UK Salary Intelligence',
  description: 'SalaryStack is built by UK finance and data professionals to show what tech salaries actually look like after tax. Our data sources, methodology, and why we built this.',
  alternates: { canonical: `${BASE_URL}/about` },
};

const FACTS = [
  { label: 'Roles covered', value: `${ROLES.length}` },
  { label: 'UK cities', value: `${LOCATIONS.length}` },
  { label: 'Salary guides', value: `${(ROLES.length * LOCATIONS.length).toLocaleString()}+` },
  { label: 'Tax year', value: '2025/26' },
  { label: 'Last updated', value: 'June 2026' },
  { label: 'Financial advice?', value: 'No. Never.' },
];

const SOURCES = [
  'ONS Annual Survey of Hours & Earnings (ASHE) 2025',
  'HMRC Income Tax & National Insurance rates 2025/26',
  'Rightmove / Zoopla median asking rents 2025',
  'ONS regional household expenditure data',
  'TfL and regional transport operator pricing',
];

const NOT_US = [
  'We are not HMRC. Our tax calculations model published rates — verify with a qualified accountant for personal tax planning.',
  'We are not a recruitment agency. We have no commercial relationship with any employer and no financial incentive to inflate salary figures.',
  'We are not financial advisors. Nothing on this site constitutes financial or tax advice.',
  'Salary figures are modelled estimates. Your actual salary will depend on company, experience, level, and negotiation.',
  'Scottish Income Tax rates differ. Our default calculations use England/Wales rates.',
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f5] text-gray-900">
      <article className="max-w-7xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-xs text-black/30 mb-8">
          <Link href="/" className="hover:text-black/60 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-black/60">About</span>
        </nav>

        <div className="mb-8">
          <span className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-semibold text-black/50 uppercase tracking-wider">About</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-3 leading-tight">
            We got tired of salary sites<br />showing gross.
          </h1>
          <p className="text-[#818cf8] text-lg font-semibold">So we built one that shows net.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5 text-black/65 text-[15px] leading-relaxed">
            <p>
              SalaryStack started as a spreadsheet. Every time someone in our network got a new job offer,
              the first question was always the same: <em>"Is this actually good money?"</em> The gross
              number tells you almost nothing. A £75,000 salary in London sounds impressive until you work
              out that after income tax, National Insurance, pension, and rent — you're taking home about
              £2,300 a month disposable. Which isn't that different from £55,000 in Manchester.
            </p>
            <p>
              The existing salary sites — Glassdoor, LinkedIn, Reed — show you the gross figure. That's
              what gets advertised, what gets negotiated, what goes on CVs. But it's not what you live on.
              We built the resource we actually wanted to use: one that starts with take-home, not gross.
            </p>
            <p>
              Every calculation on this site is built from first principles using HMRC&apos;s published
              2025/26 income tax and National Insurance rates. We model pension via salary sacrifice — which
              reduces taxable income, a detail most calculators miss entirely. We include student loan
              repayments. We show disposable income after estimated rent, transport, and groceries — because
              a salary is only meaningful in the context of what it costs to live where you&apos;re earning it.
            </p>
            <p>
              Salary figures are modelled estimates derived from ONS Annual Survey of Hours and Earnings
              (ASHE) regional data, cross-referenced with industry salary surveys and job posting data.
              They&apos;re not perfect — individual salaries vary by company, experience, and timing. But
              they&apos;re a more honest baseline than most of what&apos;s out there.
            </p>
            <p>
              We cover {ROLES.length} tech, data, finance, and business roles across {LOCATIONS.length} UK
              cities. We&apos;re a small, independent team of UK finance and data professionals. Not
              affiliated with HMRC, any employer, or any recruitment agency. We don&apos;t take money from
              employers to feature salary data. We don&apos;t inflate numbers to make job adverts look
              better.
            </p>

            <div className="mt-8 space-y-2">
              <h2 className="text-lg font-bold text-gray-900 mb-4">What these numbers don&apos;t cover</h2>
              <div className="rounded-2xl border border-[#d9770620] bg-[#d9770606] p-5">
                <ul className="space-y-3">
                  {NOT_US.map(point => (
                    <li key={point} className="flex gap-3 text-sm text-black/60 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#d97706]/60 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/methodology" className="text-sm text-[#818cf8] hover:underline">Full methodology →</Link>
              <Link href="/salary" className="text-sm text-black/40 hover:text-black/60 hover:underline">Browse all salary guides →</Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-black/[0.07] bg-black/[0.02] p-5">
              <p className="text-xs font-semibold text-black/30 uppercase tracking-wider mb-4">The site</p>
              <div className="space-y-3">
                {FACTS.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-black/45">{label}</span>
                    <span className="text-sm font-bold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-black/[0.07] bg-black/[0.02] p-5">
              <p className="text-xs font-semibold text-black/30 uppercase tracking-wider mb-3">Data sources</p>
              <ul className="space-y-2">
                {SOURCES.map(s => (
                  <li key={s} className="flex gap-2 text-xs text-black/50 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#818cf8] flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-black/[0.07] bg-black/[0.02] p-5">
              <p className="text-xs font-semibold text-black/30 uppercase tracking-wider mb-2">Contact</p>
              <p className="text-xs text-black/45 leading-relaxed mb-3">
                Data corrections, methodology questions, or press enquiries:
              </p>
              <a href="mailto:hello@salarystack.co.uk"
                className="text-sm text-[#818cf8] hover:underline break-all">
                hello@salarystack.co.uk
              </a>
            </div>

            <div className="rounded-xl border border-[#818cf820] bg-[#818cf806] p-4">
              <p className="text-xs text-[#818cf8] font-semibold mb-1">Built by humans</p>
              <p className="text-xs text-black/45 leading-relaxed">
                Every salary page is reviewed against HMRC published rates.
                The take-home calculator has been tested against GOV.UK&apos;s own
                income tax estimator. We update for each new tax year.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
