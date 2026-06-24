import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, TrendingUp, MapPin, Briefcase } from 'lucide-react';
import { ROLES, getRoleBySlug, getRelatedRoles } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';
import { computeSalaries, formatGBP } from '@/lib/content-engine/salary';
import { calcTakeHome } from '@/lib/tax/uk-income-tax';
import { getDisposable } from '@/lib/tax/cost-of-living';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://salarystack.co.uk';

export async function generateStaticParams() {
  return ROLES.map(r => ({ role: r.slug }));
}

export async function generateMetadata({ params }) {
  const { role: roleSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  if (!role) return {};

  const london = LOCATIONS.find(l => l.slug === 'london');
  const salaries = computeSalaries(role, london);
  const tax = calcTakeHome(salaries.mid);

  return {
    title: `${role.title} Salary UK 2026 — All Cities, Take-Home & Career Guide`,
    description: `${role.title} salary guide for all UK cities. National average ${formatGBP(role.nationalAverage)}/year, ${formatGBP(tax.netMonthly)}/month take-home in London. Entry to lead progression, skills, and demand data.`,
    alternates: { canonical: `${BASE_URL}/salary/${roleSlug}` },
  };
}

const LEVEL_MULTIPLIERS = [
  { level: 'Entry', mult: 0.70, years: '0–2 years' },
  { level: 'Mid', mult: 1.00, years: '2–5 years' },
  { level: 'Senior', mult: 1.40, years: '5–9 years' },
  { level: 'Lead / Principal', mult: 1.75, years: '9+ years' },
];

export default async function RolePillarPage({ params }) {
  const { role: roleSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  if (!role) notFound();

  const related = getRelatedRoles(role, 4);
  const nationalTax = calcTakeHome(role.nationalAverage);

  // Compute all cities
  const cityData = LOCATIONS.map(loc => {
    const sal = computeSalaries(role, loc);
    const tax = calcTakeHome(sal.mid);
    const disp = getDisposable(tax.netMonthly, loc.slug);
    return { loc, sal, tax, disp };
  }).sort((a, b) => b.sal.mid - a.sal.mid);

  // Career progression using national average as base
  const progression = LEVEL_MULTIPLIERS.map(({ level, mult, years }) => {
    const salary = Math.round(role.nationalAverage * mult);
    const tax = calcTakeHome(salary);
    return { level, years, salary, netMonthly: tax.netMonthly };
  });

  // Best city for disposable income
  const bestDisp = [...cityData]
    .filter(d => d.disp)
    .sort((a, b) => b.disp.disposable - a.disp.disposable)[0];

  return (
    <main className="min-h-screen bg-[#f8f7f5] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-black/30 flex-wrap">
          <Link href="/" className="hover:text-black/60 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/salary" className="hover:text-black/60 transition-colors">Salary Guides</Link>
          <ChevronRight size={10} />
          <span className="text-black/60">{role.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full bg-[#818cf815] border border-[#818cf825] text-[11px] font-semibold text-[#818cf8] uppercase tracking-wider">{role.sector}</span>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
            role.demand === 'high' ? 'bg-[#05966915] border border-[#05966925] text-[#059669]' : 'bg-black/[0.04] border border-black/[0.08] text-black/40'
          }`}>{role.demand} demand · {role.growth}/yr</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-2">
          {role.title} Salary UK — All Cities 2026
        </h1>
        <p className="text-black/55 text-[15px] leading-relaxed mb-6 max-w-2xl">
          Salary data for {role.title}s across {LOCATIONS.length} UK cities. Every figure shows gross salary
          and monthly take-home after income tax and NI — because that's what you live on.
        </p>

        {/* National hero stat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="sm:col-span-1 rounded-2xl border border-[#05966925] bg-[#05966908] p-5">
            <p className="text-xs text-black/40 font-medium mb-1">National take-home (mid)</p>
            <p className="text-3xl font-extrabold text-[#059669]">{formatGBP(nationalTax.netMonthly)}<span className="text-sm font-semibold text-[#059669]/70">/mo</span></p>
            <p className="text-xs text-black/35 mt-1">on {formatGBP(role.nationalAverage)} gross · {nationalTax.effectiveRate}% effective rate</p>
          </div>
          <div className="rounded-xl border border-black/[0.07] bg-black/[0.025] p-5 flex flex-col justify-center">
            <p className="text-xs text-black/35 mb-1">National average gross</p>
            <p className="text-2xl font-extrabold text-[#818cf8]">{formatGBP(role.nationalAverage)}</p>
            <p className="text-xs text-black/25 mt-0.5">per year</p>
          </div>
          {bestDisp && (
            <div className="rounded-xl border border-black/[0.07] bg-black/[0.025] p-5 flex flex-col justify-center">
              <p className="text-xs text-black/35 mb-1">Best city for disposable income</p>
              <p className="text-xl font-extrabold text-[#d97706]">{bestDisp.loc.name}</p>
              <p className="text-xs text-black/35 mt-0.5">{formatGBP(bestDisp.disp.disposable)}/mo after living costs</p>
            </div>
          )}
        </div>

        {role.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="text-[10px] text-black/30 font-semibold uppercase tracking-wider self-center mr-1">Key skills:</span>
            {role.skills.map(s => (
              <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.07] text-black/50">{s}</span>
            ))}
          </div>
        )}
        <p className="text-[10px] text-black/30 mt-3">
          Modelled from ONS ASHE 2025 data · HMRC 2025/26 rates ·{' '}
          <Link href="/methodology" className="underline hover:text-black/50">How we calculate this</Link>
        </p>
      </div>

      {/* All cities table */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{role.title} Salary by City — All UK Cities</h2>
        <div className="rounded-xl border border-black/[0.07] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.07] bg-black/[0.025]">
                {['City', 'Region', 'Mid Gross', 'Take-Home /mo', 'Entry', 'Senior', 'Disposable /mo'].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-[10px] font-semibold text-black/35 uppercase tracking-wider hidden sm:table-cell first:table-cell">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cityData.map(({ loc, sal, tax, disp }, i) => (
                <tr key={loc.slug} className={`border-b border-black/[0.04] hover:bg-black/[0.02] transition-colors ${i % 2 === 1 ? 'bg-black/[0.01]' : ''}`}>
                  <td className="px-3 py-3">
                    <Link href={`/salary/${role.slug}/${loc.slug}`}
                      className="font-semibold text-gray-900 hover:text-[#818cf8] transition-colors">
                      {loc.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-black/40 text-xs hidden sm:table-cell">{loc.region}</td>
                  <td className="px-3 py-3 font-bold text-[#818cf8]">{formatGBP(sal.mid)}</td>
                  <td className="px-3 py-3 font-bold text-[#059669]">{formatGBP(tax.netMonthly)}</td>
                  <td className="px-3 py-3 text-black/50 hidden sm:table-cell">{formatGBP(sal.entry)}</td>
                  <td className="px-3 py-3 text-[#d97706] font-medium hidden sm:table-cell">{formatGBP(sal.senior)}</td>
                  <td className="px-3 py-3 hidden sm:table-cell">
                    {disp ? (
                      <span className={disp.disposable > 1000 ? 'text-[#059669] font-semibold' : 'text-black/45'}>
                        {formatGBP(disp.disposable)}
                      </span>
                    ) : (
                      <span className="text-black/20">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-black/25 mt-2">
          Disposable = monthly take-home minus estimated rent, transport, and groceries. Tap any city for the full breakdown.
        </p>
      </div>

      {/* Career progression */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{role.title} Career Progression & Salary</h2>
        <div className="space-y-2">
          {progression.map(({ level, years, salary, netMonthly }) => (
            <div key={level} className="flex items-center gap-4 p-4 rounded-xl border border-black/[0.06] bg-black/[0.02]">
              <div className="w-8 h-8 rounded-full bg-[#818cf815] border border-[#818cf825] flex items-center justify-center flex-shrink-0">
                <TrendingUp size={13} className="text-[#818cf8]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{level}</p>
                <p className="text-xs text-black/35">{years}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#818cf8]">{formatGBP(salary)}<span className="text-[10px] font-normal text-black/30">/yr</span></p>
                <p className="text-xs text-[#059669] font-semibold">{formatGBP(netMonthly)}<span className="text-[10px] font-normal text-black/30">/mo net</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City quick links */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h2 className="text-sm font-semibold text-black/40 uppercase tracking-wider mb-3 flex items-center gap-2">
          <MapPin size={13} /> All cities — {role.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {LOCATIONS.map(loc => (
            <Link key={loc.slug} href={`/salary/${role.slug}/${loc.slug}`}
              className="p-3 rounded-xl border border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.03] transition-colors text-center">
              <p className="text-sm font-semibold text-black/70">{loc.name}</p>
              <p className="text-[10px] text-black/30 mt-0.5">{loc.region}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Related roles */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-10 pb-10">
          <h2 className="text-sm font-semibold text-black/40 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Briefcase size={13} /> Related roles in {role.sector}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {related.map(r => (
              <Link key={r.slug} href={`/salary/${r.slug}`}
                className="p-4 rounded-xl border border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.03] transition-colors">
                <p className="text-sm font-semibold text-gray-900 mb-1">{r.title}</p>
                <p className="text-xs text-[#818cf8]">{formatGBP(r.nationalAverage)} national avg</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
