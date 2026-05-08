'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus as MinusIcon, Plus, Scale, Target, Camera } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import Card from '@/components/ui/Card';
import StatBar from '@/components/ui/StatBar';
import PageHeader from '@/components/ui/PageHeader';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { INITIAL_METRICS, GOAL_METRICS, getTodayKey } from '@/utils/data';
import { format } from 'date-fns';

const MEASUREMENTS = [
  { id: 'waist', label: 'Waist', unit: 'cm', goal: GOAL_METRICS.waist, goalDir: 'down', color: '#f59e0b' },
  { id: 'chest', label: 'Chest', unit: 'cm', goal: GOAL_METRICS.chest, goalDir: 'up', color: '#00d4ff' },
  { id: 'arms',  label: 'Arms',  unit: 'cm', goal: GOAL_METRICS.arms,  goalDir: 'up', color: '#a78bfa' },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs border border-white/10">
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-bold">{p.value} {p.unit || 'kg'}</p>
      ))}
    </div>
  );
}

function TrendIcon({ value, target, dir = 'up' }) {
  const positive = dir === 'up' ? value >= target : value <= target;
  if (value === target) return <MinusIcon size={14} className="text-white/30" />;
  return positive
    ? <TrendingUp size={14} className="text-[#22c55e]" />
    : <TrendingDown size={14} className="text-[#ef4444]" />;
}

