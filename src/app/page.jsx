import Link from 'next/link';
import { TrendingUp, Calculator, BarChart3, FileText, ArrowRight, Zap } from 'lucide-react';
import { ROLES, SECTORS } from '@/data/roles';
import { LOCATIONS } from '@/data/locations';
import QuickCalc from '@/components/content/QuickCalc';

export const metadata = {
  title: 'SalaryStack — UK Tech & Analytics Career Intelligence',
  description: 'Salary guides, take-home calculators, and original analysis for UK tech, data, and analytics professionals. Every page shows gross and net — because gross is what they offer.',
};

const TOOLS = [
  {
    href: '/calculators/contractor',
    icon: Calculator,
    color: '#818cf8',
    label: 'Contractor vs Permanent',
    desc: 'Is £500/day outside IR35 better than £80k permanent? Real numbers, not guesses.',
    tag: 'Most used',
  },
  {
    href: '/calculators/offer',
    icon: BarChart3,
    color: '#818cf8',
    label: 'Offer Comparison',
    desc: 'Two offers look different on paper. This shows the real gap: salary, bonus, pension, equity.',
    tag: null,
  },
  {
    href: '/insights/london-tech-premium',
    icon: FileText,
    color: '#f59e0b',
    label: 'London Tech Premium 2026',
    desc: 'London pays 35% more gross. After rent, it often loses on disposable income. We ran the numbers.',
    tag: 'Original analysis',
  },
  {
    href: '/salary/software-engineer/london',
    icon: TrendingUp,
    color: '#34d399',
    label: 'Salary Guides',
    desc: `${ROLES.length} roles × ${LOCATIONS.length} cities. Every page shows gross and net monthly take-home.`,
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
    <main className="min-h-screen bg-[#f8f7f5] text-gray-900">

      {/* Hero + Quick Calc */}
      <section className="max-w-4xl mx-auto px-4 pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              <span className="text-xs text-[#34d399] font-semibold uppercase tracking-widest">UK Career Intelligence · {new Date().getFullYear()}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Know what you<br />
              <span className="text-[#818cf8]">actually take home.</span>
            </h1>
            <p className="text-black/50 text-[16px] max-w-xl leading-relaxed mb-6">
              Gross is what they advertise. Net is what lands in your account.
              We show you both — for {ROLES.length} tech and analytics roles across {LOCATIONS.length} UK cities.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/calculators/contractor"
                className="px-5 py-2.5 rounded-xl bg-[#818cf8] text-[#09090f] text-sm font-bold hover:opacity-90 transition-opacity">
                Contractor Calculator
              </Link>
              <Link href="/salary"
                className="px-5 py-2.5 rounded-xl border border-black/[0.10] text-sm font-semibold text-black/70 hover:text-gray-900 hover:border-white/25 transition-all">
                Salary Guides →
              </Link>
            </div>
          </div>
          <div className="lg:pt-2">
            <QuickCalc />
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <p className="text-xs text-black/25 font-semibold uppercase tracking-wider mb-4">Tools & Analysis</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOOLS.map(({ href, icon: Icon, color, label, desc, tag }) => (
            <Link key={href} href={href}>
              <div className="rounded-2xl border border-black/[0.07] bg-black/[0.02] hover:bg-black/[0.03] hover:border-black/[0.10] transition-all p-5 cursor-pointer group h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="flex items-center gap-2">
                    {tag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/[0.04] text-black/40 uppercase tracking-wider">{tag}</span>
                    )}
                    <ArrowRight size={13} className="text-black/20 group-hover:text-black/50 transition-colors" />
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900 mb-1">{label}</p>
                <p className="text-xs text-black/45 leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured salary pages */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-black/25 font-semibold uppercase tracking-wider">Top Salary Guides</p>
          <Link href="/salary" className="text-xs text-[#818cf8] hover:underline">View all {totalPages.toLocaleString()} →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {FEATURED_SALARY_PAGES.map(({ role, location, label }) => (
            <Link key={`${role}/${location}`} href={`/salary/${role}/${location}`}
              className="flex items-center justify-between p-3.5 rounded-xl border border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.03] transition-colors group">
              <span className="text-sm text-black/70 group-hover:text-gray-900 transition-colors">{label}</span>
              <ArrowRight size={12} className="text-black/20 group-hover:text-black/50 transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Sector quick-links */}
      <section className="max-w-4xl mx-auto px-4 pb-14">
        <p className="text-xs text-black/25 font-semibold uppercase tracking-wider mb-4">Browse by Sector</p>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map(sector => {
            const sectorRoles = ROLES.filter(r => r.sector === sector);
            const first = sectorRoles[0];
            return (
              <Link key={sector} href={`/salary/${first.slug}/london`}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-black/[0.07] bg-black/[0.02] text-black/50 hover:text-gray-900 hover:bg-black/[0.04] transition-all">
                {sector} <span className="text-black/25">({sectorRoles.length})</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* The honest section */}
      <section className="border-t border-black/[0.05] bg-black/[0.015]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-xs text-black/25 font-semibold uppercase tracking-wider mb-6">Why we built this</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                color: '#818cf8',
                title: 'Net pay, not gross',
                body: 'Every salary site shows gross. We show what actually lands in your account each month — after income tax, National Insurance, pension, and student loan. Those four deductions take 35–45% of a typical tech salary.',
              },
              {
                icon: BarChart3,
                color: '#34d399',
                title: 'London rarely wins on disposable income',
                body: "London pays tech workers 35% more gross. After £2,100/month rent, it loses on disposable income for most roles below £120k. Our compare pages show this city by city — not the conclusion most salary sites reach.",
              },
              {
                icon: FileText,
                color: '#f59e0b',
                title: 'Our own calculations',
                body: "The contractor model, the London premium analysis — we computed these from first principles using HMRC 2025/26 rates and ONS regional data. Not recycled Glassdoor numbers.",
              },
            ].map(({ icon: Icon, color, title, body }) => (
              <div key={title}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <p className="text-sm font-bold text-gray-900 mb-2">{title}</p>
                <p className="text-xs text-black/45 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-black/25 mt-8">
            HMRC 2025/26 rates · Updated June 2026 ·{' '}
            <Link href="/methodology" className="hover:text-black/45 transition-colors underline">How we calculate this</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
