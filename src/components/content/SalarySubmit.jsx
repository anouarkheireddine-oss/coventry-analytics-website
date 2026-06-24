'use client';
import { useState } from 'react';

export default function SalarySubmit({ defaultRole = '', defaultLocation = '' }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    role: defaultRole,
    location: defaultLocation,
    level: 'mid',
    salary: '',
    companySize: 'scale-up',
  });
  const [status, setStatus] = useState('idle');

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/salary-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // show success anyway
    }
    setStatus('done');
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-[#818cf825] bg-[#818cf806] p-4 text-center">
        <p className="text-sm font-semibold text-[#818cf8] mb-1">Thank you.</p>
        <p className="text-xs text-black/40">Your anonymous submission helps calibrate the data for everyone.</p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-dashed border-black/[0.12] bg-transparent hover:bg-black/[0.02] transition-colors p-4 text-center group"
      >
        <p className="text-xs text-black/30 group-hover:text-black/50 transition-colors">
          Know your salary for this role? <span className="text-[#818cf8]">Share it anonymously →</span>
        </p>
        <p className="text-[10px] text-black/20 mt-0.5">No name, no employer, no email. Helps improve the data.</p>
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-black/[0.09] bg-black/[0.02] p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[11px] text-black/35 font-semibold uppercase tracking-widest mb-0.5">Share your salary</p>
          <p className="text-xs text-black/45">Anonymous. No name, no employer, no email.</p>
        </div>
        <button onClick={() => setOpen(false)} className="text-black/25 hover:text-black/50 text-lg leading-none">×</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <input
          type="text"
          value={form.role}
          onChange={e => update('role', e.target.value)}
          placeholder="Role (e.g. Software Engineer)"
          className="w-full bg-black/[0.03] border border-black/[0.10] rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-black/25 focus:outline-none focus:border-[#818cf850] transition-colors"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={form.location}
            onChange={e => update('location', e.target.value)}
            placeholder="City"
            className="bg-black/[0.03] border border-black/[0.10] rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-black/25 focus:outline-none focus:border-[#818cf850] transition-colors"
          />
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40 font-bold text-sm select-none">£</span>
            <input
              type="text"
              inputMode="numeric"
              value={form.salary}
              onChange={e => update('salary', e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="75,000"
              className="w-full bg-black/[0.03] border border-black/[0.10] rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-900 placeholder-black/25 focus:outline-none focus:border-[#818cf850] transition-colors"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={form.level}
            onChange={e => update('level', e.target.value)}
            className="bg-black/[0.03] border border-black/[0.10] rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#818cf850] transition-colors"
          >
            <option value="entry">Entry level</option>
            <option value="mid">Mid level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead / Principal</option>
          </select>
          <select
            value={form.companySize}
            onChange={e => update('companySize', e.target.value)}
            className="bg-black/[0.03] border border-black/[0.10] rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#818cf850] transition-colors"
          >
            <option value="startup">Startup (&lt;50)</option>
            <option value="scale-up">Scale-up (50–500)</option>
            <option value="enterprise">Enterprise (500+)</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={!form.role || !form.salary || status === 'loading'}
          className="w-full py-2.5 rounded-xl bg-black/[0.05] border border-black/[0.10] text-sm font-semibold text-black/60 hover:bg-black/[0.08] hover:text-gray-900 transition-all disabled:opacity-40"
        >
          Submit anonymously →
        </button>
      </form>
    </div>
  );
}
