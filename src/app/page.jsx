import Link from 'next/link';
import { TrendingUp, Calculator, BarChart3, FileText, ArrowRight, Zap } from 'lucide-react';
import { ROLES, SECTORS } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';
import { PRIORITY_PAGES } from '@/data/priority-pages';

export const metadata = {
  title: 'SalaryStack — UK Tech & Analytics Career Intelligence',
  description: 'Salary guides, take-home calculators, and original analysis for UK tech, data, and analytics professionals. Not another generic salary site.',
};

const TOOLS = [
  {
    href: '/calculators/contractor',
    icon: Calculator,
    color: '#00d4ff',
    label: 'Contractor vs Permanent',
    desc: 'Is £500/day outside IR35 better than £80k permanent? Real numbers.',
    tag: 'Most used',
  },
  {
    href: '/calculators/offer',
    icon: BarChart3,
    color: '#a78bfa',
    label: 'Offer Comparison',
    desc: 'Compare two jobs on total compensation: salary, bonus, equity, pension.',
    tag: null,
  },
  {
    href: '/insights/london-tech-premium',
    icon: FileText,
    color: '#f59e0b',
    label: 'London Tech Premium 2026',
    desc: 'Is London still worth it after rent? We ran the numbers for 8 roles.',
    tag: 'Original analysis',
  },
  {
    href: '/salary/software-engineer/london',
    icon: TrendingUp,
    color: '#22c55e',
    label: 'UK Take-Home Calculator',
    desc: 'Any salary → net monthly pay after income tax, NI, pension, student loan.',
    tag: null,
  },
];

const FEATURED_SALARY_PAGES = [
  { role: 'software-engineer',         location: 'london',     label: 'Software Engineer · London'    },
  { role: 'data-scientist',            location: 'london',     label: 'Data Scientist · London'       },
  { role: 'machine-learning-engineer', location: 'london',     label: 'ML Engineer · London'          },
  { role: 'product-manager',           location: 'london',     label: 'Product Manager · London'      },
  { role: 'data-analyst',              location: 'manchester', label: 'Data Analyst · Manchester'     },
  { role: 'investment-banker',         location: 'london',     label: 'Investment Banker · London'    },
];

export default function HomePage() {
  const totalPages = ROLES.length * LOCATIONS.length;

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-14 pb-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-xs text-[#22c55e] font-semibold uppercase tracking-widest">UK Career Intelligence · {new Date().getFullYear()}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
          Know what you<br />
          <span className="text-[#00d4ff]">actually take home.</span>
        </h1>
        <p className="text-white/50 text-[16px] max-w-xl leading-relaxed mb-8">
          Salary data, take-home calculators, and original analysis for UK tech, data, and analytics careers.
          We show you gross <em>and</em> net — because gross is what they offer. Net is what you live on.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/contractor"
            className="px-5 py-2.5 rounded-xl bg-[#00d4ff] text-[#0a0a0b] text-sm font-bold hover:opacity-90 transition-opacity">
            Contractor Calculator
          </Link>
          <Link href="/salary"
            className="px-5 py-2.5 rounded-xl border border-white/[0.12] text-sm font-semibold text-white/70 hover:text-white hover:border-white/25 transition-all">
            Salary Guides →
          </Link>
        </div>
      </section>

      {/* Tools grid */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <p className="text-xs text-white/30 font-semibold uppercase tracking-wider mb-4">Tools & Intelligence</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOOLS.map(({ href, icon: Icon, color, label, desc, tag }) => (
            <Link key={href} href={href}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all p-5 cursor-pointer group h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="flex items-center gap-2">
                    {tag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40 uppercase tracking-wider">{tag}</span>
                    )}
                    <ArrowRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors" />
                  </div>
                </div>
                <p className="text-sm font-bold text-white mb-1">{label}</p>
                <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured salary pages */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-white/30 font-semibold uppercase tracking-wider">Top Salary Guides</p>
          <Link href="/salary" className="text-xs text-[#00d4ff] hover:underline">View all {totalPages.toLocaleString()} →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {FEATURED_SALARY_PAGES.map(({ role, location, label }) => (
            <Link key={`${role}/${location}`} href={`/salary/${role}/${location}`}
              className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
              <span className="text-sm text-white/70 group-hover:text-white transition-colors">{label}</span>
              <ArrowRight size={12} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Sector quick-links */}
      <section className="max-w-4xl mx-auto px-4 pb-14">
        <p className="text-xs text-white/30 font-semibold uppercase tracking-wider mb-4">Browse by Sector</p>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map(sector => {
            const sectorRoles = ROLES.filter(r => r.sector === sector);
            const first = sectorRoles[0];
            return (
              <Link key={sector} href={`/salary/${first.slug}/london`}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/[0.07] bg-white/[0.02] text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">
                {sector} <span className="text-white/25">({sectorRoles.length})</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why SalaryStack */}
      <section className="border-t border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-xs text-white/30 font-semibold uppercase tracking-wider mb-6">Why SalaryStack</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Zap, color: '#00d4ff', title: 'Gross AND net', body: 'Every salary page shows take-home after income tax, NI, pension, and student loan. Competitors show gross. We show what lands in your account.' },
              { icon: BarChart3, color: '#22c55e', title: 'City-by-city disposable income', body: 'London pays more gross. It rarely wins on disposable income. Our compare pages show where your salary actually goes furthest.' },
              { icon: FileText, color: '#f59e0b', title: 'Original analysis, not scraped data', body: 'The London Tech Premium piece, the contractor model — our own calculations, not recycled Glassdoor numbers.' },
            ].map(({ icon: Icon, color, title, body }) => (
              <div key={title}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <p className="text-sm font-bold text-white mb-2">{title}</p>
                <p className="text-xs text-white/45 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
