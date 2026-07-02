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
      const M = 20
      const cW = pageW - M * 2
      const rEdge = pageW - M
      const mid = pageW / 2
      let y = 0
      let pageNum = 1

      // ── DESIGN TOKENS ─────────────────────────────────────────────────
      const navy  = [10, 22, 55]
      const blue  = [37, 99, 235]
      const slate = [51, 65, 85]
      const muted = [100, 116, 139]
      const light = [148, 163, 184]
      const ghost = [226, 232, 240]
      const ink   = [15, 23, 42]
      const white = [255, 255, 255]
      const pageGrey = [250, 251, 253]
      const sColor = overallScore >= 70 ? [22, 163, 74] : overallScore >= 40 ? [37, 99, 235] : [220, 38, 38]

      // ── HELPERS ───────────────────────────────────────────────────────
      const T = (text, x, yy, opts = {}) => {
        const { sz = 9, col = ink, bold = false, italic = false, align = 'left' } = opts
        doc.setFontSize(sz); doc.setTextColor(...col)
        doc.setFont('helvetica', bold ? 'bold' : italic ? 'italic' : 'normal')
        doc.text(String(text), x, yy, align !== 'left' ? { align } : {})
      }

      const R = (x, yy, w, h, fill, r = 0) => {
        doc.setFillColor(...fill)
        r > 0 ? doc.roundedRect(x, yy, w, h, r, r, 'F') : doc.rect(x, yy, w, h, 'F')
      }

      const hline = (x1, yy, x2, col = ghost, lw = 0.3) => {
        doc.setDrawColor(...col); doc.setLineWidth(lw); doc.line(x1, yy, x2, yy)
      }

      const wrap = (text, x, yy, maxW, opts = {}) => {
        const { sz = 8.5, col = muted, lh = 4.8 } = opts
        doc.setFontSize(sz); doc.setTextColor(...col); doc.setFont('helvetica', 'normal')
        const ls = doc.splitTextToSize(text, maxW)
        doc.text(ls, x, yy)
        return yy + ls.length * lh
      }

      const section = (label, yy) => {
        hline(M, yy, M + cW, blue, 0.4)
        T(label, M, yy - 1.5, { sz: 7, col: blue, bold: true })
        return yy + 6
      }

      const innerChrome = () => {
        R(0, 0, pageW, 297, pageGrey, 0)
        R(0, 0, pageW, 13, navy, 0)
        T('COVENTRY ANALYTICS', M, 8.5, { sz: 7, col: [96, 165, 250], bold: true })
        T(toolTitle, rEdge, 8.5, { sz: 7, col: light, align: 'right' })
        R(0, 13, pageW, 0.5, blue, 0)
        R(0, 284, pageW, 13, navy, 0)
        R(0, 284, pageW, 0.5, blue, 0)
        doc.setFontSize(6.5); doc.setTextColor(...muted); doc.setFont('helvetica', 'normal')
        doc.text('Coventry Analytics Ltd  |  coventryanalytics.co.uk  |  info.coventryanalytics@gmail.com', mid, 291, { align: 'center' })
        doc.text(`Page ${pageNum}`, rEdge, 291, { align: 'right' })
      }

      const addPage = () => {
        doc.addPage(); pageNum++
        innerChrome()
        y = 22
      }

      const checkPage = (needed = 30) => { if (y + needed > 280) addPage() }

      const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      const sorted = [...dimensionList].sort((a, b) => b.score - a.score)
      const worstDim = sorted[sorted.length - 1]

      const costRange = overallScore < 30 ? 'GBP 15,000 - 40,000'
        : overallScore < 50 ? 'GBP 6,000 - 18,000'
        : overallScore < 70 ? 'GBP 2,000 - 8,000'
        : 'GBP 1,000 - 4,000'
      const costNote = overallScore < 30
        ? 'per year in operational waste, rework, and missed growth — without targeted improvement'
        : overallScore < 50
        ? 'per year in operational inefficiency, delayed decisions, and avoidable rework'
        : 'per year in addressable waste and unrealised efficiency gains'

      // ══════════════════════════════════════════════════════════════════
      // PAGE 1 — COVER (dark)
      // ══════════════════════════════════════════════════════════════════
      R(0, 0, pageW, 297, [8, 14, 36], 0)
      R(0, 0, pageW, 4, blue, 0)

      T('COVENTRY ANALYTICS', M, 30, { sz: 8, col: [96, 165, 250], bold: true })
      T('Operational Intelligence for UK SMEs', M, 37, { sz: 7.5, col: muted })
      hline(M, 42, pageW - M, [30, 41, 59], 0.3)

      // Split title onto two lines if long
      const titleWords = toolTitle.toUpperCase().split(' ')
      const half = Math.ceil(titleWords.length / 2)
      const titleL1 = titleWords.slice(0, half).join(' ')
      const titleL2 = titleWords.slice(half).join(' ')
      T(titleL1, M, 60, { sz: 20, col: white, bold: true })
      if (titleL2) T(titleL2, M, 72, { sz: 20, col: white, bold: true })
      const titleEndY = titleL2 ? 80 : 68
      T('Confidential  |  ' + dateStr, M, titleEndY, { sz: 8, col: muted })

      // Score ring — right side
      const cx = pageW * 0.72, cy = 104, rr = 28
      doc.setFillColor(15, 25, 55); doc.circle(cx, cy, rr + 5, 'F')
      doc.setDrawColor(30, 42, 80); doc.setLineWidth(5.5); doc.circle(cx, cy, rr, 'S')
      doc.setDrawColor(...sColor); doc.setLineWidth(5.5)
      const sa = -Math.PI / 2, ea = sa + (overallScore / 100) * 2 * Math.PI
      for (let i = 0; i < 80; i++) {
        const a1 = sa + (i / 80) * (ea - sa), a2 = sa + ((i + 1) / 80) * (ea - sa)
        if (a2 > ea) break
        doc.line(cx + rr * Math.cos(a1), cy + rr * Math.sin(a1), cx + rr * Math.cos(a2), cy + rr * Math.sin(a2))
      }
      T(`${overallScore}`, cx, cy + 1, { sz: 22, col: white, bold: true, align: 'center' })
      T('/ 100', cx, cy + 8, { sz: 6.5, col: light, align: 'center' })
      const bx = cx - 22, bw = 44
      R(bx, cy + 13, bw, 9, [...sColor.map(v => Math.round(v * 0.22))], 1)
      doc.setDrawColor(...sColor); doc.setLineWidth(0.4); doc.roundedRect(bx, cy + 13, bw, 9, 1, 1, 'S')
      T(maturity.level, cx, cy + 19.5, { sz: 8, col: sColor, bold: true, align: 'center' })
      doc.setFontSize(7.5); doc.setTextColor(...light); doc.setFont('helvetica', 'italic')
      const mdl = doc.splitTextToSize(maturity.description, cW * 0.56)
      doc.text(mdl, cx, cy + 27, { align: 'center' })

      // KEY FINDING panel
      const kfY = 140
      R(M, kfY, cW, 42, [16, 30, 68], 2)
      doc.setDrawColor(59, 130, 246); doc.setLineWidth(0.4); doc.roundedRect(M, kfY, cW, 42, 2, 2, 'S')
      R(M, kfY, 3, 42, blue, 0)
      T('KEY FINDING', M + 8, kfY + 8, { sz: 6.5, col: [96, 165, 250], bold: true })
      T('Lowest-scoring area: ' + worstDim.title + ' (' + worstDim.score + '/100)', M + 8, kfY + 16, { sz: 10, col: white, bold: true })
      const kfl = doc.splitTextToSize('UK SMEs with a similar profile typically recover ' + costRange + ' ' + costNote + ' once this gap is closed.', cW - 14)
      doc.setFontSize(7.5); doc.setTextColor(147, 197, 253); doc.setFont('helvetica', 'normal')
      doc.text(kfl, M + 8, kfY + 24)
      T('Details on pages 2-3', M + 8, kfY + 38, { sz: 6.5, col: muted })

      // Meta table
      const mtY = kfY + 48
      R(M, mtY, cW, 32, [14, 22, 52], 2)
      doc.setDrawColor(30, 41, 80); doc.setLineWidth(0.3)
      doc.line(M + cW / 3, mtY + 4, M + cW / 3, mtY + 28)
      doc.line(M + (cW * 2) / 3, mtY + 4, M + (cW * 2) / 3, mtY + 28)
      ;[
        { label: 'Report Date', val: dateStr, x: M + 6 },
        { label: 'Assessment', val: toolTitle, x: M + cW / 3 + 6 },
        { label: 'Provider', val: 'Coventry Analytics', x: M + (cW * 2) / 3 + 6 },
      ].forEach(({ label, val, x }) => {
        T(label, x, mtY + 9, { sz: 6, col: muted })
        T(val, x, mtY + 16, { sz: 7.5, col: ghost, bold: true })
      })
      ;[
        { label: 'Dimensions', val: String(dimensionList.length), x: M + 6 },
        { label: 'Questions', val: String(dimensionList.length * 2), x: M + cW / 3 + 6 },
        { label: 'Maturity Level', val: maturity.level, x: M + (cW * 2) / 3 + 6 },
      ].forEach(({ label, val, x }, i) => {
        T(label, x, mtY + 22, { sz: 6, col: muted })
        T(val, x, mtY + 29, { sz: 7.5, col: i === 2 ? sColor : ghost, bold: true })
      })

      T('CONFIDENTIAL — prepared exclusively for the recipient. Not for redistribution.', mid, 275, { sz: 6, col: slate, align: 'center' })
      R(0, 282, pageW, 15, [6, 10, 26], 0)
      R(0, 282, pageW, 0.5, blue, 0)
      doc.setFontSize(6.5); doc.setTextColor(...muted); doc.setFont('helvetica', 'normal')
      doc.text('Coventry Analytics Ltd  |  coventryanalytics.co.uk  |  info.coventryanalytics@gmail.com', mid, 291, { align: 'center' })
      doc.text('Page 1', rEdge, 291, { align: 'right' })

      // ══════════════════════════════════════════════════════════════════
      // PAGE 2 — EXECUTIVE SUMMARY + COST OF INACTION + DIMENSION SCORES
      // ══════════════════════════════════════════════════════════════════
      addPage()

      R(M, y, cW, 16, navy, 2)
      T('Overall Score: ' + overallScore + '/100', M + 5, y + 6.5, { sz: 10, col: white, bold: true })
      T('Maturity: ' + maturity.level, M + 5, y + 12.5, { sz: 7.5, col: [96, 165, 250] })
      T(dateStr, rEdge, y + 9.5, { sz: 7.5, col: light, align: 'right' })
      y += 20

      y = section('EXECUTIVE SUMMARY', y)
      y = wrap(maturity.description, M, y, cW, { sz: 9, col: ink, lh: 5 })
      y += 3

      const interp = overallScore >= 70
        ? `Your score of ${overallScore}/100 places this business in the upper quartile of UK SMEs assessed by Coventry Analytics. Strong foundations exist across multiple dimensions. The recommendations in this report target the remaining gaps to push performance toward best-in-class.`
        : overallScore >= 40
        ? `Your score of ${overallScore}/100 is in line with the median for UK SMEs at this stage. Genuine strengths co-exist with gaps that are currently eroding margin, speed, and competitive position. The action plan below is ordered by commercial impact.`
        : `Your score of ${overallScore}/100 indicates foundational gaps that are currently limiting growth and compounding operational risk. The highest-impact improvements are achievable within 90 days without significant capital outlay.`
      y = wrap(interp, M, y, cW, { sz: 8.5, col: slate, lh: 5 })
      y += 8

      // Cost of Inaction
      checkPage(26)
      R(M, y, cW, 22, [254, 242, 242], 2)
      doc.setDrawColor(220, 38, 38); doc.setLineWidth(0.3); doc.roundedRect(M, y, cW, 22, 2, 2, 'S')
      R(M, y, 3, 22, [220, 38, 38], 0)
      T('COST OF INACTION', M + 8, y + 8, { sz: 6.5, col: [185, 28, 28], bold: true })
      T('Estimated annual loss without improvement: ' + costRange, M + 8, y + 15, { sz: 9.5, col: [127, 29, 29], bold: true })
      doc.setFontSize(7); doc.setTextColor(153, 27, 27); doc.setFont('helvetica', 'normal')
      doc.text(doc.splitTextToSize(costNote + '.', cW - 14), M + 8, y + 20)
      y += 26

      y = section('DIMENSION SCORES', y)
      y += 2

      dimensionList.forEach(({ title, score: s }) => {
        checkPage(16)
        const bCol = s >= 70 ? [22, 163, 74] : s >= 40 ? [37, 99, 235] : [220, 38, 38]
        const sLabel = s >= 70 ? 'Strong' : s >= 50 ? 'Developing' : s >= 30 ? 'Needs Work' : 'Critical'
        const sCol = s >= 70 ? [22, 163, 74] : s >= 50 ? [37, 99, 235] : s >= 30 ? [180, 100, 0] : [220, 38, 38]
        R(M, y, cW, 12, white, 1)
        doc.setDrawColor(...ghost); doc.setLineWidth(0.2); doc.roundedRect(M, y, cW, 12, 1, 1, 'S')
        R(M + 2, y + 7, cW - 4, 3, ghost, 1)
        const fillW = Math.max((cW - 4) * (s / 100), 2)
        R(M + 2, y + 7, fillW, 3, bCol, 1)
        T(title, M + 4, y + 5.5, { sz: 8, col: ink, bold: true })
        T(s + '/100', rEdge, y + 5.5, { sz: 8, col: sCol, bold: true, align: 'right' })
        T(sLabel, rEdge - 18, y + 10.5, { sz: 6, col: sCol, align: 'right' })
        y += 14
      })

      y += 4
      checkPage(24)
      const critCount = dimensionList.filter(d => d.score < 30).length
      const weakCount = dimensionList.filter(d => d.score >= 30 && d.score < 50).length
      const devCount  = dimensionList.filter(d => d.score >= 50 && d.score < 70).length
      const strongCount = dimensionList.filter(d => d.score >= 70).length
      const tileW = (cW - 6) / 4
      ;[
        { n: strongCount, l1: 'Strong', l2: '70+', col: [22, 163, 74] },
        { n: devCount, l1: 'Developing', l2: '50-69', col: [37, 99, 235] },
        { n: weakCount, l1: 'Needs Work', l2: '30-49', col: [180, 100, 0] },
        { n: critCount, l1: 'Critical', l2: 'Below 30', col: [220, 38, 38] },
      ].forEach((t, i) => {
        const tx = M + i * (tileW + 2)
        R(tx, y, tileW, 20, white, 1)
        doc.setDrawColor(...ghost); doc.setLineWidth(0.2); doc.roundedRect(tx, y, tileW, 20, 1, 1, 'S')
        R(tx, y, tileW, 2, t.col, 0)
        T(String(t.n), tx + tileW / 2, y + 12, { sz: 16, col: t.col, bold: true, align: 'center' })
        T(t.l1, tx + tileW / 2, y + 16.5, { sz: 5.5, col: muted, align: 'center' })
        T(t.l2, tx + tileW / 2, y + 19.5, { sz: 5, col: [180, 190, 210], align: 'center' })
      })
      y += 24

      // ══════════════════════════════════════════════════════════════════
      // PAGE 3 — STRENGTHS / GAPS / SERVICE BRIDGE
      // ══════════════════════════════════════════════════════════════════
      addPage()

      y = section('STRENGTHS', y)
      const strengthDims = sorted.filter(d => d.score >= 50).slice(0, 3)
      if (strengthDims.length === 0) {
        y = wrap('No dimensions scored above 50. Focus on critical gaps below to build foundations.', M, y, cW, { sz: 8.5, col: muted })
        y += 4
      } else {
        strengthDims.forEach(({ title, score: s }) => {
          checkPage(18)
          R(M, y, cW, 14, white, 1)
          doc.setDrawColor(...ghost); doc.setLineWidth(0.2); doc.roundedRect(M, y, cW, 14, 1, 1, 'S')
          R(M, y, 3, 14, [22, 163, 74], 0)
          T(title, M + 8, y + 5.5, { sz: 8.5, col: ink, bold: true })
          T('Score: ' + s + '/100  —  A genuine competitive advantage. Protect and compound it.', M + 8, y + 10.5, { sz: 7, col: muted })
          T(String(s), rEdge, y + 8.5, { sz: 12, col: [22, 163, 74], bold: true, align: 'right' })
          y += 16
        })
      }
      y += 6

      y = section('PRIORITY GAPS', y)
      const weakDims = [...sorted].reverse().filter(d => d.score < 70).slice(0, 4)
      weakDims.forEach(({ title, score: s }, idx) => {
        checkPage(22)
        const bC = s < 30 ? [220, 38, 38] : s < 50 ? [180, 100, 0] : [161, 120, 0]
        const bgC = s < 30 ? [254, 242, 242] : s < 50 ? [255, 247, 237] : [254, 252, 232]
        const pLabel = idx === 0 ? 'CRITICAL' : idx === 1 ? 'HIGH' : idx === 2 ? 'MEDIUM' : 'LOW'
        const gCost = s < 30 ? 'GBP 3,000-8,000 / yr' : s < 50 ? 'GBP 1,500-4,000 / yr' : 'GBP 500-2,000 / yr'
        R(M, y, cW, 18, bgC, 1)
        doc.setDrawColor(...bC); doc.setLineWidth(0.2); doc.roundedRect(M, y, cW, 18, 1, 1, 'S')
        R(M, y, 3, 18, bC, 0)
        R(M + 6, y + 4, 18, 6, [...bC.map(v => Math.round(v * 0.18))], 1)
        T(pLabel, M + 15, y + 8.5, { sz: 5, col: bC, bold: true, align: 'center' })
        T(title, M + 27, y + 7, { sz: 8.5, col: ink, bold: true })
        T('Score: ' + s + '/100', M + 27, y + 12.5, { sz: 7, col: muted })
        T('Est. impact: ' + gCost, rEdge, y + 7, { sz: 6.5, col: bC, bold: true, align: 'right' })
        T(String(s), rEdge, y + 14, { sz: 12, col: bC, bold: true, align: 'right' })
        y += 21
      })

      y += 8
      checkPage(96)
      y = section('HOW COVENTRY ANALYTICS CAN HELP', y)

      const c1 = M, c2 = M + 30, c3 = M + cW * 0.55
      T('INVESTMENT', c1, y, { sz: 6, col: muted, bold: true })
      T('ENGAGEMENT', c2, y, { sz: 6, col: muted, bold: true })
      T('WHAT YOU GET', c3, y, { sz: 6, col: muted, bold: true })
      y += 5
      hline(M, y, M + cW, ghost)
      y += 4

      ;[
        { price: 'Free', title: '30-Min Strategy Call', desc: 'Expert review of your results. Honest advice on where to focus. No pitch, no obligation.', col: [22, 163, 74] },
        { price: 'GBP 499', title: 'Analytics Workshop', desc: 'Two-day deep-dive into your top 3 gaps. 90-day roadmap and quick-win identification.', col: blue },
        { price: 'GBP 2,500', title: 'Analytics System Build', desc: 'Live dashboard, KPI framework, automated reporting. Fully implemented in 4-6 weeks.', col: [96, 165, 250] },
        { price: 'GBP 750/mo', title: 'Analytics Partnership', desc: 'Monthly retainer: new dashboards, reporting support, and continuous improvement.', col: [139, 92, 246] },
      ].forEach((svc, i) => {
        checkPage(16)
        if (i > 0) { hline(M, y, M + cW, ghost); y += 3 }
        T(svc.price, c1, y + 5, { sz: 8.5, col: svc.col, bold: true })
        T(svc.title, c2, y + 5, { sz: 8, col: ink, bold: true })
        doc.setFontSize(7); doc.setTextColor(...muted); doc.setFont('helvetica', 'normal')
        const dl = doc.splitTextToSize(svc.desc, cW - (c3 - M))
        doc.text(dl, c3, y + 5)
        y += Math.max(10, dl.length * 4.5 + 2)
      })

      // ══════════════════════════════════════════════════════════════════
      // PAGE 4 — RECOMMENDATIONS + NEXT STEPS + CTA
      // ══════════════════════════════════════════════════════════════════
      addPage()

      y = section('PRIORITISED ACTION PLAN', y)
      y = wrap('Recommendations ordered by priority. Address Critical items first — they deliver the fastest ROI and compound into structural advantage.', M, y, cW, { sz: 8, col: slate, lh: 4.8 })
      y += 6

      const pm = {
        Critical:    { col: [220, 38, 38],  bg: [254, 242, 242], strip: [220, 38, 38],  label: 'CRITICAL' },
        High:        { col: [180, 100, 0],  bg: [255, 247, 237], strip: [180, 100, 0],  label: 'HIGH' },
        Medium:      { col: [161, 120, 0],  bg: [254, 252, 232], strip: [161, 120, 0],  label: 'MEDIUM' },
        Opportunity: { col: [37, 99, 235],  bg: [239, 246, 255], strip: [37, 99, 235],  label: 'OPPORTUNITY' },
      }

      recommendations.forEach((rec, i) => {
        const p = pm[rec.priority] || pm.Opportunity
        doc.setFontSize(8)
        const dl = doc.splitTextToSize(rec.description, cW - 8)
        const cardH = 20 + dl.length * 4.8 + 10
        checkPage(cardH + 4)
        R(M, y, cW, cardH, p.bg, 1)
        doc.setDrawColor(...ghost); doc.setLineWidth(0.2); doc.roundedRect(M, y, cW, cardH, 1, 1, 'S')
        R(M, y, 3, cardH, p.strip, 0)
        R(M + 6, y + 4, 7, 7, p.col, 1)
        T(String(i + 1), M + 9.5, y + 9.5, { sz: 6.5, col: white, bold: true, align: 'center' })
        const bW = 24
        R(rEdge - bW, y + 4, bW, 7, [...p.col.map(v => Math.round(v * 0.15))], 1)
        doc.setDrawColor(...p.col); doc.setLineWidth(0.2); doc.roundedRect(rEdge - bW, y + 4, bW, 7, 1, 1, 'S')
        T(p.label, rEdge - bW / 2, y + 9, { sz: 5, col: p.col, bold: true, align: 'center' })
        T(rec.title, M + 16, y + 8, { sz: 9, col: ink, bold: true })
        if (rec.dimension) T('Dimension: ' + rec.dimension, M + 16, y + 13, { sz: 6.5, col: muted })
        hline(M + 4, y + 16, M + cW - 4, ghost, 0.2)
        doc.setFontSize(8); doc.setTextColor(...slate); doc.setFont('helvetica', 'normal')
        doc.text(dl, M + 5, y + 21)
        const aD = y + 21 + dl.length * 4.8 + 2
        R(M + 4, aD, cW - 8, 7, [...p.col.map(v => Math.round(v * 0.1))], 1)
        T('Potential Impact:', M + 7, aD + 4.5, { sz: 6.5, col: muted })
        T(rec.impact, M + 38, aD + 4.5, { sz: 6.5, col: p.col, bold: true })
        y += cardH + 5
      })

      // Next Steps
      checkPage(56)
      y += 4
      y = section('RECOMMENDED NEXT STEPS', y)
      const hw = (cW - 4) / 2

      R(M, y, hw, 44, navy, 1)
      doc.setDrawColor(...blue); doc.setLineWidth(0.3); doc.roundedRect(M, y, hw, 44, 1, 1, 'S')
      R(M, y, hw, 2, blue, 0)
      T('30 DAYS', M + 4, y + 8, { sz: 7.5, col: [96, 165, 250], bold: true })
      ;['Book a free strategy call to review results with an expert',
        'Identify your single highest-priority gap from this report',
        'Quantify the monthly cost: time, errors, missed decisions',
        'Assign a named owner for each improvement'
      ].forEach((s, i) => {
        doc.setFontSize(6.5); doc.setTextColor(...light); doc.setFont('helvetica', 'normal')
        doc.text(doc.splitTextToSize(`${i + 1}.  ${s}`, hw - 8), M + 4, y + 15 + i * 8)
      })

      R(M + hw + 4, y, hw, 44, navy, 1)
      doc.setDrawColor(...blue); doc.setLineWidth(0.3); doc.roundedRect(M + hw + 4, y, hw, 44, 1, 1, 'S')
      R(M + hw + 4, y, hw, 2, blue, 0)
      T('90 DAYS', M + hw + 8, y + 8, { sz: 7.5, col: [96, 165, 250], bold: true })
      ;['Implement one targeted quick-win in your lowest-scoring area',
        'Document baseline metrics to measure the improvement',
        'Re-run this assessment to see your dimension scores move',
        'Identify your next gap and repeat the cycle'
      ].forEach((s, i) => {
        doc.setFontSize(6.5); doc.setTextColor(...light); doc.setFont('helvetica', 'normal')
        doc.text(doc.splitTextToSize(`${i + 1}.  ${s}`, hw - 8), M + hw + 8, y + 15 + i * 8)
      })
      y += 48

      // CTA
      checkPage(28)
      R(M, y, cW, 26, blue, 2)
      T('Ready to act on these insights?', mid, y + 9, { sz: 11, col: white, bold: true, align: 'center' })
      T('Book your free 30-minute strategy call  —  no pitch, no obligation.', mid, y + 16, { sz: 7.5, col: [191, 219, 254], align: 'center' })
      T('coventryanalytics.co.uk/book', mid, y + 22, { sz: 8.5, col: [147, 197, 253], bold: true, align: 'center' })

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
