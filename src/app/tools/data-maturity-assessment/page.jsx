import DataMaturityTool from './DataMaturityTool'
export const metadata = {
  title: 'Data Maturity Assessment | Coventry Analytics',
  description: 'Measure your data infrastructure maturity across 5 dimensions. Free 7-minute assessment with personalised recommendations.',
}
export default function DataMaturityPage() {
  return (
    <main className="min-h-screen bg-navy-950 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-brand-400 bg-brand-600/10 border border-brand-600/20 px-3 py-1 rounded-full mb-4">Free Tool · 7 min</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Data Maturity Assessment</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Find out exactly where your data infrastructure stands — and what to improve first to unlock better decisions.</p>
        </div>
        <DataMaturityTool />
      </div>
    </main>
  )
}
