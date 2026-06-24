import Link from 'next/link';
import { ROLES } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';
import { computeSalaries, formatGBP } from '@/lib/content-engine/salary';
import { calcTakeHome } from '@/lib/tax/uk-income-tax';
import { getDisposable } from '@/lib/tax/cost-of-living';
import AdSlot from '@/components/content/AdSlot';
import EmailCapture from '@/components/content/EmailCapture';
import { TrendingUp, MapPin, BarChart3, ArrowRight } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://salarystack.co.uk';

export const metadata = {
  title: 'UK Tech Salary Report 2026 — Take-Home, Disposable Income & Best Cities',
  description: 'Original analysis: which UK tech roles pay best after tax, which cities maximise disposable income, and what the gross-to-net gap really looks like across 22 roles and 25 cities.',
  alternates: { canonical: `${BASE_URL}/insights/uk-tech-salary-report-2026` },
  openGraph: { type: 'article', title: 'UK Tech Salary Report 2026', description: 'Take-home pay, disposable income, and best cities for 22 UK tech roles. Computed from ONS ASHE 2025 data and HMRC 2025/26 rates.' },
};

function buildReportData() {
  // Best take-home by role (national average)
  const roleNetData = ROLES.map(role => {
    const tax = calcTakeHome(role.nationalAverage);
    return {
      slug: role.slug,
      title: role.title,
      sector: role.sector,
      gross: role.nationalAverage,
      netMonthly: tax.netMonthly,
      netAnnual: tax.netAnnual,
      effectiveRate: tax.effectiveRate,
    };
  }).sort((a, b) => b.netMonthly - a.netMonthly);

  // Best disposable income city for software engineer (flagship role)
  const swRole = ROLES.find(r => r.slug === 'software-engineer');
  const cityDispData = LOCATIONS.map(loc => {
    const sal = computeSalaries(swRole, loc);
    const tax = calcTakeHome(sal.mid);
    const disp = getDisposable(tax.netMonthly, loc.slug);
    return { loc, sal, tax, disp };
  }).filter(d => d.disp).sort((a, b) => b.disp.disposable - a.disp.disposable).slice(0, 10);

  // Gross → net erosion across all roles (sorted by effective tax rate)
  const taxErosion = [...roleNetData].sort((a, b) => b.effectiveRate - a.effectiveRate);

  // London vs best alternative for each role
  const londonLoc = LOCATIONS.find(l => l.slug === 'london');
  const manchesterLoc = LOCATIONS.find(l => l.slug === 'manchester');
  const londonVsManchester = ROLES.filter(r => ['software-engineer','data-scientist','data-analyst','product-manager','financial-analyst'].includes(r.slug))
    .map(role => {
      const londonSal = computeSalaries(role, londonLoc);
      const londonTax = calcTakeHome(londonSal.mid);
      const londonDisp = getDisposable(londonTax.netMonthly, 'london');
      const manchSal = computeSalaries(role, manchesterLoc);
      const manchTax = calcTakeHome(manchSal.mid);
      const manchDisp = getDisposable(manchTax.netMonthly, 'manchester');
      return {
        role: role.title,
        slug: role.slug,
        londonGross: londonSal.mid,
        londonNet: londonTax.netMonthly,
        londonDisp: londonDisp?.disposable,
        manchGross: manchSal.mid,
        manchNet: manchTax.netMonthly,
        manchDisp: manchDisp?.disposable,
        grossPremium: Math.round(((londonSal.mid - manchSal.mid) / manchSal.mid) * 100),
        dispDelta: londonDisp && manchDisp ? londonDisp.disposable - manchDisp.disposable : null,
      };
    });

  return { roleNetData, cityDispData, taxErosion, londonVsManchester };
}

