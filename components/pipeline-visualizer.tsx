"use client"

import { useState, useEffect } from "react"
import { Database, Sparkles, Brain, CheckCircle, ArrowRight } from "lucide-react"

const pipelineSteps = [
  {
    id: 1,
    icon: Database,
    title: "Data Loading",
    description: "Load and validate visa application data",
    duration: 800
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Preprocessing",
    description: "Clean, encode, and transform features",
    duration: 1200
  },
  {
    id: 3,
    icon: Brain,
    title: "Model Ensemble",
    description: "Run 6 ML models simultaneously",
    duration: 1500
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Prediction",
    description: "Generate confidence-weighted result",
    duration: 600
  }
]

export function PipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const timer = setTimeout(() => {
      if (activeStep < pipelineSteps.length - 1) {
        setActiveStep(prev => prev + 1)
      } else {
        setActiveStep(0)
        setIsRunning(false)
      }
    }, pipelineSteps[activeStep]?.duration || 1000)

    return () => clearTimeout(timer)
  }, [activeStep, isRunning])

  const startPipeline = () => {
    setActiveStep(0)
    setIsRunning(true)
  }

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">ML Pipeline Flow</h3>
        <button
          onClick={startPipeline}
          disabled={isRunning}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {isRunning ? "Running..." : "Run Pipeline"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {pipelineSteps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div 
              className={`flex-1 p-4 rounded-xl border transition-all duration-500 ${
                index < activeStep 
                  ? "bg-primary/10 border-primary/30" 
                  : index === activeStep && isRunning
                  ? "bg-primary/20 border-primary/50 scale-105 shadow-lg shadow-primary/20"
                  : "bg-secondary/30 border-border/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg transition-colors ${
                  index <= activeStep && isRunning 
                    ? "bg-primary/20" 
                    : "bg-secondary/50"
                }`}>
                  <step.icon className={`h-4 w-4 transition-colors ${
                    index <= activeStep && isRunning 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`} />
                </div>
                <span className={`text-sm font-medium transition-colors ${
                  index <= activeStep && isRunning 
                    ? "text-foreground" 
                    : "text-muted-foreground"
                }`}>
                  {step.title}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
              {index === activeStep && isRunning && (
                <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent animate-pulse"
                    style={{ 
                      width: "100%",
                      animation: `progress ${step.duration}ms linear`
                    }}
                  />
                </div>
              )}
            </div>
            {index < pipelineSteps.length - 1 && (
              <ArrowRight className={`hidden md:block h-5 w-5 mx-2 flex-shrink-0 transition-colors ${
                index < activeStep && isRunning 
                  ? "text-primary" 
                  : "text-muted-foreground/30"
              }`} />
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
