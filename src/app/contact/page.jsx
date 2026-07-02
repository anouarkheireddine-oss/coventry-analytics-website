'use client'
import { useState } from 'react'
import { CheckCircle, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch (err) {
      console.error('Contact error:', err)
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="bg-navy-950 min-h-screen pt-32 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Message sent!</h1>
          <p className="text-slate-400">We will get back to you within one working day.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-navy-950 pt-24">
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Get in touch</h1>
            <p className="text-xl text-slate-400">We respond to all enquiries within one working day.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-600/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <p className="text-slate-400 text-sm">info.coventryanalytics@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-600/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Location</h3>
                  <p className="text-slate-400 text-sm">Coventry, West Midlands, UK<br />Remote-first. UK-wide.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
              {[
                { id: 'name', label: 'Name', placeholder: 'Jane Smith', type: 'text' },
                { id: 'email', label: 'Email', placeholder: 'jane@company.co.uk', type: 'email' },
                { id: 'subject', label: 'Subject', placeholder: 'How can we help?', type: 'text' },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-sm text-slate-400 mb-1.5">{f.label}</label>
                  <input id={f.id} type={f.type} placeholder={f.placeholder} value={form[f.id]}
                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))} required
                    className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm" />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-sm text-slate-400 mb-1.5">Message</label>
                <textarea id="message" rows={5} placeholder="Tell us about your business and what you are trying to achieve..."
                  value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required
                  className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? 'Sending...' : <><span>Send Message</span> <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
