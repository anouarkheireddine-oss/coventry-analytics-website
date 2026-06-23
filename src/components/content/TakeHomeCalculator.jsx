'use client';

import { useState } from 'react';
import { calcTakeHome, formatGBP } from '@/lib/tax/uk-income-tax';

const LOAN_OPTIONS = [
  { value: 'none',  label: 'None' },
  { value: 'plan1', label: 'Plan 1 (pre-2012)' },
  { value: 'plan2', label: 'Plan 2 (2012–2023)' },
  { value: 'plan4', label: 'Plan 4 (Scotland)' },
  { value: 'plan5', label: 'Plan 5 (post-2023)' },
];

function Bar({ label, value, total, color }) {
  const pct = Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-semibold text-white/70">{formatGBP(value)} <span className="text-white/30">({pct}%)</span></span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06]">
        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function TakeHomeCalculator({ defaultGross }) {
  const [gross, setGross] = useState(defaultGross);
  const [studentLoan, setStudentLoan] = useState('plan2');
  const [pensionPct, setPensionPct] = useState(5);

  const result = calcTakeHome(gross, { studentLoan, pensionPct });

  return (
    <div className="rounded-2xl border border-[#00d4ff20] bg-[#00d4ff06] p-6 my-6">
      <h3 className="text-base font-bold text-white mb-1">Take-Home Pay Calculator</h3>
      <p className="text-xs text-white/40 mb-5">2025/26 UK tax rates · Income tax + NI + pension + student loan</p>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs text-white/40 font-medium block mb-1.5">Gross Annual Salary</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">£</span>
            <input
              type="number"
              value={gross}
              onChange={e => setGross(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl pl-7 pr-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#00d4ff40]"
              min={0}
              step={1000}
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-white/40 font-medium block mb-1.5">Student Loan</label>
          <select
            value={studentLoan}
            onChange={e => setStudentLoan(e.target.value)}
            className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d4ff40] appearance-none"
          >
            {LOAN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-white/40 font-medium block mb-1.5">Pension (% of gross)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={20}
              value={pensionPct}
              onChange={e => setPensionPct(parseInt(e.target.value))}
              className="flex-1 accent-[#00d4ff]"
            />
            <span className="text-sm font-bold text-[#00d4ff] w-8 text-right">{pensionPct}%</span>
          </div>
        </div>
      </div>

      {/* Result headline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Monthly Take-Home', value: formatGBP(result.netMonthly), color: '#00d4ff', large: true },
          { label: 'Annual Take-Home', value: formatGBP(result.netAnnual), color: '#22c55e' },
          { label: 'Income Tax', value: formatGBP(result.incomeTax), color: '#f59e0b' },
          { label: 'Effective Rate', value: `${result.effectiveRate}%`, color: '#a78bfa' },
        ].map(({ label, value, color, large }) => (
          <div key={label} className={`rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 ${large ? 'col-span-2 sm:col-span-1' : ''}`}>
            <p className="text-[11px] text-white/40 mb-1">{label}</p>
            <p className="text-xl font-extrabold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Breakdown bars */}
      <div className="space-y-3">
        <Bar label="Take-Home"      value={result.netAnnual}           total={gross} color="#00d4ff" />
        <Bar label="Income Tax"     value={result.incomeTax}           total={gross} color="#f59e0b" />
        <Bar label="National Ins."  value={result.ni}                  total={gross} color="#ef4444" />
        <Bar label={`Pension (${pensionPct}%)`} value={result.pensionContrib} total={gross} color="#a78bfa" />
        {result.studentLoanDeduction > 0 && (
          <Bar label="Student Loan" value={result.studentLoanDeduction} total={gross} color="#6b7280" />
        )}
      </div>

      <p className="text-[10px] text-white/20 mt-4">Estimates only. Assumes standard personal allowance, no other deductions. 2025/26 rates.</p>
    </div>
  );
}
