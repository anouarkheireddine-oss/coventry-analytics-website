'use client';

function fmt(n) {
  return `£${n.toLocaleString('en-GB')}`;
}

export default function SalaryRangeBar({ entry, mid, senior, lead }) {
  const max = lead;
  const pct = (v) => Math.round((v / max) * 100);

  const levels = [
    { label: 'Entry', value: entry, color: '#ffffff30' },
    { label: 'Mid', value: mid, color: '#818cf8' },
    { label: 'Senior', value: senior, color: '#34d399' },
    { label: 'Lead', value: lead, color: '#f59e0b' },
  ];

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-black/[0.025] p-6 my-6">
      <h3 className="text-sm font-semibold text-black/50 uppercase tracking-wider mb-5">Salary Range</h3>
      <div className="space-y-4">
        {levels.map(({ label, value, color }) => (
          <div key={label}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-medium text-black/60">{label}</span>
              <span className="text-sm font-bold" style={{ color }}>{fmt(value)}</span>
            </div>
            <div className="h-2 rounded-full bg-black/[0.04]">
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${pct(value)}%`, backgroundColor: color, opacity: 0.85 }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-black/30 mt-4">Annual gross salary, UK £GBP. Data updated {new Date().getFullYear()}.</p>
    </div>
  );
}
