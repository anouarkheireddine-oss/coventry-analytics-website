'use client'
import { useState } from 'react'
import { CheckCircle, ArrowRight, Clock, Shield, FileText } from 'lucide-react'

const challenges = [
  "I don't know my key numbers in real time",
  'My team wastes hours on manual reporting',
  "I can't trust the accuracy of my data",
  'I need to make faster decisions',
  'I want to automate repetitive processes',
  "I'm planning to raise investment or sell the business",
  "My systems don't talk to each other",
  'I want to be ready for AI tools',
]

const trustSignals = [
  { icon: Clock, title: '30-min call, no pitch', description: 'A genuine conversation about your data. We will not try to sell you anything on the call.' },
  { icon: FileText, title: 'Written summary within 24hrs', description: 'You get a written summary of findings and opportunities, whatever you decide to do next.' },
  { icon: Shield, title: '94% of clients proceed after the audit', description: 'Not because we push them to — because they see a clear, compelling business case.' },
]

export default function BookPage() {
  const [selected, setSelected] = useState([])
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const toggle = (c) => setSelected(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to CRM / email provider
    console.log({ ...form, challenges: selected, source: 'book-page' })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-navy-950 min-h-screen pt-32 px-4">
        <div className="max-w-lg mx-auto text-center" role="status">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Request received!</h1>
          <p className="text-slate-400 mb-8">We will be in touch within 2 hours to confirm your call time.</p>
          <div className="p-6 rounded-xl bg-navy-900 border border-navy-800 text-left">
            <h2 className="font-semibold text-white mb-3">What happens next:</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />We review your submission</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />We email you to confirm a time (within 2 hours)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />30-minute call — no pitch, just an honest audit</li>
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
        <div className="container-max max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Book a Free Strategy Call</h1>
            <p className="text-xl text-slate-400">A 30-minute call to understand your business and identify the biggest data opportunities.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
                  <h2 className="font-semibold text-white mb-1">What are your biggest challenges?</h2>
                  <p className="text-sm text-slate-400 mb-4">Select all that apply</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {challenges.map(c => (
                      <button type="button" key={c} onClick={() => toggle(c)}
                        className={`p-3 rounded-lg border text-left text-sm transition-all ${selected.includes(c) ? 'border-brand-500 bg-brand-600/10 text-white' : 'border-navy-700 bg-navy-800/50 text-slate-400 hover:border-navy-600'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
                  <h2 className="font-semibold text-white mb-4">Your details</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    {[
                      { id: 'name', label: 'Full Name *', placeholder: 'Jane Smith', type: 'text', required: true },
                      { id: 'company', label: 'Company Name *', placeholder: 'Acme Ltd', type: 'text', required: true },
                      { id: 'email', label: 'Email Address *', placeholder: 'jane@acme.co.uk', type: 'email', required: true },
                      { id: 'phone', label: 'Phone (optional)', placeholder: '+44 7700 900123', type: 'tel', required: false },
                    ].map(f => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block text-sm text-slate-400 mb-1.5">{f.label}</label>
                        <input id={f.id} type={f.type} placeholder={f.placeholder} value={form[f.id]}
                          onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                          required={f.required}
                          className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-slate-400 mb-1.5">Anything else you want us to know? (optional)</label>
                    <textarea id="message" rows={4} placeholder="Tell us about your business, your data challenges, or what you are hoping to achieve..."
                      value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm resize-none" />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/25 flex items-center justify-center gap-2">
                  Book Free Strategy Call <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-slate-500">No spam, no pressure. We will be in touch within 2 hours.</p>
              </form>
            </div>

            {/* Trust signals — desktop only */}
            <div className="hidden lg:flex flex-col gap-6">
              <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
                <h2 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Why book?</h2>
                <div className="space-y-6">
                  {trustSignals.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-brand-600/20 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-brand-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm mb-1">{title}</div>
                        <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
