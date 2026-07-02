import CostLeakTool from './CostLeakTool'
export const metadata = {
  title: 'Operational Cost Leak Calculator | Coventry Analytics',
  description: 'Find hidden operational waste in your business. Calculate your annual cost leak from manual work, process failures, and inventory waste.',
}
export default function CostLeakPage() {
  return (
    <main className="min-h-screen bg-navy-950 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-brand-400 bg-brand-600/10 border border-brand-600/20 px-3 py-1 rounded-full mb-4">Free Tool · 5 min</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Operational Cost Leak Calculator</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Quantify the hidden waste in your operations — manual work, process failures, and avoidable costs — in 5 minutes.</p>
        </div>
        <CostLeakTool />
      </div>
    </main>
  )
}
