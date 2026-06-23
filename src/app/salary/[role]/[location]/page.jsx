import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, TrendingUp, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { ROLES, getRoleBySlug, getRelatedRoles } from '@/data/roles';
import { LOCATIONS, getLocationBySlug, getNearbyLocations } from '@/data/locations';
import { PRIORITY_PAGES } from '@/data/priority-pages';
import { computeSalaries, formatGBP, generateArticleContent } from '@/lib/content-engine/salary';
import { calcTakeHome } from '@/lib/tax/uk-income-tax';
import { getDisposable } from '@/lib/tax/cost-of-living';
import { buildSalarySchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/seo/schema';
import SalaryRangeBar from '@/components/content/SalaryRangeBar';
import FAQSection from '@/components/content/FAQSection';
import JobBoardCTA from '@/components/content/JobBoardCTA';
import AdSlot from '@/components/content/AdSlot';
import TakeHomeCalculator from '@/components/content/TakeHomeCalculator';
import CityComparison from '@/components/content/CityComparison';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export async function generateStaticParams() {
  // Pre-build only the 30 priority pages. All others are served on-demand.
  return PRIORITY_PAGES;
}

// Allow non-pre-built pages to render on first request
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { role: roleSlug, location: locationSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  const location = getLocationBySlug(locationSlug);
  if (!role || !location) return {};

  const salaries = computeSalaries(role, location);
  const tax = calcTakeHome(salaries.mid);
  const year = new Date().getFullYear();
  const title = `${role.title} Salary in ${location.name} (${year}) — ${formatGBP(salaries.mid)} avg, ${formatGBP(tax.netMonthly)}/mo take-home`;
  const description = `Average ${role.title} salary in ${location.name} is ${formatGBP(salaries.mid)}/year in ${year}. Take-home pay is ${formatGBP(tax.netMonthly)}/month after UK income tax and NI. Full salary breakdown and career progression.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/salary/${roleSlug}/${locationSlug}` },
    openGraph: { title, description, type: 'article' },
  };
}

