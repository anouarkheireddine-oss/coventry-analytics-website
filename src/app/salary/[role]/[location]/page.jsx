import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, TrendingUp, MapPin, Briefcase } from 'lucide-react';
import { ROLES, getRoleBySlug, getRelatedRoles } from '@/data/roles';
import { LOCATIONS, getLocationBySlug, getNearbyLocations } from '@/data/locations';
import { computeSalaries, formatGBP, generateArticleContent } from '@/lib/content-engine/salary';
import { buildSalarySchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/seo/schema';
import SalaryRangeBar from '@/components/content/SalaryRangeBar';
import FAQSection from '@/components/content/FAQSection';
import JobBoardCTA from '@/components/content/JobBoardCTA';
import AdSlot from '@/components/content/AdSlot';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export async function generateStaticParams() {
  const params = [];
  for (const role of ROLES) {
    for (const location of LOCATIONS) {
      params.push({ role: role.slug, location: location.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { role: roleSlug, location: locationSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  const location = getLocationBySlug(locationSlug);
  if (!role || !location) return {};

  const salaries = computeSalaries(role, location);
  const year = new Date().getFullYear();
  const title = `${role.title} Salary in ${location.name} (${year}) — ${formatGBP(salaries.entry)}–${formatGBP(salaries.senior)}`;
  const description = `Average ${role.title} salary in ${location.name} is ${formatGBP(salaries.mid)}/year in ${year}. See entry, mid and senior salary bands, career progression, and top-paying employers.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/salary/${roleSlug}/${locationSlug}` },
    openGraph: { title, description, type: 'article' },
    other: { 'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_ID || '' },
  };
}

export default async function SalaryPage({ params }) {
  const { role: roleSlug, location: locationSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  const location = getLocationBySlug(locationSlug);
  if (!role || !location) notFound();

  const salaries = computeSalaries(role, location);
  const article = generateArticleContent(role, location, salaries);
  const related = getRelatedRoles(role, 5);
  const nearby = getNearbyLocations(location, 4);

  const salarySchema = buildSalarySchema({ role, location, ...salaries });
  const faqSchema = buildFAQSchema(article.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Salary Guides', url: `${BASE_URL}/salary` },
    { name: `${role.title} Salary`, url: `${BASE_URL}/salary/${role.slug}` },
    { name: location.name, url: `${BASE_URL}/salary/${role.slug}/${location.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(salarySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-[#0a0a0b] text-white">
        {/* Top ad leaderboard */}
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
            <Link href={`/salary/${role.slug}`} className="hover:text-white/60 transition-colors">{role.title}</Link>
            <ChevronRight size={10} />
            <span className="text-white/60">{location.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-[#00d4ff15] border border-[#00d4ff25] text-[11px] font-semibold text-[#00d4ff] uppercase tracking-wider">
              {role.sector}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
              role.demand === 'high'
                ? 'bg-[#22c55e15] border border-[#22c55e25] text-[#22c55e]'
                : 'bg-white/[0.05] border border-white/[0.08] text-white/40'
            }`}>
              {role.demand} demand
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
            {role.title} Salary in {location.name}, UK ({article.currentYear})
          </h1>

          {/* Key stat row */}
          <div className="grid grid-cols-3 gap-3 my-6">
            {[
              { label: 'Average Salary', value: formatGBP(salaries.mid), color: '#00d4ff' },
              { label: 'Entry Level', value: formatGBP(salaries.entry), color: '#ffffff60' },
              { label: 'Senior Level', value: formatGBP(salaries.senior), color: '#22c55e' },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
                <p className="text-[11px] text-white/40 mb-1 font-medium">{label}</p>
                <p className="text-lg font-extrabold" style={{ color }}>{value}</p>
                <p className="text-[10px] text-white/25 mt-0.5">per year</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed text-[15px]">{article.intro}</p>
        </div>

        {/* Ad — in-article */}
        <div className="max-w-3xl mx-auto px-4 my-6">
          <AdSlot slot="in-article" />
        </div>

        {/* Salary range visual */}
        <div className="max-w-3xl mx-auto px-4">
          <SalaryRangeBar
            entry={salaries.entry}
            mid={salaries.mid}
            senior={salaries.senior}
            lead={salaries.lead}
          />
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
                        <th className="text-right px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Annual Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map(({ level, salary }, j) => (
                        <tr key={j} className={`border-b border-white/[0.04] ${j % 2 === 0 ? '' : 'bg-white/[0.015]'}`}>
                          <td className="px-4 py-3 text-white/80 font-medium">{level}</td>
                          <td className="px-4 py-3 text-right font-bold text-[#00d4ff]">{formatGBP(salary)}</td>
                        </tr>
                      ))}
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
                  {section.progression.map(({ stage, years, salary }, j) => (
                    <div key={j} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                      <div className="w-6 h-6 rounded-full bg-[#00d4ff15] border border-[#00d4ff25] flex items-center justify-center flex-shrink-0">
                        <TrendingUp size={12} className="text-[#00d4ff]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{stage}</p>
                        <p className="text-xs text-white/40">{years}</p>
                      </div>
                      <span className="text-sm font-bold text-[#22c55e]">{formatGBP(salary)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Mid-article ad after 3rd section */}
              {i === 2 && (
                <div className="mt-6">
                  <AdSlot slot="mid-content" />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Job board CTA */}
        <div className="max-w-3xl mx-auto px-4">
          <JobBoardCTA roleTitle={role.title} locationName={location.name} />
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4">
          <FAQSection faqs={article.faqs} />
        </div>

        {/* Related roles + nearby cities */}
        <div className="max-w-3xl mx-auto px-4 mt-10 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Related roles */}
            <div>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Briefcase size={13} /> Related Roles
              </h3>
              <div className="space-y-1.5">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/salary/${r.slug}/${location.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                  >
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">{r.title}</span>
                    <ChevronRight size={13} className="text-white/20" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Nearby cities */}
            <div>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin size={13} /> Other Cities
              </h3>
              <div className="space-y-1.5">
                {nearby.map(loc => (
                  <Link
                    key={loc.slug}
                    href={`/salary/${role.slug}/${loc.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                  >
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">{role.title} in {loc.name}</span>
                    <ChevronRight size={13} className="text-white/20" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ad */}
        <div className="max-w-3xl mx-auto px-4 pb-8">
          <AdSlot slot="bottom" />
        </div>
      </main>
    </>
  );
}
