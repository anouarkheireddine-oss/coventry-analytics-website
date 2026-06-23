import Link from 'next/link';
import { ROLES } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';

export const metadata = {
  title: 'UK Salary Guides 2024 — All Roles & Cities | UKPayCheck',
  description: 'Comprehensive salary data for 40+ UK job roles across 25 cities. Find out what you should be earning.',
};

const FEATURED_ROLES = ['software-engineer', 'data-scientist', 'nurse', 'teacher', 'accountant', 'product-manager'];
const FEATURED_LOCATIONS = ['london', 'manchester', 'birmingham', 'bristol', 'edinburgh', 'leeds'];

const SECTORS = [...new Set(ROLES.map(r => r.sector))].sort();

function fmt(n) {
  return `£${n.toLocaleString('en-GB')}`;
}

export default function SalaryHubPage() {
  const featured = ROLES.filter(r => FEATURED_ROLES.includes(r.slug));
  const topLocations = LOCATIONS.filter(l => FEATURED_LOCATIONS.includes(l.slug));

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white px-4 py-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="text-xs text-[#00d4ff] font-semibold uppercase tracking-widest mb-2">Salary Intelligence</p>
        <h1 className="text-3xl font-extrabold text-white mb-3">UK Salary Guides</h1>
        <p className="text-white/50 text-[15px] max-w-xl">
          Accurate, up-to-date salary data for {ROLES.length} UK job roles across {LOCATIONS.length} cities.
          Know your worth. Negotiate better.
        </p>
      </div>

      {/* Network stats */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { label: 'Salary Guides', value: (ROLES.length * LOCATIONS.length).toLocaleString() },
          { label: 'Job Roles', value: ROLES.length },
          { label: 'UK Cities', value: LOCATIONS.length },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
            <p className="text-2xl font-extrabold text-[#00d4ff]">{value}</p>
            <p className="text-xs text-white/40 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Featured roles */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-4">Most Searched Roles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featured.map(role => (
            <div key={role.slug} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/40 font-medium">{role.sector}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  role.demand === 'high' ? 'bg-[#22c55e15] text-[#22c55e]' : 'bg-white/[0.05] text-white/30'
                }`}>{role.demand}</span>
              </div>
              <p className="font-bold text-white mb-1">{role.title}</p>
              <p className="text-sm text-[#00d4ff] font-semibold mb-3">{fmt(role.nationalAverage)} avg</p>
              <div className="flex flex-wrap gap-1">
                {FEATURED_LOCATIONS.slice(0, 3).map(locSlug => {
                  const loc = LOCATIONS.find(l => l.slug === locSlug);
                  return (
                    <Link
                      key={locSlug}
                      href={`/salary/${role.slug}/${locSlug}`}
                      className="text-[11px] px-2 py-1 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white hover:bg-white/[0.05] transition-colors"
                    >
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
        <h2 className="text-lg font-bold text-white mb-4">Browse by Sector</h2>
        <div className="space-y-6">
          {SECTORS.map(sector => {
            const sectorRoles = ROLES.filter(r => r.sector === sector);
            return (
              <div key={sector}>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">{sector}</h3>
                <div className="flex flex-wrap gap-2">
                  {sectorRoles.map(role => (
                    <Link
                      key={role.slug}
                      href={`/salary/${role.slug}/london`}
                      className="text-sm px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors"
                    >
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
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Browse by City</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {LOCATIONS.map(loc => (
            <Link
              key={loc.slug}
              href={`/salary/software-engineer/${loc.slug}`}
              className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-center"
            >
              <p className="text-sm font-semibold text-white/80">{loc.name}</p>
              <p className="text-[11px] text-white/30 mt-0.5">{loc.region}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
