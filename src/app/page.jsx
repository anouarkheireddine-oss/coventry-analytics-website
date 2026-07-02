import Link from 'next/link'
import { ArrowRight, BarChart3, Zap, Shield, TrendingUp, CheckCircle, Star, Clock, Users, PoundSterling, Target, Calculator, Brain } from 'lucide-react'

export const metadata = {
  title: 'Coventry Analytics | Business Intelligence for UK SMEs',
  description: 'Stop guessing. Start running your business with data. UK SMEs gain full visibility of their operations using analytics, AI, and automation — in days, not months.',
}

const stats = [
  { value: '5 Days', label: 'Delivery' },
  { value: '2.8 Days', label: 'Avg Decision Lag Eliminated' },
  { value: '94%', label: 'Client Retention' },
  { value: '£67k', label: 'Avg Annual Savings' },
]

const problems = [
  { title: "You're making this month's decisions with last month's data.", description: 'By the time your reports land, the moment has passed. Competitors with live data are already ahead.' },
  { title: 'Your team spends hours each week on reports that should take minutes.', description: 'Spreadsheets, copy-paste, manual reconciliation. Skilled people doing work that should be automated.' },
  { title: "You can't see which products, clients, or channels are actually profitable.", description: 'No margin-level visibility means you optimise the wrong things — and subsidise losses without knowing it.' },
  { title: "You know you need better data — but every solution sounds like a 6-month project.", description: 'Every vendor promises transformation. Few deliver practical, fast, affordable results for a business your size.' },
]

const toolPreviews = [
  { icon: BarChart3, name: 'Business Health Score', description: 'Score your business across 5 dimensions', time: '8 min', href: '/tools/business-health-score', live: true },
  { icon: Brain, name: 'AI Readiness Assessment', description: 'Find out if your business is ready for AI', time: '6 min', href: '/tools', live: false },
  { icon: Calculator, name: 'Dashboard ROI Calculator', description: 'Calculate the ROI of a live dashboard', time: '3 min', href: '/tools', live: false },
]

const testimonials = [
  { name: 'Sarah Mitchell', role: 'MD, Midlands Logistics Co.', quote: 'We had no idea two of our routes were loss-making. Within a week of going live, we had repriced them and saved the business.', stars: 5 },
  { name: 'James Patel', role: 'Founder, UK Ecommerce Brand', quote: 'Found £23k of wasted ad spend in month one. We hit our best-ever revenue month within 8 weeks of going live.', stars: 5 },
  { name: 'Claire Worthington', role: 'Managing Partner, Consulting Firm', quote: 'For the first time I know exactly how profitable each client and project is in real time.', stars: 5 },
]

const process = [
  { step: '01', title: 'Free Audit', description: 'We review your current data setup and identify the biggest gaps and opportunities.' },
  { step: '02', title: 'System Design', description: 'We map exactly what will be built, which data sources connect, and which KPIs to track.' },
  { step: '03', title: '5-Day Build', description: 'Your operational control system goes live on day 5. You review progress daily.' },
  { step: '04', title: 'Training & Handover', description: 'We train your team, document everything, and ensure you can run it independently.' },
]

export default function HomePage() {
  return (
    <div className="bg-navy-950">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-600/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/20 border border-brand-600/30 text-brand-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            UK Business Intelligence for SMEs
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
            Stop Guessing. Start Running Your Business With Data.
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We help UK SMEs gain full visibility of their operations using analytics, AI, and automation — in days, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5">
              Try Free Business Tools <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/book" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-lg transition-all border border-navy-700 hover:border-navy-600">
              Book Strategy Call
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-navy-800 bg-navy-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</div>
              <p className="text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Sound familiar?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Most UK SMEs are running on gut feel and stale spreadsheets. Here is what that actually costs you.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {problems.map(p => (
              <div key={p.title} className="p-6 rounded-xl bg-navy-900 border border-navy-800 hover:border-red-500/20 transition-all">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <span className="text-red-400 font-bold text-sm">✕</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools Preview */}
      <section className="section-padding bg-navy-900/30">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
              Free — no account required
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Start with a free tool</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Understand your business better in minutes. No pitch, no pressure.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {toolPreviews.map(({ icon: Icon, name, description, time, href, live }) => (
              <div key={name} className={`p-6 rounded-xl border flex flex-col ${live ? 'bg-navy-900 border-navy-800 card-hover' : 'bg-navy-900/50 border-navy-800'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${live ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-navy-800 text-slate-400 border border-navy-700'}`}>
                    {live ? 'Free' : 'Coming Soon'}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-2">{name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" /> {time}
                  </span>
                  {live ? (
                    <Link href={href} className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1">
                      Start Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-xs text-slate-500">Notify Me</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/tools" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors">
              View all free tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What our clients say</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="p-6 rounded-xl bg-navy-900 border border-navy-800">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-navy-900/30">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How it works</h2>
            <p className="text-slate-400 text-lg">From first conversation to live dashboard in 5 working days.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map(({ step, title, description }) => (
              <div key={step} className="relative">
                <div className="text-5xl font-bold text-navy-800 mb-4">{step}</div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="container-max">
          <div className="rounded-2xl bg-gradient-to-br from-brand-600/20 to-navy-800 border border-brand-600/30 p-10 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to see your business clearly?</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Book a free 30-minute strategy call. No pitch, no pressure. Just an honest conversation about what is possible.</p>
            <Link href="/book" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5">
              Book Strategy Call <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
