'use client'
import { useState } from 'react'
import { CheckCircle, ArrowRight, Calendar, Clock, Video } from 'lucide-react'

const challenges = [
  'I do not know my key numbers in real time',
  'My team wastes time on manual reporting',
  'I cannot trust the data I have',
  'I need to make faster decisions',
  'I want to automate repetitive processes',
  'I am planning to raise investment or sell',
  'My systems do not talk to each other',
  'I want to be ready for AI tools',
]

export default function BookPage() {
  const [selected, setSelected] = useState([])
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const toggle = (c) => setSelected(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-navy-950 min-h-screen pt-32 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">You are booked in!</h1>
          <p className="text-slate-400 mb-8">We will be in touch within 2 hours to confirm your audit call time. Check your inbox for a confirmation email.</p>
          <div className="p-6 rounded-xl bg-navy-900 border border-navy-800 text-left mb-6">
            <h3 className="font-semibold text-white mb-3">What happens next:</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />We review your submission</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />We email you to confirm a time (within 2 hours)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />30-minute video call — no pitch, just an honest audit</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />Written summary of findings within 24 hours</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-navy-950 pt-24">
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Book Your Free Audit</h1>
            <p className="text-xl text-slate-400">A 30-minute video call to assess your data setup and identify the biggest opportunities.</p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-400">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-400" />30 minutes</span>
              <span className="flex items-center gap-2"><Video className="w-4 h-4 text-brand-400" />Video call</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-400" />Within 48 hours</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
              <h2 className="font-semibold text-white mb-1">What are your biggest challenges?</h2>
              <p className="text-sm text-slate-400 mb-4">Select all that apply</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {challenges.map(c => (
                  <button type="button" key={c} onClick={() => toggle(c)} className={`p-3 rounded-lg border text-left text-sm transition-all ${selected.includes(c) ? 'border-brand-500 bg-brand-600/10 text-white' : 'border-navy-700 bg-navy-800/50 text-slate-400 hover:border-navy-600'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
              <h2 className="font-semibold text-white mb-4">Your details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { id: 'name', label: 'Full Name', placeholder: 'Jane Smith', type: 'text' },
                  { id: 'company', label: 'Company Name', placeholder: 'Acme Ltd', type: 'text' },
                  { id: 'email', label: 'Email Address', placeholder: 'jane@acme.co.uk', type: 'email' },
                  { id: 'phone', label: 'Phone (optional)', placeholder: '+44 7700 900123', type: 'tel' },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm text-slate-400 mb-1.5">{f.label}</label>
                    <input id={f.id} type={f.type} placeholder={f.placeholder} value={form[f.id]} onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm" required={f.id !== 'phone'} />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/25 flex items-center justify-center gap-2">
              Book Free Audit <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-slate-500">No spam, no pressure. Just a helpful 30-minute conversation.</p>
          </form>
        </div>
      </section>
    </div>
  )
}
