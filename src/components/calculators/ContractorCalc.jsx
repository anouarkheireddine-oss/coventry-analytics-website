'use client';

import { useState } from 'react';
import { calcOutsideIR35, calcInsideIR35, calcPermanent, salaryToDayRate, dayRateToSalary, DEFAULT_BILLING_DAYS } from '@/lib/calculators/contractor';
import { formatGBP } from '@/lib/tax/uk-income-tax';

function ResultCard({ result, highlight }) {
  return (
    <div className={`rounded-2xl border p-5 ${highlight ? 'border-[#818cf830] bg-[#818cf806]' : 'border-white/[0.07] bg-white/[0.02]'}`}>
      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">{result.label}</p>
      <p className="text-3xl font-extrabold text-[#818cf8] mb-0.5">{formatGBP(result.netMonthly ?? result.netAnnual / 12)}</p>
      <p className="text-xs text-white/30 mb-4">/month take-home</p>
      <p className="text-sm font-semibold text-white/70 mb-3">{formatGBP(result.netAnnual)}/year</p>
      <div className="space-y-2">
        {result.breakdown.map(({ label, value, color }) => (
          <div key={label} className="flex justify-between text-xs">
            <span className="text-white/40">{label}</span>
            <span className="font-semibold" style={{ color }}>{value < 0 ? `−${formatGBP(Math.abs(value))}` : formatGBP(value)}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-white/[0.06]">
        <p className="text-xs text-white/30">Effective tax rate: <span className="text-white/60 font-semibold">{result.effectiveRate}%</span></p>
      </div>
    </div>
  );
}

export default function ContractorCalc() {
  const [mode, setMode] = useState('dayRate'); // 'dayRate' | 'salary'
  const [dayRate, setDayRate] = useState(500);
  const [salary, setSalary] = useState(75000);
  const [days, setDays] = useState(DEFAULT_BILLING_DAYS);
  const [overheads, setOverheads] = useState(3000);
  const [umbrellaFee, setUmbrellaFee] = useState(1500);

  const outside = calcOutsideIR35(dayRate, days, overheads);
  const inside = calcInsideIR35(dayRate, days, umbrellaFee);
  const perm = calcPermanent(salary);

  const outsideVsPerm = outside.netAnnual - perm.netAnnual;
  const insideVsPerm = inside.netAnnual - perm.netAnnual;

  const equivalentSalary = dayRateToSalary(dayRate, days);
  const equivalentDayRate = salaryToDayRate(salary, days);

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        {[{ v: 'dayRate', l: 'I know my day rate' }, { v: 'salary', l: 'I know my salary' }].map(({ v, l }) => (
          <button
            key={v}
            onClick={() => setMode(v)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              mode === v ? 'bg-[#818cf820] border border-[#818cf840] text-[#818cf8]' : 'border border-white/[0.08] text-white/40 hover:text-white/60'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mode === 'dayRate' ? (
            <div>
              <label className="text-xs text-white/40 font-medium block mb-1.5">Day Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">£</span>
                <input type="number" value={dayRate} onChange={e => setDayRate(+e.target.value || 0)} step={50}
                  className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl pl-7 pr-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#818cf840]" />
              </div>
              <p className="text-[10px] text-white/25 mt-1">≈ {formatGBP(equivalentSalary)} perm equivalent</p>
            </div>
          ) : (
            <div>
              <label className="text-xs text-white/40 font-medium block mb-1.5">Permanent Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">£</span>
                <input type="number" value={salary} onChange={e => setSalary(+e.target.value || 0)} step={1000}
                  className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl pl-7 pr-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#818cf840]" />
              </div>
              <p className="text-[10px] text-white/25 mt-1">≈ {formatGBP(equivalentDayRate)}/day contract equivalent</p>
            </div>
          )}

          <div>
            <label className="text-xs text-white/40 font-medium block mb-1.5">Billing Days / Year</label>
            <input type="number" value={days} onChange={e => setDays(+e.target.value || 0)} step={5} min={100} max={260}
              className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#818cf840]" />
            <p className="text-[10px] text-white/25 mt-1">Default: {DEFAULT_BILLING_DAYS} (incl. holiday)</p>
          </div>

          <div>
            <label className="text-xs text-white/40 font-medium block mb-1.5">Ltd Co. Overheads / Year</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">£</span>
              <input type="number" value={overheads} onChange={e => setOverheads(+e.target.value || 0)} step={500}
                className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl pl-7 pr-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#818cf840]" />
            </div>
            <p className="text-[10px] text-white/25 mt-1">Accountant + insurance + tools</p>
          </div>

          {mode === 'dayRate' ? (
            <div>
              <label className="text-xs text-white/40 font-medium block mb-1.5">Perm Comparison Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">£</span>
                <input type="number" value={salary} onChange={e => setSalary(+e.target.value || 0)} step={1000}
                  className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl pl-7 pr-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#818cf840]" />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs text-white/40 font-medium block mb-1.5">Contract Day Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">£</span>
                <input type="number" value={dayRate} onChange={e => setDayRate(+e.target.value || 0)} step={50}
                  className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl pl-7 pr-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#818cf840]" />
              </div>
            </div>
          )}
        </div>

        {/* Verdict banner */}
        {outsideVsPerm !== 0 && (
          <div className={`mt-5 px-4 py-3 rounded-xl border text-sm font-semibold ${
            outsideVsPerm > 0 ? 'border-[#34d39925] bg-[#34d39908] text-[#34d399]' : 'border-[#ef444425] bg-[#ef444408] text-[#ef4444]'
          }`}>
            Outside IR35 puts <strong>{formatGBP(Math.abs(outsideVsPerm))}/year</strong> {outsideVsPerm > 0 ? 'more' : 'less'} in your pocket
            vs permanent at {formatGBP(salary)}.
            {' '}That&apos;s <strong>{formatGBP(Math.abs(outsideVsPerm) / 12)}/month</strong>.
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultCard result={outside} highlight />
        <ResultCard result={inside} />
        <ResultCard result={perm} />
      </div>

      <p className="text-[11px] text-white/20">
        Estimates based on 2025/26 UK tax rates. Outside IR35 assumes optimal salary/dividend split for a single director.
        Always verify with a contractor accountant. Not financial advice.
      </p>
    </div>
  );
}
