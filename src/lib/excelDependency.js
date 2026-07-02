export const EXCEL_QUIZ_STEPS = [
  {
    id: 'breadth',
    title: 'Usage Breadth',
    description: 'How widely Excel is used in your business',
    questions: [
      {
        id: 'critical_processes',
        text: 'How many business-critical processes rely on Excel or Google Sheets?',
        options: [
          { label: "None — we've moved everything to purpose-built tools", value: 'a', score: 100 },
          { label: '1-2 non-critical processes', value: 'b', score: 75 },
          { label: '3-5 including some critical ones', value: 'c', score: 35 },
          { label: 'More than 5, including core business operations', value: 'd', score: 5 },
        ],
      },
      {
        id: 'excel_usage_type',
        text: 'What is Excel used for in your business? (Select the most critical)',
        options: [
          { label: "We don't use Excel for anything critical", value: 'a', score: 100 },
          { label: 'Simple data storage / reference lists', value: 'b', score: 85 },
          { label: 'Project or task tracking', value: 'c', score: 40 },
          { label: 'Inventory or stock management', value: 'd', score: 15 },
          { label: 'CRM or customer tracking', value: 'e', score: 10 },
          { label: 'Financial reporting and P&L', value: 'f', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'risk',
    title: 'Business Risk',
    description: 'The risk your Excel dependency creates',
    questions: [
      {
        id: 'file_loss_impact',
        text: 'What would happen if your main Excel file was corrupted or deleted today?',
        options: [
          { label: "Nothing — it's backed up and replaceable within hours", value: 'a', score: 100 },
          { label: 'Inconvenient but recoverable within a day', value: 'b', score: 65 },
          { label: 'Serious disruption — would take days to reconstruct', value: 'c', score: 20 },
          { label: 'Catastrophic — critical data would be lost permanently', value: 'd', score: 5 },
        ],
      },
      {
        id: 'shared_file_users',
        text: 'How many people rely on the same Excel file for day-to-day work?',
        options: [
          { label: 'Nobody relies on a single shared file', value: 'a', score: 100 },
          { label: '1-2 people', value: 'b', score: 70 },
          { label: '3-5 people', value: 'c', score: 35 },
          { label: 'More than 5 people share critical Excel files', value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'versioning',
    title: 'Version Control & Errors',
    description: 'How well you manage changes and catch mistakes',
    questions: [
      {
        id: 'version_control',
        text: 'How do you manage versions of important Excel files?',
        options: [
          { label: "We don't use Excel for anything where version matters", value: 'a', score: 100 },
          { label: 'Cloud storage with auto-versioning (Google Sheets / SharePoint)', value: 'b', score: 75 },
          { label: 'Manual file naming (v1, v2, FINAL, FINAL_v2...)', value: 'c', score: 20 },
          { label: 'No version control — one file, overwritten each time', value: 'd', score: 5 },
        ],
      },
      {
        id: 'error_frequency',
        text: "How often do you discover errors in Excel-based reports after they've been shared?",
        options: [
          { label: "Never — we have review processes or don't use Excel for reports", value: 'a', score: 100 },
          { label: 'Rarely — once a quarter or less', value: 'b', score: 70 },
          { label: 'Occasionally — monthly or more', value: 'c', score: 30 },
          { label: 'Frequently — errors are a known problem', value: 'd', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'automation',
    title: 'Automation Potential',
    description: 'How replaceable your Excel usage is',
    questions: [
      {
        id: 'replaceability',
        text: 'Could the work currently done in Excel be done in a purpose-built system?',
        options: [
          { label: 'Already moved to purpose-built systems', value: 'a', score: 100 },
          { label: "Yes — we know what we'd replace it with", value: 'b', score: 60 },
          { label: "Probably — but we haven't investigated", value: 'c', score: 35 },
          { label: 'No — Excel does something no other tool can', value: 'd', score: 15 },
        ],
      },
      {
        id: 'migration_blocker',
        text: 'What is stopping you from moving away from Excel?',
        options: [
          { label: 'Nothing — we already have or are planning to', value: 'a', score: 100 },
          { label: 'Cost of alternatives', value: 'b', score: 50 },
          { label: 'Time and effort of migration', value: 'c', score: 40 },
          { label: 'Comfort — the team knows Excel', value: 'd', score: 35 },
          { label: "We don't see a reason to change", value: 'e', score: 5 },
        ],
      },
    ],
  },
]

export function calculateExcelScore(answers) {
  const dimensionScores = {}
  let total = 0; let count = 0
  for (const step of EXCEL_QUIZ_STEPS) {
    let stepTotal = 0; let stepCount = 0
    for (const q of step.questions) {
      const ans = answers[q.id]
      if (ans !== undefined) {
        const opt = q.options.find(o => o.value === ans)
        if (opt) { stepTotal += opt.score; stepCount++ }
      }
    }
    const quizScore = stepCount > 0 ? Math.round(stepTotal / stepCount) : 0
    dimensionScores[step.id] = quizScore
    total += quizScore; count++
  }
  const avgQuizScore = count > 0 ? Math.round(total / count) : 0
  const riskScore = 100 - avgQuizScore
  // Also store risk per dimension
  const riskByDimension = {}
  for (const [k, v] of Object.entries(dimensionScores)) {
    riskByDimension[k] = 100 - v
  }
  return { riskScore, dimensionScores, riskByDimension }
}

export function getRiskLevel(riskScore) {
  if (riskScore < 20) return { level: 'Low Risk', color: '#22c55e', description: 'Excel is used appropriately. No urgent action needed.' }
  if (riskScore < 40) return { level: 'Moderate Risk', color: '#3b82f6', description: 'Some exposure. Consider moving critical processes to purpose-built tools.' }
  if (riskScore < 65) return { level: 'High Risk', color: '#f59e0b', description: 'Significant Excel dependency creating operational and data risk.' }
  return { level: 'Critical Risk', color: '#ef4444', description: 'Critical business processes running on Excel. This is a ticking time bomb.' }
}

export function getExcelRecommendations(riskByDimension) {
  const recs = []
  if (riskByDimension.risk > 50) recs.push({ priority: 'Critical', dimension: 'Risk', title: 'Back up and document your critical Excel files immediately', description: 'Your business has critical processes with no safety net. Start with an emergency backup and documentation of what each file does and who depends on it.', impact: 'Prevents catastrophic data loss' })
  if (riskByDimension.breadth > 50) recs.push({ priority: 'Critical', dimension: 'Usage', title: 'Audit all Excel usage and prioritise migration of highest-risk files', description: 'Too many critical processes depend on Excel. Audit every file, rank by business impact, and start migrating the highest-risk ones first.', impact: 'Reduces single point of failure' })
  if (riskByDimension.versioning > 50) recs.push({ priority: 'High', dimension: 'Version Control', title: 'Move Excel files to cloud storage with version history', description: 'Manual versioning is error-prone. Move immediately to SharePoint or Google Sheets for automatic version history and collaboration.', impact: 'Eliminates version conflict errors' })
  if (riskByDimension.automation > 40) recs.push({ priority: 'High', dimension: 'Automation', title: 'Replace Excel-based tracking with purpose-built tools', description: 'Most Excel use cases have purpose-built, affordable alternatives. A proper tool audit will identify the right replacements.', impact: 'Saves 3-8 hrs/week per user' })
  recs.push({ priority: 'Opportunity', dimension: 'All', title: 'Book a free system audit to map your migration roadmap', description: 'We will identify which Excel files to migrate first, what to replace them with, and how to do it without disrupting operations.', impact: 'Structured path to lower risk' })
  const order = { Critical: 0, High: 1, Medium: 2, Opportunity: 3 }
  return recs.sort((a, b) => order[a.priority] - order[b.priority])
}
