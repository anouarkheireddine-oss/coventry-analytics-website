import { Brain } from 'lucide-react'
import AIReadinessTool from './AIReadinessTool'

export const metadata = {
  title: 'AI Readiness Assessment | Coventry Analytics',
  description: 'Find out if your business is ready for AI — and what to fix first. Free 6-minute assessment.',
}

export default function AIReadinessPage() {
  return (
    <div className="bg-navy-950 min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-brand-600/20 flex items-center justify-center mx-auto mb-4">
            <Brain className="w-7 h-7 text-brand-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">AI Readiness Assessment</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Discover where your business stands on the AI readiness spectrum — and get a prioritised action plan to close the gaps.</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-500">
            <span>✓ Free</span><span>✓ No account required</span><span>✓ Instant results</span>
          </div>
        </div>
        <AIReadinessTool />
      </div>
    </div>
  )
}
