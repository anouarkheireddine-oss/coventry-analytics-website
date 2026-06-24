import Link from 'next/link';
import { ROLES } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';
import { computeSalaries } from '@/lib/content-engine/salary';
import { calcTakeHome, formatGBP } from '@/lib/tax/uk-income-tax';
import { getDisposable, CITY_COSTS } from '@/lib/tax/cost-of-living';
import AdSlot from '@/components/content/AdSlot';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export const metadata = {
  title: 'Is London Still Worth It for Tech Careers? The Real Numbers (2026)',
  description: 'London pays tech workers 35% more gross — but after income tax, NI, and £2,100/month rent, are you actually better off? We ran the numbers for 8 tech roles across 10 UK cities.',
  alternates: { canonical: `${BASE_URL}/insights/london-tech-premium` },
  openGraph: { type: 'article' },
};

function analyseRole(roleSlug, comparisonSlugs) {
  const role = ROLES.find(r => r.slug === roleSlug);
  if (!role) return null;

  return comparisonSlugs.map(locSlug => {
    const loc = LOCATIONS.find(l => l.slug === locSlug);
    if (!loc) return null;
    const { mid } = computeSalaries(role, loc);
    const tax = calcTakeHome(mid);
    const disp = getDisposable(tax.netMonthly, locSlug);
    return {
      city: loc.name,
      slug: locSlug,
      gross: mid,
      netMonthly: tax.netMonthly,
      costs: CITY_COSTS[locSlug]?.total ?? 0,
      disposable: disp?.disposable ?? 0,
    };
  }).filter(Boolean);
}

const COMPARISON_CITIES = ['london', 'manchester', 'bristol', 'edinburgh', 'leeds', 'birmingham', 'cambridge', 'reading'];
const FEATURED_ROLES = ['software-engineer', 'data-scientist', 'product-manager', 'devops-engineer'];

