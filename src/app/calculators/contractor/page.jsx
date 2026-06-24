import ContractorCalc from '@/components/calculators/ContractorCalc';
import AdSlot from '@/components/content/AdSlot';
import { buildFAQSchema } from '@/lib/seo/schema';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukpaycheck.co.uk';

export const metadata = {
  title: 'Contractor vs Permanent Calculator UK (2025/26) — Outside & Inside IR35',
  description: 'Compare contractor take-home pay (outside IR35, umbrella) vs permanent salary. Uses 2025/26 UK tax rates including corporation tax, dividend tax, and NI.',
  alternates: { canonical: `${BASE_URL}/calculators/contractor` },
};

const FAQS = [
  { q: 'Is contracting outside IR35 always better than permanent?', a: 'Not always. Outside IR35 typically yields 15–25% more net income than an equivalent permanent salary, but you lose employment rights, sick pay, employer pension contributions, and job security. The break-even is usually around £350/day — below that, permanent employment is often better value.' },
  { q: 'What is the difference between outside IR35 and inside IR35?', a: 'Outside IR35 means HMRC considers your contract genuinely independent — you operate through a Ltd company and pay corporation tax plus dividend tax. Inside IR35 means the engagement resembles employment, so you pay full PAYE income tax and NI, typically via an umbrella company. Inside IR35 significantly reduces contractor take-home pay.' },
  { q: 'How many days should a UK contractor bill per year?', a: 'A typical UK contractor bills around 220–230 days per year, accounting for 25 days holiday, 8 bank holidays, and occasional sick days. Our calculator defaults to 227 billing days.' },
  { q: 'What overheads does a UK contractor Ltd company have?', a: 'Typical annual overheads include: accountant fees (£1,000–£2,000), professional indemnity insurance (£500–£1,500), public liability insurance (£200–£500), and software/tools. Our default of £3,000 covers a typical mid-range setup.' },
  { q: 'What is the optimal salary for a contractor Ltd company director?', a: 'For 2025/26, the optimal director salary is typically £12,570 (the personal allowance) to avoid income tax. Employer NI applies above £9,100, but the corporation tax saving on salary still makes this the most efficient approach for most contractors.' },
];

export default function ContractorCalculatorPage() {
  const faqSchema = buildFAQSchema(FAQS);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
            <span className="text-white/60">Contractor vs Permanent</span>
          </nav>

          <div className="mb-8">
            <span className="px-2.5 py-1 rounded-full bg-[#818cf815] border border-[#818cf825] text-[11px] font-semibold text-[#818cf8] uppercase tracking-wider">Calculator</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-2">
              Contractor vs Permanent Calculator UK
            </h1>
            <p className="text-white/55 text-[15px] max-w-2xl leading-relaxed">
              Compare take-home pay for outside IR35 (Ltd company), inside IR35 (umbrella), and permanent employment.
              Uses 2025/26 UK tax rates including corporation tax, dividend tax, income tax, and National Insurance.
            </p>
          </div>

          <ContractorCalc />

          <div className="mt-10">
            <AdSlot slot="in-article" />
          </div>

          {/* FAQ */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-white mb-4">Contractor vs Permanent — FAQ</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <p className="text-sm font-semibold text-white mb-2">{q}</p>
                  <p className="text-sm text-white/55 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="mt-10">
            <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/calculators/offer', label: 'Offer Comparison Calculator', desc: 'Compare two job offers including bonus, equity, and pension' },
                { href: '/salary/software-engineer/london', label: 'Software Engineer Salary London', desc: 'Market rates for the most common contracting role' },
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
    </>
  );
}
