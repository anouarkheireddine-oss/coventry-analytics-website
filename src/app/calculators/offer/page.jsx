import OfferCompare from '@/components/calculators/OfferCompare';
import AdSlot from '@/components/content/AdSlot';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export const metadata = {
  title: 'Job Offer Comparison Calculator UK (2025/26) — Compare Total Compensation',
  description: 'Compare two UK job offers on total compensation: net salary, bonus, employer pension, equity, and remote working savings. Uses 2025/26 tax rates.',
  alternates: { canonical: `${BASE_URL}/calculators/offer` },
};

export default function OfferComparePage() {
  return (
    <main className="min-h-screen bg-[#09090f] text-white">
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <AdSlot slot="leaderboard" className="mb-2" />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-xs text-white/30 mb-6">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/calculators" className="hover:text-white/60 transition-colors">Calculators</Link>
          <span>›</span>
          <span className="text-white/60">Offer Comparison</span>
        </nav>

        <div className="mb-8">
          <span className="px-2.5 py-1 rounded-full bg-[#818cf820] border border-[#818cf830] text-[11px] font-semibold text-[#818cf8] uppercase tracking-wider">Calculator</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-2">
            Job Offer Comparison Calculator UK
          </h1>
          <p className="text-white/55 text-[15px] max-w-2xl leading-relaxed">
            Two offers look different on paper. This calculator shows you the real difference in total annual value —
            after income tax, NI, bonus, employer pension, equity, and remote working savings.
          </p>
        </div>

        <OfferCompare />

        <div className="mt-10">
          <AdSlot slot="in-article" />
        </div>

        <section className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
          <h2 className="text-lg font-bold text-white mb-3">How to Evaluate a UK Job Offer</h2>
          <div className="space-y-3">
            {[
              { title: "Don't compare gross salaries", body: "A £90k offer from Company A and an £80k offer from Company B are not £10k apart. After income tax and NI, the gap is closer to £5,500. Always compare net take-home." },
              { title: "Employer pension is real money", body: "A 10% employer pension contribution on an £80k salary is £8,000/year going into your retirement pot — often worth more than a higher salary in a company with 3% matching." },
              { title: "Bonus reliability matters", body: "An uncapped bonus target is not the same as a guaranteed bonus. This calculator applies a 40% tax estimate to bonus — but also consider whether the target is realistically achievable." },
              { title: "Equity has a liquidation question", body: "RSUs at a listed company are worth face value. RSUs at a pre-IPO startup have liquidity risk. Value them at a discount (50–70%) unless there&apos;s a clear exit horizon." },
              { title: "Remote saving is underrated", body: "A London commute at £250/month is £3,000/year net. A fully remote role effectively adds that back. This calculator adds £2,400 for remote roles as a conservative estimate." },
            ].map(({ title, body }) => (
              <div key={title} className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#818cf8] flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-sm text-white/50 leading-relaxed mt-0.5">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/calculators/contractor', label: 'Contractor vs Permanent', desc: 'Is £500/day contracting better than £80k permanent?' },
              { href: '/insights/london-tech-premium', label: 'Is London Still Worth It?', desc: 'The London premium in 2026 — real disposable income analysis' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <p className="text-sm font-semibold text-white mb-1">{label}</p>
                <p className="text-xs text-white/40">{desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <AdSlot slot="bottom" />
      </div>
    </main>
  );
}