export default function MetricsPage() {
  const todayKey = getTodayKey();
  const [metricsLog, setMetricsLog] = useLocalStorage('apice_metrics_log', []);
  const [currentMetrics, setCurrentMetrics] = useLocalStorage('apice_current_metrics', INITIAL_METRICS);
  const [form, setForm] = useState({
    weight: '',
    bodyFat: '',
    muscleMass: '',
    waist: '',
    chest: '',
    arms: '',
  });
  const [activeTab, setActiveTab] = useState('weight');

  const logEntry = () => {
    const entry = {
      date: todayKey,
      label: format(new Date(), 'MMM d'),
      ...Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v ? parseFloat(v) : undefined])
      ),
    };
    const filtered = Object.fromEntries(Object.entries(entry).filter(([, v]) => v !== undefined && v !== ''));
    if (Object.keys(filtered).length <= 2) return; // only date/label

    setMetricsLog(prev => {
      const existing = prev.findIndex(e => e.date === todayKey);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], ...filtered };
        return updated;
      }
      return [...prev, filtered];
    });
    setCurrentMetrics(prev => ({ ...prev, ...filtered }));
    setForm({ weight: '', bodyFat: '', muscleMass: '', waist: '', chest: '', arms: '' });
  };

  // Build chart data — last 14 entries or sample
  const chartData = (() => {
    if (metricsLog.length >= 2) {
      return metricsLog.slice(-14).map(e => ({
        label: e.label,
        weight: e.weight,
        bodyFat: e.bodyFat,
        waist: e.waist,
        chest: e.chest,
        arms: e.arms,
      }));
    }
    // Sample data so chart isn't empty
    const base = currentMetrics.weight || 78;
    return Array.from({ length: 8 }, (_, i) => ({
      label: format(new Date(Date.now() - (7 - i) * 86400000), 'MMM d'),
      weight: +(base - 0.15 * (7 - i) + (Math.random() - 0.4) * 0.2).toFixed(1),
    }));
  })();

  const current = currentMetrics;
  const start = INITIAL_METRICS;
  const goal = GOAL_METRICS;

  const weightProgress = start.weight && goal.weight
    ? ((current.weight - start.weight) / (goal.weight - start.weight)) * 100
    : 0;

  const bfProgress = start.bodyFat && goal.bodyFat
    ? ((start.bodyFat - current.bodyFat) / (start.bodyFat - goal.bodyFat)) * 100
    : 0;

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto md:max-w-none md:px-8 md:py-10">
      <PageHeader title="Body Metrics" subtitle="Lean Bulk Progress" />

      {/* Key stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Weight',      value: current.weight,     unit: 'kg',  goal: goal.weight,     color: '#00d4ff', dir: 'up' },
          { label: 'Body Fat',    value: current.bodyFat,    unit: '%',   goal: goal.bodyFat,    color: '#f59e0b', dir: 'down' },
          { label: 'Muscle Mass', value: current.muscleMass, unit: 'kg',  goal: goal.muscleMass, color: '#22c55e', dir: 'up' },
        ].map(({ label, value, unit, goal: g, color, dir }, i) => (
          <Card key={label} delay={0.05 + i * 0.05} className="text-center py-4">
            <p className="text-lg font-bold" style={{ color }}>{value ?? '—'}<span className="text-xs text-white/30 ml-0.5">{unit}</span></p>
            <p className="text-[11px] text-white/30 mt-1">{label}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendIcon value={value || 0} target={g} dir={dir} />
              <span className="text-[10px] text-white/20">→ {g}{unit}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Weight chart */}
      <Card className="mb-4" delay={0.15}>
        <div className="flex gap-2 mb-4">
          {['weight', 'bodyFat', 'measurements'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab
                  ? 'bg-[#00d4ff20] text-[#00d4ff] border border-[#00d4ff30]'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab === 'weight' ? 'Weight' : tab === 'bodyFat' ? 'Body Fat' : 'Measurements'}
            </button>
          ))}
        </div>

        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'measurements' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip content={<CustomTooltip />} />
                {MEASUREMENTS.map(m => (
                  <Line key={m.id} type="monotone" dataKey={m.id} stroke={m.color} strokeWidth={2} dot={false} />
                ))}
              </LineChart>
            ) : (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activeTab === 'weight' ? '#00d4ff' : '#f59e0b'} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={activeTab === 'weight' ? '#00d4ff' : '#f59e0b'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} width={32}
                  domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={activeTab}
                  stroke={activeTab === 'weight' ? '#00d4ff' : '#f59e0b'}
                  strokeWidth={2}
                  fill="url(#colorGrad)"
                  dot={false}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Lean bulk progress */}
      <Card className="mb-4" delay={0.2}>
        <h3 className="text-sm font-semibold mb-4">Lean Bulk Progress</h3>
        <div className="space-y-4">
          {[
            { label: 'Weight', current: current.weight, start: start.weight, goal: goal.weight, unit: 'kg', color: '#00d4ff', dir: 1 },
            { label: 'Body Fat', current: current.bodyFat, start: start.bodyFat, goal: goal.bodyFat, unit: '%', color: '#f59e0b', dir: -1 },
            { label: 'Muscle Mass', current: current.muscleMass, start: start.muscleMass, goal: goal.muscleMass, unit: 'kg', color: '#22c55e', dir: 1 },
          ].map(({ label, current: cur, start: s, goal: g, unit, color, dir }) => {
            const pct = dir > 0
              ? Math.min(100, Math.max(0, ((cur - s) / (g - s)) * 100))
              : Math.min(100, Math.max(0, ((s - cur) / (s - g)) * 100));
            return (
              <div key={label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-white/60">{label}</span>
                  <div className="flex gap-3 text-xs">
                    <span className="text-white/30">Start: {s}{unit}</span>
                    <span style={{ color }} className="font-medium">{cur}{unit}</span>
                    <span className="text-white/20">Goal: {g}{unit}</span>
                  </div>
                </div>
                <StatBar value={pct} max={100} color={color} height={5} delay={0.4} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Measurements */}
      <Card className="mb-4" delay={0.25}>
        <h3 className="text-sm font-semibold mb-4">Body Measurements</h3>
        <div className="space-y-3">
          {MEASUREMENTS.map(({ id, label, unit, goal: g, goalDir, color }) => {
            const val = current[id] || 0;
            const pct = goalDir === 'up'
              ? Math.min(100, (val / g) * 100)
              : Math.min(100, ((g + 20 - val) / 20) * 100);
            return (
              <div key={id}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-white/60">{label}</span>
                  <div className="flex gap-3 text-xs">
                    <span style={{ color }} className="font-medium">{val}{unit}</span>
                    <span className="text-white/20">Goal: {g}{unit}</span>
                  </div>
                </div>
                <StatBar value={pct} max={100} color={color} height={4} delay={0.4} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Log new entry */}
      <Card delay={0.3}>
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Scale size={14} className="text-[#00d4ff]" />
          Log Today's Metrics
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { key: 'weight',     placeholder: 'Weight (kg)',     type: 'number' },
            { key: 'bodyFat',    placeholder: 'Body Fat (%)',    type: 'number' },
            { key: 'muscleMass', placeholder: 'Muscle Mass (kg)', type: 'number' },
            { key: 'waist',      placeholder: 'Waist (cm)',       type: 'number' },
            { key: 'chest',      placeholder: 'Chest (cm)',       type: 'number' },
            { key: 'arms',       placeholder: 'Arms (cm)',        type: 'number' },
          ].map(({ key, placeholder }) => (
            <input
              key={key}
              type="number"
              step="0.1"
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00d4ff40] transition-colors"
            />
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={logEntry}
          className="w-full py-3 rounded-xl bg-[#00d4ff] text-black font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={14} /> Log Metrics
        </motion.button>

        {/* Progress photo placeholder */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full mt-2 py-3 rounded-xl border border-dashed border-white/10 text-white/30 text-sm flex items-center justify-center gap-2 hover:border-white/20 hover:text-white/50 transition-all"
        >
          <Camera size={14} /> Add Progress Photo
        </motion.button>
      </Card>
    </main>
  );
}
