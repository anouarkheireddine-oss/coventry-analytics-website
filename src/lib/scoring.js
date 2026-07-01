export const QUIZ_STEPS = [
  {
    id: 'data',
    title: 'Data & Reporting',
    description: 'How you currently track and report on business performance',
    icon: 'BarChart3',
    questions: [
      {
        id: 'reporting_frequency',
        text: 'How often do you review key business metrics?',
        type: 'radio',
        options: [
          { label: 'Daily via live dashboards', value: 'daily_live', score: 100 },
          { label: 'Weekly from automated reports', value: 'weekly_auto', score: 75 },
          { label: 'Monthly from manual spreadsheets', value: 'monthly_manual', score: 40 },
          { label: 'Rarely or when problems arise', value: 'rarely', score: 10 },
        ],
      },
      {
        id: 'data_accuracy',
        text: 'How confident are you in the accuracy of your business data?',
        type: 'radio',
        options: [
          { label: 'Very confident — single source of truth', value: 'very_confident', score: 100 },
          { label: 'Mostly confident — minor discrepancies', value: 'mostly_confident', score: 70 },
          { label: 'Somewhat confident — often verify manually', value: 'somewhat', score: 35 },
          { label: 'Not confident — data is often wrong', value: 'not_confident', score: 5 },
        ],
      },
      {
        id: 'report_time',
        text: 'How long does it take to produce a management report?',
        type: 'radio',
        options: [
          { label: 'Instant — fully automated', value: 'instant', score: 100 },
          { label: 'Less than 1 hour', value: 'under_1h', score: 75 },
          { label: '1-4 hours', value: '1_4h', score: 40 },
          { label: 'More than 4 hours or a day+', value: 'over_4h', score: 10 },
        ],
      },
    ],
  },
  {
    id: 'operations',
    title: 'Operations',
    description: 'The efficiency and visibility of your day-to-day operations',
    icon: 'Settings',
    questions: [
      {
        id: 'manual_work',
        text: 'How much time per week does your team spend on manual data entry or reporting?',
        type: 'radio',
        options: [
          { label: 'Less than 2 hours total', value: 'under_2h', score: 100 },
          { label: '2-5 hours', value: '2_5h', score: 70 },
          { label: '5-15 hours', value: '5_15h', score: 35 },
          { label: 'More than 15 hours', value: 'over_15h', score: 5 },
        ],
      },
      {
        id: 'bottlenecks',
        text: 'Can you identify your top 3 operational bottlenecks right now?',
        type: 'radio',
        options: [
          { label: 'Yes — and we are actively resolving them', value: 'yes_resolving', score: 100 },
          { label: 'Yes — but we have not addressed them', value: 'yes_not_addressed', score: 60 },
          { label: 'Partially — we know some but not all', value: 'partial', score: 30 },
          { label: 'No — we lack visibility', value: 'no', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'Your software stack and level of system integration',
    icon: 'Cpu',
    questions: [
      {
        id: 'system_integration',
        text: 'How well do your business systems talk to each other?',
        type: 'radio',
        options: [
          { label: 'Fully integrated — data flows automatically', value: 'fully', score: 100 },
          { label: 'Partially integrated — some manual steps', value: 'partially', score: 60 },
          { label: 'Mostly separate — lots of manual transfers', value: 'mostly_separate', score: 25 },
          { label: 'Completely siloed — no integration', value: 'siloed', score: 5 },
        ],
      },
      {
        id: 'automation_level',
        text: 'What percentage of your repetitive tasks are automated?',
        type: 'radio',
        options: [
          { label: 'Over 70%', value: 'over_70', score: 100 },
          { label: '40-70%', value: '40_70', score: 70 },
          { label: '10-40%', value: '10_40', score: 35 },
          { label: 'Under 10%', value: 'under_10', score: 10 },
        ],
      },
    ],
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Your financial visibility and forecasting capability',
    icon: 'TrendingUp',
    questions: [
      {
        id: 'financial_visibility',
        text: 'How quickly can you access your current P&L and cash position?',
        type: 'radio',
        options: [
          { label: 'Instantly via live dashboard', value: 'instant', score: 100 },
          { label: 'Within the same day', value: 'same_day', score: 75 },
          { label: 'Within a week', value: 'within_week', score: 40 },
          { label: 'It takes weeks or is always out of date', value: 'weeks', score: 10 },
        ],
      },
      {
        id: 'forecasting',
        text: 'Do you have a rolling financial forecast?',
        type: 'radio',
        options: [
          { label: 'Yes — 12+ month rolling forecast updated monthly', value: 'yes_12m', score: 100 },
          { label: 'Yes — but only 3-6 months ahead', value: 'yes_3_6m', score: 65 },
          { label: 'Informal — we estimate but nothing structured', value: 'informal', score: 25 },
          { label: 'No forecast at all', value: 'none', score: 5 },
        ],
      },
      {
        id: 'unit_economics',
        text: 'Do you know your customer acquisition cost and lifetime value?',
        type: 'radio',
        options: [
          { label: 'Yes — tracked precisely by segment', value: 'yes_precise', score: 100 },
          { label: 'Roughly — ball-park figures', value: 'roughly', score: 55 },
          { label: 'No — but we want to', value: 'no_want_to', score: 20 },
          { label: 'No — and not a priority', value: 'no_not_priority', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Growth',
    description: 'How you measure and optimise your marketing and growth activities',
    icon: 'Target',
    questions: [
      {
        id: 'attribution',
        text: 'Can you attribute revenue to specific marketing channels?',
        type: 'radio',
        options: [
          { label: 'Yes — full multi-touch attribution', value: 'full', score: 100 },
          { label: 'Partially — main channels only', value: 'partial', score: 60 },
          { label: 'Basic — last click only', value: 'last_click', score: 30 },
          { label: 'No — we cannot attribute revenue', value: 'none', score: 5 },
        ],
      },
      {
        id: 'growth_metrics',
        text: 'How do you measure marketing effectiveness?',
        type: 'radio',
        options: [
          { label: 'ROI and pipeline contribution tracked per channel', value: 'roi_tracked', score: 100 },
          { label: 'Some metrics tracked but not consistently', value: 'some', score: 55 },
          { label: 'Mostly vanity metrics (likes, followers)', value: 'vanity', score: 20 },
          { label: 'We do not measure marketing effectiveness', value: 'none', score: 5 },
        ],
      },
    ],
  },
]

export function calculateScores(answers) {
  const dimensionScores = {}
  let totalWeightedScore = 0
  let totalQuestions = 0

  for (const step of QUIZ_STEPS) {
    let stepTotal = 0
    let stepCount = 0
    for (const question of step.questions) {
      const answer = answers[question.id]
      if (answer !== undefined) {
        const option = question.options.find(o => o.value === answer)
        if (option) {
          stepTotal += option.score
          stepCount++
        }
      }
    }
    const stepScore = stepCount > 0 ? Math.round(stepTotal / stepCount) : 0
    dimensionScores[step.id] = stepScore
    totalWeightedScore += stepScore
    totalQuestions++
  }

  const overallScore = totalQuestions > 0 ? Math.round(totalWeightedScore / totalQuestions) : 0
  return { overallScore, dimensionScores }
}

export function getMaturityLevel(score) {
  if (score >= 80) return { level: 'Advanced', color: '#22c55e', description: 'You have strong data foundations. Focus on optimisation and AI readiness.' }
  if (score >= 60) return { level: 'Developing', color: '#3b82f6', description: 'Good progress made. Key gaps remain that are costing you time and money.' }
  if (score >= 40) return { level: 'Emerging', color: '#f59e0b', description: 'You have the basics but significant blind spots are limiting growth.' }
  return { level: 'Foundation', color: '#ef4444', description: 'Critical gaps in visibility are putting your business at risk. Urgent action needed.' }
}

export function getRecommendations(dimensionScores) {
  const recs = []

  if (dimensionScores.data < 50) {
    recs.push({ priority: 'Critical', dimension: 'Data & Reporting', title: 'Implement a centralised reporting dashboard', description: 'Your reporting is manual and slow. A live KPI dashboard would save your team 5-10 hours per week and give you real-time visibility.', impact: '£8,000-£15,000/yr in time savings' })
  } else if (dimensionScores.data < 75) {
    recs.push({ priority: 'High', dimension: 'Data & Reporting', title: 'Automate your weekly reporting', description: 'Automating your report generation would eliminate errors and free up significant management time.', impact: '3-5 hrs/week saved' })
  }

  if (dimensionScores.operations < 50) {
    recs.push({ priority: 'Critical', dimension: 'Operations', title: 'Map and automate your top 3 manual processes', description: 'You are spending significant time on work that should be automated. This is your single biggest ROI opportunity.', impact: '£12,000-£25,000/yr in efficiency gains' })
  } else if (dimensionScores.operations < 75) {
    recs.push({ priority: 'High', dimension: 'Operations', title: 'Document and optimise key workflows', description: 'Formalising your workflows will surface automation opportunities and reduce errors.', impact: '10-20% operational cost reduction' })
  }

  if (dimensionScores.technology < 50) {
    recs.push({ priority: 'Critical', dimension: 'Technology', title: 'Integrate your core business systems', description: 'Your siloed systems are creating data gaps and manual work. System integration is the foundation of a data-driven business.', impact: 'Enables all other improvements' })
  } else if (dimensionScores.technology < 75) {
    recs.push({ priority: 'High', dimension: 'Technology', title: 'Expand automation to remaining manual processes', description: 'You have good foundations. Push automation coverage above 70% to unlock the next level of efficiency.', impact: '15-30% reduction in operational overhead' })
  }

  if (dimensionScores.finance < 50) {
    recs.push({ priority: 'Critical', dimension: 'Finance', title: 'Build a live financial dashboard', description: 'Flying blind on your financials is high risk. Implement real-time P&L and cash flow visibility immediately.', impact: 'Risk mitigation + faster decisions' })
  } else if (dimensionScores.finance < 75) {
    recs.push({ priority: 'Medium', dimension: 'Finance', title: 'Extend your financial forecast to 12 months', description: 'A rolling 12-month forecast enables proactive rather than reactive financial management.', impact: 'Better capital allocation decisions' })
  }

  if (dimensionScores.marketing < 50) {
    recs.push({ priority: 'High', dimension: 'Marketing', title: 'Implement proper marketing attribution', description: 'Without attribution, you are likely wasting 30-50% of your marketing budget. Fix this to know what is actually working.', impact: '20-40% reduction in wasted marketing spend' })
  } else if (dimensionScores.marketing < 75) {
    recs.push({ priority: 'Opportunity', dimension: 'Marketing', title: 'Build a full-funnel revenue attribution model', description: 'Move beyond last-click to understand the true ROI of every marketing activity.', impact: 'Optimise budget allocation by channel' })
  }

  // Always add AI readiness rec if score warrants it
  const avgScore = Object.values(dimensionScores).reduce((a, b) => a + b, 0) / Object.values(dimensionScores).length
  if (avgScore >= 60) {
    recs.push({ priority: 'Opportunity', dimension: 'AI Readiness', title: 'Prepare your data for AI applications', description: 'With your current foundations, you are well positioned to start exploring AI-driven insights and automation.', impact: 'Competitive advantage in 12-18 months' })
  }

  return recs.sort((a, b) => {
    const order = { Critical: 0, High: 1, Medium: 2, Opportunity: 3 }
    return order[a.priority] - order[b.priority]
  })
}

export function getStrengthsAndWeaknesses(dimensionScores) {
  const stepMap = QUIZ_STEPS.reduce((acc, s) => { acc[s.id] = s.title; return acc }, {})
  const entries = Object.entries(dimensionScores).map(([id, score]) => ({ id, title: stepMap[id], score }))
  const sorted = [...entries].sort((a, b) => b.score - a.score)
  return {
    strengths: sorted.slice(0, 2).filter(s => s.score >= 50),
    weaknesses: sorted.slice(-2).filter(s => s.score < 70).reverse(),
  }
}
