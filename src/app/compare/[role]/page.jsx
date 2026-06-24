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

      <main className="min-h-screen bg-[#f8f7f5] text-gray-900">
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <AdSlot slot="leaderboard" className="mb-2" />
        </div>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <nav className="flex items-center gap-1.5 text-xs text-black/30 flex-wrap">
            <Link href="/" className="hover:text-black/60 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/salary" className="hover:text-black/60 transition-colors">Salary Guides</Link>
            <ChevronRight size={10} />
            <span className="text-black/60">{role.title} by City</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-[#818cf815] border border-[#818cf825] text-[11px] font-semibold text-[#818cf8] uppercase tracking-wider">{role.sector}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            {role.title} Salary by City, UK ({year})<br />
            <span className="text-[#818cf8]">Where Do You Actually Take Home the Most?</span>
          </h1>
          <p className="text-black/65 text-[15px] leading-relaxed max-w-2xl mb-6">
            London pays the highest gross salary for a {role.title} — but after income tax, National Insurance,
            and London&apos;s cost of living, you may take home <em>less</em> than in cities like {best.loc.name}.
            This table shows the real numbers.
          </p>

          {/* Key insight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="rounded-2xl border border-[#34d39925] bg-[#34d39908] p-4">
              <p className="text-xs text-[#34d399]/70 font-semibold uppercase tracking-wider mb-1">Best City (Disposable)</p>
              <p className="text-xl font-extrabold text-[#34d399]">{best.loc.name}</p>
              <p className="text-sm text-black/60 mt-1">{formatGBP(best.disposable)}/mo disposable</p>
              <p className="text-xs text-black/30 mt-0.5">{formatGBP(best.gross)} gross</p>
            </div>
            {londonRow && (
              <div className="rounded-2xl border border-[#818cf825] bg-[#818cf808] p-4">
                <p className="text-xs text-[#818cf8]/70 font-semibold uppercase tracking-wider mb-1">London (Gross Leader)</p>
                <p className="text-xl font-extrabold text-[#818cf8]">{formatGBP(londonRow.gross)}</p>
                <p className="text-sm text-black/60 mt-1">{formatGBP(londonRow.disposable)}/mo disposable</p>
                <p className="text-xs text-black/30 mt-0.5">Rank #{rows.findIndex(r => r.loc.slug === 'london') + 1} by take-home</p>
              </div>
            )}
            <div className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-4">
              <p className="text-xs text-black/40 font-semibold uppercase tracking-wider mb-1">Lowest Disposable</p>
              <p className="text-xl font-extrabold text-black/60">{worst.loc.name}</p>
              <p className="text-sm text-black/40 mt-1">{formatGBP(worst.disposable)}/mo disposable</p>
              <p className="text-xs text-black/25 mt-0.5">{formatGBP(worst.gross)} gross</p>
            </div>
          </div>
        </div>

        {/* Full comparison table */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">{role.title} Take-Home by City — Full Comparison</h2>
          <div className="rounded-2xl border border-black/[0.07] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/[0.07] bg-black/[0.025]">
                    {['Rank', 'City', 'Gross Salary', 'Monthly Net', 'Tax Rate', 'Est. Costs/mo', 'Disposable/mo'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-black/30 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ loc, gross, monthly, effectiveRate, disposable, costs }, i) => (
                    <tr key={loc.slug} className={`border-b border-black/[0.04] ${i === 0 ? 'bg-[#34d39906]' : i % 2 === 0 ? '' : 'bg-black/[0.015]'} hover:bg-black/[0.025] transition-colors`}>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold ${i === 0 ? 'text-[#34d399]' : 'text-black/25'}`}>#{i + 1}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/salary/${role.slug}/${loc.slug}`} className="font-semibold text-gray-900/85 hover:text-gray-900 transition-colors">
                          {loc.name}
                        </Link>
                        <p className="text-[10px] text-black/25">{loc.region}</p>
                      </td>
                      <td className="px-4 py-3 text-black/60 text-xs">{formatGBP(gross)}</td>
                      <td className="px-4 py-3 font-semibold text-[#818cf8]">{formatGBP(monthly)}</td>
                      <td className="px-4 py-3 text-black/40 text-xs">{effectiveRate}%</td>
                      <td className="px-4 py-3 text-black/40 text-xs">{formatGBP(costs?.total ?? 0)}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${i === 0 ? 'text-[#34d399] text-base' : disposable > 500 ? 'text-black/70' : 'text-[#ef4444]'}`}>
                          {formatGBP(disposable)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[11px] text-black/25 mt-2">
            Take-home calculated using 2025/26 UK income tax and NI rates, 5% pension, Plan 2 student loan.
            Living costs: 1-bed rent + transport + groceries estimate.
          </p>
        </div>

        {/* Ad */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <AdSlot slot="in-article" />
        </div>

        {/* Insight copy */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Why London Doesn&apos;t Always Win</h2>
            <p className="text-black/65 text-[15px] leading-relaxed mb-3">
              A {role.title} in London earns {formatGBP(londonRow?.gross ?? 0)} gross — significantly more than most UK cities.
              But after income tax, National Insurance, and a London rent averaging £2,100/month,
              a {role.title} in {best.loc.name} may have {formatGBP((best.disposable - (londonRow?.disposable ?? 0)))} more
              disposable income every month.
            </p>
            <p className="text-black/65 text-[15px] leading-relaxed">
              The concept of <strong className="text-gray-900/85">geographic salary arbitrage</strong> — relocating to a lower-cost city
              while maintaining a competitive salary — has become increasingly viable with remote working.
              {role.sector === 'Technology' && ' Tech roles in particular are well-suited to remote arrangements, making city selection a genuine financial optimisation.'}
            </p>
          </div>
        </div>

        {/* Job board CTA */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <JobBoardCTA roleTitle={role.title} locationName="across the UK" />
        </div>

        {/* Individual city links */}
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Detailed {role.title} Salary Guides by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {rows.map(({ loc }) => (
              <Link
                key={loc.slug}
                href={`/salary/${role.slug}/${loc.slug}`}
                className="p-3 rounded-xl border border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.03] transition-colors text-center"
              >
                <p className="text-sm font-semibold text-black/80">{loc.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-8">
          <AdSlot slot="bottom" />
        </div>
      </main>
    </>
  );
}
