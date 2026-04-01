"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PredictionForm, type PredictionResult } from "@/components/prediction-form"
import { PredictionResultDisplay } from "@/components/prediction-result"
import { PipelineVisualizer } from "@/components/pipeline-visualizer"
import { ParticleBackground } from "@/components/particle-background"
import { Brain, Sparkles, Shield, Zap } from "lucide-react"

const highlights = [
  { icon: Brain, label: "6 ML Models", description: "Ensemble prediction" },
  { icon: Shield, label: "98.5% Accuracy", description: "Validated on test data" },
  { icon: Zap, label: "Instant Results", description: "Real-time processing" },
]

export default function PredictPage() {
  const [result, setResult] = useState<PredictionResult | null>(null)

  const handlePredict = (predictionResult: PredictionResult) => {
    setResult(predictionResult)
  }

  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      <Navigation />
      
      <div className="relative pt-24 pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Prediction Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Predict Your Processing Time
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
              Enter your visa application details below and our AI will estimate 
              your processing time with confidence intervals.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <div>
              <PredictionForm onPredict={handlePredict} />
            </div>

            {/* Result */}
            <div>
              {result ? (
                <PredictionResultDisplay result={result} />
              ) : (
                <div className="glass-panel rounded-2xl p-8 border-border/50 h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse-slow" />
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                      <Brain className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Ready for Prediction
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill in your application details on the left and click 
                    &quot;Predict Processing Time&quot; to get your AI-powered estimate.
                  </p>

                  {/* Features list */}
                  <div className="mt-8 space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Processing time prediction in days
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      95% confidence interval range
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Key impact factors analysis
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Expected completion dates
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pipeline Visualizer */}
          <div className="mt-12">
            <PipelineVisualizer />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
