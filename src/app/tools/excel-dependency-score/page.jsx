import ExcelDependencyTool from './ExcelDependencyTool'
export const metadata = {
  title: 'Excel Dependency Score | Coventry Analytics',
  description: 'Discover your business risk from Excel dependency. Free 4-minute assessment showing where spreadsheets are putting your business at risk.',
}
export default function ExcelDependencyPage() {
  return (
    <main className="min-h-screen bg-navy-950 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-brand-400 bg-brand-600/10 border border-brand-600/20 px-3 py-1 rounded-full mb-4">Free Tool · 4 min</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Excel Dependency Score</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Find out how much risk your business carries from spreadsheet dependency — and get a plan to reduce it.</p>
        </div>
        <ExcelDependencyTool />
      </div>
    </main>
  )
}
