import Link from 'next/link';

const NAV = [
  {
    heading: 'Salary Data',
    links: [
      { href: '/salary', label: 'All Salary Guides' },
      { href: '/salary/software-engineer/london', label: 'Software Engineer' },
      { href: '/salary/data-scientist/london', label: 'Data Scientist' },
      { href: '/salary/machine-learning-engineer/london', label: 'ML Engineer' },
      { href: '/compare/software-engineer', label: 'City Comparison' },
    ],
  },
  {
    heading: 'Tools',
    links: [
      { href: '/calculators/contractor', label: 'Contractor vs Permanent' },
      { href: '/calculators/offer', label: 'Offer Comparison' },
      { href: '/insights/london-tech-premium', label: 'London Premium 2026' },
    ],
  },
  {
    heading: 'About',
    links: [
      { href: '/methodology', label: 'How we calculate this' },
      { href: '/salary', label: 'All roles & cities' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.05] bg-[#f8f7f5]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <a href="/" className="text-base font-extrabold text-gray-900">
              Salary<span className="text-[#818cf8]">Stack</span>
            </a>
            <p className="text-xs text-black/35 mt-2.5 leading-relaxed">
              UK salary intelligence for tech, data, and analytics careers.
              We show gross <em>and</em> net — because net is what you live on.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {NAV.map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">{heading}</p>
                <div className="space-y-2">
                  {links.map(({ href, label }) => (
                    <Link key={href} href={href}
                      className="block text-xs text-black/40 hover:text-black/70 transition-colors leading-relaxed">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-black/[0.05] pt-6 space-y-3">
          <p className="text-[11px] text-black/25 leading-relaxed max-w-2xl">
            Take-home calculations use HMRC 2025/26 income tax bands and National Insurance rates.
            Salary figures are modelled estimates based on market data — individual salaries will vary.
            All figures are for guidance only and do not constitute financial advice.
            Last updated June 2026.{' '}
            <Link href="/methodology" className="text-black/40 hover:text-black/60 underline transition-colors">
              How we calculate this →
            </Link>
          </p>
          <p className="text-[11px] text-black/20">
            © 2026 SalaryStack. Independent. Not affiliated with HMRC, any employer, or recruitment agency.
          </p>
        </div>
      </div>
    </footer>
  );
}
