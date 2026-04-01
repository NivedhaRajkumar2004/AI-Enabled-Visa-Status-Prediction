"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Cross-validation scores for 5 folds
const cvData = [
  { fold: "Fold 1", gbScore: 98.12, rfScore: 96.89, dtScore: 93.21 },
  { fold: "Fold 2", gbScore: 98.67, rfScore: 97.45, dtScore: 94.12 },
  { fold: "Fold 3", gbScore: 98.34, rfScore: 97.12, dtScore: 93.87 },
  { fold: "Fold 4", gbScore: 98.89, rfScore: 97.67, dtScore: 94.56 },
  { fold: "Fold 5", gbScore: 98.23, rfScore: 97.01, dtScore: 93.45 },
]

export function CVScoreChart() {
  return (
    <Card className="glass-panel border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Cross-Validation Scores</CardTitle>
        <CardDescription className="text-muted-foreground">
          5-Fold CV R² scores for top 3 models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cvData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gbGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="rfGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="dtGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis 
                dataKey="fold" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                domain={[90, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, "R² Score"]}
              />
              <Area 
                type="monotone" 
                dataKey="gbScore" 
                stroke="hsl(var(--chart-1))" 
                fillOpacity={1}
                fill="url(#gbGradient)"
                strokeWidth={2}
                name="Gradient Boosting"
              />
              <Area 
                type="monotone" 
                dataKey="rfScore" 
                stroke="hsl(var(--chart-2))" 
                fillOpacity={1}
                fill="url(#rfGradient)"
                strokeWidth={2}
                name="Random Forest"
              />
              <Area 
                type="monotone" 
                dataKey="dtScore" 
                stroke="hsl(var(--chart-3))" 
                fillOpacity={1}
                fill="url(#dtGradient)"
                strokeWidth={2}
                name="Decision Tree"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
            <span className="text-xs text-muted-foreground">Gradient Boosting (98.45%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
            <span className="text-xs text-muted-foreground">Random Forest (97.23%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-3))" }} />
            <span className="text-xs text-muted-foreground">Decision Tree (93.84%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
