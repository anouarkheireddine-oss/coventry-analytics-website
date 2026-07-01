import Link from 'next/link'
import { Download, Lock, FileText, BookOpen, BarChart2, Lightbulb } from 'lucide-react'

export const metadata = { title: 'Resources', description: 'Free guides and templates for UK SME owners.' }

const resources = [
  {
    icon: BarChart2,
    title: 'The SME KPI Framework',
    description: 'A ready-to-use KPI framework covering the 20 most important metrics for UK SMEs. Download, customise, and implement.',
    type: 'PDF Guide',
    pages: '18 pages',
    status: 'live',
  },
  {
    icon: FileText,
    title: 'The 5-Day Dashboard Blueprint',
    description: 'The exact process we use to build operational dashboards in 5 days. Includes templates, checklists, and tool recommendations.',
    type: 'PDF Blueprint',
    pages: '24 pages',
    status: 'live',
  },
  {
    icon: BookOpen,
    title: 'The SME Data Maturity Model',
    description: 'A comprehensive guide to the 5 stages of data maturity for SMEs, with a self-assessment and action plan for each stage.',
    type: 'PDF Guide',
    pages: '32 pages',
    status: 'comingSoon',
  },
  {
    icon: Lightbulb,
    title: 'AI for SMEs: Where to Start',
    description: 'A practical guide to AI adoption for UK SME owners. What to automate, what not to, and how to build the data foundation first.',
    type: 'PDF Guide',
    pages: '28 pages',
    status: 'comingSoon',
  },
]

export default function ResourcesPage() {
  return (
    <div className="bg-navy-950 pt-24">
      <section className="section-padding text-center">
        <div className="container-max">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Free Resources</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Practical guides and frameworks for UK SME owners who want to build better data habits.</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="container-max grid sm:grid-cols-2 gap-6">
          {resources.map(({ icon: Icon, title, description, type, pages, status }) => (
            <div key={title} className={`p-6 rounded-xl border flex flex-col ${status === 'comingSoon' ? 'bg-navy-900/50 border-navy-800 opacity-70' : 'bg-navy-900 border-navy-800 card-hover'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-600/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                {status === 'comingSoon' && (
                  <span className="text-xs font-medium text-slate-400 bg-navy-800 border border-navy-700 px-2 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Coming Soon
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{type}</span>
                  <span>&middot;</span>
                  <span>{pages}</span>
                </div>
                {status === 'live' ? (
                  <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors">
                    <Download className="w-4 h-4" /> Download Free
                  </a>
                ) : (
                  <span className="text-sm text-slate-500">Notify me</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
