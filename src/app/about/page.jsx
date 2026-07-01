import Link from 'next/link'
import { ArrowRight, Target, Users, Zap, Shield } from 'lucide-react'

export const metadata = { title: 'About', description: 'The team behind Coventry Analytics.' }

const values = [
  { icon: Target, title: 'Outcome-obsessed', description: 'We measure our success by your results, not by the sophistication of the technology we use.' },
  { icon: Zap, title: 'Speed matters', description: '5-day delivery is not a gimmick — it is how we stay focused on what matters most and avoid scope creep.' },
  { icon: Users, title: 'Jargon-free', description: 'We talk in outcomes: time saved, money found, decisions improved. Not in tech stacks and frameworks.' },
  { icon: Shield, title: 'Build to last', description: 'Every system we build, we document thoroughly and train your team to own. We aim to make ourselves unnecessary.' },
]

const stats = [
  { value: '40+', label: 'SMEs Served' },
  { value: '£2.4m', label: 'Savings Generated' },
  { value: '94%', label: 'Retention Rate' },
  { value: '5 Days', label: 'Average Delivery' },
]

export default function AboutPage() {
  return (
    <div className="bg-navy-950 pt-24">
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">We exist to fix the data gap for UK SMEs</h1>
            <p className="text-xl text-slate-400 leading-relaxed">Enterprise companies have entire data teams. SMEs have spreadsheets. We fix that — fast, affordably, and without the enterprise price tag.</p>
          </div>

          <div className="mb-16 space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">Coventry Analytics was founded by operators, not consultants. We have run businesses, built teams, and made decisions with bad data. We know exactly what it costs — not in theory, but in missed opportunities, wasted spend, and 11pm spreadsheet sessions.</p>
            <p className="text-slate-300 text-lg leading-relaxed">Our approach is deliberately different to traditional consultancies: fixed scope, fixed price, fixed timeline. We deliver a working system in 5 days or we do not charge. Then we get out of the way and let you run.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center p-6 rounded-xl bg-navy-900 border border-navy-800">
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-900/30">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-xl bg-navy-900 border border-navy-800">
                <div className="w-10 h-10 rounded-xl bg-brand-600/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Work with us</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">We work with a small number of SMEs at a time to ensure quality. If you are serious about data, we want to talk.</p>
          <Link href="/book" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all">
            Book Free Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
