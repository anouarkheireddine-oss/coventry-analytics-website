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
      const margin = 18
      const contentW = pageW - margin * 2
      let y = 0
      let pageNum = 1

      const addPage = () => {
        doc.addPage()
        pageNum++
        // Footer on every page
        doc.setFillColor(15, 23, 42)
        doc.rect(0, 285, pageW, 12, 'F')
        doc.setFontSize(7); doc.setTextColor(71, 85, 105); doc.setFont('helvetica', 'normal')
        doc.text('Coventry Analytics Ltd · Coventry, UK · coventryanalytics.co.uk · info.coventryanalytics@gmail.com', pageW / 2, 291, { align: 'center' })
        doc.text(`Page ${pageNum}`, pageW - margin, 291, { align: 'right' })
        y = 20
      }

      const checkPage = (needed = 30) => { if (y + needed > 278) { addPage() } }

      const T = (text, x, yPos, opts = {}) => {
        const { size = 10, color = [30, 41, 59], bold = false, align = 'left', italic = false } = opts
        doc.setFontSize(size)
        doc.setTextColor(...color)
        doc.setFont('helvetica', bold ? 'bold' : italic ? 'italic' : 'normal')
        const method = align === 'center' ? { align: 'center' } : align === 'right' ? { align: 'right' } : {}
        const xPos = align === 'center' ? pageW / 2 : align === 'right' ? x : x
        doc.text(text, xPos, yPos, method)
      }

      const R = (x, yPos, w, h, fill, r = 2) => {
        doc.setFillColor(...fill)
        if (r > 0) doc.roundedRect(x, yPos, w, h, r, r, 'F')
        else doc.rect(x, yPos, w, h, 'F')
      }

      const sectionLabel = (label, yPos) => {
        doc.setDrawColor(37, 99, 235)
        doc.setLineWidth(0.5)
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

      // ── PAGE 1: COVER ──────────────────────────────────────────────
      R(0, 0, pageW, 297, [10, 15, 30], 0)

      // Top accent bar
      R(0, 0, pageW, 3, [37, 99, 235], 0)

      // Branding
      T('COVENTRY ANALYTICS', margin, 28, { size: 9, color: [96, 165, 250], bold: true })
      T('Operational Intelligence for UK SMEs', margin, 35, { size: 8, color: [71, 85, 105] })

      // Divider
      doc.setDrawColor(30, 41, 59); doc.setLineWidth(0.3)
      doc.line(margin, 40, pageW - margin, 40)

      // Report title block
      T(toolTitle.toUpperCase(), margin, 62, { size: 18, color: [255, 255, 255], bold: true })
      T('Confidential Assessment Report', margin, 72, { size: 10, color: [96, 165, 250] })

      // Score ring (drawn with circles)
      const cx = pageW / 2, cy = 130, r = 32
      const circ = 2 * Math.PI * r
      doc.setFillColor(20, 30, 50); doc.circle(cx, cy, r + 6, 'F')
      // background ring
      doc.setDrawColor(30, 41, 59); doc.setLineWidth(5)
      doc.circle(cx, cy, r, 'S')
      // score arc approximated with a series of lines — use filled segment
      doc.setDrawColor(...scoreColor); doc.setLineWidth(5)
      const startAngle = -Math.PI / 2
      const endAngle = startAngle + (overallScore / 100) * 2 * Math.PI
      const steps = 60
      for (let i = 0; i < steps; i++) {
        const a1 = startAngle + (i / steps) * (endAngle - startAngle)
        const a2 = startAngle + ((i + 1) / steps) * (endAngle - startAngle)
        if (a2 > endAngle) break
        doc.line(cx + r * Math.cos(a1), cy + r * Math.sin(a1), cx + r * Math.cos(a2), cy + r * Math.sin(a2))
      }
      // Score number
      T(`${overallScore}`, cx, cy - 4, { size: 28, color: [255, 255, 255], bold: true, align: 'center' })
      T('out of 100', cx, cy + 5, { size: 7, color: [148, 163, 184], align: 'center' })

      // Maturity badge
      R(cx - 28, cy + 14, 56, 10, [...scoreColor.map(v => Math.round(v * 0.2))], 2)
      doc.setDrawColor(...scoreColor); doc.setLineWidth(0.5)
      doc.roundedRect(cx - 28, cy + 14, 56, 10, 2, 2, 'S')
      T(maturity.level, cx, cy + 21, { size: 9, color: scoreColor, bold: true, align: 'center' })

      // Maturity description
      doc.setFontSize(9); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'italic')
      const descLines = doc.splitTextToSize(maturity.description, contentW - 20)
      doc.text(descLines, pageW / 2, cy + 34, { align: 'center' })

      // Meta info box
      R(margin, 185, contentW, 34, [15, 23, 42], 3)
      const metaY = 193
      T('Report Date', margin + 6, metaY, { size: 7, color: [71, 85, 105] })
      T(dateStr, margin + 6, metaY + 6, { size: 9, color: [226, 232, 240], bold: true })
      T('Assessment', margin + contentW / 2, metaY, { size: 7, color: [71, 85, 105], align: 'center' })
      T(toolTitle, margin + contentW / 2, metaY + 6, { size: 9, color: [226, 232, 240], bold: true, align: 'center' })
      T('Provider', pageW - margin - 6, metaY, { size: 7, color: [71, 85, 105], align: 'right' })
      T('Coventry Analytics', pageW - margin - 6, metaY + 6, { size: 9, color: [226, 232, 240], bold: true, align: 'right' })
      T('Dimensions assessed', margin + 6, metaY + 16, { size: 7, color: [71, 85, 105] })
      T(`${dimensionList.length}`, margin + 6, metaY + 22, { size: 9, color: [226, 232, 240], bold: true })
      T('Questions answered', margin + contentW / 2, metaY + 16, { size: 7, color: [71, 85, 105], align: 'center' })
      T(`${dimensionList.length * 2}`, margin + contentW / 2, metaY + 22, { size: 9, color: [226, 232, 240], bold: true, align: 'center' })
      T('Maturity Level', pageW - margin - 6, metaY + 16, { size: 7, color: [71, 85, 105], align: 'right' })
      T(maturity.level, pageW - margin - 6, metaY + 22, { size: 9, color: scoreColor, bold: true, align: 'right' })

      // Footer
      R(0, 282, pageW, 15, [7, 10, 20], 0)
      T('Coventry Analytics Ltd · coventryanalytics.co.uk · info.coventryanalytics@gmail.com', pageW / 2, 290, { size: 7, color: [71, 85, 105], align: 'center' })
      T('Page 1', pageW - margin, 290, { size: 7, color: [71, 85, 105], align: 'right' })

      // Confidential notice
      T('This report is prepared exclusively for the recipient. Not for redistribution.', pageW / 2, 277, { size: 6.5, color: [51, 65, 85], align: 'center' })

      // ── PAGE 2: EXECUTIVE SUMMARY + DIMENSION SCORES ───────────────
      addPage()
      R(0, 0, pageW, 14, [15, 23, 42], 0)
      T('COVENTRY ANALYTICS', margin, 9, { size: 7, color: [96, 165, 250], bold: true })
      T(toolTitle, pageW - margin, 9, { size: 7, color: [71, 85, 105], align: 'right' })

      y = 22
      y = sectionLabel('EXECUTIVE SUMMARY', y)

      // Score summary strip
      R(margin, y, contentW, 18, [20, 30, 55], 3)
      const scoreHex = overallScore >= 70 ? '#22c55e' : overallScore >= 40 ? '#3b82f6' : '#ef4444'
      T(`Overall Score: ${overallScore}/100`, margin + 4, y + 7, { size: 11, color: [255, 255, 255], bold: true })
      T(`Maturity Level: ${maturity.level}`, margin + 4, y + 13.5, { size: 8, color: [96, 165, 250] })
      T(dateStr, pageW - margin - 4, y + 10, { size: 8, color: [100, 116, 139], align: 'right' })
      y += 22

      y = wrapText(maturity.description, margin, y, contentW, 5, { size: 9, color: [148, 163, 184] })
      y += 4

      // What this score means
      const interpretations = {
        high: `A score of ${overallScore}/100 places your business in the upper tier of UK SMEs assessed by Coventry Analytics. You have strong foundations and targeted investment in the remaining gaps will compound your existing advantages.`,
        mid: `A score of ${overallScore}/100 is in line with the median for UK SMEs at your stage. You have areas of genuine strength alongside gaps that are currently costing you time, money, and competitive position. The recommendations in this report are ordered by impact.`,
        low: `A score of ${overallScore}/100 indicates foundational gaps that, left unaddressed, will limit growth and increase operational risk. The good news: the highest-impact improvements can typically be made within 90 days without large capital outlay.`,
      }
      const interp = overallScore >= 70 ? interpretations.high : overallScore >= 40 ? interpretations.mid : interpretations.low
      y = wrapText(interp, margin, y, contentW, 5, { size: 9, color: [100, 116, 139] })
      y += 8

      y = sectionLabel('DIMENSION SCORES', y)
      y += 2

      // Score bars — detailed
      const sorted2 = [...dimensionList].sort((a, b) => b.score - a.score)
      dimensionList.forEach(({ title, score: s }) => {
        checkPage(22)
        const barColor = s >= 70 ? [34, 197, 94] : s >= 40 ? [59, 130, 246] : [239, 68, 68]
        const statusLabel = s >= 70 ? 'Strong' : s >= 50 ? 'Developing' : s >= 30 ? 'Needs Work' : 'Critical Gap'
        const statusColor = s >= 70 ? [34, 197, 94] : s >= 50 ? [59, 130, 246] : s >= 30 ? [245, 158, 11] : [239, 68, 68]

        R(margin, y, contentW, 14, [20, 30, 50], 2)
        R(margin, y, Math.max(contentW * (s / 100), 4), 14, [...barColor.map(v => Math.round(v * 0.35))], 2)
        // Score fill
        R(margin, y, Math.max(contentW * (s / 100), 4), 4, barColor, 0)

        T(title, margin + 3, y + 9, { size: 8.5, color: [226, 232, 240], bold: true })
        T(`${s}/100`, margin + contentW - 3, y + 6, { size: 9, color: [255, 255, 255], bold: true, align: 'right' })
        T(statusLabel, margin + contentW - 3, y + 12, { size: 7, color: statusColor, align: 'right' })
        y += 17
      })

      y += 4

      // Score distribution summary
      const critCount = dimensionList.filter(d => d.score < 30).length
      const weakCount = dimensionList.filter(d => d.score >= 30 && d.score < 50).length
      const devCount = dimensionList.filter(d => d.score >= 50 && d.score < 70).length
      const strongCount = dimensionList.filter(d => d.score >= 70).length

      checkPage(20)
      R(margin, y, contentW, 14, [15, 23, 42], 2)
      const cols = [
        { label: 'Strong (70+)', val: strongCount, color: [34, 197, 94] },
        { label: 'Developing (50-69)', val: devCount, color: [59, 130, 246] },
        { label: 'Needs Work (30-49)', val: weakCount, color: [245, 158, 11] },
        { label: 'Critical (<30)', val: critCount, color: [239, 68, 68] },
      ]
      cols.forEach((col, i) => {
        const colX = margin + (contentW / 4) * i
        T(`${col.val}`, colX + (contentW / 8), y + 6, { size: 11, color: col.color, bold: true, align: 'center' })
        T(col.label, colX + (contentW / 8), y + 11, { size: 6, color: [71, 85, 105], align: 'center' })
      })
      y += 18

      // ── PAGE 3: STRENGTHS & GAPS ───────────────────────────────────
      checkPage(60)
      if (y > 200) { addPage(); R(0, 0, pageW, 14, [15, 23, 42], 0); T('COVENTRY ANALYTICS', margin, 9, { size: 7, color: [96, 165, 250], bold: true }); T(toolTitle, pageW - margin, 9, { size: 7, color: [71, 85, 105], align: 'right' }); y = 22 }

      y = sectionLabel('YOUR STRENGTHS', y)
      const strengthDims = sorted2.filter(d => d.score >= 50).slice(0, 3)
      if (strengthDims.length === 0) {
        y = wrapText('No dimensions scored above 50. Focus on the critical gaps below to build your foundation.', margin, y, contentW, 5, { size: 9, color: [100, 116, 139] })
        y += 4
      } else {
        strengthDims.forEach(({ title, score: s }) => {
          checkPage(22)
          R(margin, y, contentW, 16, [14, 40, 25], 2)
          doc.setDrawColor(34, 197, 94); doc.setLineWidth(0.4)
          doc.roundedRect(margin, y, contentW, 16, 2, 2, 'S')
          T('✓', margin + 4, y + 10, { size: 10, color: [34, 197, 94], bold: true })
          T(title, margin + 12, y + 7, { size: 9, color: [226, 232, 240], bold: true })
          T(`Score: ${s}/100 — This is a genuine strength. Build on it.`, margin + 12, y + 12.5, { size: 7.5, color: [100, 116, 139] })
          T(`${s}`, pageW - margin - 4, y + 10, { size: 11, color: [34, 197, 94], bold: true, align: 'right' })
          y += 19
        })
      }
      y += 4

      y = sectionLabel('PRIORITY GAPS', y)
      const weakDims = [...sorted2].reverse().filter(d => d.score < 70).slice(0, 4)
      weakDims.forEach(({ title, score: s }, idx) => {
        checkPage(28)
        const gapColor = s < 30 ? [127, 29, 29] : [92, 45, 10]
        const borderColor = s < 30 ? [239, 68, 68] : [245, 158, 11]
        R(margin, y, contentW, 20, gapColor, 2)
        doc.setDrawColor(...borderColor); doc.setLineWidth(0.4)
        doc.roundedRect(margin, y, contentW, 20, 2, 2, 'S')
        const priority = idx === 0 ? 'HIGHEST PRIORITY' : idx === 1 ? 'HIGH PRIORITY' : 'PRIORITY'
        R(margin + 3, y + 3, 30, 6, [...borderColor.map(v => Math.round(v * 0.4))], 1)
        T(priority, margin + 18, y + 7.5, { size: 5.5, color: borderColor, bold: true, align: 'center' })
        T(title, margin + 36, y + 7, { size: 9, color: [226, 232, 240], bold: true })
        T(`Score: ${s}/100 — Addressing this will have the highest impact on your overall maturity.`, margin + 36, y + 13, { size: 7.5, color: [148, 163, 184] })
        T(`${s}`, pageW - margin - 4, y + 12, { size: 13, color: borderColor, bold: true, align: 'right' })
        y += 23
      })

      // ── RECOMMENDATIONS ─────────────────────────────────────────────
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
        // Estimate card height
        const descH = doc.splitTextToSize(rec.description, contentW - 10).length * 4.5
        const cardH = 14 + descH + 12
        checkPage(cardH + 4)

        R(margin, y, contentW, cardH, pm.bg, 3)
        doc.setDrawColor(...pm.border); doc.setLineWidth(0.4)
        doc.roundedRect(margin, y, contentW, cardH, 3, 3, 'S')

        // Number bubble
        R(margin + 3, y + 3, 8, 8, pm.color, 1)
        T(`${i + 1}`, margin + 7, y + 8.5, { size: 7, color: [255, 255, 255], bold: true, align: 'center' })

        // Priority badge
        const badgeW = 28
        R(margin + contentW - badgeW - 3, y + 3, badgeW, 7, [...pm.color.map(v => Math.round(v * 0.25))], 1)
        T(pm.label, margin + contentW - badgeW / 2 - 3, y + 7.5, { size: 6, color: pm.color, bold: true, align: 'center' })

        // Title
        T(rec.title, margin + 14, y + 8, { size: 9, color: [226, 232, 240], bold: true })
        if (rec.dimension) T(`Dimension: ${rec.dimension}`, margin + 14, y + 13, { size: 7, color: [100, 116, 139] })

        // Divider
        doc.setDrawColor(...pm.border.map(v => Math.round(v * 0.4))); doc.setLineWidth(0.2)
        doc.line(margin + 3, y + 16, margin + contentW - 3, y + 16)

        // Description — full, not truncated
        doc.setFontSize(8.5); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
        const dLines = doc.splitTextToSize(rec.description, contentW - 10)
        doc.text(dLines, margin + 5, y + 21)
        const afterDesc = y + 21 + dLines.length * 4.5

        // Impact
        R(margin + 5, afterDesc, contentW - 10, 7, [...pm.color.map(v => Math.round(v * 0.15))], 1)
        T('Potential Impact:', margin + 8, afterDesc + 4.5, { size: 7, color: [100, 116, 139] })
        T(rec.impact, margin + 35, afterDesc + 4.5, { size: 7, color: pm.color, bold: true })

        y += cardH + 5
      })

      // ── NEXT STEPS ──────────────────────────────────────────────────
      checkPage(70)
      y = sectionLabel('RECOMMENDED NEXT STEPS', y)

      const steps30 = [
        'Book a free 30-minute strategy call with Coventry Analytics to review your results',
        `Identify the single highest-priority gap from your assessment (${weakDims[0]?.title || 'your lowest scoring dimension'})`,
        'Quantify the cost of that gap: time lost, errors, delayed decisions, or missed revenue',
        'Agree internally who owns the improvement and what "fixed" looks like in 90 days',
      ]
      const steps90 = [
        'Implement one targeted quick-win (typically 2-4 weeks to deliver, high visibility)',
        'Document the baseline so you can measure the improvement after 30 days',
        'Run the assessment again to see your dimension scores move',
        'Identify your next highest-priority gap and repeat',
      ]

      const halfW = (contentW - 4) / 2

      checkPage(55)
      R(margin, y, halfW, 48, [15, 23, 42], 2)
      T('30 DAYS', margin + 4, y + 7, { size: 8, color: [96, 165, 250], bold: true })
      steps30.forEach((s, i) => {
        doc.setFontSize(7); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
        const ln = doc.splitTextToSize(`${i + 1}. ${s}`, halfW - 8)
        doc.text(ln, margin + 4, y + 13 + i * 10)
      })

      R(margin + halfW + 4, y, halfW, 48, [15, 23, 42], 2)
      T('90 DAYS', margin + halfW + 8, y + 7, { size: 8, color: [96, 165, 250], bold: true })
      steps90.forEach((s, i) => {
        doc.setFontSize(7); doc.setTextColor(148, 163, 184); doc.setFont('helvetica', 'normal')
        const ln = doc.splitTextToSize(`${i + 1}. ${s}`, halfW - 8)
        doc.text(ln, margin + halfW + 8, y + 13 + i * 10)
      })
      y += 52

      // ── CTA ─────────────────────────────────────────────────────────
      checkPage(28)
      R(margin, y, contentW, 26, [37, 99, 235], 3)
      T('Ready to act on these insights?', pageW / 2, y + 9, { size: 12, color: [255, 255, 255], bold: true, align: 'center' })
      T('Book a free 30-minute strategy call — no pitch, no obligation, just honest advice.', pageW / 2, y + 16, { size: 8, color: [191, 219, 254], align: 'center' })
      T('coventryanalytics.co.uk/book', pageW / 2, y + 22, { size: 9, color: [147, 197, 253], bold: true, align: 'center' })

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
