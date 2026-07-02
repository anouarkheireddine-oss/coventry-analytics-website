'use client'
import { useState } from 'react'
import { X, ArrowRight, Mail, CheckCircle } from 'lucide-react'

export default function EmailCaptureModal({ isOpen, onClose, onSubmit, source = 'modal', score, maturityLevel }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, score, maturityLevel }),
      })
      if (res.ok) {
        setSent(true)
        setTimeout(() => {
          onSubmit(email)
          onClose()
        }, 1500)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md bg-navy-900 border border-navy-800 rounded-2xl p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white transition-colors" aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Report sent!</h2>
            <p className="text-slate-400 text-sm">Check your inbox — we've sent your results to {email}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-600/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-brand-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Your results are ready!</h2>
              <p className="text-slate-400 text-sm">Enter your email to receive your full report, or skip to see your score now.</p>
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
              {error && <p className="text-red-400 text-xs">{error}</p>}
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
          </>
        )}
      </div>
    </div>
  )
}
