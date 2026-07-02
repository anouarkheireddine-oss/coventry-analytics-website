'use client'
import { useState } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import Link from 'next/link'
import { ArrowRight, Download, CheckCircle, AlertTriangle, TrendingUp, Star, Loader2 } from 'lucide-react'

const priorityConfig = {
  Critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  High: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  Medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  Opportunity: { color: 'text-brand-400', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
}

function ScoreRing({ score, color }) {
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference * (1 - score / 100)
  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="8"
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

// dimensionList: [{id, title, score}]
// maturity: {level, color, description}
// recommendations: [{priority, title, description, impact, dimension}]
// toolTitle: string (e.g. "AI Readiness Assessment")
// scoreLabel: string (e.g. "AI Readiness Score")
// pdfFilename: string
export default function GenericToolResults({
  overallScore,
  dimensionList,
  maturity,
  recommendations,
  toolTitle,
  scoreLabel,
  pdfFilename,
  emailCaptured = false,
  onRequestEmail,
  invertedScore = false,
  riskLabel,
}) {
  const [downloading, setDownloading] = useState(false)

  const radarData = dimensionList.map(d => ({
    dimension: d.title.split(' ')[0],
    score: d.score,
    fullMark: 100,
  }))

  const sorted = [...dimensionList].sort((a, b) => b.score - a.score)
  const strengths = sorted.slice(0, 2).filter(s => s.score >= 50)
  const weaknesses = sorted.slice(-2).filter(s => s.score < 70).reverse()

  const handleDownload = async () => {
    if (!emailCaptured && onRequestEmail) { onRequestEmail(); return }
    setDownloading(true)
    try {
      const { default: jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageW = 210
      const margin = 20
      const contentW = pageW - margin * 2
      let y = 20

      const addText = (text, x, yPos, opts = {}) => {
        const { size = 10, color = [30, 41, 59], bold = false, align = 'left' } = opts
        doc.setFontSize(size)
        doc.setTextColor(...color)
        doc.setFont('helvetica', bold ? 'bold' : 'normal')
        if (align === 'center') doc.text(text, pageW / 2, yPos, { align: 'center' })
        else if (align === 'right') doc.text(text, x, yPos, { align: 'right' })
        else doc.text(text, x, yPos)
      }

      const addRect = (x, yPos, w, h, fillColor) => {
        doc.setFillColor(...fillColor)
        doc.roundedRect(x, yPos, w, h, 3, 3, 'F')
      }

      addRect(0, 0, pageW, 45, [15, 23, 42])
      addText('COVENTRY ANALYTICS', margin, 15, { size: 8, color: [96, 165, 250], bold: true })
      addText(toolTitle, margin, 23, { size: 14, color: [255, 255, 255], bold: true })
      addText(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), margin, 32, { size: 9, color: [148, 163, 184] })
      addText('coventryanalytics.co.uk', pageW - margin, 32, { size: 9, color: [96, 165, 250], align: 'right' })

      y = 60
      addRect(margin, y, contentW, 38, [30, 41, 59])
      addText(`${overallScore}`, pageW / 2, y + 18, { size: 32, color: [255, 255, 255], bold: true, align: 'center' })
      addText('out of 100', pageW / 2, y + 26, { size: 9, color: [148, 163, 184], align: 'center' })
      addText(`Level: ${maturity.level}`, pageW / 2, y + 33, { size: 9, color: [96, 165, 250], align: 'center' })
      y += 48

      doc.setFontSize(9); doc.setTextColor(71, 85, 105); doc.setFont('helvetica', 'normal')
      const descLines = doc.splitTextToSize(maturity.description, contentW)
      doc.text(descLines, margin, y)
      y += descLines.length * 5 + 10

      addText('DIMENSION SCORES', margin, y, { size: 8, color: [96, 165, 250], bold: true })
      y += 6
      dimensionList.forEach(({ title, score: s }) => {
        addRect(margin, y, contentW, 8, [30, 41, 59])
        const barColor = s >= 70 ? [34, 197, 94] : s >= 40 ? [59, 130, 246] : [239, 68, 68]
        addRect(margin, y, contentW * (s / 100), 8, barColor)
        addText(title, margin + 2, y + 5.5, { size: 8, color: [255, 255, 255] })
        addText(`${s}/100`, margin + contentW - 2, y + 5.5, { size: 8, color: [255, 255, 255], align: 'right' })
        y += 12
      })
      y += 6

      if (recommendations.length > 0) {
        if (y > 220) { doc.addPage(); y = 20 }
        addText('TOP RECOMMENDATIONS', margin, y, { size: 8, color: [96, 165, 250], bold: true })
        y += 8
        recommendations.slice(0, 5).forEach((rec, i) => {
          if (y + 30 > 275) { doc.addPage(); y = 20 }
          addRect(margin, y, contentW, 28, [30, 41, 59])
          addText(`${i + 1}. ${rec.title}`, margin + 3, y + 9, { size: 9, color: [255, 255, 255], bold: true })
          doc.setFontSize(7.5); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
          const lines = doc.splitTextToSize(rec.description, contentW - 6)
          doc.text(lines.slice(0, 2), margin + 3, y + 16)
          addText(`Impact: ${rec.impact}`, margin + 3, y + 24, { size: 7, color: [96, 165, 250] })
          y += 32
        })
      }

      if (y > 250) { doc.addPage(); y = 20 }
      addRect(margin, y, contentW, 22, [37, 99, 235])
      addText('Ready to act on these insights?', pageW / 2, y + 9, { size: 11, color: [255, 255, 255], bold: true, align: 'center' })
      addText('Book a free 30-minute strategy call → coventryanalytics.co.uk/book', pageW / 2, y + 17, { size: 8, color: [191, 219, 254], align: 'center' })

      doc.save(pdfFilename || `coventry-analytics-report-${overallScore}.pdf`)
    } catch (err) {
      console.error('PDF error:', err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="p-8 rounded-2xl bg-navy-900 border border-navy-800 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{scoreLabel || 'Your Score'}</h2>
        <p className="text-slate-400 mb-8">Based on your answers across {dimensionList.length} dimensions</p>
        <ScoreRing score={overallScore} color={maturity.color} />
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
                  <span className={`font-medium ${score >= 70 ? 'text-green-400' : score >= 40 ? 'text-brand-400' : 'text-red-400'}`}>{score}</span>
                </div>
                <div className="h-2 rounded-full bg-navy-800">
                  <div className={`h-full rounded-full transition-all duration-700 ${score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-brand-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
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
          <div className="flex items-center gap-2 mb-4"><Star className="w-4 h-4 text-amber-400" /><h3 className="font-semibold text-white">Your Strengths</h3></div>
          {strengths.length > 0 ? strengths.map(s => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              <div><div className="text-sm font-medium text-white">{s.title}</div><div className="text-xs text-slate-400">Score: {s.score}/100</div></div>
            </div>
          )) : <p className="text-slate-400 text-sm">No strong areas yet — all dimensions need attention.</p>}
        </div>
        <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
          <div className="flex items-center gap-2 mb-4"><AlertTriangle className="w-4 h-4 text-amber-400" /><h3 className="font-semibold text-white">Priority Gaps</h3></div>
          {weaknesses.length > 0 ? weaknesses.map(s => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <div><div className="text-sm font-medium text-white">{s.title}</div><div className="text-xs text-slate-400">Score: {s.score}/100</div></div>
            </div>
          )) : <p className="text-slate-400 text-sm">No critical gaps identified.</p>}
        </div>
      </div>

      <div className="p-6 rounded-xl bg-navy-900 border border-navy-800">
        <div className="flex items-center gap-2 mb-6"><TrendingUp className="w-5 h-5 text-brand-400" /><h3 className="font-semibold text-white text-lg">Your Top Recommendations</h3></div>
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
                <div className={`text-xs font-medium ${cfg.color}`}>Potential impact: {rec.impact}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/book" className="flex items-center justify-center gap-2 p-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all">
          Book Free Strategy Call <ArrowRight className="w-4 h-4" />
        </Link>
        <button onClick={handleDownload} disabled={downloading}
          className="flex items-center justify-center gap-2 p-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold transition-all border border-navy-700 disabled:opacity-60">
          {downloading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Download className="w-4 h-4" /> {emailCaptured ? 'Download PDF Report' : 'Get Free PDF Report'}</>}
        </button>
      </div>
      {!emailCaptured && <p className="text-center text-xs text-slate-500">Enter your email to get this report delivered to your inbox — free.</p>}
    </div>
  )
}
