import Link from 'next/link'
import { ArrowRight, BarChart3, Zap, Shield, TrendingUp, CheckCircle, Star, ChevronRight, Clock, Users, PoundSterling, Target } from 'lucide-react'

const stats = [
  { value: '5 Days', label: 'Average Delivery', icon: Clock },
  { value: '2.8 Days', label: 'Average Decision Lag Eliminated', icon: Zap },
  { value: '94%', label: 'Client Retention Rate', icon: Users },
  { value: '£67k', label: 'Average Annual Savings', icon: PoundSterling },
]

const problems = [
  { title: 'You are making decisions with stale data', description: 'By the time your reports are ready, the moment has passed. Competitors with live data are moving faster.' },
  { title: 'Your team wastes hours on manual reporting', description: 'Spreadsheets, copy-paste, manual reconciliation. Skilled people doing work that should be automated.' },
  { title: 'You cannot see which parts of the business are underperforming', description: 'No visibility means problems grow silently until they become expensive crises.' },
  { title: 'You know you need analytics but do not know where to start', description: 'Every vendor promises transformation. Few deliver practical, fast, affordable results.' },
]

const solutions = [
  { icon: BarChart3, title: 'Know Your KPIs in Real Time', description: 'Live dashboards built for your business in 5 days. See what matters, when it matters.' },
  { icon: Zap, title: 'Eliminate Manual Work', description: 'Automate your reporting, data flows, and repetitive processes. Free your team for high-value work.' },
  { icon: TrendingUp, title: 'Make Better Decisions Faster', description: 'Replace gut feel with data. Spot trends, catch problems early, and act with confidence.' },
  { icon: Shield, title: 'Build AI-Ready Infrastructure', description: 'Future-proof your data stack so you can adopt AI tools when you are ready.' },
]

const testimonials = [
  { name: 'Sarah Mitchell', role: 'MD, Midlands Logistics Co.', quote: 'We went from not knowing our cost-per-delivery to having a live dashboard in under a week. Game changing.', stars: 5 },
  { name: 'James Patel', role: 'Founder, DTC Ecommerce Brand', quote: 'Coventry Analytics found £23k of wasted ad spend in our first review. The system paid for itself in month one.', stars: 5 },
  { name: 'Claire Worthington', role: 'COO, Professional Services Firm', quote: 'Finally, a provider that speaks plain English and actually delivers. No jargon, no delays, real results.', stars: 5 },
]

const process = [
  { step: '01', title: 'Free 30-Min Audit', description: 'We review your current data setup and identify the biggest gaps and opportunities.' },
  { step: '02', title: 'System Design', description: 'We map out exactly what will be built, what data sources will be connected, and what KPIs will be tracked.' },
  { step: '03', title: '5-Day Build', description: 'Our team builds your operational control system. You review progress daily and it goes live on day 5.' },
  { step: '04', title: 'Training & Handover', description: 'We train your team, document everything, and ensure you are fully confident running your new system.' },
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
            UK Business Intelligence Consultancy
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Stop Flying Blind.{' '}
            <span className="bg-gradient-to-r from-brand-400 to-blue-300 bg-clip-text text-transparent">
              Start Running on Data.
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We build operational control systems and live KPI dashboards for UK SMEs in 5 days. Know your numbers. Make better decisions. Grow faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5">
              Book Free Audit <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/tools/business-health-score" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-lg transition-all border border-navy-700 hover:border-navy-600">
              Check Your Health Score <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-navy-800 bg-navy-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-brand-400" />
                <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
              </div>
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
              <div key={p.title} className="p-6 rounded-xl bg-navy-900 border border-navy-800 hover:border-brand-600/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <span className="text-red-400 text-lg">✕</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-navy-900/30">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What we do</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Four outcomes that transform how your business operates.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-xl bg-navy-900 border border-navy-800 card-hover">
                <div className="w-10 h-10 rounded-xl bg-brand-600/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/solutions" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors">
              View all solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools CTA */}
      <section className="section-padding">
        <div className="container-max">
          <div className="rounded-2xl bg-gradient-to-br from-brand-600/20 to-navy-800 border border-brand-600/30 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-brand-400 text-sm font-medium mb-2">Free Tool</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Check Your Business Health Score</h2>
              <p className="text-slate-400 max-w-lg">Answer 15 questions across 5 dimensions and get a personalised score, benchmarks, and top recommendations — free, in 8 minutes.</p>
            </div>
            <Link href="/tools/business-health-score" className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-brand-500/25">
              Start Free Assessment <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-navy-900/30">
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
      <section className="section-padding">
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
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to stop flying blind?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Book a free 30-minute audit call. No pitch, no pressure. Just an honest assessment of where your data is today and what is possible.</p>
          <Link href="/book" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5">
            Book Your Free Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
