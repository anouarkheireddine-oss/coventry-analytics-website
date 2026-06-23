import Link from 'next/link';
import { TrendingUp, Globe, Zap, BarChart3, ArrowRight, CircleDot } from 'lucide-react';
import { ROLES } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';

export const metadata = {
  title: 'UKPayCheck — UK Salary Intelligence Network',
  description: 'Data-driven salary guides for every UK job role and city. Know your worth.',
};

const TOTAL_PAGES = ROLES.length * LOCATIONS.length;
const ESTIMATED_MONTHLY_SEARCHES = ROLES.reduce((sum, r) => {
  const dm = r.demand === 'high' ? 8500 : r.demand === 'medium' ? 4500 : 2000;
  return sum + dm;
}, 0);

function StatCard({ label, value, sub, color = '#00d4ff' }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2">{label}</p>
      <p className="text-3xl font-extrabold" style={{ color }}>{value}</p>
      {sub && <p className="text-xs text-white/30 mt-1">{sub}</p>}
    </div>
  );
}

export default function CommandCenter() {
  const sectors = [...new Set(ROLES.map(r => r.sector))];
  const sectorBreakdown = sectors.map(sector => {
    const sectorRoles = ROLES.filter(r => r.sector === sector);
    return {
      sector,
      roles: sectorRoles.length,
      avgSalary: Math.round(sectorRoles.reduce((s, r) => s + r.nationalAverage, 0) / sectorRoles.length),
      highDemand: sectorRoles.filter(r => r.demand === 'high').length,
    };
  });

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white px-4 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-xs text-[#22c55e] font-semibold uppercase tracking-widest">Network Live</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2">
          UK<span className="text-[#00d4ff]">Pay</span>Check
        </h1>
        <p className="text-white/40 text-[15px] max-w-lg">
          Autonomous salary intelligence network. {TOTAL_PAGES.toLocaleString()} data assets indexed
          across {ROLES.length} roles and {LOCATIONS.length} UK cities.
        </p>
      </div>

      {/* Network metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard
          label="Indexed Pages"
          value={TOTAL_PAGES.toLocaleString()}
          sub={`${ROLES.length} roles × ${LOCATIONS.length} cities`}
          color="#00d4ff"
        />
        <StatCard
          label="Est. Monthly Searches"
          value={`${(ESTIMATED_MONTHLY_SEARCHES / 1000).toFixed(0)}k`}
          sub="Aggregated keyword volume"
          color="#22c55e"
        />
        <StatCard
          label="High-Demand Roles"
          value={ROLES.filter(r => r.demand === 'high').length}
          sub="Premium RPM keyword clusters"
          color="#f59e0b"
        />
        <StatCard
          label="Sectors Covered"
          value={sectors.length}
          sub="Diversified asset classes"
          color="#a78bfa"
        />
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          { href: '/salary', label: 'Browse Salary Guides', icon: BarChart3, desc: `${TOTAL_PAGES.toLocaleString()} pages live` },
          { href: '/salary/software-engineer/london', label: 'Top Page: SWE London', icon: TrendingUp, desc: 'Highest estimated RPM' },
          { href: '/salary/nurse/manchester', label: 'Healthcare / Manchester', icon: Globe, desc: 'High-volume cluster' },
        ].map(({ href, label, icon: Icon, desc }) => (
          <Link key={href} href={href}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all p-5 cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#00d4ff10] border border-[#00d4ff20] flex items-center justify-center">
                  <Icon size={16} className="text-[#00d4ff]" />
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors mt-1" />
              </div>
              <p className="text-sm font-bold text-white mb-1">{label}</p>
              <p className="text-xs text-white/40">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Sector performance table */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BarChart3 size={13} /> Sector Asset Classes
        </h2>
        <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                {['Sector', 'Roles', 'Avg Salary', 'High Demand', 'Pages'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectorBreakdown.sort((a, b) => b.avgSalary - a.avgSalary).map(({ sector, roles, avgSalary, highDemand }, i) => (
                <tr key={sector} className={`border-b border-white/[0.04] ${i % 2 === 0 ? '' : 'bg-white/[0.01]'} hover:bg-white/[0.03] transition-colors`}>
                  <td className="px-4 py-3 font-semibold text-white/80">{sector}</td>
                  <td className="px-4 py-3 text-white/50">{roles}</td>
                  <td className="px-4 py-3 text-[#00d4ff] font-semibold">£{avgSalary.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {highDemand > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#22c55e15] text-[#22c55e] text-[10px] font-bold">{highDemand} high</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/40 font-mono text-xs">{(roles * LOCATIONS.length).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pipeline status */}
      <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Zap size={13} className="text-[#f59e0b]" /> Content Pipeline Status
        </h2>
        <div className="space-y-3">
          {[
            { label: 'Template engine', status: 'active', detail: 'Generating from role × location matrix' },
            { label: 'Claude API integration', status: 'pending', detail: 'Add ANTHROPIC_API_KEY env var to activate rich content' },
            { label: 'Google AdSense', status: 'pending', detail: 'Add NEXT_PUBLIC_ADSENSE_ID to activate ad units' },
            { label: 'Sitemap generation', status: 'active', detail: `Auto-generates ${TOTAL_PAGES.toLocaleString()} URLs` },
            { label: 'JSON-LD Schema (Salary + FAQ + Breadcrumb)', status: 'active', detail: 'Rich results eligible on all pages' },
            { label: 'Affiliate CTAs (Reed, Totaljobs, Indeed, LinkedIn)', status: 'active', detail: 'Sponsored job board links live' },
          ].map(({ label, status, detail }) => (
            <div key={label} className="flex items-center gap-3">
              <CircleDot size={14} className={status === 'active' ? 'text-[#22c55e]' : 'text-white/20'} />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-white/80">{label}</span>
                <span className="text-xs text-white/30 ml-2 hidden sm:inline">{detail}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
                status === 'active'
                  ? 'bg-[#22c55e15] text-[#22c55e]'
                  : 'bg-white/[0.05] text-white/30'
              }`}>{status}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
