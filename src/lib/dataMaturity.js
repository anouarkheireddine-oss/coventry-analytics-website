export const DATA_QUIZ_STEPS = [
  {
    id: 'collection',
    title: 'Data Collection',
    description: 'How and how completely your business data is captured',
    questions: [
      {
        id: 'capture_method',
        text: 'How is most of your business data currently captured?',
        options: [
          { label: 'Automatically via integrated systems', value: 'a', score: 100 },
          { label: 'Mix of automated and manual entry', value: 'b', score: 65 },
          { label: 'Primarily manual entry into spreadsheets', value: 'c', score: 25 },
          { label: "We don't systematically capture data", value: 'd', score: 5 },
        ],
      },
      {
        id: 'data_completeness',
        text: 'How complete is your data? Are there significant gaps?',
        options: [
          { label: 'Very complete — we capture everything we need', value: 'a', score: 100 },
          { label: 'Mostly complete — minor gaps', value: 'b', score: 70 },
          { label: 'Significant gaps — key data is often missing', value: 'c', score: 30 },
          { label: "Major gaps — most of what we need isn't captured", value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'storage',
    title: 'Data Storage & Quality',
    description: 'Where data lives and how trustworthy it is',
    questions: [
      {
        id: 'storage_location',
        text: 'Where is your primary business data stored?',
        options: [
          { label: 'Centralised database or data warehouse', value: 'a', score: 100 },
          { label: 'Cloud applications (CRM, accounting, etc.) with some integration', value: 'b', score: 65 },
          { label: 'A mix of apps and spreadsheets with no central store', value: 'c', score: 25 },
          { label: 'Mostly spreadsheets on individual computers', value: 'd', score: 5 },
        ],
      },
      {
        id: 'data_confidence',
        text: 'How confident are you in the accuracy of your data?',
        options: [
          { label: 'Very confident — data is validated and regularly audited', value: 'a', score: 100 },
          { label: 'Mostly confident — occasional errors caught quickly', value: 'b', score: 70 },
          { label: "Somewhat — we know there are errors but don't know how many", value: 'c', score: 30 },
          { label: 'Not confident — data errors cause regular problems', value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'analysis',
    title: 'Data Analysis',
    description: 'How you extract insight from your data',
    questions: [
      {
        id: 'analysis_method',
        text: 'How does your team currently analyse business performance?',
        options: [
          { label: 'Live dashboards with automated KPI tracking', value: 'a', score: 100 },
          { label: 'Regular structured reports (weekly/monthly)', value: 'b', score: 65 },
          { label: 'Ad hoc analysis when needed', value: 'c', score: 30 },
          { label: "We don't do structured analysis", value: 'd', score: 5 },
        ],
      },
      {
        id: 'question_speed',
        text: 'How quickly can you answer a new business question with data?',
        options: [
          { label: 'Within minutes — data is accessible and queryable', value: 'a', score: 100 },
          { label: 'Same day — can pull a report', value: 'b', score: 65 },
          { label: 'Several days — requires manual work to compile', value: 'c', score: 25 },
          { label: "Weeks or impossible — data isn't accessible", value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'governance',
    title: 'Data Governance',
    description: 'Rules, ownership, and standards for your data',
    questions: [
      {
        id: 'data_ownership',
        text: 'Are there clear rules about who owns, maintains, and can access business data?',
        options: [
          { label: 'Yes — formal governance with documented owners and access controls', value: 'a', score: 100 },
          { label: 'Informal rules — generally understood but not documented', value: 'b', score: 60 },
          { label: "Ad hoc — whoever created it owns it, loosely", value: 'c', score: 25 },
          { label: 'No rules — anyone can access and change anything', value: 'd', score: 5 },
        ],
      },
      {
        id: 'metric_definitions',
        text: "Is there a single agreed definition of key business metrics (e.g. what counts as 'a sale')?",
        options: [
          { label: 'Yes — all metrics are formally defined and agreed', value: 'a', score: 100 },
          { label: "Mostly — some metrics are well-defined, others aren't", value: 'b', score: 60 },
          { label: 'Some disagreement — different teams use different definitions', value: 'c', score: 25 },
          { label: 'No — each person/team defines things differently', value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'culture',
    title: 'Data Culture',
    description: 'How data is valued and used across your organisation',
    questions: [
      {
        id: 'leadership_data_use',
        text: 'How does your leadership team use data day-to-day?',
        options: [
          { label: 'Data is central to every significant decision', value: 'a', score: 100 },
          { label: "We refer to data regularly but don't always wait for it", value: 'b', score: 65 },
          { label: 'Data is consulted occasionally, mostly as validation', value: 'c', score: 25 },
          { label: 'Decisions are made on experience and gut feel', value: 'd', score: 5 },
        ],
      },
      {
        id: 'investment_appetite',
        text: 'Is there appetite in your business to invest in improving data capabilities?',
        options: [
          { label: 'Strong — budget is allocated and leadership is committed', value: 'a', score: 100 },
          { label: "Growing — interest is there but investment hasn't been made", value: 'b', score: 65 },
          { label: "Weak — seen as IT's problem, not a business priority", value: 'c', score: 25 },
          { label: 'None — data is not seen as a priority', value: 'd', score: 5 },
        ],
      },
    ],
  },
]

export function calculateDataScore(answers) {
  const dimensionScores = {}
  let total = 0; let count = 0
  for (const step of DATA_QUIZ_STEPS) {
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

export function getDataMaturityLevel(score) {
  if (score >= 90) return { level: 'Optimised', color: '#60a5fa', description: 'Exceptional data maturity. You are ready for AI.' }
  if (score >= 75) return { level: 'Managed', color: '#22c55e', description: 'Strong data foundations. Now optimise and automate.' }
  if (score >= 50) return { level: 'Defined', color: '#3b82f6', description: 'Processes are documented and data is generally reliable. Ready to scale.' }
  if (score >= 25) return { level: 'Repeatable', color: '#f59e0b', description: 'Some data practices exist but are inconsistent and undocumented.' }
  return { level: 'Ad Hoc', color: '#ef4444', description: 'Data is collected inconsistently. No shared standards or practices.' }
}

export function getDataMaturityRecommendations(dimensionScores) {
  const recs = []
  if (dimensionScores.collection < 50) recs.push({ priority: 'Critical', dimension: 'Collection', title: 'Implement systematic data capture across all key processes', description: 'You are losing valuable business intelligence every day. Start by mapping what data you need, then build capture into your workflows.', impact: 'Foundation for all analytics work' })
  if (dimensionScores.storage < 50) recs.push({ priority: 'Critical', dimension: 'Storage', title: 'Centralise your data into a single reliable store', description: 'Scattered data means slow answers, inconsistent numbers, and high risk. A central data store is the single biggest enabler of data maturity.', impact: 'Eliminates data reconciliation time' })
  if (dimensionScores.analysis < 50) recs.push({ priority: 'High', dimension: 'Analysis', title: 'Build a live performance dashboard for key metrics', description: 'Moving from ad hoc reports to live dashboards will save hours per week and enable faster, better decisions.', impact: '5-10 hrs/week saved in reporting' })
  if (dimensionScores.governance < 50) recs.push({ priority: 'High', dimension: 'Governance', title: 'Define ownership and standards for your key data assets', description: 'Without governance, data quality will deteriorate over time. Establish clear owners and agreed definitions for your top 10 metrics.', impact: 'Prevents data trust collapse' })
  if (dimensionScores.culture < 50) recs.push({ priority: 'Medium', dimension: 'Culture', title: 'Build data into your weekly leadership rhythm', description: 'Data culture starts at the top. Commit to reviewing a core set of metrics every week, and the organisation will follow.', impact: 'Accelerates ROI on all data investment' })
  recs.push({ priority: 'Opportunity', dimension: 'All', title: 'Book a data maturity audit to create a prioritised roadmap', description: 'A structured assessment will identify the two or three changes that will have the most impact on your data maturity score.', impact: 'Fastest path to next maturity level' })
  const order = { Critical: 0, High: 1, Medium: 2, Opportunity: 3 }
  return recs.sort((a, b) => order[a.priority] - order[b.priority])
}
