'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
  Flame, Zap, TrendingUp, Droplets, Target,
  CheckCircle2, Circle, ArrowRight, Plus,
} from 'lucide-react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import ProgressRing from '@/components/ui/ProgressRing';
import StatBar from '@/components/ui/StatBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  PROTEIN_TARGET, getTodayKey, getLast7Days,
  getFocusMessage, DAILY_TASKS,
} from '@/utils/data';

export default function Dashboard() {
  const todayKey = getTodayKey();
  const [nutrition] = useLocalStorage('apice_nutrition', {});
  const [training] = useLocalStorage('apice_training', {});
  const [tasks] = useLocalStorage('apice_tasks', {});
  const [metrics] = useLocalStorage('apice_metrics_log', []);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const todayNutrition = nutrition[todayKey] || {};
  const todayTraining = training[todayKey] || {};
  const todayTasks = tasks[todayKey] || {};

  const proteinEaten = todayNutrition.protein || 0;
  const proteinPct = Math.min((proteinEaten / PROTEIN_TARGET) * 100, 100);
  const waterCups = todayNutrition.water || 0;

  const workoutDone = todayTraining.completed || false;

  const last7 = getLast7Days();
  const streak = (() => {
    let s = 0;
    for (let i = last7.length - 1; i >= 0; i--) {
      const d = last7[i];
      const dayDone = (tasks[d]?.training || training[d]?.completed);
      if (dayDone) s++;
      else if (i < last7.length - 1) break;
    }
    return s;
  })();

  const weekConsistency = (() => {
    const done = last7.filter(d => training[d]?.completed || tasks[d]?.training).length;
    return Math.round((done / 7) * 100);
  })();

  const latestWeight = metrics.length ? metrics[metrics.length - 1].weight : null;

  const tasksCompleted = DAILY_TASKS.filter(t => todayTasks[t.id]).length;
  const tasksPct = Math.round((tasksCompleted / DAILY_TASKS.length) * 100);

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto md:max-w-none md:px-8 md:py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/40 font-medium">
              {format(now, 'EEEE, MMMM d')}
            </p>
            <h1 className="text-3xl font-bold mt-1">
              {greeting} <span className="neon-text">.</span>
            </h1>
          </div>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-xl bg-[#00d4ff10] border border-[#00d4ff20] flex items-center justify-center"
          >
            <Zap size={18} className="text-[#00d4ff]" />
          </motion.div>
        </div>

        {/* Focus message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
        >
          <p className="text-sm text-white/50 italic">"{getFocusMessage()}"</p>
        </motion.div>
      </motion.div>

      {/* Top stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4 md:grid-cols-4">
        {/* Protein ring */}
        <Card delay={0.1} className="flex flex-col items-center gap-3 py-5">
          <ProgressRing
            value={proteinEaten}
            max={PROTEIN_TARGET}
            size={72}
            strokeWidth={5}
            color="#00d4ff"
            label={`${proteinEaten}g`}
            sublabel="protein"
          />
          <div className="text-center">
            <p className="text-xs text-white/40">of {PROTEIN_TARGET}g target</p>
          </div>
        </Card>

        {/* Workout status */}
        <Card delay={0.15} className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Workout</span>
            {workoutDone
              ? <CheckCircle2 size={16} className="text-[#22c55e]" />
              : <Circle size={16} className="text-white/20" />}
          </div>
          <div>
            <p className={`text-2xl font-bold ${workoutDone ? 'text-[#22c55e]' : 'text-white/30'}`}>
              {workoutDone ? 'Done' : 'Pending'}
            </p>
            <p className="text-xs text-white/30 mt-1">Today's session</p>
          </div>
        </Card>

        {/* Streak */}
        <Card delay={0.2} className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Streak</span>
            <Flame size={16} className={streak > 0 ? 'text-[#f59e0b]' : 'text-white/20'} />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {streak}
              <span className="text-sm text-white/40 ml-1">days</span>
            </p>
            <p className="text-xs text-white/30 mt-1">Current streak</p>
          </div>
        </Card>

        {/* Weight */}
        <Card delay={0.25} className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Weight</span>
            <TrendingUp size={16} className="text-white/20" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {latestWeight ? `${latestWeight}` : '—'}
              <span className="text-sm text-white/40 ml-1">kg</span>
            </p>
            <p className="text-xs text-white/30 mt-1">Last recorded</p>
          </div>
        </Card>
      </div>

      {/* Progress bars row */}
      <div className="grid grid-cols-1 gap-3 mb-4 md:grid-cols-2">
        {/* Weekly consistency */}
        <Card delay={0.3}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white">Weekly Consistency</p>
              <p className="text-xs text-white/40 mt-0.5">Training sessions this week</p>
            </div>
            <span className="text-lg font-bold text-[#00d4ff]">{weekConsistency}%</span>
          </div>
          <StatBar value={weekConsistency} max={100} color="#00d4ff" delay={0.5} />
          <div className="flex justify-between mt-2">
            {last7.map((d, i) => {
              const done = training[d]?.completed || tasks[d]?.training;
              return (
                <motion.div
                  key={d}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-semibold ${
                    done ? 'bg-[#00d4ff20] text-[#00d4ff]' : 'bg-white/[0.04] text-white/20'
                  }`}
                >
                  {format(new Date(d + 'T12:00:00'), 'EEEEE')}
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Daily tasks */}
        <Card delay={0.35}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white">Daily Non-Negotiables</p>
              <p className="text-xs text-white/40 mt-0.5">{tasksCompleted} of {DAILY_TASKS.length} complete</p>
            </div>
            <span className="text-lg font-bold text-[#22c55e]">{tasksPct}%</span>
          </div>
          <StatBar value={tasksCompleted} max={DAILY_TASKS.length} color="#22c55e" delay={0.5} />
          <div className="mt-3 space-y-1.5">
            {DAILY_TASKS.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-2">
                {todayTasks[task.id]
                  ? <CheckCircle2 size={14} className="text-[#22c55e] flex-shrink-0" />
                  : <Circle size={14} className="text-white/20 flex-shrink-0" />
                }
                <span className={`text-xs ${todayTasks[task.id] ? 'text-white/60 line-through' : 'text-white/40'}`}>
                  {task.label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Hydration */}
      <Card delay={0.4} className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets size={18} className="text-[#00d4ff]" />
            <span className="text-sm font-semibold">Hydration</span>
          </div>
          <span className="text-sm text-white/60">{waterCups} / 8 cups</span>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.04 }}
              className={`flex-1 h-8 rounded-lg border transition-all ${
                i < waterCups
                  ? 'bg-[#00d4ff20] border-[#00d4ff30]'
                  : 'bg-white/[0.03] border-white/[0.06]'
              }`}
            />
          ))}
        </div>
      </Card>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {[
          { href: '/training',   label: 'Start Workout', icon: Zap,    color: '#00d4ff' },
          { href: '/nutrition',  label: 'Log Protein',   icon: Target,  color: '#22c55e' },
          { href: '/metrics',    label: 'Log Weight',    icon: TrendingUp, color: '#f59e0b' },
          { href: '/discipline', label: 'Check Tasks',   icon: CheckCircle2, color: '#a78bfa' },
        ].map(({ href, label, icon: Icon, color }, i) => (
          <Link key={href} href={href}>
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="glass glass-hover rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all duration-200"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}15`, boxShadow: `0 0 12px ${color}20` }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white leading-tight">{label}</p>
              </div>
              <ArrowRight size={12} className="text-white/20 flex-shrink-0" />
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </main>
  );
}
