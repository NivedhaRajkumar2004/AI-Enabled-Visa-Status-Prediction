"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProcessingTrendsChart } from "@/components/charts/processing-trends-chart"
import { VisaTypeChart } from "@/components/charts/visa-type-chart"
import { NationalityChart } from "@/components/charts/nationality-chart"
import { CenterPerformanceChart } from "@/components/charts/center-performance-chart"
import { 
  TrendingUp, 
  Globe, 
  Calendar, 
  MapPin,
  ArrowUp,
  ArrowDown,
  Minus,
  Filter
} from "lucide-react"
import { useState } from "react"

const quickStats = [
  { 
    label: "Global Average", 
    value: "47.5 days", 
    change: -3.2, 
    trend: "down",
    period: "vs last quarter"
  },
  { 
    label: "Peak Month", 
    value: "April", 
    change: null, 
    trend: "neutral",
    period: "Spring rush"
  },
  { 
    label: "Fastest Visa", 
    value: "O-1 (38d)", 
    change: -5.1, 
    trend: "down",
    period: "vs last year"
  },
  { 
    label: "Busiest Center", 
    value: "California SC", 
    change: 12.4, 
    trend: "up",
    period: "volume increase"
  },
]

const insights = [
  {
    title: "Spring Processing Surge",
    description: "Processing times increase by 22% during March-May due to H-1B filing season.",
    type: "warning",
    icon: Calendar
  },
  {
    title: "Texas SC Efficiency",
    description: "Texas Service Center shows 15% faster processing despite moderate volume.",
    type: "positive",
    icon: MapPin
  },
  {
    title: "Income Correlation",
    description: "Higher income applicants (>$100k) see 8% faster processing on average.",
    type: "info",
    icon: TrendingUp
  },
  {
    title: "Education Impact",
    description: "Advanced degree holders experience 12% shorter wait times.",
    type: "positive",
    icon: Globe
  },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("12m")

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="relative pt-24 pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-48 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-48 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-4">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Processing Analytics</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Trends & Insights
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore visa processing patterns, seasonal trends, and regional analysis
              </p>
            </div>
            
            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                Time Range:
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-input border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  <SelectItem value="3m">Last 3 months</SelectItem>
                  <SelectItem value="6m">Last 6 months</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat) => (
              <Card key={stat.label} className="glass-panel border-border/50">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.trend === "up" && (
                      <>
                        <ArrowUp className="h-3 w-3 text-amber-400" />
                        <span className="text-amber-400">+{stat.change}%</span>
                      </>
                    )}
                    {stat.trend === "down" && (
                      <>
                        <ArrowDown className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">{stat.change}%</span>
                      </>
                    )}
                    {stat.trend === "neutral" && (
                      <>
                        <Minus className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{stat.period}</span>
                      </>
                    )}
                    {stat.trend !== "neutral" && (
                      <span className="text-muted-foreground ml-1">{stat.period}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProcessingTrendsChart />
            <VisaTypeChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <NationalityChart />
            <CenterPerformanceChart />
          </div>

          {/* Insights Section */}
          <Card className="glass-panel border-border/50">
            <CardHeader>
              <CardTitle className="text-xl text-foreground flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                  <TrendingUp className="h-5 w-5 text-primary-foreground" />
                </div>
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((insight, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl border ${
                      insight.type === "warning" 
                        ? "bg-amber-500/10 border-amber-500/30" 
                        : insight.type === "positive"
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : "bg-blue-500/10 border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        insight.type === "warning" 
                          ? "bg-amber-500/20" 
                          : insight.type === "positive"
                          ? "bg-emerald-500/20"
                          : "bg-blue-500/20"
                      }`}>
                        <insight.icon className={`h-4 w-4 ${
                          insight.type === "warning" 
                            ? "text-amber-400" 
                            : insight.type === "positive"
                            ? "text-emerald-400"
                            : "text-blue-400"
                        }`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Source Note */}
          <div className="mt-8 p-4 rounded-lg bg-secondary/30 border border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              Data based on historical visa application records from 2020-2025. 
              Predictions are generated using Gradient Boosting model with 98.47% R² accuracy.
              For academic demonstration purposes only.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
