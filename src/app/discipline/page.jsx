'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Flame, Plus, Trash2, Target, Star } from 'lucide-react';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';
import StatBar from '@/components/ui/StatBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DAILY_TASKS, getLast7Days, getTodayKey } from '@/utils/data';
import { format } from 'date-fns';

const HABIT_COLORS = {
  training:  '#00d4ff',
  protein:   '#22c55e',
  sleep:     '#a78bfa',
  water:     '#38bdf8',
  steps:     '#f59e0b',
};

const WEEKLY_GOALS_DEFAULT = [
  { id: '1', text: 'Train 5 days this week',          done: false },
  { id: '2', text: 'Hit protein target every day',     done: false },
  { id: '3', text: 'No junk food',                     done: false },
  { id: '4', text: 'Cold shower every morning',        done: false },
];

export default function DisciplinePage() {
  const todayKey = getTodayKey();
  const [tasks, setTasks] = useLocalStorage('apice_tasks', {});
  const [weeklyGoals, setWeeklyGoals] = useLocalStorage('apice_weekly_goals', WEEKLY_GOALS_DEFAULT);
  const [customTasks, setCustomTasks] = useLocalStorage('apice_custom_tasks', []);
  const [newTask, setNewTask] = useState('');
  const [nutrition] = useLocalStorage('apice_nutrition', {});
  const [training] = useLocalStorage('apice_training', {});

  const todayTasks = tasks[todayKey] || {};

  const toggleTask = (id) => {
    setTasks(prev => ({
      ...prev,
      [todayKey]: { ...todayTasks, [id]: !todayTasks[id] },
    }));
  };

  const toggleGoal = (id) => {
    setWeeklyGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const addCustomTask = () => {
    if (!newTask.trim()) return;
    setCustomTasks(prev => [...prev, { id: Date.now().toString(), text: newTask.trim() }]);
    setNewTask('');
  };

  const removeCustomTask = (id) => {
    setCustomTasks(prev => prev.filter(t => t.id !== id));
  };

  const last7 = getLast7Days();

  // Compute streaks from storage
  const getStreak = (taskId) => {
    let streak = 0;
    const days = [...last7].reverse();
    for (const d of days) {
      const done = tasks[d]?.[taskId]
        || (taskId === 'training' && training[d]?.completed)
        || (taskId === 'protein' && (nutrition[d]?.protein || 0) >= 124);
      if (done) streak++;
      else break;
    }
    return streak;
  };

  // Auto-sync training/protein from other stores
  const getTaskDone = (id) => {
    if (id === 'training') return todayTasks.training || training[todayKey]?.completed || false;
    if (id === 'protein') return todayTasks.protein || (nutrition[todayKey]?.protein || 0) >= 124;
    return todayTasks[id] || false;
  };

  const completedCount = DAILY_TASKS.filter(t => getTaskDone(t.id)).length;
  const totalCount = DAILY_TASKS.length + customTasks.length;
  const score = Math.round((completedCount / DAILY_TASKS.length) * 100);

  const weekScores = last7.map(d => {
    const dayTasks = tasks[d] || {};
    const done = DAILY_TASKS.filter(t =>
      dayTasks[t.id]
      || (t.id === 'training' && training[d]?.completed)
      || (t.id === 'protein' && (nutrition[d]?.protein || 0) >= 124)
    ).length;
    return { date: d, label: format(new Date(d + 'T12:00:00'), 'EEE'), score: Math.round((done / DAILY_TASKS.length) * 100) };
  });

  const avgScore = Math.round(weekScores.reduce((s, d) => s + d.score, 0) / weekScores.length);

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto md:max-w-none md:px-8 md:py-10">
      <PageHeader title="Discipline" subtitle="Non-negotiables first." />

      {/* Score summary */}
      <Card className="mb-4" delay={0.05}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold">{score}<span className="text-sm text-white/40 ml-1">%</span></p>
            <p className="text-xs text-white/40 mt-0.5">Today's discipline score</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#f59e0b]">{avgScore}<span className="text-sm text-white/40 ml-1">%</span></p>
            <p className="text-xs text-white/40 mt-0.5">7-day average</p>
          </div>
        </div>
        <StatBar value={score} max={100} color={score >= 80 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444'} delay={0.3} />
      </Card>

      {/* Non-negotiables */}
      <Card className="mb-4" delay={0.1}>
        <div className="flex items-center gap-2 mb-4">
          <Star size={14} className="text-[#f59e0b]" />
          <h3 className="text-sm font-semibold">Non-Negotiables</h3>
          <span className="ml-auto text-xs text-white/30">{completedCount}/{DAILY_TASKS.length}</span>
        </div>
        <div className="space-y-2">
          {DAILY_TASKS.map((task, i) => {
            const done = getTaskDone(task.id);
            const streak = getStreak(task.id);
            const accentColor = HABIT_COLORS[task.id] || '#00d4ff';
            return (
              <motion.button
                key={task.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleTask(task.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  done
                    ? 'bg-white/[0.04] border border-white/[0.06]'
                    : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                <motion.div
                  animate={done ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {done
                    ? <CheckCircle2 size={18} style={{ color: accentColor }} />
                    : <Circle size={18} className="text-white/20" />}
                </motion.div>
                <span className={`flex-1 text-sm text-left font-medium ${done ? 'text-white/40 line-through' : 'text-white/80'}`}>
                  {task.label}
                </span>
                {streak > 0 && (
                  <div className="flex items-center gap-1 text-[10px]">
                    <Flame size={11} className="text-[#f59e0b]" />
                    <span className="text-white/40">{streak}d</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </Card>

      {/* Weekly goals */}
      <Card className="mb-4" delay={0.2}>
        <div className="flex items-center gap-2 mb-4">
          <Target size={14} className="text-[#00d4ff]" />
          <h3 className="text-sm font-semibold">Weekly Goals</h3>
          <span className="ml-auto text-xs text-white/30">
            {weeklyGoals.filter(g => g.done).length}/{weeklyGoals.length}
          </span>
        </div>
        <div className="space-y-2">
          {weeklyGoals.map((goal, i) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleGoal(goal.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                goal.done
                  ? 'bg-[#22c55e08] border border-[#22c55e15]'
                  : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              {goal.done
                ? <CheckCircle2 size={16} className="text-[#22c55e] flex-shrink-0" />
                : <Circle size={16} className="text-white/20 flex-shrink-0" />}
              <span className={`text-sm flex-1 ${goal.done ? 'text-white/40 line-through' : 'text-white/80'}`}>
                {goal.text}
              </span>
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Custom tasks */}
      <Card className="mb-4" delay={0.3}>
        <h3 className="text-sm font-semibold mb-4">Custom Tasks</h3>
        <div className="space-y-2 mb-3">
          <AnimatePresence>
            {customTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <button onClick={() => toggleTask(`custom_${task.id}`)}>
                  {todayTasks[`custom_${task.id}`]
                    ? <CheckCircle2 size={16} className="text-[#a78bfa]" />
                    : <Circle size={16} className="text-white/20" />}
                </button>
                <span className={`flex-1 text-sm ${todayTasks[`custom_${task.id}`] ? 'text-white/40 line-through' : 'text-white/70'}`}>
                  {task.text}
                </span>
                <button onClick={() => removeCustomTask(task.id)} className="text-white/20 hover:text-[#ef4444] transition-colors">
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustomTask()}
            placeholder="Add a task..."
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00d4ff40] transition-colors"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addCustomTask}
            className="w-10 h-10 rounded-xl bg-[#00d4ff] text-black flex items-center justify-center flex-shrink-0"
          >
            <Plus size={16} />
          </motion.button>
        </div>
      </Card>

      {/* Week heatmap */}
      <Card delay={0.4}>
        <h3 className="text-sm font-semibold mb-4">7-Day Discipline Score</h3>
        <div className="flex gap-2">
          {weekScores.map(({ date, label, score: s }, i) => {
            const color = s >= 80 ? '#22c55e' : s >= 50 ? '#f59e0b' : s > 0 ? '#ef4444' : undefined;
            return (
              <div key={date} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className="w-full h-16 rounded-xl flex items-center justify-center text-xs font-bold"
                  style={{
                    background: color ? `${color}15` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${color ? `${color}25` : 'rgba(255,255,255,0.05)'}`,
                    color: color || 'rgba(255,255,255,0.2)',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  {s > 0 ? `${s}%` : '—'}
                </motion.div>
                <span className="text-[10px] text-white/30">{label}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </main>
  );
}
