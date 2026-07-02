export const KPI_QUIZ_STEPS = [
  {
    id: 'definition',
    title: 'KPI Definition',
    description: 'How well your KPIs are defined and aligned to strategy',
    questions: [
      {
        id: 'kpi_formal',
        text: 'Does your business have a formally defined set of KPIs?',
        options: [
          { label: 'Yes — documented, shared, and reviewed regularly', value: 'a', score: 100 },
          { label: "Informal — we track some numbers but haven't formalised them", value: 'b', score: 55 },
          { label: "In progress — we're working on defining them", value: 'c', score: 30 },
          { label: "No — we don't have defined KPIs", value: 'd', score: 5 },
        ],
      },
      {
        id: 'kpi_strategic_link',
        text: 'How well do your KPIs connect to your overall business strategy and goals?',
        options: [
          { label: 'Directly — every KPI links to a strategic objective', value: 'a', score: 100 },
          { label: 'Mostly — most KPIs are relevant to strategy', value: 'b', score: 65 },
          { label: "Loosely — we track what's easy, not necessarily what matters", value: 'c', score: 25 },
          { label: 'No connection — KPIs and strategy are separate conversations', value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'measurement',
    title: 'Data & Measurement',
    description: 'How KPI data is collected and how reliable it is',
    questions: [
      {
        id: 'kpi_data_collection',
        text: 'How is KPI data currently collected and calculated?',
        options: [
          { label: 'Automatically from integrated systems in real time', value: 'a', score: 100 },
          { label: 'Regular automated reports (daily/weekly)', value: 'b', score: 75 },
          { label: 'Manual calculation from exported data', value: 'c', score: 30 },
          { label: 'Manually compiled from memory and estimates', value: 'd', score: 5 },
        ],
      },
      {
        id: 'kpi_accuracy',
        text: 'How accurate and reliable is your KPI data?',
        options: [
          { label: 'Very reliable — single source of truth, regularly validated', value: 'a', score: 100 },
          { label: 'Mostly reliable — occasional discrepancies', value: 'b', score: 65 },
          { label: 'Questionable — different people often get different numbers', value: 'c', score: 25 },
          { label: 'Unreliable — we know the numbers may be wrong', value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'visibility',
    title: 'Reporting & Visibility',
    description: 'How frequently KPIs are reviewed and how accessible they are',
    questions: [
      {
        id: 'review_frequency',
        text: 'How frequently are KPIs reviewed with the leadership team?',
        options: [
          { label: 'Daily via live dashboard', value: 'a', score: 100 },
          { label: 'Weekly structured review', value: 'b', score: 75 },
          { label: 'Monthly — usually reactive', value: 'c', score: 40 },
          { label: "Quarterly or less — or only when there's a problem", value: 'd', score: 10 },
        ],
      },
      {
        id: 'kpi_access',
        text: 'How many people in the business have access to KPI data?',
        options: [
          { label: 'Everyone who needs it has real-time access', value: 'a', score: 100 },
          { label: 'Leadership team only', value: 'b', score: 60 },
          { label: 'Just the person who compiles the report', value: 'c', score: 25 },
          { label: "Nobody regularly — it's not systematically shared", value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'action',
    title: 'Action & Accountability',
    description: 'Whether KPIs drive real decisions and ownership',
    questions: [
      {
        id: 'kpi_response',
        text: 'When a KPI moves in the wrong direction, what happens?',
        options: [
          { label: 'Automated alerts trigger and accountable owner takes action', value: 'a', score: 100 },
          { label: "It's noticed in the next review meeting and discussed", value: 'b', score: 65 },
          { label: 'It might get noticed eventually', value: 'c', score: 30 },
          { label: "Nothing — we often don't notice until it's too late", value: 'd', score: 5 },
        ],
      },
      {
        id: 'kpi_ownership',
        text: 'Are KPI targets clearly assigned to individuals or teams?',
        options: [
          { label: 'Yes — every KPI has a named owner responsible for improvement', value: 'a', score: 100 },
          { label: 'Mostly — most KPIs have an owner', value: 'b', score: 65 },
          { label: 'Loosely — team responsibility, no individual ownership', value: 'c', score: 30 },
          { label: 'No — nobody is specifically accountable for KPIs', value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'improvement',
    title: 'Review & Improvement',
    description: 'Whether your KPI framework evolves and drives change',
    questions: [
      {
        id: 'kpi_review_cycle',
        text: 'How often do you review whether your KPIs are still the right ones?',
        options: [
          { label: 'Quarterly — we actively evolve our KPI framework', value: 'a', score: 100 },
          { label: 'Annually', value: 'b', score: 60 },
          { label: "Rarely — our KPIs haven't changed in years", value: 'c', score: 20 },
          { label: "Never — we track whatever we've always tracked", value: 'd', score: 5 },
        ],
      },
      {
        id: 'kpi_drives_change',
        text: 'Do your KPIs drive operational changes and improvements?',
        options: [
          { label: 'Yes — directly linked to improvement initiatives and reviews', value: 'a', score: 100 },
          { label: 'Sometimes — occasionally trigger action', value: 'b', score: 55 },
          { label: 'Rarely — they are reported but rarely acted on', value: 'c', score: 20 },
          { label: 'Never — KPIs are a reporting exercise, not a management tool', value: 'd', score: 5 },
        ],
      },
    ],
  },
]

export function calculateKPIScore(answers) {
  const dimensionScores = {}
  let total = 0; let count = 0
  for (const step of KPI_QUIZ_STEPS) {
    let stepTotal = 0; let stepCount = 0
    for (const q of step.questions) {
      const ans = answers[q.id]
      if (ans !== undefined) {
        const opt = q.options.find(o => o.value === ans)
        if (opt) { stepTotal += opt.score; stepCount++ }
      }
    }
    const score = stepCount > 0 ? Math.round(stepTotal / stepCount) : 0
    dimensionScores[step.id] = score
    total += score; count++
  }
  return { overallScore: count > 0 ? Math.round(total / count) : 0, dimensionScores }
}

export function getKPIMaturityLevel(score) {
  if (score >= 90) return { level: 'Optimised', color: '#60a5fa', description: 'Best-in-class KPI management. Explore AI-driven insights.' }
  if (score >= 75) return { level: 'Advanced', color: '#22c55e', description: 'Strong KPI culture. Optimise for real-time and predictive tracking.' }
  if (score >= 55) return { level: 'Established', color: '#3b82f6', description: 'Solid foundations. Focus on automation and accountability.' }
  if (score >= 30) return { level: 'Developing', color: '#f59e0b', description: 'Basic KPI awareness but significant gaps in measurement and action.' }
  return { level: 'Reactive', color: '#ef4444', description: 'KPIs are not driving your business. You are reacting rather than leading.' }
}

export function getKPIRecommendations(dimensionScores) {
  const recs = []
  if (dimensionScores.definition < 50) recs.push({ priority: 'Critical', dimension: 'Definition', title: 'Define your top 5-10 KPIs and link each to a strategic goal', description: 'Without defined KPIs, you cannot manage by numbers. Start with 5-10 metrics that directly reflect your business model and strategy.', impact: 'Transforms how you make decisions' })
  if (dimensionScores.measurement < 50) recs.push({ priority: 'Critical', dimension: 'Measurement', title: 'Automate KPI data collection to eliminate manual calculation', description: 'Manual KPI calculation is slow, error-prone, and discourages regular review. Automate your top KPIs first using your existing tools.', impact: 'Saves 2-5 hrs/week in reporting' })
  if (dimensionScores.visibility < 50) recs.push({ priority: 'High', dimension: 'Visibility', title: 'Build a live KPI dashboard for weekly leadership review', description: 'If KPIs are not visible, they are not managed. A live dashboard drives the cadence of review and accountability that makes KPIs work.', impact: 'Drives weekly performance rhythm' })
  if (dimensionScores.action < 50) recs.push({ priority: 'High', dimension: 'Action', title: 'Assign a named owner to every KPI', description: 'Accountability is the engine of improvement. Every KPI needs a named owner with the authority and resources to move it.', impact: 'Creates culture of ownership' })
  if (dimensionScores.improvement < 50) recs.push({ priority: 'Medium', dimension: 'Improvement', title: 'Schedule a quarterly KPI review to evolve your framework', description: 'KPIs that never change eventually stop being relevant. A quarterly review ensures your metrics reflect current business priorities.', impact: 'Keeps strategy and execution aligned' })
  recs.push({ priority: 'Opportunity', dimension: 'All', title: 'Book a KPI design workshop to build your framework from scratch', description: 'We will work with you to define the right KPIs, set targets, assign owners, and build the dashboard to make them visible daily.', impact: 'KPI framework live within 2 weeks' })
  const order = { Critical: 0, High: 1, Medium: 2, Opportunity: 3 }
  return recs.sort((a, b) => order[a.priority] - order[b.priority])
}
