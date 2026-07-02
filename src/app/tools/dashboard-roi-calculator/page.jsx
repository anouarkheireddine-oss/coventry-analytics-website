import DashboardROITool from './DashboardROITool'
export const metadata = {
  title: 'Dashboard ROI Calculator | Coventry Analytics',
  description: 'Calculate the ROI of investing in a live business dashboard. See your annual reporting waste and payback period in 3 minutes.',
}
export default function DashboardROIPage() {
  return (
    <main className="min-h-screen bg-navy-950 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-brand-400 bg-brand-600/10 border border-brand-600/20 px-3 py-1 rounded-full mb-4">Free Tool · 3 min</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Dashboard ROI Calculator</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Enter your current reporting situation to see exactly how much time and money a live dashboard would save your business.</p>
        </div>
        <DashboardROITool />
      </div>
    </main>
  )
}
