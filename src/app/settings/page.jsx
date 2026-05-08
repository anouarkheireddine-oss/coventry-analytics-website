'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Trash2, RotateCcw, ChevronRight, User, Bell, Zap, Shield, Database, ExternalLink } from 'lucide-react';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';
import { useLocalStorage } from '@/hooks/useLocalStorage';

function SettingRow({ icon: Icon, label, sublabel, action, color = '#00d4ff', danger }) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.99 }}
      onClick={action}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${
        danger ? 'hover:bg-[#ef444410]' : 'hover:bg-white/[0.04]'
      }`}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: danger ? '#ef444415' : `${color}15` }}
      >
        <Icon size={14} style={{ color: danger ? '#ef4444' : color }} />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${danger ? 'text-[#ef4444]' : 'text-white/80'}`}>{label}</p>
        {sublabel && <p className="text-xs text-white/30 mt-0.5">{sublabel}</p>}
      </div>
      <ChevronRight size={14} className="text-white/20" />
    </motion.div>
  );
}

export default function SettingsPage() {
  const [profile, setProfile] = useLocalStorage('forge_profile', {
    name: 'Athlete',
    weight: 78,
    height: 180,
    age: 25,
    goal: 'Lean Bulk',
    proteinTarget: 124,
  });
  const [showReset, setShowReset] = useState(false);
  const [saved, setSaved] = useState(false);

  const exportData = () => {
    const allKeys = [
      'forge_nutrition', 'forge_training', 'forge_tasks',
      'forge_metrics_log', 'forge_current_metrics', 'forge_profile',
      'forge_weekly_goals', 'forge_custom_tasks',
    ];
    const data = {};
    allKeys.forEach(k => {
      try { data[k] = JSON.parse(localStorage.getItem(k) || 'null'); } catch {}
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forge-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    const allKeys = [
      'forge_nutrition', 'forge_training', 'forge_tasks',
      'forge_metrics_log', 'forge_current_metrics',
      'forge_weekly_goals', 'forge_custom_tasks',
    ];
    allKeys.forEach(k => localStorage.removeItem(k));
    setShowReset(false);
    window.location.reload();
  };

  const saveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const INTEGRATIONS = [
    { label: 'Supabase Sync',       sublabel: 'Cloud backup — coming soon', icon: Database, available: false },
    { label: 'Apple Health',         sublabel: 'Sync steps & heart rate — coming soon', icon: Shield, available: false },
    { label: 'AI Coach',             sublabel: 'Personalized coaching — coming soon', icon: Zap, available: false },
    { label: 'Push Notifications',   sublabel: 'Reminders & streaks — coming soon', icon: Bell, available: false },
  ];

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto md:max-w-none md:px-8 md:py-10">
      <PageHeader title="Settings" subtitle="Configure your performance OS." />

      {/* Profile */}
      <Card className="mb-4" delay={0.05}>
        <div className="flex items-center gap-3 mb-5">
          <User size={14} className="text-[#00d4ff]" />
          <h3 className="text-sm font-semibold">Profile</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { key: 'name',          label: 'Name',              type: 'text',   placeholder: 'Athlete' },
            { key: 'age',           label: 'Age',               type: 'number', placeholder: '25'      },
            { key: 'weight',        label: 'Weight (kg)',        type: 'number', placeholder: '78'      },
            { key: 'height',        label: 'Height (cm)',        type: 'number', placeholder: '180'     },
            { key: 'goal',          label: 'Goal',              type: 'text',   placeholder: 'Lean Bulk' },
            { key: 'proteinTarget', label: 'Protein Target (g)', type: 'number', placeholder: '124'    },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-[10px] text-white/30 font-medium uppercase tracking-wider mb-1">{label}</label>
              <input
                type={type}
                value={profile[key] || ''}
                onChange={e => setProfile(p => ({ ...p, [key]: type === 'number' ? parseFloat(e.target.value) || '' : e.target.value }))}
                placeholder={placeholder}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00d4ff40] transition-colors"
              />
            </div>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={saveProfile}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
            saved
              ? 'bg-[#22c55e] text-black'
              : 'bg-[#00d4ff] text-black hover:opacity-90'
          }`}
        >
          {saved ? '✓ Saved!' : 'Save Profile'}
        </motion.button>
      </Card>

      {/* Data management */}
      <Card className="mb-4" delay={0.15}>
        <div className="flex items-center gap-2 mb-2">
          <Database size={14} className="text-[#00d4ff]" />
          <h3 className="text-sm font-semibold">Data</h3>
        </div>
        <SettingRow
          icon={Download}
          label="Export Data"
          sublabel="Download all your data as JSON"
          action={exportData}
          color="#22c55e"
        />
        <SettingRow
          icon={RotateCcw}
          label="Reset Tracking Data"
          sublabel="Clear all logs (keep profile)"
          action={() => setShowReset(true)}
          danger
        />
      </Card>

      {/* Future integrations */}
      <Card className="mb-4" delay={0.2}>
        <div className="flex items-center gap-2 mb-2">
          <ExternalLink size={14} className="text-[#00d4ff]" />
          <h3 className="text-sm font-semibold">Integrations</h3>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#f59e0b15] text-[10px] text-[#f59e0b] font-medium">Coming Soon</span>
        </div>
        {INTEGRATIONS.map(({ label, sublabel, icon, available }) => (
          <div key={label} className="opacity-40 pointer-events-none">
            <SettingRow icon={icon} label={label} sublabel={sublabel} color="#a78bfa" />
          </div>
        ))}
      </Card>

      {/* App info */}
      <Card delay={0.25}>
        <div className="text-center py-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#00d4ff] flex items-center justify-center shadow-glow">
              <Zap size={16} className="text-black" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-wider">FORGE</span>
          </div>
          <p className="text-xs text-white/30">Personal Performance OS</p>
          <p className="text-xs text-white/20 mt-1">v1.0.0 · Built for discipline</p>
          <p className="text-[10px] text-white/15 mt-3">All data stored locally on your device.</p>
        </div>
      </Card>

      {/* Reset confirm modal */}
      <AnimatePresence>
        {showReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl p-6 max-w-sm w-full border border-[#ef444430]"
            >
              <h3 className="text-lg font-bold text-white mb-2">Reset All Data?</h3>
              <p className="text-sm text-white/50 mb-6">This will delete all your training logs, nutrition data, and metrics. Your profile will be kept. This cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReset(false)}
                  className="flex-1 py-3 rounded-xl bg-white/[0.06] text-white/60 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={resetAll}
                  className="flex-1 py-3 rounded-xl bg-[#ef4444] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
