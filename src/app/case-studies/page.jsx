import Link from 'next/link'
import { ArrowRight, TrendingUp, Clock, PoundSterling } from 'lucide-react'

export const metadata = { title: 'Case Studies', description: 'Real results from real UK SMEs.' }

const caseStudies = [
  {
    id: 'midlands-logistics',
    industry: 'Logistics & Distribution',
    company: 'Midlands Logistics Co.',
    challenge: 'No visibility into cost-per-delivery or driver performance. Management was making pricing and route decisions based on gut feel and month-old data.',
    solution: 'Built a live operations dashboard pulling from their TMS, accounting software, and telematics. Created automated daily driver performance reports and real-time P&L by route.',
    timeline: '4 days',
    metrics: [
      { icon: PoundSterling, label: 'Annual savings identified', value: '£34k' },
      { icon: Clock, label: 'Hours saved per week', value: '12 hrs' },
      { icon: TrendingUp, label: 'Margin improvement', value: '+6.2%' },
    ],
    quote: 'We had no idea two of our routes were loss-making. Within a week of going live, we had repriced them and saved the business.',
    quoteAuthor: 'MD, Midlands Logistics Co.',
  },
  {
    id: 'dtc-ecommerce',
    industry: 'D2C Ecommerce',
    company: 'UK Ecommerce Brand',
    challenge: 'Marketing spend across 6 channels with no clear picture of what was actually driving revenue. ROAS was tracked but not profitability by channel or SKU.',
    solution: 'Integrated Shopify, Google Ads, Meta Ads, Klaviyo, and their 3PL into a single profit dashboard. Built SKU-level margin tracking and channel-level profitability.',
    timeline: '5 days',
    metrics: [
      { icon: PoundSterling, label: 'Wasted ad spend found', value: '£23k/yr' },
      { icon: TrendingUp, label: 'ROAS improvement', value: '+41%' },
      { icon: Clock, label: 'Reporting time saved', value: '8 hrs/wk' },
    ],
    quote: 'The system found £23k of wasted ad spend in our first month. We reallocated to what was working and hit our best-ever revenue month within 8 weeks.',
    quoteAuthor: 'Founder, DTC Ecommerce Brand',
  },
  {
    id: 'professional-services',
    industry: 'Professional Services',
    company: 'UK Consulting Firm',
    challenge: 'A 35-person consulting firm with no visibility into utilisation rates, project profitability, or pipeline health. Partners were spending 3–4 hours per week on manual reporting.',
    solution: 'Built a partner dashboard pulling from their PSA tool, CRM, and project management system. Automated weekly utilisation reports and created a live pipeline health score.',
    timeline: '5 days',
    metrics: [
      { icon: TrendingUp, label: 'Revenue per head increase', value: '+18%' },
      { icon: Clock, label: 'Partner time saved/week', value: '14 hrs' },
      { icon: PoundSterling, label: 'Annual value generated', value: '£89k' },
    ],
    quote: 'For the first time ever, I know exactly how profitable each client and each project is in real time. It has completely changed how we price and resource new work.',
    quoteAuthor: 'Managing Partner, Consulting Firm',
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="bg-navy-950 pt-24">
      <section className="section-padding text-center">
        <div className="container-max">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Real results from real businesses</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Every number is real. Every client is a UK SME who was flying blind and now runs on data.</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="container-max space-y-10">
          {caseStudies.map(cs => (
            <div key={cs.id} className="rounded-2xl bg-navy-900 border border-navy-800 overflow-hidden">
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-medium text-brand-400 bg-brand-600/10 border border-brand-600/20 px-3 py-1 rounded-full">{cs.industry}</span>
                </div>
                <div className="grid lg:grid-cols-2 gap-10">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">{cs.company}</h2>
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">The Challenge</h3>
                      <p className="text-slate-300 leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">The Solution</h3>
                      <p className="text-slate-300 leading-relaxed">{cs.solution}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4 text-brand-400" />
                      Delivered in {cs.timeline}
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {cs.metrics.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="p-4 rounded-xl bg-navy-800 border border-navy-700 text-center">
                          <Icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white mb-1">{value}</div>
                          <div className="text-xs text-slate-400">{label}</div>
                        </div>
                      ))}
                    </div>
                    <blockquote className="p-6 rounded-xl bg-navy-800/50 border border-navy-700 italic text-slate-300 text-sm leading-relaxed">
                      &ldquo;{cs.quote}&rdquo;
                      <footer className="mt-3 text-slate-500 not-italic text-xs">&mdash; {cs.quoteAuthor}</footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-navy-900/30">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Could your business be next?</h2>
          <p className="text-slate-400 mb-8">Book a free audit and find out what is possible in 5 days.</p>
          <Link href="/book" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all">
            Book Free Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
