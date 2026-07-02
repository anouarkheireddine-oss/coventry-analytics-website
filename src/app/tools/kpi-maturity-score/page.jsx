import KPIMaturityTool from './KPIMaturityTool'
export const metadata = {
  title: 'KPI Maturity Score | Coventry Analytics',
  description: 'Assess your KPI framework completeness. Free 6-minute tool to discover gaps in how you measure business performance.',
}
export default function KPIMaturityPage() {
  return (
    <main className="min-h-screen bg-navy-950 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-brand-400 bg-brand-600/10 border border-brand-600/20 px-3 py-1 rounded-full mb-4">Free Tool · 6 min</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">KPI Maturity Score</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Assess the completeness of your KPI framework and discover the gaps that are slowing your decision-making.</p>
        </div>
        <KPIMaturityTool />
      </div>
    </main>
  )
}
