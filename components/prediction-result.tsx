"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, TrendingUp, AlertCircle, Sparkles, Calendar } from "lucide-react"
import type { PredictionResult } from "@/components/prediction-form"

interface PredictionResultDisplayProps {
  result: PredictionResult
}

export function PredictionResultDisplay({ result }: PredictionResultDisplayProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive": return "text-emerald-400"
      case "high": return "text-amber-400"
      case "low": return "text-emerald-400"
      default: return "text-muted-foreground"
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "positive": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "high": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "low": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const formatDate = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Main Prediction Card */}
      <Card className="glass-panel border-primary/30 overflow-hidden relative">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/20 rounded-full blur-3xl" />
        
        <CardHeader className="relative border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent animate-pulse-slow">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">Prediction Result</CardTitle>
                <p className="text-sm text-muted-foreground">Powered by {result.modelUsed}</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              {(result.confidence * 100).toFixed(2)}% Confidence
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-8 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              Estimated Processing Time
            </div>
            <div className="text-6xl md:text-7xl font-bold text-foreground mb-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {result.predictedDays}
              </span>
              <span className="text-3xl md:text-4xl text-muted-foreground ml-2">days</span>
            </div>
            <p className="text-muted-foreground">
              Expected completion by <span className="text-foreground font-medium">{formatDate(result.predictedDays)}</span>
            </p>
          </div>

          {/* Confidence Interval */}
          <div className="glass-panel rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Confidence Interval
              </span>
              <span className="text-sm text-muted-foreground">
                95% confidence range
              </span>
            </div>
            
            <div className="relative">
              <Progress value={50} className="h-4 bg-secondary/50" />
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                <div className="flex flex-col items-start">
                  <span className="text-xs font-mono font-semibold text-foreground bg-secondary px-2 py-1 rounded">
                    {result.confidenceInterval.lower} days
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono font-semibold text-primary-foreground bg-primary px-2 py-1 rounded">
                    {result.predictedDays} days
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-mono font-semibold text-foreground bg-secondary px-2 py-1 rounded">
                    {result.confidenceInterval.upper} days
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6 text-sm">
              <div className="text-center">
                <Calendar className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <span className="text-muted-foreground">Best Case</span>
                <p className="font-medium text-foreground">{formatDate(result.confidenceInterval.lower)}</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-4 w-4 text-primary mx-auto mb-1" />
                <span className="text-muted-foreground">Most Likely</span>
                <p className="font-medium text-primary">{formatDate(result.predictedDays)}</p>
              </div>
              <div className="text-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <span className="text-muted-foreground">Worst Case</span>
                <p className="font-medium text-foreground">{formatDate(result.confidenceInterval.upper)}</p>
              </div>
            </div>
          </div>

          {/* Impact Factors */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Key Impact Factors
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.factors.map((factor, index) => (
                <div 
                  key={factor.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{factor.name}</p>
                    <p className="text-xs text-muted-foreground">{factor.value}</p>
                  </div>
                  <Badge variant="outline" className={getImpactBadge(factor.impact)}>
                    {factor.impact}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50">
        <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Important Disclaimer</p>
          <p>
            This prediction is based on historical data and machine learning models. 
            Actual processing times may vary based on individual circumstances, policy changes, 
            and other factors beyond our model&apos;s scope.
          </p>
        </div>
      </div>
    </div>
  )
}