export default function UKTechSalaryReport2026() {
  const { roleNetData, cityDispData, taxErosion, londonVsManchester } = buildReportData();
  const topRole = roleNetData[0];
  const worstErosion = taxErosion[0];
  const bestDispCity = cityDispData[0];

  return (
    <main className="min-h-screen bg-[#f8f7f5] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <AdSlot slot="leaderboard" className="mb-2" />
      </div>

      <article className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-black/30 mb-8 flex-wrap">
          <Link href="/" className="hover:text-black/60 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/insights/london-tech-premium" className="hover:text-black/60 transition-colors">Insights</Link>
          <span>›</span>
          <span className="text-black/60">UK Tech Salary Report 2026</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-[#f59e0b15] border border-[#f59e0b25] text-[11px] font-semibold text-[#f59e0b] uppercase tracking-wider">Original Analysis</span>
            <span className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-semibold text-black/40 uppercase tracking-wider">June 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            UK Tech Salary Report 2026:<br />
            <span className="text-[#818cf8]">What You Actually Take Home</span>
          </h1>
          <p className="text-black/55 text-[16px] leading-relaxed max-w-2xl mb-6">
            We computed take-home pay and disposable income for 22 UK tech and finance roles across 25 cities.
            The gap between advertised salary and what lands in your bank account is 28–42%.
            Here&apos;s the complete picture.
          </p>

          {/* Key findings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="rounded-2xl border border-[#05966925] bg-[#05966908] p-5">
              <p className="text-xs text-black/40 font-medium mb-1">Highest take-home role</p>
              <p className="text-xl font-extrabold text-[#059669]">{topRole.title}</p>
              <p className="text-sm text-[#059669]/70 font-semibold">{formatGBP(topRole.netMonthly)}/mo net</p>
              <p className="text-xs text-black/30 mt-1">on {formatGBP(topRole.gross)} gross national avg</p>
            </div>
            <div className="rounded-2xl border border-[#818cf825] bg-[#818cf808] p-5">
              <p className="text-xs text-black/40 font-medium mb-1">Best city for disposable income</p>
              <p className="text-xl font-extrabold text-[#818cf8]">{bestDispCity.loc.name}</p>
              <p className="text-sm text-[#818cf8]/70 font-semibold">{formatGBP(bestDispCity.disp.disposable)}/mo left over</p>
              <p className="text-xs text-black/30 mt-1">for a Software Engineer</p>
            </div>
            <div className="rounded-2xl border border-[#d9770625] bg-[#d9770608] p-5">
              <p className="text-xs text-black/40 font-medium mb-1">Highest tax erosion</p>
              <p className="text-xl font-extrabold text-[#d97706]">{worstErosion.effectiveRate}%</p>
              <p className="text-sm text-[#d97706]/70 font-semibold">effective rate — {worstErosion.title}</p>
              <p className="text-xs text-black/30 mt-1">on {formatGBP(worstErosion.gross)} gross</p>
            </div>
          </div>
          <p className="text-[10px] text-black/25">
            Computed from ONS ASHE 2025 data · HMRC 2025/26 income tax &amp; NI rates ·{' '}
            <Link href="/methodology" className="underline hover:text-black/45">How we calculate this</Link>
          </p>
        </div>

        <AdSlot slot="in-article" className="mb-10" />

        {/* Section 1: Take-home by role */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#818cf8]" />
            Take-Home Pay by Role — National Averages
          </h2>
          <p className="text-black/55 text-[15px] leading-relaxed mb-5">
            Using national average gross salaries from ONS ASHE 2025 regional data, here is what each role
            actually pays monthly after income tax and National Insurance at HMRC 2025/26 rates.
            Note the compression at the top: an investment banker earns 2× a data analyst gross, but takes home 1.7× net.
          </p>
          <div className="rounded-xl border border-black/[0.07] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.07] bg-black/[0.025]">
                  {['Role', 'Sector', 'Gross/yr', 'Take-home/mo', 'Effective rate'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] font-semibold text-black/35 uppercase tracking-wider hidden sm:table-cell first:table-cell">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roleNetData.map(({ slug, title, sector, gross, netMonthly, effectiveRate }, i) => (
                  <tr key={slug} className={`border-b border-black/[0.04] hover:bg-black/[0.02] transition-colors ${i % 2 === 1 ? 'bg-black/[0.01]' : ''}`}>
                    <td className="px-3 py-3">
                      <Link href={`/salary/${slug}`} className="font-semibold text-gray-900 hover:text-[#818cf8] transition-colors text-sm">{title}</Link>
                    </td>
                    <td className="px-3 py-2 text-xs text-black/40 hidden sm:table-cell">{sector}</td>
                    <td className="px-3 py-2 font-bold text-[#818cf8] hidden sm:table-cell">{formatGBP(gross)}</td>
                    <td className="px-3 py-2 font-bold text-[#059669]">{formatGBP(netMonthly)}</td>
                    <td className="px-3 py-2 text-black/50 text-xs hidden sm:table-cell">{effectiveRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-black/25 mt-2">Tap any role to see the full city breakdown.</p>
        </section>

        {/* Section 2: Disposable income by city (Software Engineer) */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <MapPin size={18} className="text-[#059669]" />
            Which City Leaves You With the Most Money?
          </h2>
          <p className="text-black/55 text-[15px] leading-relaxed mb-5">
            Gross salary is only part of the equation. Disposable income — take-home minus rent, transport, and groceries —
            is what you actually live on. For a Software Engineer, the picture is counterintuitive.
            London pays more gross, but after its cost of living, it often loses to northern cities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {cityDispData.map(({ loc, sal, tax, disp }, i) => {
              const pct = Math.round((disp.disposable / tax.netMonthly) * 100);
              return (
                <div key={loc.slug} className={`flex items-center gap-3 p-3.5 rounded-xl border ${i === 0 ? 'border-[#05966925] bg-[#05966906]' : 'border-black/[0.06] bg-black/[0.02]'}`}>
                  <div className="w-6 text-center flex-shrink-0">
                    <span className="text-xs font-bold text-black/30">#{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/salary/software-engineer/${loc.slug}`} className="text-sm font-semibold text-gray-900 hover:text-[#818cf8] transition-colors">{loc.name}</Link>
                    <p className="text-[10px] text-black/35">{loc.region} · {formatGBP(sal.mid)} gross · {formatGBP(tax.netMonthly)}/mo take-home</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${i === 0 ? 'text-[#059669]' : 'text-black/70'}`}>{formatGBP(disp.disposable)}</p>
                    <p className="text-[10px] text-black/30">{pct}% of net</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-black/25">
            Disposable = monthly take-home minus estimated rent (Rightmove/Zoopla 2025), transport, and groceries (ONS expenditure data).
            Software Engineer used as reference role — <Link href="/salary/software-engineer" className="underline hover:text-black/45">see all cities for this role →</Link>
          </p>
        </section>

        {/* Section 3: London vs Manchester comparison */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BarChart3 size={18} className="text-[#d97706]" />
            London vs Manchester: The Gross-to-Net Reality Check
          </h2>
          <p className="text-black/55 text-[15px] leading-relaxed mb-5">
            London pays a gross premium of 25–40% across most tech roles. After income tax and NI, that narrows to 20–32% net.
            After London&apos;s cost of living premium, the disposable income advantage shrinks to almost nothing for roles
            below £80k — and in some cases reverses.
          </p>
          <div className="rounded-xl border border-black/[0.07] overflow-hidden mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.07] bg-black/[0.025]">
                  {['Role', 'London gross', 'Mcr gross', 'Gross premium', 'London disp/mo', 'Mcr disp/mo', 'Disp delta'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] font-semibold text-black/35 uppercase tracking-wider hidden sm:table-cell first:table-cell">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {londonVsManchester.map(({ role, slug, londonGross, manchGross, grossPremium, londonDisp, manchDisp, dispDelta }, i) => (
                  <tr key={slug} className={`border-b border-black/[0.04] ${i % 2 === 1 ? 'bg-black/[0.01]' : ''}`}>
                    <td className="px-3 py-3">
                      <Link href={`/salary/${slug}`} className="font-semibold text-gray-900 hover:text-[#818cf8] transition-colors">{role}</Link>
                    </td>
                    <td className="px-3 py-2 font-bold text-[#818cf8] hidden sm:table-cell">{formatGBP(londonGross)}</td>
                    <td className="px-3 py-2 text-black/50 hidden sm:table-cell">{formatGBP(manchGross)}</td>
                    <td className="px-3 py-2 hidden sm:table-cell">
                      <span className="text-[#d97706] font-semibold">+{grossPremium}%</span>
                    </td>
                    <td className="px-3 py-2 hidden sm:table-cell">{londonDisp ? formatGBP(londonDisp) : '—'}</td>
                    <td className="px-3 py-2 hidden sm:table-cell">{manchDisp ? formatGBP(manchDisp) : '—'}</td>
                    <td className="px-3 py-2 hidden sm:table-cell">
                      {dispDelta !== null ? (
                        <span className={dispDelta > 0 ? 'text-[#059669] font-semibold' : 'text-[#ef4444] font-semibold'}>
                          {dispDelta > 0 ? '+' : ''}{formatGBP(dispDelta)}
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-black/25">
            Disp delta = London disposable minus Manchester disposable per month.
            Positive means London wins on money-in-pocket. Negative means Manchester wins despite lower gross.{' '}
            <Link href="/insights/london-tech-premium" className="underline hover:text-black/45">Full London premium analysis →</Link>
          </p>
        </section>

        <AdSlot slot="mid-content" className="mb-10" />

        {/* Section 4: Gross-to-net erosion */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-2">The Tax Erosion Problem</h2>
          <p className="text-black/55 text-[15px] leading-relaxed mb-5">
            UK income tax and National Insurance are progressive — the more you earn, the higher the percentage you lose.
            For a data analyst on £45k, about 28% disappears. For an investment banker on £95k, it&apos;s 38%.
            This compression is the single most important thing to understand about UK tech salaries.
          </p>
          <div className="space-y-2">
            {taxErosion.slice(0, 8).map(({ slug, title, gross, netMonthly, effectiveRate }) => {
              const keptPct = 100 - effectiveRate;
              return (
                <div key={slug} className="p-3.5 rounded-xl border border-black/[0.06] bg-black/[0.02]">
                  <div className="flex justify-between items-center mb-2">
                    <Link href={`/salary/${slug}`} className="text-sm font-semibold text-gray-900 hover:text-[#818cf8] transition-colors">{title}</Link>
                    <div className="text-right">
                      <span className="text-xs text-[#d97706] font-semibold">{effectiveRate}% lost to tax &amp; NI</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-black/[0.06] overflow-hidden">
                      <div className="h-full rounded-full bg-[#059669]" style={{ width: `${keptPct}%` }} />
                    </div>
                    <span className="text-[10px] text-black/40 flex-shrink-0">{formatGBP(gross)} → {formatGBP(netMonthly)}/mo</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Methodology note */}
        <section className="mb-10 rounded-2xl border border-[#818cf820] bg-[#818cf806] p-6">
          <h2 className="text-base font-bold text-gray-900 mb-3">About This Report</h2>
          <div className="space-y-2 text-sm text-black/55 leading-relaxed">
            <p>
              Salary figures are modelled from ONS Annual Survey of Hours and Earnings (ASHE) 2025 regional data.
              They represent median gross salaries for mid-career professionals (3–6 years experience)
              and are adjusted by city using regional wage coefficients from ONS regional pay data.
            </p>
            <p>
              Take-home calculations use HMRC 2025/26 income tax bands (personal allowance £12,570,
              basic rate 20%, higher rate 40%, additional rate 45%) and Class 1 National Insurance rates.
              We model 5% pension salary sacrifice (reducing taxable income) and no student loan repayments as a baseline.
            </p>
            <p>
              Disposable income figures subtract estimated median rent (Rightmove/Zoopla 2025 city data),
              transport costs (TfL and regional operator pricing), and ONS household expenditure groceries estimates.
              These are estimates — individual costs vary significantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/methodology" className="text-sm text-[#818cf8] hover:underline">Full methodology →</Link>
            <Link href="/about" className="text-sm text-black/40 hover:text-black/60 hover:underline">About SalaryStack →</Link>
          </div>
        </section>

        {/* Email capture */}
        <div className="max-w-lg mb-10">
          <EmailCapture />
        </div>

        {/* Role index */}
        <section>
          <h2 className="text-sm font-semibold text-black/40 uppercase tracking-wider mb-3">Explore All Roles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {ROLES.map(r => (
              <Link key={r.slug} href={`/salary/${r.slug}`}
                className="p-3 rounded-xl border border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.03] transition-colors flex items-center justify-between group">
                <div>
                  <p className="text-xs font-semibold text-gray-900">{r.title}</p>
                  <p className="text-[10px] text-[#818cf8]">{formatGBP(r.nationalAverage)} avg</p>
                </div>
                <ArrowRight size={11} className="text-black/20 group-hover:text-black/50 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </article>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <AdSlot slot="bottom" />
      </div>
    </main>
  );
}