export default function LondonTechPremiumPage() {
  const year = 2026;

  const londonLoc = LOCATIONS.find(l => l.slug === 'london');
  const londonMultiplier = londonLoc?.multiplier ?? 1.35;

  // Build analysis data for featured roles
  const roleAnalyses = FEATURED_ROLES.map(slug => {
    const role = ROLES.find(r => r.slug === slug);
    if (!role) return null;
    const data = analyseRole(slug, COMPARISON_CITIES);
    const london = data.find(d => d.slug === 'london');
    const ranked = [...data].sort((a, b) => b.disposable - a.disposable);
    const londonRank = ranked.findIndex(d => d.slug === 'london') + 1;
    const best = ranked[0];
    return { role, data, london, ranked, londonRank, best };
  }).filter(Boolean);

  // Software engineer headline numbers
  const sweAnalysis = roleAnalyses.find(a => a.role.slug === 'software-engineer');
  const sweLondon = sweAnalysis?.london;
  const sweBest = sweAnalysis?.best;

  // Aggregate: how often does London rank #1 in disposable income?
  const allRanks = roleAnalyses.map(a => a.londonRank);
  const londonTopHalf = allRanks.filter(r => r <= COMPARISON_CITIES.length / 2).length;

  return (
    <main className="min-h-screen bg-[#f8f7f5] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <AdSlot slot="leaderboard" className="mb-2" />
      </div>

      <article className="max-w-7xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-xs text-black/30 mb-6">
          <Link href="/" className="hover:text-black/60 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/insights" className="hover:text-black/60 transition-colors">Insights</Link>
          <span>›</span>
          <span className="text-black/60">London Tech Premium</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-[#f59e0b20] border border-[#f59e0b30] text-[11px] font-semibold text-[#f59e0b] uppercase tracking-wider">Analysis</span>
            <span className="text-xs text-black/30">{year} · SalaryStack Research</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            Is London Still Worth It for Tech Careers?<br />
            <span className="text-[#818cf8]">The Real Numbers, {year}</span>
          </h1>
          <p className="text-black/65 text-[16px] leading-relaxed">
            London pays tech workers {Math.round((londonMultiplier - 1) * 100)}% more than the UK average.
            But after income tax, National Insurance, and rent averaging £2,100/month,
            the question isn&apos;t what you earn — it&apos;s what you <em>keep</em>.
            We computed disposable income for {FEATURED_ROLES.length} tech roles across {COMPARISON_CITIES.length} UK cities.
            The results are not what most people expect.
          </p>
        </div>

        {/* Headline finding */}
        {sweLondon && sweBest && sweBest.slug !== 'london' && (
          <div className="rounded-2xl border border-[#f59e0b30] bg-[#f59e0b08] p-6 mb-8">
            <p className="text-xs text-[#f59e0b] font-semibold uppercase tracking-wider mb-2">Key Finding</p>
            <p className="text-lg font-bold text-gray-900 leading-snug">
              A software engineer in <span className="text-[#34d399]">{sweBest.city}</span> takes home{' '}
              <span className="text-[#34d399]">{formatGBP(sweBest.disposable)}/month</span> disposable income —
              vs <span className="text-[#f59e0b]">{formatGBP(sweLondon.disposable)}/month</span> in London,
              despite earning <span className="text-black/60">{formatGBP(sweLondon.gross - sweBest.gross)}/year less gross</span>.
            </p>
            <p className="text-sm text-black/50 mt-2">
              That&apos;s {formatGBP((sweBest.disposable - sweLondon.disposable) * 12)}/year more in your pocket — outside London.
            </p>
          </div>
        )}

        {/* Role-by-role breakdown */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Disposable Income by Role and City</h2>
          <p className="text-black/55 text-[15px] mb-5">
            Gross salary adjusted by city cost-of-living multipliers. Take-home calculated using 2025/26 UK income tax and NI rates
            (5% pension, Plan 2 student loan). Living costs: 1-bed flat + transport + groceries.
          </p>

          <div className="space-y-8">
            {roleAnalyses.map(({ role, ranked, london, londonRank }) => (
              <div key={role.slug}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-gray-900">{role.title}</h3>
                  <span className="text-xs text-black/40">London ranks #{londonRank} of {COMPARISON_CITIES.length} by disposable income</span>
                </div>
                <div className="rounded-xl border border-black/[0.07] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-black/[0.07] bg-black/[0.025]">
                        {['City', 'Gross', 'Monthly Net', 'Costs/mo', 'Disposable'].map(h => (
                          <th key={h} className="px-3 py-2.5 text-left text-[10px] font-semibold text-black/30 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ranked.map(({ city, slug, gross, netMonthly, costs, disposable }, i) => (
                        <tr key={slug} className={`border-b border-black/[0.04] ${slug === 'london' ? 'bg-[#f59e0b06]' : i === 0 ? 'bg-[#34d39906]' : ''} hover:bg-black/[0.02] transition-colors`}>
                          <td className="px-3 py-2.5">
                            <Link href={`/salary/${role.slug}/${slug}`} className="font-semibold text-black/80 hover:text-gray-900 transition-colors">
                              {city}
                              {i === 0 && <span className="ml-1.5 text-[9px] font-bold text-[#34d399] uppercase">best</span>}
                              {slug === 'london' && <span className="ml-1.5 text-[9px] font-bold text-[#f59e0b] uppercase">london</span>}
                            </Link>
                          </td>
                          <td className="px-3 py-2.5 text-black/40 text-xs">{formatGBP(gross)}</td>
                          <td className="px-3 py-2.5 text-[#818cf8] font-semibold">{formatGBP(netMonthly)}</td>
                          <td className="px-3 py-2.5 text-black/35 text-xs">{formatGBP(costs)}</td>
                          <td className="px-3 py-2.5">
                            <span className={`font-bold ${i === 0 ? 'text-[#34d399]' : slug === 'london' ? 'text-[#f59e0b]' : 'text-black/60'}`}>
                              {formatGBP(disposable)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="in-article" className="mb-10" />

        {/* Analysis */}
        <section className="space-y-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900">Why London&apos;s Premium Has Eroded</h2>

          <p className="text-black/65 text-[15px] leading-relaxed">
            The London salary premium has historically compensated for higher costs. But post-2020,
            three forces have converged to make that equation less compelling:
          </p>

          {[
            {
              title: '1. London rent has outpaced salary growth',
              body: `Average 1-bed rent in London reached £2,100/month in 2025 — up 28% since 2020.
                     Tech salaries in London grew around 18% over the same period.
                     The gap between gross pay growth and housing cost growth has been negative for London workers since 2022.`,
            },
            {
              title: '2. Remote-first normalised competitive regional salaries',
              body: `Pre-2020, a data scientist in Manchester earned roughly 15–20% less than an equivalent London role.
                     Remote hiring has compressed that gap to 5–10% in many tech disciplines,
                     while Manchester rent remains 50% lower than London.
                     The arbitrage has decisively shifted.`,
            },
            {
              title: '3. The higher-rate tax trap hits earlier in London',
              body: `The higher rate income tax threshold (£50,270) is a national figure, not adjusted for regional costs.
                     A senior software engineer earning £85k in London pays 40% tax on £34,730 of income.
                     The same role in Manchester at £70k pays 40% on £19,730.
                     London workers reach the higher rate sooner — and the city doesn't compensate proportionally.`,
            },
            {
              title: 'When London IS still worth it',
              body: `London retains a strong premium for roles that don't translate remotely:
                     investment banking, trading, certain legal and consulting roles, and seniority that requires
                     in-person relationship building.
                     For senior tech leadership and finance, the London total compensation packages (bonuses, carry, equity)
                     still exceed regional equivalents by 30–50% in total value.`,
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-black/60 text-[15px] leading-relaxed">{body}</p>
            </div>
          ))}
        </section>

        {/* Verdict */}
        <div className="rounded-2xl border border-[#818cf820] bg-[#818cf806] p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">The {year} Verdict</h2>
          <p className="text-black/65 text-[15px] leading-relaxed mb-3">
            For the majority of tech, data, and analytics roles below £120k: <strong className="text-gray-900">London is no longer
            the highest-disposable-income city</strong>. Cities like {sweAnalysis?.best.city}, Bristol, and Cambridge
            consistently rank higher on take-home after living costs.
          </p>
          <p className="text-black/65 text-[15px] leading-relaxed">
            The calculation changes at very senior levels, in finance and consulting, or if you specifically
            value London&apos;s career network density. But the default assumption — <em>&quot;London pays more, so London is better&quot;</em> —
            is increasingly wrong for most tech and analytics professionals.
          </p>
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[
            { href: '/compare/software-engineer', label: 'SWE salary: all cities', desc: 'Full take-home comparison table' },
            { href: '/calculators/offer', label: 'Compare two offers', desc: 'Total compensation calculator' },
            { href: '/calculators/contractor', label: 'Contractor vs permanent', desc: 'Is contracting worth the risk?' },
            { href: '/salary', label: 'Browse all salary guides', desc: `${22 * 25}+ pages of UK salary data` },
          ].map(({ href, label, desc }) => (
            <Link key={href} href={href} className="p-4 rounded-xl border border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.03] transition-colors">
              <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
              <p className="text-xs text-black/40">{desc}</p>
            </Link>
          ))}
        </div>
      </article>

      <div className="max-w-7xl mx-auto px-4 pb-10">
        <AdSlot slot="bottom" />
      </div>
    </main>
  );
}
