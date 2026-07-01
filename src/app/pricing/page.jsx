import Link from 'next/link'
import { CheckCircle, ArrowRight, Zap } from 'lucide-react'

export const metadata = { title: 'Pricing', description: 'Simple, transparent pricing for UK SMEs.' }

const plans = [
  {
    name: 'Free Audit',
    price: '£0',
    period: '',
    description: 'A no-cost, no-obligation 30-minute call to assess your current data setup and identify quick wins.',
    features: [
      '30-minute video call',
      'Current state assessment',
      'Top 3 opportunities identified',
      'Written summary report',
      'No strings attached',
    ],
    cta: 'Book Free Audit',
    href: '/book',
    highlighted: false,
    badge: null,
  },
  {
    name: '5-Day System',
    price: '£2,500',
    period: 'one-time',
    description: 'A fully built operational control system, live in 5 working days. The fastest route from data chaos to data clarity.',
    features: [
      'Full discovery and system design',
      'Live KPI dashboard (5-10 metrics)',
      'Data source integrations (up to 3)',
      'Automated reporting setup',
      'Team training and documentation',
      '30 days of post-launch support',
      'Money-back guarantee if not delivered on time',
    ],
    cta: 'Get Started',
    href: '/book',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Monthly Subscription',
    price: '£750',
    period: '/month',
    description: 'Ongoing analytics partnership. Continuous improvement, new dashboards, monthly reporting, and strategic data support.',
    features: [
      'Everything in 5-Day System',
      'Monthly strategy session',
      'Dashboard updates and new metrics',
      'Ongoing data pipeline management',
      'Priority support (4hr response)',
      'Quarterly business review',
    ],
    cta: 'Join Waitlist',
    href: '/contact',
    highlighted: false,
    badge: 'Coming Soon',
  },
]

export default function PricingPage() {
  return (
    <div className="bg-navy-950 pt-24">
      <section className="section-padding text-center">
        <div className="container-max">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">No hidden fees. No long contracts. Just results.</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map(plan => (
              <div key={plan.name} className={`relative rounded-2xl border p-8 flex flex-col ${plan.highlighted ? 'border-brand-500 bg-gradient-to-b from-brand-600/10 to-navy-900 shadow-2xl shadow-brand-500/20' : 'border-navy-800 bg-navy-900'}`}>
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${plan.highlighted ? 'bg-brand-600 text-white' : 'bg-navy-700 text-slate-300'}`}>
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-400">{plan.period}</span>}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-brand-400' : 'text-slate-500'}`} />
                      <span className="text-sm text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${plan.highlighted ? 'bg-brand-600 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-500/25' : 'bg-navy-800 hover:bg-navy-700 text-white border border-navy-700'}`}>
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
              <Zap className="w-4 h-4 text-brand-400" />
              All prices exclude VAT. UK businesses only.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
