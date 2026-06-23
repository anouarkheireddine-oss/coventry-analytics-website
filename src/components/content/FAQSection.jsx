'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map(({ q, a }, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-white/90 pr-4">{q}</span>
              <ChevronDown
                size={16}
                className="text-white/40 flex-shrink-0 transition-transform duration-200"
                style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4">
                <p className="text-sm text-white/60 leading-relaxed">{a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
