'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, Bot, User, Loader2, RotateCcw, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getTodayKey, PROTEIN_TARGET, getLast7Days } from '@/utils/data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

const QUICK_PROMPTS = [
  "Analyse my performance today",
  "Am I on track to hit my goals?",
  "What should I focus on this week?",
  "Optimise my protein timing",
  "How can I improve my consistency?",
  "Give me a pre-workout focus message",
];

export default function CoachPage() {
  const todayKey = getTodayKey();
  const [nutrition] = useLocalStorage('apice_nutrition', {});
  const [training] = useLocalStorage('apice_training', {});
  const [tasks] = useLocalStorage('apice_tasks', {});
  const [metrics] = useLocalStorage('apice_metrics_log', []);
  const [profile] = useLocalStorage('apice_profile', {});

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const todayNutrition = (nutrition as Record<string, Record<string, unknown>>)[todayKey] ?? {};
  const todayTraining = (training as Record<string, Record<string, unknown>>)[todayKey] ?? {};
  const todayTasks = (tasks as Record<string, Record<string, unknown>>)[todayKey] ?? {};

  const last7 = getLast7Days();
  const streak = (() => {
    let s = 0;
    for (let i = last7.length - 1; i >= 0; i--) {
      const d = last7[i];
      const dayDone =
        (tasks as Record<string, Record<string, unknown>>)[d]?.training ||
        (training as Record<string, Record<string, unknown>>)[d]?.completed;
      if (dayDone) s++;
      else if (i < last7.length - 1) break;
    }
    return s;
  })();

  const weekConsistency = (() => {
    const done = last7.filter(
      (d) =>
        (training as Record<string, Record<string, unknown>>)[d]?.completed ||
        (tasks as Record<string, Record<string, unknown>>)[d]?.training
    ).length;
    return Math.round((done / 7) * 100);
  })();

  const userContext = {
    profile,
    todayNutrition,
    todayTraining,
    todayTasks,
    metrics,
    streak,
    weekConsistency,
  };

  const proteinPct = Math.round(
    (((todayNutrition as { protein?: number }).protein ?? 0) / PROTEIN_TARGET) * 100
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      content: text.trim(),
      id: crypto.randomUUID(),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setApiKeyMissing(false);

    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: '', id: assistantId },
    ]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(({ role, content }) => ({ role, content })),
          context: userContext,
        }),
      });

      if (!res.ok) {
        if (res.status === 500) setApiKeyMissing(true);
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const snapshot = accumulated;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: snapshot } : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: apiKeyMissing
                  ? 'Add your ANTHROPIC_API_KEY to .env.local to activate APEX.'
                  : 'Connection error. Check your API key in .env.local.',
              }
            : m
        )
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto md:max-w-3xl md:px-8 md:py-10 flex flex-col">
      <PageHeader
        title="APEX Coach"
        subtitle="Your elite AI performance coach."
        action={
          messages.length > 0 ? (
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors py-1.5 px-3 rounded-lg hover:bg-white/[0.04]"
            >
              <RotateCcw size={12} /> Clear
            </button>
          ) : undefined
        }
      />

      {/* Context snapshot */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[
          {
            label: 'Protein',
            value: `${proteinPct}%`,
            color: proteinPct >= 100 ? '#22c55e' : '#00d4ff',
            sub: `${(todayNutrition as { protein?: number }).protein ?? 0}g`,
          },
          {
            label: 'Streak',
            value: `${streak}d`,
            color: streak > 0 ? '#f59e0b' : '#ffffff40',
            sub: 'days',
          },
          {
            label: 'Consistency',
            value: `${weekConsistency}%`,
            color: weekConsistency >= 70 ? '#22c55e' : '#a78bfa',
            sub: 'this week',
          },
        ].map(({ label, value, color, sub }) => (
          <Card key={label} delay={0.05} className="text-center py-3 px-2">
            <p className="text-lg font-bold" style={{ color }}>
              {value}
            </p>
            <p className="text-[11px] text-white/40 mt-0.5">{label}</p>
            <p className="text-[10px] text-white/20">{sub}</p>
          </Card>
        ))}
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[320px] max-h-[50vh] pr-1">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#00d4ff10] border border-[#00d4ff20] flex items-center justify-center">
                <Sparkles size={24} className="text-[#00d4ff]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">APEX is ready.</p>
                <p className="text-white/30 text-xs mt-1 max-w-xs">
                  Ask anything about your training, nutrition, recovery, or goals.
                </p>
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.role === 'user'
                      ? 'bg-[#00d4ff] text-black'
                      : 'bg-[#a78bfa15] border border-[#a78bfa20]'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User size={13} strokeWidth={2.5} />
                  ) : (
                    <Bot size={13} className="text-[#a78bfa]" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#00d4ff15] border border-[#00d4ff20] text-white/90 rounded-tr-sm'
                      : 'bg-white/[0.04] border border-white/[0.07] text-white/80 rounded-tl-sm'
                  }`}
                >
                  {msg.content || (
                    <span className="flex items-center gap-2 text-white/40">
                      <Loader2 size={12} className="animate-spin" />
                      Thinking...
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 flex flex-wrap gap-2"
          >
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                disabled={loading}
                className="text-xs px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
              >
                {prompt}
              </button>
            ))}
          </motion.div>
        )}

        {/* Input */}
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Ask your coach..."
              disabled={loading}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl px-4 py-3.5 pr-12 text-sm text-white placeholder-white/25 outline-none focus:border-[#00d4ff40] focus:bg-white/[0.07] transition-all"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 ${
              input.trim() && !loading
                ? 'bg-[#00d4ff] text-black shadow-[0_0_20px_#00d4ff40] hover:opacity-90'
                : 'bg-white/[0.06] text-white/20'
            }`}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} strokeWidth={2.5} />
            )}
          </motion.button>
        </div>

        {apiKeyMissing && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#f59e0b] mt-2 text-center"
          >
            Add <code className="font-mono bg-white/10 px-1 rounded">ANTHROPIC_API_KEY</code> to{' '}
            <code className="font-mono bg-white/10 px-1 rounded">.env.local</code> to activate APEX.
          </motion.p>
        )}

        <p className="text-[10px] text-white/15 text-center mt-3">
          APEX uses your live AK APICE data. Powered by Claude.
        </p>
      </div>
    </main>
  );
}
