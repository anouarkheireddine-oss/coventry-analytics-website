'use client'
import { useState } from 'react'
import { X, ArrowRight, Mail } from 'lucide-react'

export default function EmailCaptureModal({ isOpen, onClose, onSubmit, source = 'modal' }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: connect to email provider (ConvertKit/Mailchimp)
    console.log({ email, source })
    await new Promise(r => setTimeout(r, 400))
    onSubmit(email)
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md bg-navy-900 border border-navy-800 rounded-2xl p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white transition-colors" aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-600/20 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Your results are ready!</h2>
          <p className="text-slate-400 text-sm">Enter your email to receive a full PDF report, or skip to see your score now.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mb-3">
          <input
            type="email"
            placeholder="your@email.co.uk"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send My Report & See Results'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors">
          Skip — just show me the score
        </button>
        <p className="text-center text-xs text-slate-600 mt-2">No spam. Unsubscribe any time.</p>
      </div>
    </div>
  )
}
