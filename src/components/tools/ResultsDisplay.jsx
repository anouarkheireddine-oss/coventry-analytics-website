'use client'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import Link from 'next/link'
import { ArrowRight, Download, CheckCircle, AlertTriangle, TrendingUp, Star } from 'lucide-react'
import { QUIZ_STEPS, getMaturityLevel, getRecommendations, getStrengthsAndWeaknesses } from '@/lib/scoring'

const priorityConfig = {
  Critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  High: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  Medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  Opportunity: { color: 'text-brand-400', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
}

function ScoreRing({ score, maturity }) {
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference * (1 - score / 100)
  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle cx="60" cy="60" r="54" fill="none" stroke={maturity.color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-xs text-slate-400">/ 100</span>
      </div>
    </div>
  )
}

export default function ResultsDisplay({ overallScore, dimensionScores }) {
  const maturity = getMaturityLevel(overallScore)
  const recommendations = getRecommendations(dimensionScores)
  const { strengths, weaknesses } = getStrengthsAndWeaknesses(dimensionScores)

  const radarData = QUIZ_STEPS.map(step => ({
    dimension: step.title.split(' ')[0],
    score: dimensionScores[step.id] || 0,
    fullMark: 100,
  }))

  const dimensionList = QUIZ_STEPS.map(step => ({
    id: step.id,
    title: step.title,
    score: dimensionScores[step.id] || 0,
  }))

  return (
    <div className="space-y-8">
      <div className="p-8 rounded-2xl bg-navy-900 border border-navy-800 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Your Business Health Score</h2>
        <p className="text-slate-400 mb-8">Based on your answers across 5 dimensions</p>
        <ScoreRing score={overallScore} maturity={maturity} />
        <div className="mt-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ backgroundColor: `${maturity.color}20`, color: maturity.color, border: `1px solid ${maturity.color}40` }}>
            {maturity.level}
          </span>
          <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">{maturity.description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
          <h3 className="font-semibold text-white mb-6">Scores by Dimension</h3>
          <div className="space-y-4">
            {dimensionList.map(({ id, title, score }) => (
              <div key={id}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-300">{title}</span>
                  <span className="text-white font-medium">{score}</span>
                </div>
                <div className="h-2 rounded-full bg-navy-800">
                  <div className="h-full rounded-full bg-brand-500 transition-all duration-700" style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
          <h3 className="font-semibold text-white mb-4">Radar View</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-white">Your Strengths</h3>
          </div>
          {strengths.length > 0 ? strengths.map(s => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              <div>
                <div className="text-sm font-medium text-white">{s.title}</div>
                <div className="text-xs text-slate-400">Score: {s.score}/100</div>
              </div>
            </div>
          )) : <p className="text-slate-400 text-sm">Complete all steps to see your strengths.</p>}
        </div>
        <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-white">Priority Gaps</h3>
          </div>
          {weaknesses.length > 0 ? weaknesses.map(s => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <div className="text-sm font-medium text-white">{s.title}</div>
                <div className="text-xs text-slate-400">Score: {s.score}/100</div>
              </div>
            </div>
          )) : <p className="text-slate-400 text-sm">No critical gaps identified.</p>}
        </div>
      </div>

      <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-brand-400" />
          <h3 className="font-semibold text-white text-lg">Your Top Recommendations</h3>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec, i) => {
            const cfg = priorityConfig[rec.priority] || priorityConfig.Opportunity
            return (
              <div key={i} className={`p-4 rounded-xl border ${cfg.bg} ${cfg.border}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-medium text-white text-sm">{rec.title}</h4>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${cfg.color} ${cfg.bg} border ${cfg.border}`}>{rec.priority}</span>
                </div>
                <p className="text-slate-400 text-sm mb-2">{rec.description}</p>
                <div className="text-xs font-medium text-brand-400">Potential impact: {rec.impact}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/book" className="flex items-center justify-center gap-2 p-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-brand-500/25">
          Book Free Audit Call <ArrowRight className="w-4 h-4" />
        </Link>
        <button className="flex items-center justify-center gap-2 p-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold transition-all border border-navy-700">
          <Download className="w-4 h-4" /> Download Report (PDF)
        </button>
      </div>
    </div>
  )
}
