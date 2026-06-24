'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { calcTakeHome, formatGBP } from '@/lib/tax/uk-income-tax';

export default function QuickCalc() {
  const [raw, setRaw] = useState('');
  const [copied, setCopied] = useState(false);

  const gross = useMemo(() => {
    const n = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    return n >= 5000 && n <= 999999 ? n : null;
  }, [raw]);

  const result = useMemo(() => (gross ? calcTakeHome(gross) : null), [gross]);

  function handleCopy() {
    if (!result || !gross) return;
    const text = `On a £${gross.toLocaleString('en-GB')} salary, my UK take-home is ${formatGBP(result.netMonthly)}/month after income tax & NI (${result.effectiveRate}% effective rate) — salarystack.co.uk`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-2xl border border-black/[0.09] bg-black/[0.02] p-5">
      <p className="text-[11px] text-black/35 font-semibold uppercase tracking-widest mb-4">
        What's your take-home?
      </p>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40 font-bold text-sm select-none">£</span>
          <input
            type="text"
            inputMode="numeric"
            value={raw}
            onChange={e => setRaw(e.target.value)}
            placeholder="65,000"
            className="w-full bg-black/[0.03] border border-black/[0.10] rounded-xl pl-8 pr-4 py-3 text-gray-900 font-semibold text-sm placeholder-black/20 focus:outline-none focus:border-[#818cf850] transition-colors"
          />
        </div>
        <span className="text-xs text-black/30 font-medium whitespace-nowrap">per year</span>
      </div>

      {result ? (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#05966908] border border-[#05966925]">
            <span className="text-sm text-black/60">Monthly take-home</span>
            <span className="text-2xl font-extrabold text-[#059669]">{formatGBP(result.netMonthly)}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Income Tax', value: formatGBP(result.incomeTax), color: 'text-[#d97706]' },
              { label: 'Nat. Insurance', value: formatGBP(result.ni), color: 'text-black/45' },
              { label: 'Effective Rate', value: `${result.effectiveRate}%`, color: 'text-black/45' },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center py-2.5 px-1 rounded-xl bg-black/[0.02] border border-black/[0.05]">
                <p className="text-[10px] text-black/25 mb-1">{label}</p>
                <p className={`text-xs font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-0.5">
            <Link href="/salary/software-engineer/london"
              className="flex items-center gap-1.5 text-xs text-[#818cf8]/70 hover:text-[#818cf8] transition-colors">
              Full breakdown by city <ArrowRight size={11} />
            </Link>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-black/30 hover:text-black/60 transition-colors"
            >
              {copied ? <Check size={11} className="text-[#059669]" /> : <Copy size={11} />}
              {copied ? 'Copied' : 'Share result'}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-xs text-black/20 text-center py-3">
          Type your annual salary above
        </p>
      )}
    </div>
  );
}
