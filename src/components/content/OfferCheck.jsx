'use client';
import { useState } from 'react';
import { formatGBP } from '@/lib/tax/uk-income-tax';

function assess(offer, entry, mid, senior, lead) {
  if (offer < entry * 0.85) return { label: 'Below market', desc: 'This offer is below typical entry-level for this role and city. Strong grounds to negotiate.', pct: 18, color: '#ef4444', bg: '#ef444408', border: '#ef444425' };
  if (offer < entry)        return { label: 'Below entry range', desc: 'Slightly below typical entry-level. Worth pushing back — the data supports a higher number.', pct: 35, color: '#d97706', bg: '#d9770608', border: '#d9770625' };
  if (offer < mid * 0.92)   return { label: 'Entry–mid range', desc: 'Solid for an entry-level or early-career hire in this city.', pct: 52, color: '#059669', bg: '#05966908', border: '#05966925' };
  if (offer < mid * 1.08)   return { label: 'Mid-market', desc: 'Right in the middle of the market for this role and city. A fair offer.', pct: 65, color: '#059669', bg: '#05966908', border: '#05966925' };
  if (offer < senior * 0.92) return { label: 'Mid–senior range', desc: 'Above average — strong offer for a mid-level hire.', pct: 76, color: '#818cf8', bg: '#818cf808', border: '#818cf825' };
  if (offer < senior * 1.08) return { label: 'Senior level', desc: 'This matches a senior-level market rate. A competitive offer.', pct: 85, color: '#818cf8', bg: '#818cf808', border: '#818cf825' };
  if (offer < lead)          return { label: 'Senior–lead range', desc: 'Top-tier offer. At or above senior market rate for this role.', pct: 92, color: '#818cf8', bg: '#818cf808', border: '#818cf825' };
  return { label: 'Lead / principal level', desc: 'Exceptional. Above senior market rate — this is a lead or principal-level offer.', pct: 97, color: '#818cf8', bg: '#818cf808', border: '#818cf825' };
}

export default function OfferCheck({ entry, mid, senior, lead, roleTitle, locationName }) {
  const [raw, setRaw] = useState('');

  const offer = (() => {
    const n = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    return n >= 10000 && n <= 999999 ? n : null;
  })();

  const result = offer ? assess(offer, entry, mid, senior, lead) : null;

  return (
    <div className="mt-8 rounded-2xl border border-black/[0.09] bg-black/[0.02] p-5">
      <p className="text-[11px] text-black/35 font-semibold uppercase tracking-widest mb-1">Is my offer good?</p>
      <p className="text-xs text-black/45 mb-4 leading-relaxed">
        Enter your offer to see where it sits in the {locationName} market for {roleTitle}.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40 font-bold text-sm select-none">£</span>
          <input
            type="text"
            inputMode="numeric"
            value={raw}
            onChange={e => setRaw(e.target.value)}
            placeholder="75,000"
            className="w-full bg-black/[0.03] border border-black/[0.10] rounded-xl pl-8 pr-4 py-3 text-gray-900 font-semibold text-sm placeholder-black/20 focus:outline-none focus:border-[#818cf850] transition-colors"
          />
        </div>
        <span className="text-xs text-black/30 font-medium whitespace-nowrap">per year</span>
      </div>

      {result ? (
        <div className="space-y-3">
          <div className="rounded-xl p-4 border" style={{ background: result.bg, borderColor: result.border }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold" style={{ color: result.color }}>{result.label}</span>
              <span className="text-[10px] text-black/35 font-medium">
                {formatGBP(offer)} vs {formatGBP(mid)} mid
              </span>
            </div>
            <p className="text-xs text-black/55 leading-relaxed">{result.desc}</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] text-black/30">
              <span>Entry {formatGBP(entry)}</span>
              <span>Mid {formatGBP(mid)}</span>
              <span>Senior {formatGBP(senior)}</span>
            </div>
            <div className="relative h-2 rounded-full bg-black/[0.06] overflow-visible">
              <div className="h-full rounded-full bg-gradient-to-r from-[#d97706] via-[#059669] to-[#818cf8]"
                style={{ width: `${Math.min(result.pct, 100)}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                style={{ left: `calc(${Math.min(result.pct, 97)}% - 7px)`, background: result.color }} />
            </div>
            <div className="flex justify-between text-[10px] text-black/20">
              <span>Below market</span>
              <span>Top of market</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xs text-black/20 text-center py-2">Type your offer to see where you stand</p>
      )}
    </div>
  );
}
