'use client';

import { motion } from 'framer-motion';

export default function StatBar({ value, max, color = '#00d4ff', height = 6, delay = 0 }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}
