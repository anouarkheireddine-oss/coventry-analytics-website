'use client';

import { useState } from 'react';
import { calcTakeHome, formatGBP } from '@/lib/tax/uk-income-tax';

const DEFAULT_OFFER = { label: '', salary: 0, bonus: 0, bonusPct: 0, pension: 5, equity: 0, remote: false };

function OfferInput({ label, value, onChange }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      <input
        value={value.label}
        onChange={e => set('label', e.target.value)}
        placeholder={label}
        className="w-full bg-transparent text-base font-bold text-white placeholder-white/20 border-b border-white/[0.08] pb-2 mb-4 focus:outline-none focus:border-[#818cf840]"
      />
      <div className="grid grid-cols-2 gap-3">
        {[
          { k: 'salary',   l: 'Base Salary',       prefix: '£', step: 1000  },
          { k: 'bonus',    l: 'Annual Bonus (£)',   prefix: '£', step: 500   },
          { k: 'pension',  l: 'Employer Pension %', prefix: '',  step: 1, suffix: '%' },
          { k: 'equity',   l: 'Equity / RSU (£/yr)',prefix: '£', step: 1000  },
        ].map(({ k, l, prefix, step, suffix }) => (
          <div key={k}>
            <label className="text-[11px] text-white/35 font-medium block mb-1">{l}</label>
            <div className="relative">
              {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35 text-sm">{prefix}</span>}
              <input
                type="number"
                value={value[k]}
                onChange={e => set(k, +e.target.value || 0)}
                step={step}
                className={`w-full bg-white/[0.05] border border-white/[0.08] rounded-xl ${prefix ? 'pl-7' : 'pl-3'} pr-3 py-2 text-sm font-semibold text-white focus:outline-none focus:border-[#818cf840]`}
              />
              {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 text-sm">{suffix}</span>}
            </div>
          </div>
        ))}
      </div>
      <label className="flex items-center gap-2 mt-3 cursor-pointer">
        <input type="checkbox" checked={value.remote} onChange={e => set('remote', e.target.checked)}
          className="w-4 h-4 accent-[#818cf8] rounded" />
        <span className="text-xs text-white/40">Remote / hybrid (saves ~£2,400/yr commute)</span>
      </label>
    </div>
  );
}

function calcTotal(offer) {
  const tax = calcTakeHome(offer.salary, { pensionPct: 0 }); // we'll add pension separately
  const employerPension = Math.round(offer.salary * (offer.pension / 100));
  // Bonus taxed at marginal rate (approx 40% for most tech salaries)
  const bonusNet = Math.round(offer.bonus * 0.60);
  const commuteSaving = offer.remote ? 2400 : 0;
  const totalAnnual = tax.netAnnual + bonusNet + employerPension + offer.equity + commuteSaving;
  return { tax, employerPension, bonusNet, commuteSaving, totalAnnual, monthlyNet: Math.round(totalAnnual / 12) };
}

export default function OfferCompare() {
  const [a, setA] = useState({ ...DEFAULT_OFFER, label: 'Offer A', salary: 80000, pension: 5, bonus: 5000 });
  const [b, setB] = useState({ ...DEFAULT_OFFER, label: 'Offer B', salary: 70000, pension: 10, bonus: 10000, equity: 8000 });

  const ra = calcTotal(a);
  const rb = calcTotal(b);
  const winner = ra.totalAnnual >= rb.totalAnnual ? 'a' : 'b';
  const diff = Math.abs(ra.totalAnnual - rb.totalAnnual);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <OfferInput label="Company A" value={a} onChange={setA} />
        <OfferInput label="Company B" value={b} onChange={setB} />
      </div>

      {/* Verdict */}
      {(a.salary > 0 || b.salary > 0) && (
        <div className={`rounded-2xl border p-5 ${winner === 'a' ? 'border-[#34d39930] bg-[#34d39908]' : 'border-[#818cf830] bg-[#818cf808]'}`}>
          <p className="text-sm font-bold text-white mb-1">
            <span style={{ color: winner === 'a' ? '#34d399' : '#818cf8' }}>
              {winner === 'a' ? (a.label || 'Offer A') : (b.label || 'Offer B')}
            </span>{' '}
            is worth <strong>{formatGBP(diff)}/year more</strong> in total compensation.
          </p>
          <p className="text-xs text-white/40">That&apos;s {formatGBP(diff * 3)} over 3 years · {formatGBP(diff * 5)} over 5 years</p>
        </div>
      )}

      {/* Side-by-side breakdown */}
      <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.07] bg-white/[0.03]">
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">Component</th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold text-white/30 uppercase tracking-wider">{a.label || 'Offer A'}</th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold text-white/30 uppercase tracking-wider">{b.label || 'Offer B'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Base Salary (gross)', va: a.salary, vb: b.salary, fmt: true },
              { label: 'Net Take-Home (base)', va: ra.tax.netAnnual, vb: rb.tax.netAnnual, fmt: true, highlight: true },
              { label: 'Bonus (est. net)', va: ra.bonusNet, vb: rb.bonusNet, fmt: true },
              { label: 'Employer Pension', va: ra.employerPension, vb: rb.employerPension, fmt: true },
              { label: 'Equity / RSU', va: a.equity, vb: b.equity, fmt: true },
              { label: 'Remote saving', va: ra.commuteSaving, vb: rb.commuteSaving, fmt: true },
              { label: 'TOTAL VALUE / YEAR', va: ra.totalAnnual, vb: rb.totalAnnual, fmt: true, total: true },
              { label: 'Monthly equivalent', va: ra.monthlyNet, vb: rb.monthlyNet, fmt: true },
            ].map(({ label, va, vb, fmt, highlight, total }) => (
              <tr key={label} className={`border-b border-white/[0.04] ${total ? 'bg-white/[0.04] font-bold' : highlight ? 'bg-white/[0.02]' : ''}`}>
                <td className={`px-4 py-3 ${total ? 'text-white font-bold' : 'text-white/60'}`}>{label}</td>
                <td className={`px-4 py-3 text-right ${winner === 'a' && total ? 'text-[#34d399] font-bold text-base' : 'text-white/70'}`}>
                  {fmt ? formatGBP(va) : va}
                </td>
                <td className={`px-4 py-3 text-right ${winner === 'b' && total ? 'text-[#818cf8] font-bold text-base' : 'text-white/70'}`}>
                  {fmt ? formatGBP(vb) : vb}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-white/20">Net take-home uses 2025/26 UK tax rates, Plan 2 student loan, 5% employee pension. Bonus taxed at 40% marginal rate estimate. Not financial advice.</p>
    </div>
  );
}
