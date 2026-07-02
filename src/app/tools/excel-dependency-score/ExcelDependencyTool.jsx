'use client'
import { useState } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { EXCEL_QUIZ_STEPS, calculateExcelScore, getRiskLevel, getExcelRecommendations } from '@/lib/excelDependency'
import GenericToolResults from '@/components/tools/GenericToolResults'
import EmailCaptureModal from '@/components/ui/EmailCaptureModal'

export default function ExcelDependencyTool() {
  const [stage, setStage] = useState('quiz')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [scores, setScores] = useState(null)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [emailCaptured, setEmailCaptured] = useState(false)

  const step = EXCEL_QUIZ_STEPS[currentStep]
  const totalSteps = EXCEL_QUIZ_STEPS.length
  const stepAnswered = step.questions.every(q => answers[q.id] !== undefined)

  const handleAnswer = (qId, val) => setAnswers(prev => ({ ...prev, [qId]: val }))

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      const computed = calculateExcelScore(answers)
      setScores(computed)
      setEmailModalOpen(true)
    }
  }

  const handleEmailSubmit = () => { setEmailCaptured(true); setEmailModalOpen(false); setStage('results') }
  const handleSkip = () => { setEmailModalOpen(false); setStage('results') }

  if (stage === 'results' && scores) {
    const maturity = getRiskLevel(scores.riskScore)
    // For Excel, dimensionScores are quiz scores (inverted = risk). Display as risk score per dimension.
    const riskByDimension = scores.riskByDimension || {}
    const recs = getExcelRecommendations(riskByDimension)
    // Show inverted (risk) scores in the chart so higher = more risk
    const dimensionList = EXCEL_QUIZ_STEPS.map(s => ({
      id: s.id,
      title: s.title,
      score: riskByDimension[s.id] !== undefined ? riskByDimension[s.id] : (100 - (scores.dimensionScores[s.id] || 0)),
    }))
    return (
      <>
        <GenericToolResults
          overallScore={scores.riskScore}
          dimensionList={dimensionList}
          maturity={maturity}
          recommendations={recs}
          toolTitle="Excel Dependency Score"
          scoreLabel="Your Excel Risk Score"
          pdfFilename={`excel-dependency-${scores.riskScore}.pdf`}
          emailCaptured={emailCaptured}
          onRequestEmail={() => setEmailModalOpen(true)}
        />
        <EmailCaptureModal isOpen={emailModalOpen} onClose={handleSkip} onSubmit={handleEmailSubmit}
          source="excel-dependency-download" score={scores.riskScore} maturityLevel={maturity.level} />
      </>
    )
  }

  return (
    <>
      <EmailCaptureModal isOpen={emailModalOpen} onClose={handleSkip} onSubmit={handleEmailSubmit}
        source="excel-dependency-results" score={scores?.riskScore} maturityLevel={scores ? getRiskLevel(scores.riskScore).level : ''} />
      <div>
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% complete</span>
          </div>
          <div className="h-1.5 rounded-full bg-navy-800">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }} />
          </div>
        </div>
        <div className="p-6 sm:p-8 rounded-2xl bg-navy-900 border border-navy-800 mb-4">
          <div className="mb-6">
            <span className="text-xs font-medium text-brand-400 bg-brand-600/10 px-2 py-1 rounded-full">{step.title}</span>
            <p className="text-slate-400 text-sm mt-2">{step.description}</p>
          </div>
          {step.questions.map((question, qi) => (
            <div key={question.id} className={qi > 0 ? 'mt-8 pt-8 border-t border-navy-800' : ''}>
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
          <button onClick={() => setCurrentStep(p => p - 1)} disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-medium transition-all border border-navy-700 disabled:opacity-40 disabled:cursor-not-allowed">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={handleNext} disabled={!stepAnswered}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            {currentStep === totalSteps - 1 ? 'See My Risk Score' : 'Next'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  )
}
