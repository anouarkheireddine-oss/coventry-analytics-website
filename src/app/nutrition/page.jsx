'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Plus, Minus, Droplets, Target, Flame } from 'lucide-react';
import Card from '@/components/ui/Card';
import ProgressRing from '@/components/ui/ProgressRing';
import StatBar from '@/components/ui/StatBar';
import PageHeader from '@/components/ui/PageHeader';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PROTEIN_TARGET, BREAKFAST_ITEMS, SHAKE_ITEMS, getLast7Days, getTodayKey } from '@/utils/data';

const EXTRA_SOURCES = [
  { id: 'chicken', label: 'Chicken Breast (150g)', protein: 45 },
  { id: 'tuna',    label: 'Canned Tuna (120g)',    protein: 28 },
  { id: 'cottage', label: 'Cottage Cheese (200g)', protein: 24 },
  { id: 'beef',    label: 'Ground Beef (150g)',     protein: 35 },
  { id: 'salmon',  label: 'Salmon (150g)',          protein: 34 },
  { id: 'custom',  label: 'Custom source',          protein: 0  },
];

export default function NutritionPage() {
  const todayKey = getTodayKey();
  const [nutrition, setNutrition] = useLocalStorage('forge_nutrition', {});
  const [customProtein, setCustomProtein] = useState('');

  const today = nutrition[todayKey] || { breakfast: {}, shake: {}, extras: {}, water: 0, protein: 0 };

  const update = (patch) => {
    setNutrition(prev => ({
      ...prev,
      [todayKey]: { ...today, ...patch },
    }));
  };

  const toggleBreakfast = (id) => {
    const checked = today.breakfast?.[id];
    const item = BREAKFAST_ITEMS.find(i => i.id === id);
    const delta = checked ? -item.protein : item.protein;
    update({
      breakfast: { ...today.breakfast, [id]: !checked },
      protein: Math.max(0, (today.protein || 0) + delta),
    });
  };

  const toggleShake = (id) => {
    const checked = today.shake?.[id];
    const item = SHAKE_ITEMS.find(i => i.id === id);
    const delta = checked ? -item.protein : item.protein;
    update({
      shake: { ...today.shake, [id]: !checked },
      protein: Math.max(0, (today.protein || 0) + delta),
    });
  };

  const toggleExtra = (id) => {
    const source = EXTRA_SOURCES.find(s => s.id === id);
    if (!source) return;
    const checked = today.extras?.[id];
    const delta = checked ? -source.protein : source.protein;
    update({
      extras: { ...today.extras, [id]: !checked },
      protein: Math.max(0, (today.protein || 0) + delta),
    });
  };

  const addCustomProtein = () => {
    const val = parseInt(customProtein, 10);
    if (!val || val <= 0) return;
    update({ protein: (today.protein || 0) + val });
    setCustomProtein('');
  };

  const setWater = (delta) => {
    update({ water: Math.max(0, Math.min(12, (today.water || 0) + delta)) });
  };

  const protein = today.protein || 0;
  const water = today.water || 0;
  const remaining = Math.max(0, PROTEIN_TARGET - protein);

  const last7 = getLast7Days();
  const adherenceScore = (() => {
    const days = last7.filter(d => (nutrition[d]?.protein || 0) >= PROTEIN_TARGET).length;
    return Math.round((days / 7) * 100);
  })();

  const breakfastProtein = BREAKFAST_ITEMS.filter(i => today.breakfast?.[i.id]).reduce((s, i) => s + i.protein, 0);
  const shakeProtein = SHAKE_ITEMS.filter(i => today.shake?.[i.id]).reduce((s, i) => s + i.protein, 0);

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto md:max-w-none md:px-8 md:py-10">
      <PageHeader title="Nutrition" subtitle="Hit your protein. Keep it simple." />

      {/* Protein overview */}
      <Card className="mb-4 flex items-center gap-6" delay={0.05}>
        <ProgressRing
          value={protein}
          max={PROTEIN_TARGET}
          size={100}
          strokeWidth={7}
          color={protein >= PROTEIN_TARGET ? '#22c55e' : '#00d4ff'}
          label={`${protein}g`}
          sublabel="eaten"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Target size={14} className="text-[#00d4ff]" />
            <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Daily Protein Target</span>
          </div>
          <p className="text-3xl font-bold text-white">{PROTEIN_TARGET}<span className="text-lg text-white/40">g</span></p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-white/40">
              <span>Progress</span>
              <span>{Math.min(100, Math.round((protein / PROTEIN_TARGET) * 100))}%</span>
            </div>
            <StatBar value={protein} max={PROTEIN_TARGET} color={protein >= PROTEIN_TARGET ? '#22c55e' : '#00d4ff'} delay={0.3} />
            {remaining > 0 && (
              <p className="text-xs text-white/30">{remaining}g remaining</p>
            )}
            {protein >= PROTEIN_TARGET && (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-[#22c55e] font-medium"
              >
                ✓ Target reached!
              </motion.p>
            )}
          </div>
        </div>
      </Card>

      {/* Breakdown row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Breakfast', value: breakfastProtein, color: '#f59e0b' },
          { label: 'Shake',     value: shakeProtein,     color: '#a78bfa' },
          { label: 'Extras',    value: protein - breakfastProtein - shakeProtein, color: '#00d4ff' },
        ].map(({ label, value, color }, i) => (
          <Card key={label} delay={0.1 + i * 0.05} className="text-center py-4">
            <p className="text-lg font-bold" style={{ color }}>{Math.max(0, value)}g</p>
            <p className="text-[11px] text-white/30 mt-1">{label}</p>
          </Card>
        ))}
      </div>

      {/* Breakfast tracker */}
      <Card className="mb-4" delay={0.2}>
        <div className="flex items-center gap-2 mb-4">
          <Flame size={16} className="text-[#f59e0b]" />
          <h3 className="text-sm font-semibold">Breakfast</h3>
          <span className="ml-auto text-xs text-white/30">{breakfastProtein}g protein</span>
        </div>
        <div className="space-y-2">
          {BREAKFAST_ITEMS.map((item) => {
            const checked = !!today.breakfast?.[item.id];
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleBreakfast(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  checked ? 'bg-[#f59e0b10] border border-[#f59e0b20]' : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                {checked
                  ? <CheckCircle2 size={16} className="text-[#f59e0b] flex-shrink-0" />
                  : <Circle size={16} className="text-white/20 flex-shrink-0" />}
                <span className={`text-sm flex-1 text-left ${checked ? 'text-white/60' : 'text-white/80'}`}>{item.label}</span>
                <span className="text-xs text-white/30 font-mono">{item.protein}g</span>
              </motion.button>
            );
          })}
        </div>
      </Card>

      {/* Protein shake */}
      <Card className="mb-4" delay={0.25}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 rounded bg-[#a78bfa30] flex items-center justify-center">
            <span className="text-[10px]">💪</span>
          </div>
          <h3 className="text-sm font-semibold">Protein Shake</h3>
          <span className="ml-auto text-xs text-white/30">{shakeProtein}g protein</span>
        </div>
        <div className="space-y-2">
          {SHAKE_ITEMS.map((item) => {
            const checked = !!today.shake?.[item.id];
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleShake(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  checked ? 'bg-[#a78bfa10] border border-[#a78bfa20]' : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                {checked
                  ? <CheckCircle2 size={16} className="text-[#a78bfa] flex-shrink-0" />
                  : <Circle size={16} className="text-white/20 flex-shrink-0" />}
                <span className={`text-sm flex-1 text-left ${checked ? 'text-white/60' : 'text-white/80'}`}>{item.label}</span>
                <span className="text-xs text-white/30 font-mono">{item.protein}g</span>
              </motion.button>
            );
          })}
        </div>
      </Card>

      {/* Extra protein sources */}
      <Card className="mb-4" delay={0.3}>
        <h3 className="text-sm font-semibold mb-4">Additional Sources</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {EXTRA_SOURCES.filter(s => s.id !== 'custom').map((source) => {
            const checked = !!today.extras?.[source.id];
            return (
              <motion.button
                key={source.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleExtra(source.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all ${
                  checked ? 'bg-[#00d4ff10] border border-[#00d4ff20]' : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                {checked
                  ? <CheckCircle2 size={14} className="text-[#00d4ff] flex-shrink-0" />
                  : <Circle size={14} className="text-white/20 flex-shrink-0" />}
                <div className="min-w-0">
                  <p className="text-xs text-white/70 truncate">{source.label}</p>
                  <p className="text-[10px] text-white/30">{source.protein}g</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Custom protein */}
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            value={customProtein}
            onChange={e => setCustomProtein(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustomProtein()}
            placeholder="Add custom (g)"
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00d4ff40] transition-colors"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addCustomProtein}
            className="px-4 py-2.5 rounded-xl bg-[#00d4ff] text-black text-sm font-semibold"
          >
            Add
          </motion.button>
        </div>
      </Card>

      {/* Hydration */}
      <Card className="mb-4" delay={0.35}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-[#00d4ff]" />
            <h3 className="text-sm font-semibold">Hydration</h3>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setWater(-1)} className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-colors">
              <Minus size={12} className="text-white/60" />
            </button>
            <span className="text-lg font-bold w-14 text-center">{water} <span className="text-xs text-white/40">cups</span></span>
            <button onClick={() => setWater(1)} className="w-7 h-7 rounded-lg bg-[#00d4ff20] flex items-center justify-center hover:bg-[#00d4ff30] transition-colors">
              <Plus size={12} className="text-[#00d4ff]" />
            </button>
          </div>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.9 }}
              onClick={() => update({ water: i + 1 === water ? i : i + 1 })}
              className={`flex-1 h-10 rounded-xl transition-all duration-200 flex items-end justify-center pb-1.5 ${
                i < water
                  ? 'bg-[#00d4ff20] border border-[#00d4ff30]'
                  : 'bg-white/[0.03] border border-white/[0.06]'
              }`}
            >
              <Droplets size={10} className={i < water ? 'text-[#00d4ff]' : 'text-white/10'} />
            </motion.button>
          ))}
        </div>
        <p className="text-xs text-white/30 mt-2 text-right">Target: 8 cups / 2L</p>
      </Card>

      {/* Weekly adherence */}
      <Card delay={0.4}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Weekly Protein Adherence</h3>
          <span className="text-sm font-bold text-[#22c55e]">{adherenceScore}%</span>
        </div>
        <div className="flex gap-2">
          {last7.map((d, i) => {
            const dayProtein = nutrition[d]?.protein || 0;
            const met = dayProtein >= PROTEIN_TARGET;
            const pct = Math.min((dayProtein / PROTEIN_TARGET) * 100, 100);
            return (
              <div key={d} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full h-14 rounded-lg bg-white/[0.04] flex items-end overflow-hidden">
                  <motion.div
                    className="w-full rounded-lg"
                    style={{ background: met ? '#22c55e' : '#00d4ff', boxShadow: met ? '0 0 8px #22c55e40' : '0 0 8px #00d4ff40' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                  />
                </div>
                <span className="text-[10px] text-white/30">
                  {['M','T','W','T','F','S','S'][new Date(d + 'T12:00:00').getDay() === 0 ? 6 : new Date(d + 'T12:00:00').getDay() - 1]}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </main>
  );
}
