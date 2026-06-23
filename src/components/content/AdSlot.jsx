// AdSlot renders a Google AdSense unit when NEXT_PUBLIC_ADSENSE_ID is set,
// otherwise shows a placeholder so layout is preserved during development.
'use client';

import { useEffect } from 'react';

export default function AdSlot({ slot = 'content', className = '' }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (clientId && window.adsbygoogle) {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
    }
  }, [clientId]);

  if (!clientId) {
    return (
      <div
        className={`rounded-xl border border-dashed border-white/[0.08] bg-white/[0.015] flex items-center justify-center text-xs text-white/20 font-mono ${className}`}
        style={{ minHeight: slot === 'leaderboard' ? 90 : 250 }}
      >
        AD SLOT — {slot.toUpperCase()} — activate via NEXT_PUBLIC_ADSENSE_ID
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
