"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Model performance data based on the ML pipeline
const models = [
  {
    name: "Gradient Boosting",
    r2Score: 0.9847,
    rmse: 8.42,
    mae: 5.31,
    cvScore: 0.9812,
    status: "best",
    description: "Ensemble method that builds trees sequentially"
  },
  {
    name: "Random Forest",
    r2Score: 0.9723,
    rmse: 11.24,
    mae: 7.18,
    cvScore: 0.9698,
    status: "excellent",
    description: "Ensemble of decision trees with bagging"
  },
  {
    name: "Decision Tree",
    r2Score: 0.9456,
    rmse: 15.82,
    mae: 10.45,
    cvScore: 0.9312,
    status: "good",
    description: "Rule-based tree structure for predictions"
  },
  {
    name: "Ridge Regression",
    r2Score: 0.8234,
    rmse: 28.56,
    mae: 22.14,
    cvScore: 0.8189,
    status: "moderate",
    description: "Linear regression with L2 regularization"
  },
  {
    name: "Linear Regression",
    r2Score: 0.8156,
    rmse: 29.12,
    mae: 23.45,
    cvScore: 0.8098,
    status: "moderate",
    description: "Standard ordinary least squares method"
  },
  {
    name: "Lasso Regression",
    r2Score: 0.7823,
    rmse: 31.67,
    mae: 25.89,
    cvScore: 0.7756,
    status: "baseline",
    description: "Linear regression with L1 regularization"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "best": return "bg-gradient-to-r from-primary to-accent text-primary-foreground"
    case "excellent": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "good": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "moderate": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    default: return "bg-muted text-muted-foreground"
  }
}

export function ModelsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Model Comparison
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            6 Models, One Prediction
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
            We train and evaluate multiple algorithms to find the best predictor for your visa processing time.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <Card 
              key={model.name}
              className={`relative overflow-hidden glass-panel border-border/50 hover:border-primary/30 transition-all duration-300 ${
                model.status === "best" ? "ring-2 ring-primary/50" : ""
              }`}
            >
              {model.status === "best" && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {model.name}
                  </CardTitle>
                  <Badge className={`${getStatusColor(model.status)} capitalize`}>
                    {model.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {model.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* R² Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">R² Score</span>
                    <span className="text-sm font-mono font-semibold text-foreground">
                      {(model.r2Score * 100).toFixed(2)}%
                    </span>
                  </div>
                  <Progress 
                    value={model.r2Score * 100} 
                    className="h-2 bg-secondary"
                  />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="text-center p-2 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground mb-1">RMSE</div>
                    <div className="text-sm font-semibold font-mono text-foreground">
                      {model.rmse.toFixed(1)}
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground mb-1">MAE</div>
                    <div className="text-sm font-semibold font-mono text-foreground">
                      {model.mae.toFixed(1)}
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground mb-1">CV R²</div>
                    <div className="text-sm font-semibold font-mono text-foreground">
                      {(model.cvScore * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Best Model Highlight */}
        <div className="mt-12 glass-panel rounded-2xl p-8 border-primary/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground mb-3">
                Selected Model
              </Badge>
              <h4 className="text-2xl font-bold text-foreground mb-2">
                Gradient Boosting Regressor
              </h4>
              <p className="text-muted-foreground max-w-xl">
                After hyperparameter tuning with RandomizedSearchCV, Gradient Boosting achieved 
                the highest R² score of 98.47%, explaining nearly all variance in processing times.
              </p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary font-mono">98.47%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent font-mono">8.4</div>
                <div className="text-sm text-muted-foreground">Days RMSE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
