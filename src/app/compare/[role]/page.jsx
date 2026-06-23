import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROLES, getRoleBySlug } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';
import { computeSalaries } from '@/lib/content-engine/salary';
import { calcTakeHome, formatGBP } from '@/lib/tax/uk-income-tax';
import { getDisposable, CITY_COSTS } from '@/lib/tax/cost-of-living';
import { buildBreadcrumbSchema } from '@/lib/seo/schema';
import AdSlot from '@/components/content/AdSlot';
import JobBoardCTA from '@/components/content/JobBoardCTA';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export async function generateStaticParams() {
  return ROLES.map(role => ({ role: role.slug }));
}

export async function generateMetadata({ params }) {
  const { role: roleSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  if (!role) return {};
  const year = new Date().getFullYear();
  const title = `${role.title} Salary by City UK (${year}) — Where Do You Take Home the Most?`;
  const description = `Compare ${role.title} take-home pay across every UK city after income tax, NI, and cost of living. Find where your salary goes furthest.`;
  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/compare/${roleSlug}` },
    openGraph: { title, description, type: 'article' },
  };
}

export default async function CompareRolePage({ params }) {
  const { role: roleSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  if (!role) notFound();

  const year = new Date().getFullYear();

  const rows = LOCATIONS
    .filter(loc => CITY_COSTS[loc.slug])
    .map(loc => {
      const { mid, entry, senior } = computeSalaries(role, loc);
      const tax = calcTakeHome(mid);
      const disposable = getDisposable(tax.netMonthly, loc.slug);
      const costs = CITY_COSTS[loc.slug];
      return { loc, gross: mid, entry, senior, net: tax.netAnnual, monthly: tax.netMonthly, effectiveRate: tax.effectiveRate, disposable: disposable?.disposable ?? 0, costs };
    })
    .sort((a, b) => b.disposable - a.disposable);

  const best = rows[0];
  const worst = rows[rows.length - 1];
  const londonRow = rows.find(r => r.loc.slug === 'london');

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Salary Guides', url: `${BASE_URL}/salary` },
    { name: `${role.title} by City`, url: `${BASE_URL}/compare/${role.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main className="min-h-screen bg-[#0a0a0b] text-white">
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <AdSlot slot="leaderboard" className="mb-2" />
        </div>

        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <nav className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/salary" className="hover:text-white/60 transition-colors">Salary Guides</Link>
            <ChevronRight size={10} />
            <span className="text-white/60">{role.title} by City</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-[#00d4ff15] border border-[#00d4ff25] text-[11px] font-semibold text-[#00d4ff] uppercase tracking-wider">{role.sector}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
            {role.title} Salary by City, UK ({year})<br />
            <span className="text-[#00d4ff]">Where Do You Actually Take Home the Most?</span>
          </h1>
          <p className="text-white/65 text-[15px] leading-relaxed max-w-2xl mb-6">
            London pays the highest gross salary for a {role.title} — but after income tax, National Insurance,
            and London&apos;s cost of living, you may take home <em>less</em> than in cities like {best.loc.name}.
            This table shows the real numbers.
          </p>

          {/* Key insight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="rounded-2xl border border-[#22c55e25] bg-[#22c55e08] p-4">
              <p className="text-xs text-[#22c55e]/70 font-semibold uppercase tracking-wider mb-1">Best City (Disposable)</p>
              <p className="text-xl font-extrabold text-[#22c55e]">{best.loc.name}</p>
              <p className="text-sm text-white/60 mt-1">{formatGBP(best.disposable)}/mo disposable</p>
              <p className="text-xs text-white/30 mt-0.5">{formatGBP(best.gross)} gross</p>
            </div>
            {londonRow && (
              <div className="rounded-2xl border border-[#00d4ff25] bg-[#00d4ff08] p-4">
                <p className="text-xs text-[#00d4ff]/70 font-semibold uppercase tracking-wider mb-1">London (Gross Leader)</p>
                <p className="text-xl font-extrabold text-[#00d4ff]">{formatGBP(londonRow.gross)}</p>
                <p className="text-sm text-white/60 mt-1">{formatGBP(londonRow.disposable)}/mo disposable</p>
                <p className="text-xs text-white/30 mt-0.5">Rank #{rows.findIndex(r => r.loc.slug === 'london') + 1} by take-home</p>
              </div>
            )}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Lowest Disposable</p>
              <p className="text-xl font-extrabold text-white/60">{worst.loc.name}</p>
              <p className="text-sm text-white/40 mt-1">{formatGBP(worst.disposable)}/mo disposable</p>
              <p className="text-xs text-white/25 mt-0.5">{formatGBP(worst.gross)} gross</p>
            </div>
          </div>
        </div>

        {/* Full comparison table */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">{role.title} Take-Home by City — Full Comparison</h2>
          <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    {['Rank', 'City', 'Gross Salary', 'Monthly Net', 'Tax Rate', 'Est. Costs/mo', 'Disposable/mo'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ loc, gross, monthly, effectiveRate, disposable, costs }, i) => (
                    <tr key={loc.slug} className={`border-b border-white/[0.04] ${i === 0 ? 'bg-[#22c55e06]' : i % 2 === 0 ? '' : 'bg-white/[0.01]'} hover:bg-white/[0.03] transition-colors`}>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold ${i === 0 ? 'text-[#22c55e]' : 'text-white/25'}`}>#{i + 1}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/salary/${role.slug}/${loc.slug}`} className="font-semibold text-white/85 hover:text-white transition-colors">
                          {loc.name}
                        </Link>
                        <p className="text-[10px] text-white/25">{loc.region}</p>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-xs">{formatGBP(gross)}</td>
                      <td className="px-4 py-3 font-semibold text-[#00d4ff]">{formatGBP(monthly)}</td>
                      <td className="px-4 py-3 text-white/40 text-xs">{effectiveRate}%</td>
                      <td className="px-4 py-3 text-white/40 text-xs">{formatGBP(costs?.total ?? 0)}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${i === 0 ? 'text-[#22c55e] text-base' : disposable > 500 ? 'text-white/70' : 'text-[#ef4444]'}`}>
                          {formatGBP(disposable)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[11px] text-white/25 mt-2">
            Take-home calculated using 2025/26 UK income tax and NI rates, 5% pension, Plan 2 student loan.
            Living costs: 1-bed rent + transport + groceries estimate.
          </p>
        </div>

        {/* Ad */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <AdSlot slot="in-article" />
        </div>

        {/* Insight copy */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold text-white mb-3">Why London Doesn&apos;t Always Win</h2>
            <p className="text-white/65 text-[15px] leading-relaxed mb-3">
              A {role.title} in London earns {formatGBP(londonRow?.gross ?? 0)} gross — significantly more than most UK cities.
              But after income tax, National Insurance, and a London rent averaging £2,100/month,
              a {role.title} in {best.loc.name} may have {formatGBP((best.disposable - (londonRow?.disposable ?? 0)))} more
              disposable income every month.
            </p>
            <p className="text-white/65 text-[15px] leading-relaxed">
              The concept of <strong className="text-white/85">geographic salary arbitrage</strong> — relocating to a lower-cost city
              while maintaining a competitive salary — has become increasingly viable with remote working.
              {role.sector === 'Technology' && ' Tech roles in particular are well-suited to remote arrangements, making city selection a genuine financial optimisation.'}
            </p>
          </div>
        </div>

        {/* Job board CTA */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <JobBoardCTA roleTitle={role.title} locationName="across the UK" />
        </div>

        {/* Individual city links */}
        <div className="max-w-4xl mx-auto px-4 mb-10">
          <h2 className="text-lg font-bold text-white mb-3">Detailed {role.title} Salary Guides by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {rows.map(({ loc }) => (
              <Link
                key={loc.slug}
                href={`/salary/${role.slug}/${loc.slug}`}
                className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-center"
              >
                <p className="text-sm font-semibold text-white/80">{loc.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 pb-8">
          <AdSlot slot="bottom" />
        </div>
      </main>
    </>
  );
}
