import Link from 'next/link'
import { CheckCircle, ArrowRight, Zap, Star } from 'lucide-react'

export const metadata = {
  title: 'Pricing',
  description: 'From free tools to full operational intelligence systems. Transparent pricing for UK SMEs.',
}

const plans = [
  {
    name: 'Free Strategy Session',
    price: '£0',
    period: '',
    tagline: 'Start here. No commitment.',
    description: 'A 30-minute video call to assess your current data setup and identify your top 3 opportunities. Honest advice, no sales pitch.',
    features: [
      '30-minute video call',
      'Current state assessment',
      'Top 3 opportunities identified',
      'Written summary within 24 hours',
      'No commitment, no pitch',
    ],
    cta: 'Book Free Session',
    href: '/book',
    highlighted: false,
    badge: null,
    tier: 1,
  },
  {
    name: 'Business Health Score Report',
    price: '£29',
    period: 'one-time',
    tagline: 'Know exactly where you stand.',
    description: 'A 12-page personalised report based on your Business Health Score results. Detailed analysis, industry benchmarks, and a prioritised 90-day action plan.',
    features: [
      '12-page personalised PDF report',
      'Score breakdown across 5 dimensions',
      'Industry benchmark comparison',
      'Prioritised 90-day action plan',
      'Top 10 specific recommendations',
      'Delivered within 24 hours',
    ],
    cta: 'Get My Report',
    href: '/tools/business-health-score',
    highlighted: false,
    badge: 'Best First Step',
    tier: 2,
  },
  {
    name: 'Quick-Win Workshop',
    price: '£499',
    period: 'one-time',
    tagline: 'Solve one specific problem in 2 hours.',
    description: 'A focused 2-hour online session where we diagnose one specific operational or data problem, identify the root cause, and map the fastest path to resolution.',
    features: [
      '2-hour video workshop (recorded)',
      'Pre-session data review',
      'Root cause analysis',
      'Written action plan delivered same day',
      'Follow-up Q&A (48hr window)',
      'Counts toward full system if you proceed',
    ],
    cta: 'Book Workshop',
    href: '/book?service=workshop',
    highlighted: false,
    badge: null,
    tier: 3,
  },
  {
    name: 'Operational Intelligence System',
    price: '£2,500',
    period: 'one-time',
    tagline: 'Full visibility. Live in 5 days.',
    description: 'A fully built operational control system, live in 5 working days. Single source of truth for your business, connected to your existing tools.',
    features: [
      'Full discovery & system design',
      'Live KPI dashboard (5–10 metrics)',
      'Data source integrations (up to 3)',
      'Automated reporting setup',
      'Team training & documentation',
      '30 days post-launch support',
      'Money-back guarantee if not on time',
    ],
    cta: 'Get Started',
    href: '/book?service=system',
    highlighted: true,
    badge: 'Most Popular',
    tier: 4,
  },
  {
    name: 'Monthly Intelligence',
    price: '£750',
    period: '/month',
    tagline: 'Ongoing data partnership.',
    description: 'Continuous operational intelligence. New dashboards, monthly strategy, ongoing data pipeline management. Your business, always improving.',
    features: [
      'Everything in Operational System',
      'Monthly strategy session (60 min)',
      'Dashboard updates & new metrics',
      'Ongoing data pipeline management',
      'Priority support (4hr response)',
      'Quarterly business review',
      'Cancel anytime',
    ],
    cta: 'Join Waitlist',
    href: '/contact?subject=Monthly Intelligence Waitlist',
    highlighted: false,
    badge: 'Coming Soon',
    tier: 5,
  },
]

const faqs = [
  {
    q: 'Where should I start?',
    a: "If you're not sure where your biggest gaps are, start with the free Business Health Score tool (8 minutes). The results will tell you exactly which tier makes the most sense for your situation.",
  },
  {
    q: 'Can I see the system before committing to £2,500?',
    a: "Yes — book a free strategy session and we'll demo anonymised existing client systems. You'll have a clear picture of what you'd get before making any decision.",
  },
  {
    q: "What if the system isn't delivered in 5 days?",
    a: "Full refund, no questions asked. We've never missed a deadline — but we back every project with this guarantee because we believe you shouldn't take any risk.",
  },
  {
    q: 'What data sources can you connect?',
    a: "Xero, QuickBooks, Shopify, WooCommerce, HubSpot, Salesforce, Google Analytics, Meta Ads, Google Ads, Airtable, and most systems with an API or CSV export. We'll tell you in the strategy session if yours is on the list.",
  },
  {
    q: 'Does the £499 workshop count toward the full system?',
    a: 'Yes. If you proceed to the Operational Intelligence System within 60 days of your workshop, the £499 is deducted from the £2,500 project fee.',
  },
]

export default function PricingPage() {
  return (
    <div className="bg-navy-950 pt-24">
      <section className="section-padding text-center">
        <div className="container-max">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Choose your starting point</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Every client starts somewhere different. Start where it makes sense for you — and move up when you're ready.
          </p>
        </div>
      </section>

      {/* Revenue ladder visual */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="container-max max-w-6xl">
          <div className="hidden lg:flex items-center justify-center gap-0 mb-8">
            {plans.map((plan, i) => (
              <div key={plan.name} className="flex items-center">
                <div className={`text-center px-4 py-2 rounded-lg text-xs font-medium ${plan.highlighted ? 'bg-brand-600 text-white' : 'bg-navy-800 text-slate-400'}`}>
                  <div className="text-[10px] text-slate-500 mb-0.5">Tier {plan.tier}</div>
                  {plan.price}
                </div>
                {i < plans.length - 1 && <div className="w-8 h-px bg-navy-700 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
            {plans.map(plan => (
              <div key={plan.name} className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.highlighted
                  ? 'border-brand-500 bg-gradient-to-b from-brand-600/10 to-navy-900 shadow-2xl shadow-brand-500/20 lg:scale-105'
                  : 'border-navy-800 bg-navy-900'
              }`}>
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    plan.highlighted ? 'bg-brand-600 text-white' : plan.badge === 'Best First Step' ? 'bg-green-600 text-white' : 'bg-navy-700 text-slate-300'
                  }`}>
                    {plan.badge}
                  </div>
                )}
                <div className="mb-5">
                  <div className="text-xs text-slate-500 font-medium mb-1">Tier {plan.tier}</div>
                  <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-400 text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-brand-400 text-xs font-medium mb-2">{plan.tagline}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{plan.description}</p>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.highlighted ? 'text-brand-400' : 'text-slate-500'}`} />
                      <span className="text-xs text-slate-300 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-brand-600 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-500/25'
                    : 'bg-navy-800 hover:bg-navy-700 text-white border border-navy-700'
                }`}>
                  {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-8 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-brand-400" />
            All prices exclude VAT · UK businesses only · No hidden fees
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-navy-900/30">
        <div className="container-max max-w-3xl">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="p-6 rounded-xl bg-navy-900 border border-navy-800">
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not sure CTA */}
      <section className="section-padding">
        <div className="container-max text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Not sure where to start?</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">Take the free Business Health Score. 8 minutes. The results will tell you exactly which tier makes sense.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tools/business-health-score" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-800 border border-navy-700 text-white font-medium hover:bg-navy-700 transition-all">
              Take the Free Health Score
            </Link>
            <Link href="/book" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all">
              Book Free Strategy Call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
