import Link from 'next/link'
import { BarChart3, Zap, TrendingUp, Shield, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = { title: 'Solutions', description: 'Four outcome-focused solutions for UK SMEs who want to run on data.' }

const solutions = [
  {
    icon: BarChart3,
    title: 'Know Your KPIs In Real Time',
    subtitle: 'Live dashboards that show what matters, the moment it matters.',
    description: "Most SMEs are reviewing last month's data to make this month's decisions. We build live operational dashboards connected directly to your data sources — accounting software, CRMs, spreadsheets, databases — giving you a single screen of truth.",
    outcomes: ['Live P&L and cash position', 'Real-time operational KPIs', 'Automated daily/weekly reports', 'Mobile-accessible dashboards', 'Trend and anomaly alerts'],
    stat: '2.8 days avg decision lag eliminated',
  },
  {
    icon: Zap,
    title: 'Eliminate Manual Work',
    subtitle: 'Automate the reporting, data entry, and repetitive processes draining your team.',
    description: 'Manual data work is the silent tax on your business. We map your current manual processes, identify automation opportunities, and implement solutions that eliminate the copy-paste, the reconciliation, and the weekly reporting grind.',
    outcomes: ['Automated report generation', 'System integration (CRM, ERP, accounting)', 'Workflow automation', 'Data pipeline setup', 'Error elimination'],
    stat: '£12k-£25k/yr average savings',
  },
  {
    icon: TrendingUp,
    title: 'Make Better Decisions Faster',
    subtitle: 'Replace gut feel with data. Spot trends, catch problems early, act with confidence.',
    description: 'Having data is not enough — you need the right data, presented clearly, with context. We design decision-support systems that surface insights at the right time, flag issues before they become crises, and give your leadership team genuine analytical capability.',
    outcomes: ['KPI benchmarking vs industry', 'Predictive trend analysis', 'Alert systems for key thresholds', 'Decision frameworks and templates', 'Board-ready reporting packs'],
    stat: '94% of clients report faster decisions',
  },
  {
    icon: Shield,
    title: 'Build AI-Ready Infrastructure',
    subtitle: 'Future-proof your data stack so you can adopt AI tools when you are ready.',
    description: 'AI tools are only as good as the data they run on. We audit and restructure your data infrastructure to ensure it is clean, consistent, and AI-ready — so when you want to add AI capabilities, the foundation is already there.',
    outcomes: ['Data quality audit and cleanup', 'Centralised data warehouse', 'API integration strategy', 'Data governance documentation', 'AI tool readiness assessment'],
    stat: 'Ready for AI in 30-90 days',
  },
]

export default function SolutionsPage() {
  return (
    <div className="bg-navy-950 pt-24">
      <section className="section-padding text-center">
        <div className="container-max">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Four outcomes that change how you operate</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Every engagement is outcome-focused. We do not sell technology — we sell the result of having the right technology.</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="container-max space-y-8">
          {solutions.map(({ icon: Icon, title, subtitle, description, outcomes, stat }, i) => (
            <div key={title} className={`rounded-2xl border border-navy-800 overflow-hidden ${i % 2 === 0 ? 'bg-navy-900' : 'bg-navy-900/50'}`}>
              <div className="p-8 sm:p-10">
                <div className="flex flex-col lg:flex-row gap-10">
                  <div className="lg:w-1/2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-brand-400" />
                      </div>
                      <span className="text-xs font-medium text-brand-400 bg-brand-600/10 px-2 py-1 rounded-full">{stat}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{title}</h2>
                    <p className="text-brand-400 font-medium mb-4">{subtitle}</p>
                    <p className="text-slate-400 leading-relaxed">{description}</p>
                  </div>
                  <div className="lg:w-1/2">
                    <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">What you get</h3>
                    <ul className="space-y-3">
                      {outcomes.map(o => (
                        <li key={o} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />
                          <span className="text-sm">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-navy-900/30">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not sure which solution you need?</h2>
          <p className="text-slate-400 mb-8">Book a free audit call and we will tell you exactly what would deliver the most impact for your business.</p>
          <Link href="/book" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all">
            Book Free Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
