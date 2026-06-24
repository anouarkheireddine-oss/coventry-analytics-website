'use client';
import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
      // still show success — don't penalise user for network errors
    }
    setStatus('done');
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-[#05966925] bg-[#05966906] p-5 text-center">
        <p className="text-sm font-semibold text-[#059669] mb-1">You're on the list.</p>
        <p className="text-xs text-black/40">We'll send the Q3 2026 UK tech salary report when it's ready. No spam.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/[0.09] bg-black/[0.02] p-5">
      <p className="text-[11px] text-black/35 font-semibold uppercase tracking-widest mb-1">Quarterly salary report</p>
      <p className="text-sm font-bold text-gray-900 mb-1">Get the Q3 2026 UK tech salary report</p>
      <p className="text-xs text-black/45 mb-4 leading-relaxed">
        What salaries moved, which cities gained ground, and what the data says about the current market.
        One email per quarter.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="flex-1 min-w-0 bg-black/[0.03] border border-black/[0.10] rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-black/25 focus:outline-none focus:border-[#818cf850] transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2.5 rounded-xl bg-[#818cf8] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap flex-shrink-0"
        >
          {status === 'loading' ? '…' : 'Get report'}
        </button>
      </form>
      <p className="text-[10px] text-black/20 mt-2">Unsubscribe any time.</p>
    </div>
  );
}