export default async function SalaryPage({ params }) {
  const { role: roleSlug, location: locationSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  const location = getLocationBySlug(locationSlug);
  if (!role || !location) notFound();

  const salaries = computeSalaries(role, location);
  const tax = calcTakeHome(salaries.mid);
  const disposable = getDisposable(tax.netMonthly, location.slug);
  const article = generateArticleContent(role, location, salaries);
  const related = getRelatedRoles(role, 5);
  const nearby = getNearbyLocations(location, 4);

  const salarySchema = buildSalarySchema({ role, location, ...salaries });
  const faqSchema = buildFAQSchema(article.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Salary Guides', url: `${BASE_URL}/salary` },
    { name: `${role.title} Salary`, url: `${BASE_URL}/compare/${role.slug}` },
    { name: location.name, url: `${BASE_URL}/salary/${role.slug}/${location.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(salarySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-[#0a0a0b] text-white">
        <div className="max-w-3xl mx-auto px-4 pt-4">
          <AdSlot slot="leaderboard" className="mb-2" />
        </div>

        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-4 pt-6">
          <nav className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/salary" className="hover:text-white/60 transition-colors">Salary Guides</Link>
            <ChevronRight size={10} />
            <Link href={`/compare/${role.slug}`} className="hover:text-white/60 transition-colors">{role.title} by city</Link>
            <ChevronRight size={10} />
            <span className="text-white/60">{location.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-[#00d4ff15] border border-[#00d4ff25] text-[11px] font-semibold text-[#00d4ff] uppercase tracking-wider">{role.sector}</span>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
              role.demand === 'high' ? 'bg-[#22c55e15] border border-[#22c55e25] text-[#22c55e]' : 'bg-white/[0.05] border border-white/[0.08] text-white/40'
            }`}>{role.demand} demand · {role.growth}/yr</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
            {role.title} Salary in {location.name}, UK ({article.currentYear})
          </h1>

          {/* Key stat row — gross + take-home side by side */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {[
              { label: 'Average Gross', value: formatGBP(salaries.mid), color: '#00d4ff', sub: 'per year' },
              { label: 'Monthly Take-Home', value: formatGBP(tax.netMonthly), color: '#22c55e', sub: 'after tax + NI' },
              { label: 'Entry Level', value: formatGBP(salaries.entry), color: '#ffffff60', sub: 'per year' },
              { label: 'Senior Level', value: formatGBP(salaries.senior), color: '#f59e0b', sub: 'per year' },
            ].map(({ label, value, color, sub }) => (
              <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
                <p className="text-[11px] text-white/40 mb-1 font-medium">{label}</p>
                <p className="text-lg font-extrabold leading-tight" style={{ color }}>{value}</p>
                <p className="text-[10px] text-white/25 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Take-home insight callout */}
          {disposable && (
            <div className="rounded-xl border border-[#22c55e20] bg-[#22c55e06] px-4 py-3 mb-4 flex items-start gap-3">
              <TrendingUp size={16} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/70 leading-relaxed">
                After income tax and National Insurance, a {role.title} in {location.name} takes home{' '}
                <strong className="text-[#22c55e]">{formatGBP(tax.netMonthly)}/month</strong>.
                After estimated living costs of {formatGBP(disposable.totalCosts)}/month,
                disposable income is approximately{' '}
                <strong className={disposable.disposable > 500 ? 'text-[#22c55e]' : 'text-[#f59e0b]'}>
                  {formatGBP(disposable.disposable)}/month
                </strong>.{' '}
                <Link href={`/compare/${role.slug}`} className="text-[#00d4ff] hover:underline">
                  See how {location.name} compares to other cities →
                </Link>
              </p>
            </div>
          )}

          <p className="text-white/65 leading-relaxed text-[15px]">{article.intro}</p>
        </div>

        <div className="max-w-3xl mx-auto px-4 my-6">
          <AdSlot slot="in-article" />
        </div>

        {/* Salary range visual */}
        <div className="max-w-3xl mx-auto px-4">
          <SalaryRangeBar entry={salaries.entry} mid={salaries.mid} senior={salaries.senior} lead={salaries.lead} />
        </div>

        {/* Interactive take-home calculator */}
        <div className="max-w-3xl mx-auto px-4">
          <TakeHomeCalculator defaultGross={salaries.mid} />
        </div>

        {/* Article sections */}
        <div className="max-w-3xl mx-auto px-4 mt-2">
          {article.sections.map((section, i) => (
            <section key={i} className="mt-8">
              <h2 className="text-xl font-bold text-white mb-3">{section.h2}</h2>
              <p className="text-white/65 leading-relaxed text-[15px]">{section.content}</p>

              {section.table && (
                <div className="mt-4 rounded-xl border border-white/[0.07] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Level</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Gross/Year</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Net/Month</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map(({ level, salary }, j) => {
                        const t = calcTakeHome(salary);
                        return (
                          <tr key={j} className={`border-b border-white/[0.04] ${j % 2 === 0 ? '' : 'bg-white/[0.015]'}`}>
                            <td className="px-4 py-3 text-white/80 font-medium">{level}</td>
                            <td className="px-4 py-3 text-right font-bold text-[#00d4ff]">{formatGBP(salary)}</td>
                            <td className="px-4 py-3 text-right font-semibold text-[#22c55e]">{formatGBP(t.netMonthly)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {section.bullets && (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00d4ff] flex-shrink-0" />
                      <span className="text-white/65 text-[15px] leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.progression && (
                <div className="mt-4 space-y-2">
                  {section.progression.map(({ stage, years, salary }, j) => {
                    const t = calcTakeHome(salary);
                    return (
                      <div key={j} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                        <div className="w-6 h-6 rounded-full bg-[#00d4ff15] border border-[#00d4ff25] flex items-center justify-center flex-shrink-0">
                          <TrendingUp size={12} className="text-[#00d4ff]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{stage}</p>
                          <p className="text-xs text-white/40">{years}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[#22c55e]">{formatGBP(salary)}</p>
                          <p className="text-xs text-white/30">{formatGBP(t.netMonthly)}/mo net</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {i === 2 && (
                <div className="mt-6">
                  <AdSlot slot="mid-content" />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* City comparison table */}
        <div className="max-w-3xl mx-auto px-4">
          <CityComparison role={role} currentLocationSlug={location.slug} />
        </div>

        {/* Job board CTA */}
        <div className="max-w-3xl mx-auto px-4 mt-8">
          <JobBoardCTA roleTitle={role.title} locationName={location.name} />
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4">
          <FAQSection faqs={article.faqs} />
        </div>

        {/* Related roles + nearby cities */}
        <div className="max-w-3xl mx-auto px-4 mt-10 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Briefcase size={13} /> Related Roles in {location.name}
              </h3>
              <div className="space-y-1.5">
                {related.map(r => (
                  <Link key={r.slug} href={`/salary/${r.slug}/${location.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">{r.title}</span>
                    <ChevronRight size={13} className="text-white/20" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin size={13} /> {role.title} in Other Cities
              </h3>
              <div className="space-y-1.5">
                {nearby.map(loc => (
                  <Link key={loc.slug} href={`/salary/${role.slug}/${loc.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">{role.title} in {loc.name}</span>
                    <ChevronRight size={13} className="text-white/20" />
                  </Link>
                ))}
                <Link href={`/compare/${role.slug}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#00d4ff20] bg-[#00d4ff06] hover:bg-[#00d4ff10] transition-colors group">
                  <span className="text-sm text-[#00d4ff] font-semibold">View all cities comparison</span>
                  <ArrowRight size={13} className="text-[#00d4ff]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 pb-8">
          <AdSlot slot="bottom" />
        </div>
      </main>
    </>
  );
}
