'use client'
import { useState } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import Link from 'next/link'
import { ArrowRight, Download, CheckCircle, AlertTriangle, TrendingUp, Star, Loader2 } from 'lucide-react'
import { QUIZ_STEPS, getMaturityLevel, getRecommendations, getStrengthsAndWeaknesses } from '@/lib/scoring'

const priorityConfig = {
  Critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  High: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  Medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  Opportunity: { color: 'text-brand-400', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
}

const priorityColorsHex = {
  Critical: '#f87171',
  High: '#fb923c',
  Medium: '#fbbf24',
  Opportunity: '#60a5fa',
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

async function generatePDF(overallScore, dimensionScores, maturity, recommendations, strengths, weaknesses) {
  const { default: jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = 210
  const margin = 18
  const contentW = pageW - margin * 2
  let y = 0
  let pageNum = 1

  const addPage = () => {
    doc.addPage(); pageNum++
    doc.setFillColor(15, 23, 42); doc.rect(0, 285, pageW, 12, 'F')
    doc.setFontSize(7); doc.setTextColor(71, 85, 105); doc.setFont('helvetica', 'normal')
    doc.text('Coventry Analytics Ltd · Coventry, UK · coventryanalytics.co.uk · info.coventryanalytics@gmail.com', pageW / 2, 291, { align: 'center' })
    doc.text(`Page ${pageNum}`, pageW - margin, 291, { align: 'right' })
    y = 20
  }

  const checkPage = (needed = 30) => { if (y + needed > 278) addPage() }

  const T = (text, x, yPos, opts = {}) => {
    const { size = 10, color = [30, 41, 59], bold = false, align = 'left', italic = false } = opts
    doc.setFontSize(size); doc.setTextColor(...color)
    doc.setFont('helvetica', bold ? 'bold' : italic ? 'italic' : 'normal')
    const xPos = align === 'center' ? pageW / 2 : x
    doc.text(text, xPos, yPos, align !== 'left' ? { align } : {})
  }

  const R = (x, yPos, w, h, fill, r = 2) => {
    doc.setFillColor(...fill)
    r > 0 ? doc.roundedRect(x, yPos, w, h, r, r, 'F') : doc.rect(x, yPos, w, h, 'F')
  }

  const sectionLabel = (label, yPos) => {
    doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.5)
    doc.line(margin, yPos, margin + 4, yPos)
    T(label, margin + 6, yPos + 0.5, { size: 7.5, color: [96, 165, 250], bold: true })
    return yPos + 7
  }

  const wrapText = (text, x, yPos, maxW, lineH = 4.5, opts = {}) => {
    const { size = 8.5, color = [100, 116, 139] } = opts
    doc.setFontSize(size); doc.setTextColor(...color); doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(text, maxW)
    doc.text(lines, x, yPos)
    return yPos + lines.length * lineH
  }

  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const scoreColor = overallScore >= 70 ? [34, 197, 94] : overallScore >= 40 ? [59, 130, 246] : [239, 68, 68]
  const dimensionList = QUIZ_STEPS.map(step => ({ id: step.id, title: step.title, score: dimensionScores[step.id] || 0 }))

  // ── PAGE 1: COVER ──────────────────────────────────────────────────
  R(0, 0, pageW, 297, [10, 15, 30], 0)
  R(0, 0, pageW, 3, [37, 99, 235], 0)
  T('COVENTRY ANALYTICS', margin, 28, { size: 9, color: [96, 165, 250], bold: true })
  T('Operational Intelligence for UK SMEs', margin, 35, { size: 8, color: [71, 85, 105] })
  doc.setDrawColor(30, 41, 59); doc.setLineWidth(0.3)
  doc.line(margin, 40, pageW - margin, 40)
  T('BUSINESS HEALTH SCORE', margin, 62, { size: 18, color: [255, 255, 255], bold: true })
  T('Confidential Assessment Report', margin, 72, { size: 10, color: [96, 165, 250] })

  const cx = pageW / 2, cy = 130, r = 32
  doc.setFillColor(20, 30, 50); doc.circle(cx, cy, r + 6, 'F')
  doc.setDrawColor(30, 41, 59); doc.setLineWidth(5); doc.circle(cx, cy, r, 'S')
  doc.setDrawColor(...scoreColor); doc.setLineWidth(5)
  const startA = -Math.PI / 2, endA = startA + (overallScore / 100) * 2 * Math.PI
  for (let i = 0; i < 60; i++) {
    const a1 = startA + (i / 60) * (endA - startA)
    const a2 = startA + ((i + 1) / 60) * (endA - startA)
    if (a2 > endA) break
    doc.line(cx + r * Math.cos(a1), cy + r * Math.sin(a1), cx + r * Math.cos(a2), cy + r * Math.sin(a2))
  }
  T(`${overallScore}`, cx, cy - 4, { size: 28, color: [255, 255, 255], bold: true, align: 'center' })
  T('out of 100', cx, cy + 5, { size: 7, color: [148, 163, 184], align: 'center' })
  R(cx - 28, cy + 14, 56, 10, [...scoreColor.map(v => Math.round(v * 0.2))], 2)
  doc.setDrawColor(...scoreColor); doc.setLineWidth(0.5); doc.roundedRect(cx - 28, cy + 14, 56, 10, 2, 2, 'S')
  T(maturity.level, cx, cy + 21, { size: 9, color: scoreColor, bold: true, align: 'center' })
  doc.setFontSize(9); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'italic')
  doc.text(doc.splitTextToSize(maturity.description, contentW - 20), pageW / 2, cy + 34, { align: 'center' })

  R(margin, 185, contentW, 34, [15, 23, 42], 3)
  const mY = 193
  T('Report Date', margin + 6, mY, { size: 7, color: [71, 85, 105] }); T(dateStr, margin + 6, mY + 6, { size: 9, color: [226, 232, 240], bold: true })
  T('Assessment', margin + contentW / 2, mY, { size: 7, color: [71, 85, 105], align: 'center' }); T('Business Health Score', margin + contentW / 2, mY + 6, { size: 9, color: [226, 232, 240], bold: true, align: 'center' })
  T('Provider', pageW - margin - 6, mY, { size: 7, color: [71, 85, 105], align: 'right' }); T('Coventry Analytics', pageW - margin - 6, mY + 6, { size: 9, color: [226, 232, 240], bold: true, align: 'right' })
  T('Dimensions assessed', margin + 6, mY + 16, { size: 7, color: [71, 85, 105] }); T('5', margin + 6, mY + 22, { size: 9, color: [226, 232, 240], bold: true })
  T('Questions answered', margin + contentW / 2, mY + 16, { size: 7, color: [71, 85, 105], align: 'center' }); T('13', margin + contentW / 2, mY + 22, { size: 9, color: [226, 232, 240], bold: true, align: 'center' })
  T('Maturity Level', pageW - margin - 6, mY + 16, { size: 7, color: [71, 85, 105], align: 'right' }); T(maturity.level, pageW - margin - 6, mY + 22, { size: 9, color: scoreColor, bold: true, align: 'right' })

  R(0, 282, pageW, 15, [7, 10, 20], 0)
  T('Coventry Analytics Ltd · coventryanalytics.co.uk · info.coventryanalytics@gmail.com', pageW / 2, 290, { size: 7, color: [71, 85, 105], align: 'center' })
  T('This report is prepared exclusively for the recipient. Not for redistribution.', pageW / 2, 277, { size: 6.5, color: [51, 65, 85], align: 'center' })

  // ── PAGE 2: EXECUTIVE SUMMARY + DIMENSION SCORES ───────────────────
  addPage()
  R(0, 0, pageW, 14, [15, 23, 42], 0)
  T('COVENTRY ANALYTICS', margin, 9, { size: 7, color: [96, 165, 250], bold: true })
  T('Business Health Score', pageW - margin, 9, { size: 7, color: [71, 85, 105], align: 'right' })
  y = 22

  y = sectionLabel('EXECUTIVE SUMMARY', y)
  R(margin, y, contentW, 18, [20, 30, 55], 3)
  T(`Overall Score: ${overallScore}/100`, margin + 4, y + 7, { size: 11, color: [255, 255, 255], bold: true })
  T(`Maturity Level: ${maturity.level}`, margin + 4, y + 13.5, { size: 8, color: [96, 165, 250] })
  T(dateStr, pageW - margin - 4, y + 10, { size: 8, color: [100, 116, 139], align: 'right' })
  y += 22
  y = wrapText(maturity.description, margin, y, contentW, 5, { size: 9, color: [148, 163, 184] })
  y += 4

  const interp = overallScore >= 70
    ? `A score of ${overallScore}/100 places your business in the upper tier of UK SMEs assessed by Coventry Analytics. You have strong foundations across multiple dimensions. The recommendations in this report will help you push toward best-in-class performance.`
    : overallScore >= 40
    ? `A score of ${overallScore}/100 is in line with the median for UK SMEs at your stage. You have genuine strengths alongside gaps that are costing you time, money, and competitive position. The recommendations below are ordered by impact.`
    : `A score of ${overallScore}/100 indicates foundational gaps that are limiting growth and increasing operational risk. The highest-impact improvements can typically be made within 90 days and do not require large capital outlay.`
  y = wrapText(interp, margin, y, contentW, 5, { size: 9, color: [100, 116, 139] })
  y += 8

  y = sectionLabel('DIMENSION SCORES', y)
  y += 2

  const sorted2 = [...dimensionList].sort((a, b) => b.score - a.score)
  dimensionList.forEach(({ title, score: s }) => {
    checkPage(22)
    const barColor = s >= 70 ? [34, 197, 94] : s >= 40 ? [59, 130, 246] : [239, 68, 68]
    const statusLabel = s >= 70 ? 'Strong' : s >= 50 ? 'Developing' : s >= 30 ? 'Needs Work' : 'Critical Gap'
    const statusColor = s >= 70 ? [34, 197, 94] : s >= 50 ? [59, 130, 246] : s >= 30 ? [245, 158, 11] : [239, 68, 68]
    R(margin, y, contentW, 14, [20, 30, 50], 2)
    R(margin, y, Math.max(contentW * (s / 100), 4), 14, [...barColor.map(v => Math.round(v * 0.35))], 2)
    R(margin, y, Math.max(contentW * (s / 100), 4), 4, barColor, 0)
    T(title, margin + 3, y + 9, { size: 8.5, color: [226, 232, 240], bold: true })
    T(`${s}/100`, margin + contentW - 3, y + 6, { size: 9, color: [255, 255, 255], bold: true, align: 'right' })
    T(statusLabel, margin + contentW - 3, y + 12, { size: 7, color: statusColor, align: 'right' })
    y += 17
  })
  y += 4

  checkPage(20)
  R(margin, y, contentW, 14, [15, 23, 42], 2)
  const critC = dimensionList.filter(d => d.score < 30).length
  const weakC = dimensionList.filter(d => d.score >= 30 && d.score < 50).length
  const devC = dimensionList.filter(d => d.score >= 50 && d.score < 70).length
  const strongC = dimensionList.filter(d => d.score >= 70).length
  ;[
    { label: 'Strong (70+)', val: strongC, color: [34, 197, 94] },
    { label: 'Developing (50-69)', val: devC, color: [59, 130, 246] },
    { label: 'Needs Work (30-49)', val: weakC, color: [245, 158, 11] },
    { label: 'Critical (<30)', val: critC, color: [239, 68, 68] },
  ].forEach((col, i) => {
    const colX = margin + (contentW / 4) * i
    T(`${col.val}`, colX + (contentW / 8), y + 6, { size: 11, color: col.color, bold: true, align: 'center' })
    T(col.label, colX + (contentW / 8), y + 11, { size: 6, color: [71, 85, 105], align: 'center' })
  })
  y += 18

  // ── STRENGTHS & GAPS ───────────────────────────────────────────────
  if (y > 200) { addPage(); R(0, 0, pageW, 14, [15, 23, 42], 0); T('COVENTRY ANALYTICS', margin, 9, { size: 7, color: [96, 165, 250], bold: true }); T('Business Health Score', pageW - margin, 9, { size: 7, color: [71, 85, 105], align: 'right' }); y = 22 }

  y = sectionLabel('YOUR STRENGTHS', y)
  const strengthDims = sorted2.filter(d => d.score >= 50).slice(0, 3)
  if (strengthDims.length === 0) {
    y = wrapText('No dimensions scored above 50. Focus on the priority gaps below.', margin, y, contentW, 5, { size: 9, color: [100, 116, 139] }); y += 4
  } else {
    strengthDims.forEach(({ title, score: s }) => {
      checkPage(22)
      R(margin, y, contentW, 16, [14, 40, 25], 2)
      doc.setDrawColor(34, 197, 94); doc.setLineWidth(0.4); doc.roundedRect(margin, y, contentW, 16, 2, 2, 'S')
      T('✓', margin + 4, y + 10, { size: 10, color: [34, 197, 94], bold: true })
      T(title, margin + 12, y + 7, { size: 9, color: [226, 232, 240], bold: true })
      T(`Score: ${s}/100 — This is a genuine strength. Build on it.`, margin + 12, y + 12.5, { size: 7.5, color: [100, 116, 139] })
      T(`${s}`, pageW - margin - 4, y + 10, { size: 11, color: [34, 197, 94], bold: true, align: 'right' })
      y += 19
    })
  }
  y += 4

  y = sectionLabel('PRIORITY GAPS', y)
  const weakDims2 = [...sorted2].reverse().filter(d => d.score < 70).slice(0, 4)
  weakDims2.forEach(({ title, score: s }, idx) => {
    checkPage(28)
    const gapBg = s < 30 ? [127, 29, 29] : [92, 45, 10]
    const borderC = s < 30 ? [239, 68, 68] : [245, 158, 11]
    R(margin, y, contentW, 20, gapBg, 2)
    doc.setDrawColor(...borderC); doc.setLineWidth(0.4); doc.roundedRect(margin, y, contentW, 20, 2, 2, 'S')
    const priority = idx === 0 ? 'HIGHEST PRIORITY' : idx === 1 ? 'HIGH PRIORITY' : 'PRIORITY'
    R(margin + 3, y + 3, 30, 6, [...borderC.map(v => Math.round(v * 0.4))], 1)
    T(priority, margin + 18, y + 7.5, { size: 5.5, color: borderC, bold: true, align: 'center' })
    T(title, margin + 36, y + 7, { size: 9, color: [226, 232, 240], bold: true })
    T(`Score: ${s}/100 — Addressing this will have the highest impact on your overall score.`, margin + 36, y + 13, { size: 7.5, color: [148, 163, 184] })
    T(`${s}`, pageW - margin - 4, y + 12, { size: 13, color: borderC, bold: true, align: 'right' })
    y += 23
  })

  // ── RECOMMENDATIONS ────────────────────────────────────────────────
  addPage()
  R(0, 0, pageW, 14, [15, 23, 42], 0)
  T('COVENTRY ANALYTICS', margin, 9, { size: 7, color: [96, 165, 250], bold: true })
  T('Recommendations', pageW - margin, 9, { size: 7, color: [71, 85, 105], align: 'right' })
  y = 22
  y = sectionLabel('PRIORITISED ACTION PLAN', y)
  y = wrapText('The following recommendations are ordered by priority. Focus on Critical items first — they unlock the most value and are typically the fastest path to measurable ROI.', margin, y, contentW, 5, { size: 9, color: [100, 116, 139] })
  y += 6

  const priorityMeta = {
    Critical: { color: [239, 68, 68], bg: [80, 20, 20], border: [239, 68, 68], label: '⚡ CRITICAL' },
    High: { color: [249, 115, 22], bg: [70, 30, 10], border: [249, 115, 22], label: '▲ HIGH' },
    Medium: { color: [234, 179, 8], bg: [60, 50, 5], border: [234, 179, 8], label: '● MEDIUM' },
    Opportunity: { color: [96, 165, 250], bg: [15, 35, 65], border: [96, 165, 250], label: '★ OPPORTUNITY' },
  }

  recommendations.forEach((rec, i) => {
    const pm = priorityMeta[rec.priority] || priorityMeta.Opportunity
    const descH = doc.setFontSize(8.5) || doc.splitTextToSize(rec.description, contentW - 10).length * 4.5
    const dLines = doc.splitTextToSize(rec.description, contentW - 10)
    const cardH = 16 + dLines.length * 4.5 + 12
    checkPage(cardH + 4)
    R(margin, y, contentW, cardH, pm.bg, 3)
    doc.setDrawColor(...pm.border); doc.setLineWidth(0.4); doc.roundedRect(margin, y, contentW, cardH, 3, 3, 'S')
    R(margin + 3, y + 3, 8, 8, pm.color, 1)
    T(`${i + 1}`, margin + 7, y + 8.5, { size: 7, color: [255, 255, 255], bold: true, align: 'center' })
    const badgeW = 28
    R(margin + contentW - badgeW - 3, y + 3, badgeW, 7, [...pm.color.map(v => Math.round(v * 0.25))], 1)
    T(pm.label, margin + contentW - badgeW / 2 - 3, y + 7.5, { size: 6, color: pm.color, bold: true, align: 'center' })
    T(rec.title, margin + 14, y + 8, { size: 9, color: [226, 232, 240], bold: true })
    if (rec.dimension) T(`Dimension: ${rec.dimension}`, margin + 14, y + 13, { size: 7, color: [100, 116, 139] })
    doc.setDrawColor(...pm.border.map(v => Math.round(v * 0.4))); doc.setLineWidth(0.2)
    doc.line(margin + 3, y + 16, margin + contentW - 3, y + 16)
    doc.setFontSize(8.5); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
    doc.text(dLines, margin + 5, y + 21)
    const afterDesc = y + 21 + dLines.length * 4.5
    R(margin + 5, afterDesc, contentW - 10, 7, [...pm.color.map(v => Math.round(v * 0.15))], 1)
    T('Potential Impact:', margin + 8, afterDesc + 4.5, { size: 7, color: [100, 116, 139] })
    T(rec.impact, margin + 35, afterDesc + 4.5, { size: 7, color: pm.color, bold: true })
    y += cardH + 5
  })

  // ── NEXT STEPS ─────────────────────────────────────────────────────
  checkPage(70)
  y = sectionLabel('RECOMMENDED NEXT STEPS', y)
  const halfW = (contentW - 4) / 2
  checkPage(55)
  R(margin, y, halfW, 48, [15, 23, 42], 2)
  T('30 DAYS', margin + 4, y + 7, { size: 8, color: [96, 165, 250], bold: true })
  ;[
    'Book a free strategy call to review your results with an expert',
    'Identify your single highest-priority gap from the report',
    'Quantify the cost: time lost, errors, or missed decisions per month',
    'Assign an internal owner and agree what "fixed" looks like',
  ].forEach((s, i) => {
    doc.setFontSize(7); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
    doc.text(doc.splitTextToSize(`${i + 1}. ${s}`, halfW - 8), margin + 4, y + 13 + i * 10)
  })
  R(margin + halfW + 4, y, halfW, 48, [15, 23, 42], 2)
  T('90 DAYS', margin + halfW + 8, y + 7, { size: 8, color: [96, 165, 250], bold: true })
  ;[
    'Implement one targeted quick-win in your lowest-scoring dimension',
    'Document baseline metrics so you can prove the improvement',
    'Run the Business Health Score again to see your scores move',
    'Identify the next gap and repeat the process',
  ].forEach((s, i) => {
    doc.setFontSize(7); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
    doc.text(doc.splitTextToSize(`${i + 1}. ${s}`, halfW - 8), margin + halfW + 8, y + 13 + i * 10)
  })
  y += 52

  checkPage(28)
  R(margin, y, contentW, 26, [37, 99, 235], 3)
  T('Ready to act on these insights?', pageW / 2, y + 9, { size: 12, color: [255, 255, 255], bold: true, align: 'center' })
  T('Book a free 30-minute strategy call — no pitch, no obligation, just honest advice.', pageW / 2, y + 16, { size: 8, color: [191, 219, 254], align: 'center' })
  T('coventryanalytics.co.uk/book', pageW / 2, y + 22, { size: 9, color: [147, 197, 253], bold: true, align: 'center' })

  doc.save(`business-health-score-${overallScore}.pdf`)
}

export default function ResultsDisplay({ overallScore, dimensionScores, emailCaptured = false, onRequestEmail }) {
  const [downloading, setDownloading] = useState(false)
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

  const handleDownload = async () => {
    if (!emailCaptured && onRequestEmail) {
      onRequestEmail()
      return
    }
    setDownloading(true)
    try {
      await generatePDF(overallScore, dimensionScores, maturity, recommendations, strengths, weaknesses)
    } catch (err) {
      console.error('PDF generation error:', err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Overall score */}
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

      {/* Charts */}
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

      {/* Strengths & Weaknesses */}
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

      {/* Recommendations */}
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
                <div className={`text-xs font-medium ${cfg.color}`}>Potential impact: {rec.impact}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/book" className="flex items-center justify-center gap-2 p-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-brand-500/25">
          Book Free Strategy Call <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center justify-center gap-2 p-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold transition-all border border-navy-700 disabled:opacity-60"
        >
          {downloading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</>
          ) : (
            <><Download className="w-4 h-4" /> {emailCaptured ? 'Download PDF Report' : 'Get Free PDF Report'}</>
          )}
        </button>
      </div>

      {!emailCaptured && (
        <p className="text-center text-xs text-slate-500">
          Enter your email to get the PDF report delivered to your inbox — free.
        </p>
      )}
    </div>
  )
}
