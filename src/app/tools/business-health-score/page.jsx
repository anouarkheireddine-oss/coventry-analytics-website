import { BarChart3 } from 'lucide-react'
import BusinessHealthScoreTool from './BusinessHealthScoreTool'

export const metadata = {
  title: 'Business Health Score | Free Tool',
  description: 'Get a comprehensive business health score across 5 dimensions in 8 minutes. Free, no account required.',
}

export default function BusinessHealthScorePage() {
  return (
    <div className="bg-navy-950 min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-brand-600/20 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-7 h-7 text-brand-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Business Health Score</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Answer 15 questions across 5 dimensions. Get a personalised score, benchmarks, and actionable recommendations. Takes about 8 minutes.</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-500">
            <span>✓ Free</span>
            <span>✓ No account required</span>
            <span>✓ Instant results</span>
          </div>
        </div>
        <BusinessHealthScoreTool />
      </div>
    </div>
  )
}
