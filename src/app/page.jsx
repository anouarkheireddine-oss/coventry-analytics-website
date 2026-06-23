'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight, AlertTriangle, CheckCircle2, Clock,
  TrendingUp, Layers, Zap, Users, Package, Truck,
  CalendarCheck, Database, BarChart3, Bell, ChevronRight,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00d4ff30] bg-[#00d4ff08] text-[#00d4ff] text-xs font-semibold uppercase tracking-widest mb-5">
      <span className="w-1 h-1 rounded-full bg-[#00d4ff]" />
      {children}
    </span>
  );
}

function GlassCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`glass rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const handleAnchor = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="max-w-4xl">
            <motion.div {...fadeUp(0)}>
              <SectionLabel>UK Operational Intelligence Consultancy</SectionLabel>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-balance mb-6"
            >
              Stop Running Your Business on{' '}
              <span className="neon-text">Yesterday's Numbers</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mb-10"
            >
              We deploy real-time Operational Control Systems for SME leaders in logistics,
              operations, and e-commerce — giving you instant visibility into every corner
              of your business performance. Operational in{' '}
              <span className="text-white/90 font-semibold">5 days</span>.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 mb-16">
              <a
                href="#contact"
                onClick={(e) => handleAnchor(e, '#contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#00d4ff] text-black font-bold text-base hover:bg-[#00bfe8] transition-all shadow-[0_0_30px_rgba(0,212,255,0.35)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]"
              >
                Book Operational Leak Audit
                <ArrowRight size={18} />
              </a>
              <a
                href="#offer"
                onClick={(e) => handleAnchor(e, '#offer')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-white/[0.12] text-white/70 font-medium text-base hover:border-white/25 hover:text-white transition-all"
              >
                See the 5-Day Offer
                <ChevronRight size={18} />
              </a>
            </motion.div>

            {/* Social proof bar */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              {[
                { icon: Clock, text: '5-Day Deployment' },
                { icon: Zap,   text: 'No IT Dependency' },
                { icon: Users, text: 'Built for SME Operators' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-white/40">
                  <Icon size={14} className="text-[#00d4ff]" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero metrics strip */}
          <motion.div
            {...fadeUp(0.5)}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-20"
          >
            {[
              { value: '5',     unit: 'Days',   label: 'Average deployment time' },
              { value: '100%',  unit: '',        label: 'Real-time data visibility' },
              { value: '0',     unit: 'IT staff', label: 'Required to maintain it' },
              { value: '1',     unit: 'View',    label: 'Decision-ready daily brief' },
            ].map(({ value, unit, label }) => (
              <div
                key={label}
                className="glass rounded-2xl px-5 py-5 border border-white/[0.06]"
              >
                <p className="text-3xl font-black text-white">
                  {value}
                  <span className="text-base font-semibold text-[#00d4ff] ml-1">{unit}</span>
                </p>
                <p className="text-xs text-white/40 mt-1 leading-snug">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PROBLEM ──────────────────────────────────────────────────── */}
      <section id="problem" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="max-w-2xl mb-16">
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-5">
              You're Making £1M+ Decisions on{' '}
              <span className="text-white/40">Outdated Information</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Most SME operators we speak to face the same three operational failures —
              and they're costing more than they realise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-16">
            {[
              {
                icon: AlertTriangle,
                color: '#f59e0b',
                title: 'Decision Lag',
                body: "By the time your reports are compiled and reviewed, the problem has compounded. You're always reacting — never in control.",
              },
              {
                icon: Layers,
                color: '#ef4444',
                title: 'Excel Chaos',
                body: "Spreadsheets that no-one fully understands, version conflicts, manual errors, and hours wasted each week just to produce a number that's already stale.",
              },
              {
                icon: Clock,
                color: '#8b5cf6',
                title: 'Visibility Gaps',
                body: "You don't know what's happening in your logistics, fulfilment, or cashflow until end-of-day — or worse, end-of-week. Blind spots become costly surprises.",
              },
            ].map(({ icon: Icon, color, title, body }, i) => (
              <GlassCard key={title} delay={0.1 * i} className="border border-white/[0.06]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{body}</p>
              </GlassCard>
            ))}
          </div>

          {/* Pull quote */}
          <motion.div
            {...fadeUp(0.3)}
            className="glass rounded-2xl px-8 py-8 border border-[#00d4ff15] max-w-3xl"
          >
            <p className="text-xl md:text-2xl font-semibold text-white/80 leading-snug mb-4">
              "We had twelve spreadsheets across three departments and still couldn't
              answer the question: are we profitable this week?"
            </p>
            <p className="text-sm text-white/30">— Operations Director, Logistics SME, West Midlands</p>
          </motion.div>
        </div>
      </section>

      {/* ─── SOLUTION ─────────────────────────────────────────────────── */}
      <section id="solution" className="py-24 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div {...fadeUp(0)}>
                <SectionLabel>Our Approach</SectionLabel>
              </motion.div>
              <motion.h2 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                Operational Control Systems —{' '}
                <span className="neon-text">Not Just Dashboards</span>
              </motion.h2>
              <motion.p {...fadeUp(0.2)} className="text-white/55 text-lg leading-relaxed mb-8">
                A dashboard shows you data. An Operational Control System changes how
                fast you can act on it. We build the complete infrastructure: automated
                data pipelines, structured KPI frameworks, and a decision-ready daily
                operational view — all powered by Power BI.
              </motion.p>
              <motion.div {...fadeUp(0.3)} className="space-y-4">
                {[
                  'Real-time visibility into every operational metric that matters',
                  'Decisions in minutes, not after the next Monday morning meeting',
                  'One unified view replacing multiple disconnected spreadsheets',
                  'Automated data flow — no manual exports, no human error',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#00d4ff] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/60 leading-relaxed">{point}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual representation */}
            <motion.div {...fadeUp(0.2)} className="relative">
              <div className="glass rounded-2xl p-6 border border-[#00d4ff15]">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Operational Control</p>
                    <p className="text-sm font-semibold text-white mt-0.5">Live Business View</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
                    <span className="text-xs text-[#22c55e] font-medium">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Fulfilment Rate',   value: '98.2%',  change: '+1.4%',  up: true  },
                    { label: 'Revenue Today',      value: '£12,840', change: '+8.3%', up: true  },
                    { label: 'Orders in Progress', value: '147',    change: '-3',     up: false },
                    { label: 'Cash Position',      value: '£84.2k', change: '+£2.1k', up: true  },
                  ].map(({ label, value, change, up }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                    >
                      <span className="text-xs text-white/40 font-medium">{label}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold ${up ? 'text-[#22c55e]' : 'text-[#f59e0b]'}`}>
                          {change}
                        </span>
                        <span className="text-sm font-bold text-white">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                  <Bell size={12} className="text-[#00d4ff]" />
                  <p className="text-xs text-white/30">Fulfilment alert triggered at 09:14 — auto-notified ops team</p>
                </div>
              </div>
              {/* Glow */}
              <div className="absolute -inset-4 bg-[#00d4ff] opacity-[0.03] rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CORE OFFER ───────────────────────────────────────────────── */}
      <section id="offer" className="py-24 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div {...fadeUp(0)}>
              <SectionLabel>Core Offer</SectionLabel>
            </motion.div>
            <motion.h2 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-5">
              The 5-Day Operational{' '}
              <span className="neon-text">Control System</span>
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="text-white/50 text-lg leading-relaxed">
              We design and deploy a complete real-time control system tailored to your
              most critical business function — ready in 5 working days.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Deliverables */}
            <GlassCard delay={0.1} className="border border-[#00d4ff15]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#00d4ff15] flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-[#00d4ff]" />
                </div>
                <h3 className="text-base font-bold text-white">What's Included</h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: BarChart3,
                    title: 'Power BI Operational View',
                    desc: 'Tailored to one core function: logistics, revenue, fulfilment, or cashflow.',
                  },
                  {
                    icon: Database,
                    title: 'Automated Data Pipeline',
                    desc: 'Excel or existing systems → Power BI. Fully automated. No manual exports.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'KPI System Design',
                    desc: 'We define the metrics that actually drive your operational performance.',
                  },
                  {
                    icon: CalendarCheck,
                    title: 'Decision-Ready Daily View',
                    desc: 'A single operational brief you can act on within minutes each morning.',
                  },
                  {
                    icon: Bell,
                    title: 'Optional Automated Alerts',
                    desc: 'Email or Slack-style notifications when critical thresholds are breached.',
                  },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-[#00d4ff]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Positioning */}
            <div className="flex flex-col gap-4">
              <GlassCard delay={0.2} className="border border-white/[0.06] flex-1">
                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">The Positioning Shift</p>
                <div className="space-y-3">
                  {[
                    { from: 'Weekly Excel report', to: 'Live operational intelligence' },
                    { from: 'End-of-day summaries', to: 'Real-time decision triggers' },
                    { from: "Guessing what's wrong", to: 'Knowing exactly where to act' },
                    { from: 'Data prepared by someone', to: 'Data that flows automatically' },
                  ].map(({ from, to }) => (
                    <div key={from} className="flex items-center gap-3 text-sm">
                      <span className="text-white/30 line-through flex-1">{from}</span>
                      <ArrowRight size={12} className="text-[#00d4ff] flex-shrink-0" />
                      <span className="text-white/80 flex-1 font-medium">{to}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard delay={0.3} className="border border-[#22c55e20] bg-[#22c55e04]">
                <div className="flex items-start gap-3">
                  <Zap size={18} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white mb-1">Ready in 5 Working Days</p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      No lengthy consultancy engagements. No IT dependency. We work with
                      your existing data sources and hand over a fully operational system
                      within one working week.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────────────── */}
      <section id="process" className="py-24 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <motion.div {...fadeUp(0)}>
              <SectionLabel>How It Works</SectionLabel>
            </motion.div>
            <motion.h2 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-5">
              From Discovery to{' '}
              <span className="neon-text">Operational Control</span>{' '}
              in 5 Days
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="text-white/50 text-lg">
              A structured delivery process designed to minimise disruption and
              maximise impact for your team.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                day: 'Day 1',
                title: 'Discovery & Audit',
                body: 'We map your current reporting, identify operational blind spots, and agree the one core function to control first.',
                color: '#00d4ff',
              },
              {
                day: 'Days 2–3',
                title: 'Design & Build',
                body: 'We design your KPI framework and build the Power BI operational view. Tailored to your business, not a template.',
                color: '#22c55e',
              },
              {
                day: 'Day 4',
                title: 'Pipeline & Automation',
                body: 'We connect your data sources and automate the flow. Your system starts pulling live data — no manual intervention required.',
                color: '#f59e0b',
              },
              {
                day: 'Day 5',
                title: 'Deploy & Handover',
                body: "We go live, brief your team, and hand over full control. You're operational — with complete visibility from day one.",
                color: '#8b5cf6',
              },
            ].map(({ day, title, body, color }, i) => (
              <GlassCard key={day} delay={0.1 * i} className="border border-white/[0.06] relative">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color }}
                >
                  {day}
                </div>
                <h3 className="text-base font-bold text-white mb-3">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{body}</p>
                <div
                  className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─────────────────────────────────────────────── */}
      <section id="who" className="py-24 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div {...fadeUp(0)}>
              <SectionLabel>Who It's For</SectionLabel>
            </motion.div>
            <motion.h2 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-5">
              Built for Operators Who{' '}
              <span className="neon-text">Can't Afford to Guess</span>
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="text-white/50 text-lg">
              We work exclusively with SMEs where operational speed is a competitive
              advantage — and where reporting delays are costing real money.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Truck,
                color: '#00d4ff',
                segment: 'Logistics SMEs',
                description: 'Haulage, freight, and distribution businesses managing routes, capacity, driver performance, and delivery SLAs — where a one-hour delay in visibility becomes a one-day operational problem.',
                signals: ['Route efficiency visibility', 'Driver & vehicle utilisation', 'Delivery SLA tracking', 'Cost-per-drop analysis'],
              },
              {
                icon: Users,
                color: '#22c55e',
                segment: 'Operations-Heavy Businesses',
                description: 'Manufacturing, warehousing, or multi-site service businesses where operational throughput, staffing, and resource allocation decisions happen daily and must be made fast.',
                signals: ['Throughput & capacity view', 'Labour cost management', 'Cross-site performance', 'Bottleneck identification'],
              },
              {
                icon: Package,
                color: '#f59e0b',
                segment: 'E-commerce & Fulfilment',
                description: 'Online retailers and third-party logistics providers managing order volumes, pick & pack rates, returns, and customer SLAs where daily operational decisions directly impact margin.',
                signals: ['Order fulfilment rate', 'Pick & pack efficiency', 'Returns performance', 'Revenue vs. margin daily'],
              },
            ].map(({ icon: Icon, color, segment, description, signals }, i) => (
              <GlassCard
                key={segment}
                delay={0.1 * i}
                className="border border-white/[0.06] hover:border-white/[0.12] transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color}12`, boxShadow: `0 0 20px ${color}15` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{segment}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{description}</p>
                <div className="space-y-2">
                  {signals.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className="text-xs text-white/40">{s}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative glass rounded-3xl p-10 md:p-16 border border-[#00d4ff15] overflow-hidden text-center max-w-3xl mx-auto">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[#00d4ff] opacity-[0.02] blur-3xl" />
            <div className="relative z-10">
              <motion.div {...fadeUp(0)}>
                <SectionLabel>Free Audit — 20 Minutes</SectionLabel>
              </motion.div>
              <motion.h2 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-5">
                Book Your{' '}
                <span className="neon-text">Operational Leak Audit</span>
              </motion.h2>
              <motion.p {...fadeUp(0.2)} className="text-white/55 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                In 20 minutes, we'll identify the exact inefficiencies, blind spots,
                and decision delays in your current reporting setup — and show you
                what an Operational Control System would look like for your business.
                No commitment. No sales pitch. Just operational clarity.
              </motion.p>

              <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
                <a
                  href="mailto:hello@coventryanalytics.co.uk?subject=Operational Leak Audit Request"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00d4ff] text-black font-bold text-base hover:bg-[#00bfe8] transition-all shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_45px_rgba(0,212,255,0.55)]"
                >
                  Book Your Free Audit
                  <ArrowRight size={18} />
                </a>
              </motion.div>

              <motion.div
                {...fadeUp(0.4)}
                className="grid grid-cols-3 gap-4 text-center"
              >
                {[
                  { label: 'Duration', value: '20 minutes' },
                  { label: 'Cost',     value: 'Complimentary' },
                  { label: 'Format',   value: 'Video call' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-base font-bold text-white">{value}</p>
                    <p className="text-xs text-white/30 mt-0.5">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#00d4ff] flex items-center justify-center">
              <BarChart3 size={12} className="text-black" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold text-white">Coventry Analytics</span>
          </div>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Coventry Analytics. UK-based operational intelligence consultancy.
          </p>
          <a
            href="mailto:hello@coventryanalytics.co.uk"
            className="text-xs text-white/30 hover:text-[#00d4ff] transition-colors"
          >
            hello@coventryanalytics.co.uk
          </a>
        </div>
      </footer>

    </main>
  );
}
