'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import Link from 'next/link'
import { ArrowRight, Calculator, AlertTriangle, PoundSterling } from 'lucide-react'
import EmailCaptureModal from '@/components/ui/EmailCaptureModal'

function formatGBP(n) {
  if (n >= 1000000) return `£${(n / 1000000).toFixed(1)}m`
  if (n >= 1000) return `£${(n / 1000).toFixed(1)}k`
  return `£${Math.round(n)}`
}

const LEAK_CATEGORIES = [
  {
    id: 'manual',
    label: 'Manual & Duplicated Work',
    fields: [
      { id: 'manualEmployees', label: 'Employees doing manual data work', placeholder: 'e.g. 5', hint: 'People regularly doing manual data entry, copy-paste, reconciliation' },
      { id: 'manualHoursPerWeek', label: 'Hours per employee per week', placeholder: 'e.g. 6', hint: 'Time spent on purely manual tasks that could be automated' },
      { id: 'avgHourlyRate', label: 'Average hourly cost (£)', placeholder: 'e.g. 20', hint: 'Blended hourly cost including employer NI and benefits' },
    ],
  },
  {
    id: 'errors',
    label: 'Process Errors & Rework',
    fields: [
      { id: 'errorIncidentsPerMonth', label: 'Process errors or rework incidents per month', placeholder: 'e.g. 4', hint: 'Mistakes requiring correction, returned orders, rework jobs' },
      { id: 'avgErrorCost', label: 'Average cost to fix each error (£)', placeholder: 'e.g. 200', hint: 'Staff time + material cost + customer impact' },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory & Procurement Waste',
    fields: [
      { id: 'inventoryValue', label: 'Total inventory value (£)', placeholder: 'e.g. 50000', hint: 'Current stock value on hand' },
      { id: 'excessInventoryPct', label: 'Estimated excess inventory (%)', placeholder: 'e.g. 20', hint: 'Percentage held above optimal level due to poor visibility' },
    ],
  },
  {
    id: 'management',
    label: 'Management Time Lost',
    fields: [
      { id: 'managersCount', label: 'Number of managers/directors', placeholder: 'e.g. 3', hint: 'People who prepare or compile reports and management packs' },
      { id: 'mgmtHoursPerWeek', label: 'Hours per manager per week on reporting', placeholder: 'e.g. 4', hint: 'Time gathering data, chasing numbers, building reports' },
      { id: 'mgmtHourlyRate', label: 'Average manager hourly cost (£)', placeholder: 'e.g. 45', hint: 'Blended cost including salary, NI, and benefits' },
    ],
  },
]

export default function CostLeakTool() {
  const [stage, setStage] = useState('inputs')
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [emailCaptured, setEmailCaptured] = useState(false)
  const [results, setResults] = useState(null)
  const [inputs, setInputs] = useState({})

  const handleChange = (field, val) => setInputs(prev => ({ ...prev, [field]: val }))

  const requiredFields = LEAK_CATEGORIES.flatMap(c => c.fields.map(f => f.id)).filter(id => !['avgHourlyRate', 'mgmtHourlyRate'].includes(id))
  const allFilled = requiredFields.every(id => inputs[id] !== '' && inputs[id] !== undefined)

  const calculate = () => {
    const get = (id, fallback = 0) => parseFloat(inputs[id]) || fallback

    const manualAnnual = get('manualEmployees') * get('manualHoursPerWeek') * 52 * get('avgHourlyRate', 20)
    const errorAnnual = get('errorIncidentsPerMonth') * get('avgErrorCost') * 12
    const inventoryAnnual = get('inventoryValue') * (get('excessInventoryPct') / 100) * 0.25
    const mgmtAnnual = get('managersCount') * get('mgmtHoursPerWeek') * 52 * get('mgmtHourlyRate', 45)
    const total = manualAnnual + errorAnnual + inventoryAnnual + mgmtAnnual
    const reclaimable = total * 0.65

    setResults({ manualAnnual, errorAnnual, inventoryAnnual, mgmtAnnual, total, reclaimable })
    setEmailModalOpen(true)
  }

  const handleEmailSubmit = () => { setEmailCaptured(true); setEmailModalOpen(false); setStage('results') }
  const handleSkip = () => { setEmailModalOpen(false); setStage('results') }

  if (stage === 'results' && results) {
    const chartData = [
      { name: 'Manual Work', value: Math.round(results.manualAnnual), color: '#ef4444' },
      { name: 'Errors & Rework', value: Math.round(results.errorAnnual), color: '#f97316' },
      { name: 'Inventory Waste', value: Math.round(results.inventoryAnnual), color: '#f59e0b' },
      { name: 'Mgmt Time', value: Math.round(results.mgmtAnnual), color: '#8b5cf6' },
    ].filter(d => d.value > 0)

    const scoreVal = Math.min(Math.round((results.total / 100000) * 100), 100)

    return (
      <>
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-navy-900 border border-red-500/20 text-center">
              <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-400 mb-1">{formatGBP(results.total)}</div>
              <div className="text-sm text-white font-medium mb-1">Total Annual Cost Leak</div>
              <div className="text-xs text-slate-500">Hidden operational waste per year</div>
            </div>
            <div className="p-6 rounded-2xl bg-navy-900 border border-green-500/20 text-center">
              <PoundSterling className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-400 mb-1">{formatGBP(results.reclaimable)}</div>
              <div className="text-sm text-white font-medium mb-1">Reclaimable with Better Systems</div>
              <div className="text-xs text-slate-500">65% recoverable through operational intelligence</div>
            </div>
          </div>

          {chartData.length > 0 && (
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800">
              <h3 className="font-semibold text-white mb-6">Cost Leak by Category</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => formatGBP(v)} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} formatter={(v) => [formatGBP(v), 'Annual Cost']} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="p-5 rounded-xl bg-brand-600/10 border border-brand-600/20">
            <h4 className="font-semibold text-white mb-2">What this means for your business</h4>
            <p className="text-slate-300 text-sm">Your business is losing an estimated <strong className="text-red-400">{formatGBP(results.total)}</strong> per year to avoidable operational waste. With better systems and operational intelligence, approximately <strong className="text-green-400">{formatGBP(results.reclaimable)}</strong> of this is recoverable — without increasing headcount.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/book" className="flex items-center justify-center gap-2 p-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all">
              Book Free Strategy Call <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={() => setStage('inputs')}
              className="flex items-center justify-center gap-2 p-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold transition-all border border-navy-700">
              <Calculator className="w-4 h-4" /> Recalculate
            </button>
          </div>
        </div>
        <EmailCaptureModal isOpen={emailModalOpen} onClose={handleSkip} onSubmit={handleEmailSubmit}
          source="cost-leak-results" score={scoreVal} maturityLevel={`${formatGBP(results.total)}/yr waste`} />
      </>
    )
  }

  return (
    <>
      <EmailCaptureModal isOpen={emailModalOpen} onClose={handleSkip} onSubmit={handleEmailSubmit}
        source="cost-leak-results" score={0} maturityLevel="" />
      <div className="space-y-6">
        {LEAK_CATEGORIES.map(cat => (
          <div key={cat.id} className="p-6 rounded-2xl bg-navy-900 border border-navy-800">
            <h3 className="text-white font-semibold mb-4">{cat.label}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {cat.fields.map(({ id, label, placeholder, hint }) => (
                <div key={id}>
                  <label className="block text-sm text-slate-300 mb-1">{label}</label>
                  <input type="number" min="0" value={inputs[id] || ''} onChange={e => handleChange(id, e.target.value)} placeholder={placeholder}
                    className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-sm" />
                  <p className="text-xs text-slate-500 mt-1">{hint}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={calculate} disabled={!allFilled}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed">
          <Calculator className="w-4 h-4" /> Calculate My Cost Leak
        </button>
      </div>
    </>
  )
}
