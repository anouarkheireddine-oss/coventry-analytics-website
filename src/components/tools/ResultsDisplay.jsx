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

  // ── HELPERS ─────────────────────────────────────────────────────────
  const addInnerPageChrome = () => {
    doc.setFillColor(15, 23, 42); doc.rect(0, 0, pageW, 14, 'F')
    doc.setFontSize(7); doc.setTextColor(96, 165, 250); doc.setFont('helvetica', 'bold')
    doc.text('COVENTRY ANALYTICS', margin, 9)
    doc.setTextColor(71, 85, 105); doc.setFont('helvetica', 'normal')
    doc.text('Business Health Score Report', pageW - margin, 9, { align: 'right' })
    doc.setFillColor(7, 10, 20); doc.rect(0, 284, pageW, 13, 'F')
    doc.setFontSize(6.5); doc.setTextColor(71, 85, 105)
    doc.text('Coventry Analytics Ltd  |  coventryanalytics.co.uk  |  info.coventryanalytics@gmail.com', pageW / 2, 291, { align: 'center' })
    doc.text(`Page ${pageNum}`, pageW - margin, 291, { align: 'right' })
  }

  const addPage = () => {
    doc.addPage(); pageNum++
    addInnerPageChrome()
    y = 22
  }

  const checkPage = (needed = 30) => { if (y + needed > 281) addPage() }

  // T: x is always the anchor; align controls how text hangs from that anchor
  const T = (text, x, yPos, opts = {}) => {
    const { size = 10, color = [30, 41, 59], bold = false, align = 'left', italic = false } = opts
    doc.setFontSize(size); doc.setTextColor(...color)
    doc.setFont('helvetica', bold ? 'bold' : italic ? 'italic' : 'normal')
    doc.text(text, x, yPos, align !== 'left' ? { align } : {})
  }

  const R = (x, yPos, w, h, fill, r = 2) => {
    doc.setFillColor(...fill)
    r > 0 ? doc.roundedRect(x, yPos, w, h, r, r, 'F') : doc.rect(x, yPos, w, h, 'F')
  }

  const sectionLabel = (label, yPos) => {
    doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.5)
    doc.line(margin, yPos, margin + 4, yPos)
    T(label, margin + 6, yPos + 0.5, { size: 7.5, color: [96, 165, 250], bold: true })
    return yPos + 8
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
  const sorted = [...dimensionList].sort((a, b) => b.score - a.score)
  const worstDim = sorted[sorted.length - 1]

  const costRange = overallScore < 30 ? 'GBP 15,000 - 40,000'
    : overallScore < 50 ? 'GBP 6,000 - 18,000'
    : overallScore < 70 ? 'GBP 2,000 - 8,000'
    : 'GBP 1,000 - 4,000'
  const costNote = overallScore < 30
    ? 'per year in operational waste, rework, and missed growth decisions'
    : overallScore < 50
    ? 'per year in operational inefficiency, delayed decisions, and avoidable rework'
    : 'per year in addressable waste and unrealised efficiency gains'

  // ── PAGE 1: COVER ──────────────────────────────────────────────────
  R(0, 0, pageW, 297, [10, 15, 30], 0)
  R(0, 0, pageW, 3, [37, 99, 235], 0)
  T('COVENTRY ANALYTICS', margin, 28, { size: 9, color: [96, 165, 250], bold: true })
  T('Operational Intelligence for UK SMEs', margin, 35, { size: 8, color: [71, 85, 105] })
  doc.setDrawColor(30, 41, 59); doc.setLineWidth(0.3)
  doc.line(margin, 40, pageW - margin, 40)
  T('BUSINESS HEALTH SCORE', margin, 60, { size: 20, color: [255, 255, 255], bold: true })
  T('Confidential Assessment Report', margin, 70, { size: 10, color: [96, 165, 250] })

  // Score ring
  const cx = pageW / 2, cy = 113, ringR = 30
  doc.setFillColor(18, 28, 48); doc.circle(cx, cy, ringR + 6, 'F')
  doc.setDrawColor(30, 41, 59); doc.setLineWidth(6); doc.circle(cx, cy, ringR, 'S')
  doc.setDrawColor(...scoreColor); doc.setLineWidth(6)
  const startA = -Math.PI / 2, endA = startA + (overallScore / 100) * 2 * Math.PI
  for (let i = 0; i < 80; i++) {
    const a1 = startA + (i / 80) * (endA - startA)
    const a2 = startA + ((i + 1) / 80) * (endA - startA)
    if (a2 > endA) break
    doc.line(cx + ringR * Math.cos(a1), cy + ringR * Math.sin(a1), cx + ringR * Math.cos(a2), cy + ringR * Math.sin(a2))
  }
  T(`${overallScore}`, cx, cy - 3, { size: 26, color: [255, 255, 255], bold: true, align: 'center' })
  T('/ 100', cx, cy + 5, { size: 7, color: [148, 163, 184], align: 'center' })

  // Maturity badge
  R(cx - 28, cy + 13, 56, 10, [20, 30, 55], 2)
  doc.setDrawColor(...scoreColor); doc.setLineWidth(0.5); doc.roundedRect(cx - 28, cy + 13, 56, 10, 2, 2, 'S')
  T(maturity.level, cx, cy + 20, { size: 9, color: scoreColor, bold: true, align: 'center' })
  doc.setFontSize(8.5); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'italic')
  const mDescLines = doc.splitTextToSize(maturity.description, contentW - 20)
  doc.text(mDescLines, pageW / 2, cy + 29, { align: 'center' })

  // Key Finding callout
  const kfY = cy + 29 + mDescLines.length * 4.5 + 5
  R(margin, kfY, contentW, 40, [18, 32, 60], 3)
  doc.setDrawColor(59, 130, 246); doc.setLineWidth(0.5)
  doc.roundedRect(margin, kfY, contentW, 40, 3, 3, 'S')
  R(margin, kfY, 3, 40, [37, 99, 235], 0)
  T('KEY FINDING', margin + 8, kfY + 8, { size: 7, color: [96, 165, 250], bold: true })
  T(`Lowest-scoring area: ${worstDim.title} (${worstDim.score}/100)`, margin + 8, kfY + 15, { size: 9.5, color: [255, 255, 255], bold: true })
  const kfNote = `UK SMEs with a similar profile typically recover ${costRange} ${costNote} once this gap is closed with targeted intervention.`
  const kfLines = doc.splitTextToSize(kfNote, contentW - 14)
  doc.setFontSize(7.5); doc.setTextColor(147, 197, 253); doc.setFont('helvetica', 'normal')
  doc.text(kfLines, margin + 8, kfY + 22)
  T('See page 3 for gap analysis and recommendations.', margin + 8, kfY + 36, { size: 7, color: [71, 85, 105] })

  // Meta info box
  const metaY = kfY + 46
  R(margin, metaY, contentW, 36, [15, 23, 42], 3)
  T('Report Date', margin + 6, metaY + 8, { size: 7, color: [71, 85, 105] })
  T(dateStr, margin + 6, metaY + 15, { size: 8.5, color: [226, 232, 240], bold: true })
  T('Assessment', margin + contentW / 2, metaY + 8, { size: 7, color: [71, 85, 105], align: 'center' })
  T('Business Health Score', margin + contentW / 2, metaY + 15, { size: 8.5, color: [226, 232, 240], bold: true, align: 'center' })
  T('Provider', pageW - margin - 6, metaY + 8, { size: 7, color: [71, 85, 105], align: 'right' })
  T('Coventry Analytics', pageW - margin - 6, metaY + 15, { size: 8.5, color: [226, 232, 240], bold: true, align: 'right' })
  T('Dimensions', margin + 6, metaY + 22, { size: 7, color: [71, 85, 105] })
  T('5', margin + 6, metaY + 29, { size: 8.5, color: [226, 232, 240], bold: true })
  T('Questions', margin + contentW / 2, metaY + 22, { size: 7, color: [71, 85, 105], align: 'center' })
  T('13', margin + contentW / 2, metaY + 29, { size: 8.5, color: [226, 232, 240], bold: true, align: 'center' })
  T('Maturity Level', pageW - margin - 6, metaY + 22, { size: 7, color: [71, 85, 105], align: 'right' })
  T(maturity.level, pageW - margin - 6, metaY + 29, { size: 8.5, color: scoreColor, bold: true, align: 'right' })

  T('This report is prepared exclusively for the recipient. Not for redistribution.', pageW / 2, 272, { size: 6.5, color: [51, 65, 85], align: 'center' })
  R(0, 278, pageW, 19, [7, 10, 20], 0)
  T('Coventry Analytics Ltd  |  coventryanalytics.co.uk  |  info.coventryanalytics@gmail.com', pageW / 2, 290, { size: 7, color: [71, 85, 105], align: 'center' })
  T('Page 1', pageW - margin, 290, { size: 7, color: [71, 85, 105], align: 'right' })

  // ── PAGE 2: EXECUTIVE SUMMARY + COST OF INACTION + DIMENSION SCORES ─
  addPage()

  y = sectionLabel('EXECUTIVE SUMMARY', y)
  R(margin, y, contentW, 18, [20, 30, 55], 3)
  T(`Overall Score: ${overallScore}/100  |  Maturity: ${maturity.level}`, margin + 5, y + 7, { size: 10, color: [255, 255, 255], bold: true })
  T(dateStr, pageW - margin - 4, y + 10, { size: 8, color: [100, 116, 139], align: 'right' })
  y += 21

  y = wrapText(maturity.description, margin, y, contentW, 5, { size: 9, color: [148, 163, 184] })
  y += 3

  const interp = overallScore >= 70
    ? `A score of ${overallScore}/100 places your business in the upper tier of UK SMEs assessed by Coventry Analytics. Your foundations are strong across multiple dimensions. The recommendations in this report will help you push toward best-in-class performance and protect your competitive advantage.`
    : overallScore >= 40
    ? `A score of ${overallScore}/100 is in line with the median for UK SMEs at your stage. You have genuine strengths alongside gaps that are currently costing you time, money, and competitive position. The recommendations below are ordered by impact — work through them in sequence.`
    : `A score of ${overallScore}/100 indicates foundational gaps that are currently limiting growth and increasing operational risk. The highest-impact improvements can typically be made within 90 days and do not require large capital outlay.`
  y = wrapText(interp, margin, y, contentW, 5, { size: 9, color: [100, 116, 139] })
  y += 6

  // Cost of Inaction box
  R(margin, y, contentW, 24, [55, 18, 18], 3)
  doc.setDrawColor(239, 68, 68); doc.setLineWidth(0.5)
  doc.roundedRect(margin, y, contentW, 24, 3, 3, 'S')
  R(margin, y, 3, 24, [239, 68, 68], 0)
  T('COST OF INACTION', margin + 8, y + 8, { size: 7, color: [252, 165, 165], bold: true })
  T(`Estimated annual loss without improvement: ${costRange}`, margin + 8, y + 15, { size: 9.5, color: [255, 255, 255], bold: true })
  const costSubLines = doc.splitTextToSize(costNote + '.', contentW - 14)
  doc.setFontSize(7); doc.setTextColor(252, 165, 165); doc.setFont('helvetica', 'normal')
  doc.text(costSubLines, margin + 8, y + 20)
  y += 28

  y = sectionLabel('DIMENSION SCORES', y)
  y += 2

  dimensionList.forEach(({ title, score: s }) => {
    checkPage(18)
    const barColor = s >= 70 ? [34, 197, 94] : s >= 40 ? [59, 130, 246] : [239, 68, 68]
    const statusLabel = s >= 70 ? 'Strong' : s >= 50 ? 'Developing' : s >= 30 ? 'Needs Work' : 'Critical Gap'
    const statusColor = s >= 70 ? [34, 197, 94] : s >= 50 ? [59, 130, 246] : s >= 30 ? [245, 158, 11] : [239, 68, 68]
    R(margin, y, contentW, 13, [20, 30, 50], 2)
    R(margin, y, Math.max(contentW * (s / 100), 3), 13, [...barColor.map(v => Math.round(v * 0.3))], 2)
    R(margin, y, Math.max(contentW * (s / 100), 3), 3, barColor, 0)
    T(title, margin + 3, y + 9, { size: 8.5, color: [226, 232, 240], bold: true })
    T(`${s}/100`, margin + contentW - 3, y + 6, { size: 8.5, color: [255, 255, 255], bold: true, align: 'right' })
    T(statusLabel, margin + contentW - 3, y + 11, { size: 6.5, color: statusColor, align: 'right' })
    y += 16
  })

  y += 3
  // Score distribution — 4 columns with 2-line labels to avoid collision
  checkPage(22)
  const critC = dimensionList.filter(d => d.score < 30).length
  const weakC = dimensionList.filter(d => d.score >= 30 && d.score < 50).length
  const devC = dimensionList.filter(d => d.score >= 50 && d.score < 70).length
  const strongC = dimensionList.filter(d => d.score >= 70).length
  R(margin, y, contentW, 20, [15, 23, 42], 2)
  const distCols = [
    { l1: 'Strong', l2: '70+', val: strongC, color: [34, 197, 94] },
    { l1: 'Developing', l2: '50-69', val: devC, color: [59, 130, 246] },
    { l1: 'Needs Work', l2: '30-49', val: weakC, color: [245, 158, 11] },
    { l1: 'Critical', l2: 'Below 30', val: critC, color: [239, 68, 68] },
  ]
  const colW = contentW / 4
  distCols.forEach((col, i) => {
    const cx2 = margin + colW * i + colW / 2
    T(`${col.val}`, cx2, y + 9, { size: 14, color: col.color, bold: true, align: 'center' })
    T(col.l1, cx2, y + 14, { size: 6, color: [100, 116, 139], align: 'center' })
    T(col.l2, cx2, y + 18.5, { size: 5.5, color: [71, 85, 105], align: 'center' })
  })
  y += 24

  // ── PAGE 3: STRENGTHS & GAPS + SERVICE BRIDGE ──────────────────────
  addPage()

  y = sectionLabel('YOUR STRENGTHS', y)
  const strengthDims = sorted.filter(d => d.score >= 50).slice(0, 3)
  if (strengthDims.length === 0) {
    y = wrapText('No dimensions scored above 50 in this assessment. Focus on the critical gaps below to build your foundation.', margin, y, contentW, 5, { size: 9, color: [100, 116, 139] })
    y += 4
  } else {
    strengthDims.forEach(({ title, score: s }) => {
      checkPage(20)
      R(margin, y, contentW, 15, [12, 38, 22], 2)
      doc.setDrawColor(34, 197, 94); doc.setLineWidth(0.4)
      doc.roundedRect(margin, y, contentW, 15, 2, 2, 'S')
      // Green indicator block (no emoji — plain rectangle)
      R(margin + 3, y + 4, 5, 7, [34, 197, 94], 1)
      T(title, margin + 11, y + 7, { size: 9, color: [226, 232, 240], bold: true })
      T(`Score: ${s}/100 — A genuine competitive advantage. Protect and compound it.`, margin + 11, y + 12, { size: 7.5, color: [100, 116, 139] })
      T(`${s}`, pageW - margin - 4, y + 9.5, { size: 12, color: [34, 197, 94], bold: true, align: 'right' })
      y += 18
    })
  }
  y += 4

  y = sectionLabel('PRIORITY GAPS', y)
  const weakDims = [...sorted].reverse().filter(d => d.score < 70).slice(0, 4)
  weakDims.forEach(({ title, score: s }, idx) => {
    checkPage(26)
    const gapBg = s < 30 ? [80, 18, 18] : s < 50 ? [75, 35, 8] : [50, 45, 5]
    const borderC = s < 30 ? [239, 68, 68] : s < 50 ? [245, 158, 11] : [234, 179, 8]
    const priorityLabel = idx === 0 ? 'CRITICAL PRIORITY' : idx === 1 ? 'HIGH PRIORITY' : idx === 2 ? 'MEDIUM PRIORITY' : 'LOW PRIORITY'
    const gapCost = s < 30 ? 'GBP 3,000-8,000/yr' : s < 50 ? 'GBP 1,500-4,000/yr' : 'GBP 500-2,000/yr'
    R(margin, y, contentW, 22, gapBg, 2)
    doc.setDrawColor(...borderC); doc.setLineWidth(0.4)
    doc.roundedRect(margin, y, contentW, 22, 2, 2, 'S')
    R(margin + 3, y + 3, 34, 6, [...borderC.map(v => Math.round(v * 0.35))], 1)
    T(priorityLabel, margin + 20, y + 7.5, { size: 5.5, color: borderC, bold: true, align: 'center' })
    T(title, margin + 40, y + 7, { size: 9, color: [226, 232, 240], bold: true })
    T(`Score: ${s}/100`, margin + 40, y + 13, { size: 7.5, color: [148, 163, 184] })
    T(`Est. impact: ${gapCost}`, pageW - margin - 4, y + 7, { size: 7, color: borderC, bold: true, align: 'right' })
    T(`${s}`, pageW - margin - 4, y + 14, { size: 12, color: borderC, bold: true, align: 'right' })
    y += 25
  })

  y += 6

  // Service Bridge
  checkPage(90)
  y = sectionLabel('HOW COVENTRY ANALYTICS CAN HELP', y)
  const services = [
    { price: 'Free', title: '30-Minute Strategy Call', desc: 'Honest expert review of your results. No pitch, no obligation. Book at coventryanalytics.co.uk/book', color: [34, 197, 94] },
    { price: 'GBP 499', title: 'Analytics Workshop (2 Days)', desc: 'Deep-dive into your top 3 gaps. We build your 90-day improvement roadmap and surface the quick wins.', color: [59, 130, 246] },
    { price: 'GBP 2,500', title: 'Analytics System Build', desc: 'Full implementation: live dashboard, KPI framework, and automated reporting. Typically live in 4-6 weeks.', color: [96, 165, 250] },
    { price: 'GBP 750/mo', title: 'Ongoing Analytics Partnership', desc: 'Monthly retainer for continuous improvement, new dashboards, and executive reporting support.', color: [167, 139, 250] },
  ]
  services.forEach((svc) => {
    checkPage(22)
    R(margin, y, contentW, 18, [15, 23, 42], 2)
    doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.3)
    doc.roundedRect(margin, y, contentW, 18, 2, 2, 'S')
    R(margin + 3, y + 4, 24, 10, [...svc.color.map(v => Math.round(v * 0.2))], 1)
    T(svc.price, margin + 15, y + 10, { size: 6.5, color: svc.color, bold: true, align: 'center' })
    T(svc.title, margin + 30, y + 8, { size: 8.5, color: [226, 232, 240], bold: true })
    doc.setFontSize(7); doc.setTextColor(100, 116, 139); doc.setFont('helvetica', 'normal')
    const svcLines = doc.splitTextToSize(svc.desc, contentW - 34)
    doc.text(svcLines, margin + 30, y + 13)
    y += 21
  })

  // ── PAGE 4: RECOMMENDATIONS + NEXT STEPS + CTA ─────────────────────
  addPage()

  y = sectionLabel('PRIORITISED ACTION PLAN', y)
  y = wrapText('The following recommendations are ordered by priority. Address Critical items first — they deliver the fastest ROI and unblock the most value.', margin, y, contentW, 5, { size: 9, color: [100, 116, 139] })
  y += 6

  const priorityMeta = {
    Critical: { color: [239, 68, 68], bg: [80, 20, 20], border: [239, 68, 68], label: 'CRITICAL' },
    High: { color: [249, 115, 22], bg: [70, 30, 10], border: [249, 115, 22], label: 'HIGH' },
    Medium: { color: [234, 179, 8], bg: [60, 50, 5], border: [234, 179, 8], label: 'MEDIUM' },
    Opportunity: { color: [96, 165, 250], bg: [15, 35, 65], border: [96, 165, 250], label: 'OPPORTUNITY' },
  }

  recommendations.forEach((rec, i) => {
    const pm = priorityMeta[rec.priority] || priorityMeta.Opportunity
    doc.setFontSize(8.5)
    const dLines = doc.splitTextToSize(rec.description, contentW - 10)
    const cardH = 20 + dLines.length * 4.5 + 10
    checkPage(cardH + 4)
    R(margin, y, contentW, cardH, pm.bg, 3)
    doc.setDrawColor(...pm.border); doc.setLineWidth(0.4)
    doc.roundedRect(margin, y, contentW, cardH, 3, 3, 'S')
    // Number circle
    R(margin + 3, y + 3, 8, 8, pm.color, 1)
    T(`${i + 1}`, margin + 7, y + 8.5, { size: 7, color: [255, 255, 255], bold: true, align: 'center' })
    // Priority badge — plain text only, no emoji
    const badgeW = 28
    R(margin + contentW - badgeW - 3, y + 3, badgeW, 7, [...pm.color.map(v => Math.round(v * 0.25))], 1)
    T(pm.label, margin + contentW - badgeW / 2 - 3, y + 7.5, { size: 5.5, color: pm.color, bold: true, align: 'center' })
    T(rec.title, margin + 14, y + 8, { size: 9, color: [226, 232, 240], bold: true })
    if (rec.dimension) T(`Dimension: ${rec.dimension}`, margin + 14, y + 13, { size: 7, color: [100, 116, 139] })
    doc.setDrawColor(...pm.border.map(v => Math.round(v * 0.4))); doc.setLineWidth(0.2)
    doc.line(margin + 3, y + 16, margin + contentW - 3, y + 16)
    doc.setFontSize(8.5); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
    doc.text(dLines, margin + 5, y + 21)
    const afterDesc = y + 21 + dLines.length * 4.5 + 2
    R(margin + 5, afterDesc, contentW - 10, 7, [...pm.color.map(v => Math.round(v * 0.15))], 1)
    T('Potential Impact:', margin + 8, afterDesc + 4.5, { size: 7, color: [100, 116, 139] })
    T(rec.impact, margin + 36, afterDesc + 4.5, { size: 7, color: pm.color, bold: true })
    y += cardH + 5
  })

  // Next Steps
  checkPage(58)
  y += 4
  y = sectionLabel('RECOMMENDED NEXT STEPS', y)
  const halfW = (contentW - 4) / 2
  R(margin, y, halfW, 46, [15, 23, 42], 2)
  doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.3); doc.roundedRect(margin, y, halfW, 46, 2, 2, 'S')
  T('30 DAYS', margin + 4, y + 7, { size: 8, color: [96, 165, 250], bold: true })
  ;[
    'Book a free strategy call to review your results with an expert',
    'Identify your single highest-priority gap from this report',
    'Quantify the cost: time lost, errors, or missed decisions per month',
    'Assign a named internal owner for each improvement',
  ].forEach((s, i) => {
    doc.setFontSize(7); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
    doc.text(doc.splitTextToSize(`${i + 1}. ${s}`, halfW - 8), margin + 4, y + 14 + i * 9)
  })
  R(margin + halfW + 4, y, halfW, 46, [15, 23, 42], 2)
  doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.3); doc.roundedRect(margin + halfW + 4, y, halfW, 46, 2, 2, 'S')
  T('90 DAYS', margin + halfW + 8, y + 7, { size: 8, color: [96, 165, 250], bold: true })
  ;[
    'Implement one targeted quick-win in your lowest-scoring dimension',
    'Document your baseline metrics to measure the improvement',
    'Run the Business Health Score again to see your scores move',
    'Identify your next gap and repeat the process',
  ].forEach((s, i) => {
    doc.setFontSize(7); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
    doc.text(doc.splitTextToSize(`${i + 1}. ${s}`, halfW - 8), margin + halfW + 8, y + 14 + i * 9)
  })
  y += 50

  // CTA banner
  checkPage(30)
  R(margin, y, contentW, 28, [37, 99, 235], 3)
  T('Ready to act on these insights?', pageW / 2, y + 10, { size: 12, color: [255, 255, 255], bold: true, align: 'center' })
  T('Book your free 30-minute strategy call - no pitch, no obligation.', pageW / 2, y + 17, { size: 8, color: [191, 219, 254], align: 'center' })
  T('coventryanalytics.co.uk/book', pageW / 2, y + 23, { size: 9, color: [147, 197, 253], bold: true, align: 'center' })

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
