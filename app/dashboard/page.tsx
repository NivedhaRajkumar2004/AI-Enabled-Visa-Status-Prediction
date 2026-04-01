"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelComparisonChart } from "@/components/charts/model-comparison-chart"
import { FeatureImportanceChart } from "@/components/charts/feature-importance-chart"
import { ResidualChart } from "@/components/charts/residual-chart"
import { CVScoreChart } from "@/components/charts/cv-score-chart"
import { 
  BarChart3, 
  Brain, 
  Database, 
  Layers, 
  Target, 
  TrendingUp, 
  Zap,
  CheckCircle,
  Clock
} from "lucide-react"

const statsCards = [
  { 
    title: "Best Model", 
    value: "Gradient Boosting", 
    description: "Highest R² Score",
    icon: Brain,
    color: "from-primary to-accent"
  },
  { 
    title: "R² Score", 
    value: "98.47%", 
    description: "Variance explained",
    icon: Target,
    color: "from-emerald-500 to-teal-500"
  },
  { 
    title: "RMSE", 
    value: "8.42 days", 
    description: "Average error",
    icon: TrendingUp,
    color: "from-blue-500 to-indigo-500"
  },
  { 
    title: "Features", 
    value: "25+", 
    description: "Engineered features",
    icon: Layers,
    color: "from-amber-500 to-orange-500"
  },
  { 
    title: "Training Data", 
    value: "50,000+", 
    description: "Historical records",
    icon: Database,
    color: "from-violet-500 to-purple-500"
  },
  { 
    title: "CV Folds", 
    value: "5", 
    description: "Cross-validation",
    icon: CheckCircle,
    color: "from-rose-500 to-pink-500"
  },
]

const milestoneProgress = [
  { name: "Data Collection & Preprocessing", status: "complete", week: "1-2" },
  { name: "EDA & Feature Engineering", status: "complete", week: "3-4" },
  { name: "Predictive Modeling", status: "complete", week: "5-6" },
  { name: "Web Application", status: "current", week: "7-8" },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="relative pt-24 pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-32 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-4">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Model Performance</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  ML Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Monitor model performance, feature importance, and evaluation metrics
                </p>
              </div>
              
              {/* Project Timeline */}
              <Card className="glass-panel border-border/50 w-full md:w-auto">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    Project Timeline
                  </p>
                  <div className="flex gap-2">
                    {milestoneProgress.map((milestone, i) => (
                      <div 
                        key={milestone.name}
                        className={`flex-1 h-2 rounded-full ${
                          milestone.status === "complete" 
                            ? "bg-gradient-to-r from-primary to-accent" 
                            : milestone.status === "current"
                            ? "bg-primary/50 animate-pulse"
                            : "bg-secondary"
                        }`}
                        title={`${milestone.name} (Week ${milestone.week})`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Milestone 4: Web Application (Current)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {statsCards.map((stat) => (
              <Card key={stat.title} className="glass-panel border-border/50 group hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Charts Section */}
          <Tabs defaultValue="comparison" className="space-y-6">
            <TabsList className="glass-panel border border-border/50 p-1">
              <TabsTrigger value="comparison" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Model Comparison
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Feature Analysis
              </TabsTrigger>
              <TabsTrigger value="validation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Validation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ModelComparisonChart metric="r2" />
                <ModelComparisonChart metric="rmse" />
                <ModelComparisonChart metric="mae" />
              </div>
              
              {/* Best Model Summary */}
              <Card className="glass-panel border-primary/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-foreground flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                        <Zap className="h-5 w-5 text-primary-foreground" />
                      </div>
                      Best Model: Gradient Boosting
                    </CardTitle>
                    <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                      Winner
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Hyperparameters</p>
                      <div className="space-y-1 text-sm font-mono">
                        <p className="text-foreground">n_estimators: 150</p>
                        <p className="text-foreground">learning_rate: 0.1</p>
                        <p className="text-foreground">max_depth: 5</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Train Performance</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-foreground">R²: <span className="font-mono">99.12%</span></p>
                        <p className="text-foreground">MAE: <span className="font-mono">3.21 days</span></p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Test Performance</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-foreground">R²: <span className="font-mono">98.47%</span></p>
                        <p className="text-foreground">RMSE: <span className="font-mono">8.42 days</span></p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Cross-Validation</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-foreground">CV R²: <span className="font-mono">98.45%</span></p>
                        <p className="text-foreground">Std: <span className="font-mono">±0.28%</span></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FeatureImportanceChart />
                <Card className="glass-panel border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Engineered Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: "Income Features", features: ["income_percentile", "log_income", "income_quartile", "income_category"] },
                        { category: "Temporal Features", features: ["is_q1", "is_q4", "year_trend", "season_*"] },
                        { category: "Education Features", features: ["education_rank", "has_advanced_degree"] },
                        { category: "Job Features", features: ["job_frequency", "is_stem_job", "is_management"] },
                        { category: "Location Features", features: ["center_avg_processing_time", "nationality_avg_time"] },
                      ].map((group) => (
                        <div key={group.category}>
                          <p className="text-sm font-medium text-foreground mb-2">{group.category}</p>
                          <div className="flex flex-wrap gap-2">
                            {group.features.map((feature) => (
                              <Badge 
                                key={feature} 
                                variant="outline" 
                                className="bg-secondary/50 text-muted-foreground border-border/50 font-mono text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="validation" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CVScoreChart />
                <ResidualChart />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
