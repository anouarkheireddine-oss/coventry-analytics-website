import Link from 'next/link'
import { BarChart3, TrendingUp, TrendingDown, Settings, Cpu, Target, Calculator, Database, ArrowRight, Clock, Lock, Brain, Table } from 'lucide-react'
import { TOOLS } from '@/lib/tools'

export const metadata = { title: 'Free Tools', description: 'Free business analytics tools for UK SMEs.' }

const iconMap = { BarChart3, TrendingUp, TrendingDown, Settings, Cpu, Target, Calculator, Database, Brain, Table }

export default function ToolsPage() {
  return (
    <div className="bg-navy-950 pt-24">
      <section className="section-padding text-center">
        <div className="container-max">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/20 border border-brand-600/30 text-brand-400 text-sm font-medium mb-4">
            All free, no account required
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Free Business Intelligence Tools</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Practical tools to help UK SMEs understand, measure, and improve their operations.</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="container-max grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map(tool => {
            const Icon = iconMap[tool.icon] || BarChart3
            const isLive = tool.status === 'live'
            return (
              <div key={tool.id} className={`p-6 rounded-xl border flex flex-col ${isLive ? 'bg-navy-900 border-navy-800 card-hover' : 'bg-navy-900/50 border-navy-800 opacity-60'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${isLive ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-navy-800 text-slate-400 border border-navy-700'}`}>
                    {!isLive && <Lock className="w-3 h-3" />}
                    {tool.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{tool.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" /> {tool.time}
                  </span>
                  {isLive ? (
                    <Link href={tool.href} className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors">
                      Start Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <button disabled className="text-xs font-medium px-3 py-1.5 rounded-lg bg-navy-800 text-slate-500 border border-navy-700 cursor-not-allowed">Notify Me</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
