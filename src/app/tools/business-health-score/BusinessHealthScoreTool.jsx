'use client'
import { useState } from 'react'
import { ArrowRight, ArrowLeft, X } from 'lucide-react'
import { QUIZ_STEPS, calculateScores } from '@/lib/scoring'
import ResultsDisplay from '@/components/tools/ResultsDisplay'

const STAGES = { QUIZ: 'quiz', EMAIL: 'email', RESULTS: 'results' }

export default function BusinessHealthScoreTool() {
  const [stage, setStage] = useState(STAGES.QUIZ)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [scores, setScores] = useState(null)

  const step = QUIZ_STEPS[currentStep]
  const totalSteps = QUIZ_STEPS.length

  const stepAnswered = step.questions.every(q => answers[q.id] !== undefined)

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      const computed = calculateScores(answers)
      setScores(computed)
      setStage(STAGES.EMAIL)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setStage(STAGES.RESULTS)
  }

  const handleSkipEmail = () => {
    setStage(STAGES.RESULTS)
  }

  if (stage === STAGES.RESULTS && scores) {
    return <ResultsDisplay overallScore={scores.overallScore} dimensionScores={scores.dimensionScores} />
  }

  if (stage === STAGES.EMAIL) {
    return (
      <div className="p-8 rounded-2xl bg-navy-900 border border-navy-800">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🎯</div>
          <h2 className="text-2xl font-bold text-white mb-2">Your results are ready!</h2>
          <p className="text-slate-400">Enter your email to receive a copy of your report, or skip to see results now.</p>
        </div>
        <form onSubmit={handleEmailSubmit} className="space-y-4 mb-4">
          <input type="email" placeholder="your@email.co.uk" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors" required />
          <button type="submit" className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all flex items-center justify-center gap-2">
            Send My Report &amp; See Results <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <button onClick={handleSkipEmail} className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1">
          <X className="w-3 h-3" /> Skip — just show me the results
        </button>
        <p className="text-center text-xs text-slate-600 mt-3">No spam. Unsubscribe any time.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(((currentStep) / totalSteps) * 100)}% complete</span>
        </div>
        <div className="h-1.5 rounded-full bg-navy-800">
          <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }} />
        </div>
        <div className="flex gap-1 mt-3">
          {QUIZ_STEPS.map((s, i) => (
            <div key={s.id} className={`flex-1 h-1 rounded-full transition-all ${i <= currentStep ? 'bg-brand-500' : 'bg-navy-800'}`} />
          ))}
        </div>
      </div>

      {/* Step */}
      <div className="p-6 sm:p-8 rounded-2xl bg-navy-900 border border-navy-800 mb-4">
        <div className="mb-6">
          <span className="text-xs font-medium text-brand-400 bg-brand-600/10 px-2 py-1 rounded-full">{step.title}</span>
          <p className="text-slate-400 text-sm mt-2">{step.description}</p>
        </div>

        {step.questions.map((question, qi) => (
          <div key={question.id} className={qi > 0 ? 'mt-8' : ''}>
            <h3 className="text-white font-medium mb-4">{qi + 1}. {question.text}</h3>
            <div className="space-y-2">
              {question.options.map(option => (
                <button key={option.value} onClick={() => handleAnswer(question.id, option.value)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${answers[question.id] === option.value ? 'border-brand-500 bg-brand-600/10 text-white' : 'border-navy-700 bg-navy-800/50 text-slate-300 hover:border-navy-600 hover:bg-navy-800'}`}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-4">
        <button onClick={handlePrev} disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-medium transition-all border border-navy-700 disabled:opacity-40 disabled:cursor-not-allowed">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={handleNext} disabled={!stepAnswered}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed">
          {currentStep === totalSteps - 1 ? 'See My Results' : 'Next'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
