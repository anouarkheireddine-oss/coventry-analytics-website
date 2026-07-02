export const AI_QUIZ_STEPS = [
  {
    id: 'data',
    title: 'Data Foundation',
    description: 'The quality and accessibility of your business data',
    questions: [
      {
        id: 'data_quality',
        text: 'How would you describe the quality and completeness of your business data?',
        options: [
          { label: 'All key data is clean, consistent, and stored in one place', value: 'a', score: 100 },
          { label: 'Most data is accurate but spread across multiple systems', value: 'b', score: 65 },
          { label: 'Data is available but often inconsistent or incomplete', value: 'c', score: 30 },
          { label: "We have data but don't trust it or know where it all lives", value: 'd', score: 5 },
        ],
      },
      {
        id: 'data_access',
        text: 'How long does it take to get a specific piece of business data when you need it?',
        options: [
          { label: 'Instantly — it\'s in a live dashboard', value: 'a', score: 100 },
          { label: 'Within the same day', value: 'b', score: 70 },
          { label: 'It takes days or requires manual extraction', value: 'c', score: 35 },
          { label: "We often can't get it at all", value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'technology',
    title: 'Technology & Infrastructure',
    description: 'Your systems integration and technical foundations',
    questions: [
      {
        id: 'system_integration',
        text: 'How integrated are your business systems (CRM, accounting, ops tools)?',
        options: [
          { label: 'Fully integrated with automated data flows', value: 'a', score: 100 },
          { label: 'Partially integrated — some manual steps remain', value: 'b', score: 60 },
          { label: "Mostly siloed — data doesn't flow between systems", value: 'c', score: 25 },
          { label: 'We use spreadsheets and manual processes for everything', value: 'd', score: 5 },
        ],
      },
      {
        id: 'data_warehouse',
        text: 'Do you have a data warehouse or central data store?',
        options: [
          { label: 'Yes — structured, maintained, and used regularly', value: 'a', score: 100 },
          { label: "Partially — we have some centralisation but it's incomplete", value: 'b', score: 55 },
          { label: 'No — data lives in individual apps and exports', value: 'c', score: 20 },
          { label: "I don't know what a data warehouse is", value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'team',
    title: 'Team & Skills',
    description: 'Your internal data capability and decision-making culture',
    questions: [
      {
        id: 'team_skills',
        text: 'Does your team have the skills to work with data and analytics tools?',
        options: [
          { label: 'Yes — dedicated data/analytics capability in-house', value: 'a', score: 100 },
          { label: 'Some capability — a few people can do basic analysis', value: 'b', score: 60 },
          { label: 'Very limited — we rely on whoever is most comfortable with Excel', value: 'c', score: 25 },
          { label: 'No data skills — it would all need to come from outside', value: 'd', score: 5 },
        ],
      },
      {
        id: 'decision_making',
        text: 'How does your leadership team currently make key business decisions?',
        options: [
          { label: 'Primarily data-driven — we have dashboards and review metrics regularly', value: 'a', score: 100 },
          { label: 'Mix of data and gut feel — we look at numbers when available', value: 'b', score: 60 },
          { label: 'Mostly gut feel — we trust experience over numbers', value: 'c', score: 25 },
          { label: 'We react to problems as they come — no structured decision process', value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'processes',
    title: 'Processes & Operations',
    description: 'How documented and consistent your operations are',
    questions: [
      {
        id: 'documentation',
        text: "How much of your day-to-day operation is documented in systems (vs people's heads)?",
        options: [
          { label: 'Fully documented — processes, rules, and data are all in systems', value: 'a', score: 100 },
          { label: 'Mostly documented — key processes are captured', value: 'b', score: 65 },
          { label: "Partially — some things are written down, most aren't", value: 'c', score: 30 },
          { label: 'Very little — knowledge lives with individuals', value: 'd', score: 5 },
        ],
      },
      {
        id: 'consistency',
        text: 'Are your key business processes consistent and repeatable?',
        options: [
          { label: 'Yes — standardised, measured, and continuously improved', value: 'a', score: 100 },
          { label: 'Mostly — core processes are consistent but vary by person', value: 'b', score: 60 },
          { label: "Somewhat — things get done but not always the same way", value: 'c', score: 25 },
          { label: 'No — every situation is handled differently', value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'strategy',
    title: 'Strategy & Vision',
    description: 'Your AI strategy and clarity of purpose',
    questions: [
      {
        id: 'ai_strategy',
        text: 'Does your business have a clear AI or digital transformation strategy?',
        options: [
          { label: 'Yes — documented strategy with budget and timeline', value: 'a', score: 100 },
          { label: "We've discussed it but haven't formalised it", value: 'b', score: 55 },
          { label: 'No strategy but we know we need to do something', value: 'c', score: 20 },
          { label: 'AI is not currently on our radar', value: 'd', score: 5 },
        ],
      },
      {
        id: 'ai_goal',
        text: 'What is your primary goal for using AI in your business?',
        options: [
          { label: "Automate specific manual processes we've already identified", value: 'a', score: 100 },
          { label: 'Improve decision-making with better data and predictions', value: 'b', score: 85 },
          { label: 'Understand what AI could do for us — exploring options', value: 'c', score: 50 },
          { label: "We haven't thought about this yet", value: 'd', score: 10 },
        ],
      },
    ],
  },
]

export function calculateAIScore(answers) {
  const dimensionScores = {}
  let total = 0
  let count = 0
  for (const step of AI_QUIZ_STEPS) {
    let stepTotal = 0
    let stepCount = 0
    for (const q of step.questions) {
      const ans = answers[q.id]
      if (ans !== undefined) {
        const opt = q.options.find(o => o.value === ans)
        if (opt) { stepTotal += opt.score; stepCount++ }
      }
    }
    const score = stepCount > 0 ? Math.round(stepTotal / stepCount) : 0
    dimensionScores[step.id] = score
    total += score
    count++
  }
  return { overallScore: count > 0 ? Math.round(total / count) : 0, dimensionScores }
}

export function getAIMaturityLevel(score) {
  if (score >= 75) return { level: 'AI-Native', color: '#22c55e', description: 'Exceptional foundations. You are ready to deploy AI at scale.' }
  if (score >= 50) return { level: 'AI-Enabled', color: '#3b82f6', description: 'Good foundations in place. Targeted AI projects will deliver quick wins.' }
  if (score >= 30) return { level: 'AI-Aware', color: '#f59e0b', description: 'You understand the opportunity but key gaps need addressing first.' }
  return { level: 'Not Ready', color: '#ef4444', description: 'Foundational work is needed before AI can deliver value in your business.' }
}

export function getAIRecommendations(dimensionScores) {
  const recs = []
  if (dimensionScores.data < 50) recs.push({ priority: 'Critical', dimension: 'Data', title: 'Clean and centralise your data before investing in AI', description: 'AI systems are only as good as the data they run on. Without clean, centralised data, AI will amplify your problems rather than solve them.', impact: 'Foundation for all AI investment' })
  if (dimensionScores.technology < 50) recs.push({ priority: 'Critical', dimension: 'Technology', title: 'Integrate your systems — AI cannot run on siloed data', description: 'Disconnected systems mean AI tools cannot access the full picture of your business. Integration is a prerequisite, not an optional extra.', impact: 'Unlocks AI across all functions' })
  if (dimensionScores.team < 50) recs.push({ priority: 'High', dimension: 'Team', title: 'Develop internal data literacy before AI adoption', description: 'AI tools need people who understand how to use them. Without internal capability, adoption will fail and ROI will be zero.', impact: 'Multiplies return on AI investment' })
  if (dimensionScores.processes < 50) recs.push({ priority: 'High', dimension: 'Processes', title: 'Document and standardise processes — AI amplifies consistency, not chaos', description: 'AI automates what already happens. If your processes are inconsistent, AI will automate the inconsistency at scale.', impact: 'Increases AI automation quality' })
  if (dimensionScores.strategy < 50) recs.push({ priority: 'Medium', dimension: 'Strategy', title: 'Define one AI use case to start — not a transformation programme', description: 'Start with a single high-value use case where you already have good data. Prove the ROI before expanding.', impact: 'Faster time to value' })
  recs.push({ priority: 'Opportunity', dimension: 'All', title: 'Start with an AI readiness audit to identify your fastest wins', description: 'A structured audit will map your current state and identify the two or three changes that will unlock the most AI value.', impact: 'Prioritise spend for maximum return' })
  const order = { Critical: 0, High: 1, Medium: 2, Opportunity: 3 }
  return recs.sort((a, b) => order[a.priority] - order[b.priority])
}
