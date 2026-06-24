import Link from 'next/link';
import { ROLES, SECTORS } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://salarystack.co.uk';

export const metadata = {
  title: 'UK Tech & Analytics Salary Guides 2026 — All Roles & Cities',
  description: `Salary guides for ${ROLES.length} UK tech, data, and analytics roles across ${LOCATIONS.length} cities. Every page shows gross salary and monthly take-home after tax.`,
  alternates: { canonical: `${BASE_URL}/salary` },
};

const FEATURED_ROLES = ['software-engineer', 'data-scientist', 'machine-learning-engineer', 'product-manager', 'devops-engineer', 'data-engineer'];
const FEATURED_LOCATIONS = ['london', 'manchester', 'birmingham', 'bristol', 'edinburgh', 'leeds'];

function fmt(n) {
  return `£${n.toLocaleString('en-GB')}`;
}

export default function SalaryHubPage() {
  const featured = ROLES.filter(r => FEATURED_ROLES.includes(r.slug));
  const topLocations = LOCATIONS.filter(l => FEATURED_LOCATIONS.includes(l.slug));
  const totalPages = ROLES.length * LOCATIONS.length;

  return (
    <main className="min-h-screen bg-[#f8f7f5] text-gray-900 px-4 py-10 max-w-5xl mx-auto">

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-xs text-[#818cf8] font-semibold uppercase tracking-widest">Salary Intelligence · 2026</p>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.08] text-black/30 font-medium">HMRC 2025/26 rates</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">UK Salary Guides</h1>
        <p className="text-black/50 text-[15px] max-w-xl leading-relaxed">
          {ROLES.length} roles across {LOCATIONS.length} cities. Every guide shows gross salary <em>and</em> monthly
          take-home after income tax and NI — because the gross number is what they advertise, not what you live on.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { label: 'Salary guides', value: totalPages.toLocaleString() },
          { label: 'Tech & analytics roles', value: ROLES.length },
          { label: 'UK cities', value: LOCATIONS.length },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-black/[0.07] bg-black/[0.025] p-4 text-center">
            <p className="text-2xl font-extrabold text-[#818cf8]">{value}</p>
            <p className="text-xs text-black/35 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Featured roles */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Most Searched Roles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featured.map(role => (
            <div key={role.slug} className="rounded-xl border border-black/[0.07] bg-black/[0.025] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-black/35 font-medium">{role.sector}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  role.demand === 'high' ? 'bg-[#34d39915] text-[#34d399]' : 'bg-black/[0.04] text-black/30'
                }`}>{role.demand} demand</span>
              </div>
              <p className="font-bold text-gray-900 mb-1">{role.title}</p>
              <p className="text-sm text-[#818cf8] font-semibold mb-3">{fmt(role.nationalAverage)} national avg</p>
              <div className="flex flex-wrap gap-1.5">
                {FEATURED_LOCATIONS.slice(0, 3).map(locSlug => {
                  const loc = LOCATIONS.find(l => l.slug === locSlug);
                  return (
                    <Link key={locSlug} href={`/salary/${role.slug}/${locSlug}`}
                      className="text-[11px] px-2 py-1 rounded-lg border border-black/[0.06] bg-black/[0.02] text-black/50 hover:text-gray-900 hover:bg-black/[0.04] transition-colors">
                      {loc?.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* By sector */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Browse by Sector</h2>
        <div className="space-y-6">
          {SECTORS.map(sector => {
            const sectorRoles = ROLES.filter(r => r.sector === sector);
            return (
              <div key={sector}>
                <h3 className="text-xs font-semibold text-black/35 uppercase tracking-wider mb-2.5">{sector}</h3>
                <div className="flex flex-wrap gap-2">
                  {sectorRoles.map(role => (
                    <Link key={role.slug} href={`/salary/${role.slug}/london`}
                      className="text-sm px-3 py-1.5 rounded-lg border border-black/[0.07] bg-black/[0.02] text-black/60 hover:text-gray-900 hover:bg-black/[0.04] transition-colors">
                      {role.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* City grid */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Browse by City</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {LOCATIONS.map(loc => (
            <Link key={loc.slug} href={`/salary/software-engineer/${loc.slug}`}
              className="p-3 rounded-xl border border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.03] transition-colors text-center">
              <p className="text-sm font-semibold text-black/80">{loc.name}</p>
              <p className="text-[11px] text-black/30 mt-0.5">{loc.region}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-black/[0.06] bg-black/[0.015] px-4 py-3">
        <p className="text-xs text-black/30 leading-relaxed">
          Salary data modelled from ONS ASHE and industry surveys. Take-home calculated using HMRC 2025/26 income tax and NI rates.
          Figures are estimates — individual salaries vary by company, experience, and negotiation.{' '}
          <Link href="/methodology" className="text-black/45 hover:text-black/65 underline transition-colors">Methodology →</Link>
        </p>
      </div>
    </main>
  );
}
