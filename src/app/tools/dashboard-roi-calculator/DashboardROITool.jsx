'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import Link from 'next/link'
import { ArrowRight, Calculator, TrendingUp, Clock, PoundSterling } from 'lucide-react'
import EmailCaptureModal from '@/components/ui/EmailCaptureModal'

const HOURLY_RATE = 35

function formatGBP(n) {
  if (n >= 1000) return `£${(n / 1000).toFixed(1)}k`
  return `£${Math.round(n)}`
}

export default function DashboardROITool() {
  const [stage, setStage] = useState('inputs')
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [emailCaptured, setEmailCaptured] = useState(false)
  const [results, setResults] = useState(null)

  const [inputs, setInputs] = useState({
    reportingStaff: '',
    hoursPerReport: '',
    reportsPerMonth: '',
    staffCostPerHour: '',
    delayedDecisions: '',
    delayedDecisionCost: '',
    dashboardInvestment: '2500',
  })

  const handleChange = (field, val) => setInputs(prev => ({ ...prev, [field]: val }))

  const allFilled = Object.entries(inputs).every(([k, v]) => k === 'staffCostPerHour' || v !== '')

  const calculate = () => {
    const staff = parseFloat(inputs.reportingStaff) || 0
    const hoursPerReport = parseFloat(inputs.hoursPerReport) || 0
    const reportsPerMonth = parseFloat(inputs.reportsPerMonth) || 0
    const hourlyRate = parseFloat(inputs.staffCostPerHour) || HOURLY_RATE
    const delayedDecisions = parseFloat(inputs.delayedDecisions) || 0
    const delayedDecisionCost = parseFloat(inputs.delayedDecisionCost) || 0
    const dashboardInvestment = parseFloat(inputs.dashboardInvestment) || 2500

    const monthlyReportingHours = staff * hoursPerReport * reportsPerMonth
    const annualReportingHours = monthlyReportingHours * 12
    const annualReportingCost = annualReportingHours * hourlyRate
    const annualDelayedDecisionCost = delayedDecisions * delayedDecisionCost * 12
    const totalAnnualWaste = annualReportingCost + annualDelayedDecisionCost
    const annualSavings = totalAnnualWaste * 0.8
    const roi = dashboardInvestment > 0 ? Math.round((annualSavings / dashboardInvestment) * 100) : 0
    const paybackWeeks = dashboardInvestment > 0 && annualSavings > 0 ? Math.round((dashboardInvestment / annualSavings) * 52) : null

    setResults({ annualReportingCost, annualDelayedDecisionCost, totalAnnualWaste, annualSavings, roi, paybackWeeks, annualReportingHours, dashboardInvestment })
    setEmailModalOpen(true)
  }

  const handleEmailSubmit = () => { setEmailCaptured(true); setEmailModalOpen(false); setStage('results') }
  const handleSkip = () => { setEmailModalOpen(false); setStage('results') }

  if (stage === 'results' && results) {
    const chartData = [
      { name: 'Reporting Time', value: Math.round(results.annualReportingCost), color: '#ef4444' },
      { name: 'Delayed Decisions', value: Math.round(results.annualDelayedDecisionCost), color: '#f97316' },
      { name: 'Projected Savings', value: Math.round(results.annualSavings), color: '#22c55e' },
    ]
    return (
      <>
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Annual Waste', value: formatGBP(results.totalAnnualWaste), sub: 'Current cost of manual reporting', icon: PoundSterling, color: 'text-red-400' },
              { label: 'Projected Savings', value: formatGBP(results.annualSavings), sub: '80% of waste eliminated by dashboard', icon: TrendingUp, color: 'text-green-400' },
              { label: 'Payback Period', value: results.paybackWeeks ? `${results.paybackWeeks} weeks` : 'Instant', sub: `${results.roi}% first-year ROI`, icon: Clock, color: 'text-brand-400' },
            ].map(({ label, value, sub, icon: Icon, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-navy-900 border border-navy-800 text-center">
                <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
                <div className="text-xs text-white font-medium mb-1">{label}</div>
                <div className="text-xs text-slate-500">{sub}</div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800">
            <h3 className="font-semibold text-white mb-6">Cost Breakdown vs Savings</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => formatGBP(v)} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} formatter={(v) => [formatGBP(v), 'Amount']} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-xl bg-brand-600/10 border border-brand-600/20">
            <h4 className="font-semibold text-white mb-2">What this means</h4>
            <p className="text-slate-300 text-sm">Your team spends approximately <strong className="text-white">{Math.round(results.annualReportingHours)} hours per year</strong> on manual reporting. A live dashboard investment of <strong className="text-white">{formatGBP(results.dashboardInvestment)}</strong> would typically pay for itself in <strong className="text-white">{results.paybackWeeks} weeks</strong> and generate <strong className="text-green-400">{formatGBP(results.annualSavings)}</strong> in annual savings.</p>
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
          source="dashboard-roi-results" score={Math.min(results.roi, 100)} maturityLevel={`${results.roi}% ROI`} />
      </>
    )
  }

  return (
    <>
      <EmailCaptureModal isOpen={emailModalOpen} onClose={handleSkip} onSubmit={handleEmailSubmit}
        source="dashboard-roi-results" score={results ? Math.min(results.roi, 100) : 0} maturityLevel="" />
      <div className="p-6 sm:p-8 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
        <div>
          <h3 className="text-white font-semibold mb-1">Reporting & Staff Costs</h3>
          <p className="text-slate-400 text-sm mb-4">Tell us about your current reporting overhead</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { field: 'reportingStaff', label: 'Staff who produce reports', placeholder: 'e.g. 3', hint: 'Number of people who prepare reports' },
              { field: 'hoursPerReport', label: 'Hours per report', placeholder: 'e.g. 4', hint: 'Average time to produce one report' },
              { field: 'reportsPerMonth', label: 'Reports per month', placeholder: 'e.g. 6', hint: 'Weekly + monthly reports combined' },
              { field: 'staffCostPerHour', label: 'Avg hourly staff cost (£)', placeholder: `e.g. ${HOURLY_RATE}`, hint: 'Leave blank to use £35/hr default' },
            ].map(({ field, label, placeholder, hint }) => (
              <div key={field}>
                <label className="block text-sm text-slate-300 mb-1">{label}</label>
                <input type="number" min="0" value={inputs[field]} onChange={e => handleChange(field, e.target.value)} placeholder={placeholder}
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-sm" />
                <p className="text-xs text-slate-500 mt-1">{hint}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6">
          <h3 className="text-white font-semibold mb-1">Delayed Decisions</h3>
          <p className="text-slate-400 text-sm mb-4">Estimate the cost of decisions made without good data</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { field: 'delayedDecisions', label: 'Delayed or poor decisions per month', placeholder: 'e.g. 2', hint: 'Decisions held up by missing data' },
              { field: 'delayedDecisionCost', label: 'Avg cost per delayed decision (£)', placeholder: 'e.g. 500', hint: 'Time lost + opportunity cost' },
            ].map(({ field, label, placeholder, hint }) => (
              <div key={field}>
                <label className="block text-sm text-slate-300 mb-1">{label}</label>
                <input type="number" min="0" value={inputs[field]} onChange={e => handleChange(field, e.target.value)} placeholder={placeholder}
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-sm" />
                <p className="text-xs text-slate-500 mt-1">{hint}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6">
          <h3 className="text-white font-semibold mb-1">Dashboard Investment</h3>
          <p className="text-slate-400 text-sm mb-4">Typical Coventry Analytics dashboard starts at £2,500</p>
          <div className="max-w-xs">
            <label className="block text-sm text-slate-300 mb-1">One-time investment (£)</label>
            <input type="number" min="0" value={inputs.dashboardInvestment} onChange={e => handleChange('dashboardInvestment', e.target.value)}
              className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 text-sm" />
          </div>
        </div>

        <button onClick={calculate} disabled={!allFilled}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed">
          <Calculator className="w-4 h-4" /> Calculate My ROI
        </button>
      </div>
    </>
  )
}
