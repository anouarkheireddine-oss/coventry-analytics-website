'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle2, Plus, Minus, Timer, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { EXERCISES, getTodayKey } from '@/utils/data';

function pad(n) { return String(n).padStart(2, '0'); }

function WorkoutTimer({ running, onToggle, onReset }) {
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;

  return (
    <div className="flex items-center gap-4">
      <div className="font-mono text-2xl font-bold text-[#00d4ff] tracking-wider">
        {h > 0 && `${pad(h)}:`}{pad(m)}:{pad(s)}
      </div>
      <button
        onClick={onToggle}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
          running
            ? 'bg-[#00d4ff20] text-[#00d4ff] border border-[#00d4ff30]'
            : 'bg-[#00d4ff] text-black'
        }`}
      >
        {running ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <button
        onClick={() => { onReset(); setElapsed(0); }}
        className="w-9 h-9 rounded-xl bg-white/[0.04] text-white/40 flex items-center justify-center hover:text-white/70 transition-colors"
      >
        <RotateCcw size={14} />
      </button>
    </div>
  );
}

function ExerciseCard({ exercise, sessionData, onUpdate, prevData }) {
  const [expanded, setExpanded] = useState(false);
  const sets = sessionData?.sets || Array.from({ length: exercise.defaultSets }, () => ({
    reps: exercise.defaultReps,
    weight: exercise.defaultWeight,
    done: false,
  }));

  const updateSet = (i, field, delta) => {
    const next = sets.map((s, idx) =>
      idx === i ? { ...s, [field]: Math.max(0, s[field] + delta) } : s
    );
    onUpdate({ ...sessionData, sets: next });
  };

  const toggleSet = (i) => {
    const next = sets.map((s, idx) =>
      idx === i ? { ...s, done: !s.done } : s
    );
    onUpdate({ ...sessionData, sets: next });
  };

  const addSet = () => {
    const last = sets[sets.length - 1];
    onUpdate({ ...sessionData, sets: [...sets, { ...last, done: false }] });
  };

  const setsCompleted = sets.filter(s => s.done).length;
  const allDone = setsCompleted === sets.length;

  const prevBest = prevData?.sets
    ? Math.max(...prevData.sets.map(s => s.weight || 0))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${allDone ? 'border-[#22c55e20]' : 'border-white/[0.07]'}`}
      style={{ border: allDone ? '1px solid #22c55e25' : undefined }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
            allDone ? 'bg-[#22c55e20] text-[#22c55e]' : 'bg-white/[0.06] text-white/60'
          }`}>
            {allDone ? <CheckCircle2 size={16} /> : `${setsCompleted}/${sets.length}`}
          </div>
          <div>
            <p className={`font-semibold text-sm ${allDone ? 'text-white/60' : 'text-white'}`}>
              {exercise.name}
            </p>
            <p className="text-xs text-white/30 mt-0.5">{exercise.muscles}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {prevBest > 0 && (
            <span className="text-xs text-white/30 font-mono">PB {prevBest}kg</span>
          )}
          {expanded ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
        </div>
      </button>

      {/* Sets */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-white/[0.05] pt-3">
              {/* Column headers */}
              <div className="grid grid-cols-[32px_1fr_1fr_32px] gap-2 text-[10px] text-white/30 font-medium uppercase tracking-wider mb-1">
                <span>SET</span>
                <span className="text-center">REPS</span>
                <span className="text-center">WEIGHT (kg)</span>
                <span />
              </div>

              {sets.map((set, i) => (
                <div key={i} className={`grid grid-cols-[32px_1fr_1fr_32px] gap-2 items-center ${set.done ? 'opacity-50' : ''}`}>
                  <span className="text-xs text-white/40 font-mono text-center">{i + 1}</span>

                  {/* Reps */}
                  <div className="flex items-center justify-center gap-1.5">
                    <button onClick={() => updateSet(i, 'reps', -1)} className="w-6 h-6 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors">
                      <Minus size={10} />
                    </button>
                    <span className="text-sm font-bold w-8 text-center">{set.reps}</span>
                    <button onClick={() => updateSet(i, 'reps', 1)} className="w-6 h-6 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors">
                      <Plus size={10} />
                    </button>
                  </div>

                  {/* Weight */}
                  <div className="flex items-center justify-center gap-1.5">
                    {exercise.defaultWeight > 0 ? (
                      <>
                        <button onClick={() => updateSet(i, 'weight', -2)} className="w-6 h-6 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors">
                          <Minus size={10} />
                        </button>
                        <span className="text-sm font-bold w-10 text-center">{set.weight}</span>
                        <button onClick={() => updateSet(i, 'weight', 2)} className="w-6 h-6 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors">
                          <Plus size={10} />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-white/20">BW</span>
                    )}
                  </div>

                  {/* Done toggle */}
                  <button
                    onClick={() => toggleSet(i)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      set.done
                        ? 'bg-[#22c55e20] text-[#22c55e]'
                        : 'bg-white/[0.04] text-white/20 hover:text-white/50'
                    }`}
                  >
                    <CheckCircle2 size={14} />
                  </button>
                </div>
              ))}

              <button
                onClick={addSet}
                className="w-full mt-2 py-2 rounded-xl border border-dashed border-white/10 text-xs text-white/30 hover:text-white/60 hover:border-white/20 transition-colors flex items-center justify-center gap-1"
              >
                <Plus size={12} /> Add Set
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TrainingPage() {
  const todayKey = getTodayKey();
  const [training, setTraining] = useLocalStorage('apice_training', {});
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const todaySession = training[todayKey] || {};
  const exercises = todaySession.exercises || {};

  const updateExercise = (id, data) => {
    setTraining(prev => ({
      ...prev,
      [todayKey]: {
        ...prev[todayKey],
        exercises: { ...(prev[todayKey]?.exercises || {}), [id]: data },
      },
    }));
  };

  const completedExercises = EXERCISES.filter(e => {
    const ex = exercises[e.id];
    return ex?.sets?.every(s => s.done);
  }).length;

  const allComplete = completedExercises === EXERCISES.length;

  const finishSession = () => {
    setTraining(prev => ({
      ...prev,
      [todayKey]: { ...prev[todayKey], completed: true, completedAt: new Date().toISOString() },
    }));
    setTimerRunning(false);
    setShowComplete(true);
    setTimeout(() => setShowComplete(false), 3000);
  };

  const yesterday = (() => {
    const d = new Date(); d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  })();
  const prevSession = training[yesterday] || {};

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto md:max-w-none md:px-8 md:py-10">
      <PageHeader
        title="Training"
        subtitle="Build strength. Build discipline."
      />

      {/* Session controls */}
      <Card className="mb-6" delay={0.05}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-1">Today's Session</p>
            <p className="text-sm text-white/70">
              {completedExercises} / {EXERCISES.length} exercises complete
            </p>
          </div>
          <div className="flex items-center gap-4">
            <WorkoutTimer
              running={timerRunning}
              onToggle={() => {
                if (!sessionStarted) setSessionStarted(true);
                setTimerRunning(r => !r);
              }}
              onReset={() => { setTimerRunning(false); setSessionStarted(false); }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#00d4ff]"
            style={{ boxShadow: '0 0 8px #00d4ff60' }}
            animate={{ width: `${(completedExercises / EXERCISES.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Card>

      {/* Exercise list */}
      <div className="space-y-3 mb-6">
        {EXERCISES.map((ex, i) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            sessionData={exercises[ex.id]}
            prevData={prevSession.exercises?.[ex.id]}
            onUpdate={(data) => updateExercise(ex.id, data)}
          />
        ))}
      </div>

      {/* Finish button */}
      <AnimatePresence>
        {!todaySession.completed && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={finishSession}
            disabled={completedExercises === 0}
            className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
              completedExercises > 0
                ? 'bg-[#00d4ff] text-black shadow-glow hover:opacity-90'
                : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
            }`}
          >
            <Zap size={16} />
            {completedExercises === EXERCISES.length ? 'Complete Session' : `Finish Early (${completedExercises} done)`}
          </motion.button>
        )}

        {todaySession.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full py-4 rounded-2xl bg-[#22c55e10] border border-[#22c55e25] text-[#22c55e] font-bold text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} />
            Session Complete — Great work!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion animation */}
      <AnimatePresence>
        {showComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass rounded-3xl p-10 text-center max-w-sm mx-4 border border-[#22c55e30]"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="text-6xl mb-4"
              >
                ⚡
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Session Complete!</h2>
              <p className="text-white/50 text-sm">You showed up. That's everything.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
