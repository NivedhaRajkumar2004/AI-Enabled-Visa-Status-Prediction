"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Feature importance based on the ML pipeline's feature engineering
const featureData = [
  { name: "center_avg_time", importance: 0.342, category: "location" },
  { name: "nationality_avg_time", importance: 0.218, category: "demographic" },
  { name: "visa_type", importance: 0.156, category: "application" },
  { name: "income_percentile", importance: 0.089, category: "financial" },
  { name: "education_rank", importance: 0.067, category: "qualification" },
  { name: "application_month", importance: 0.045, category: "temporal" },
  { name: "is_stem_job", importance: 0.032, category: "employment" },
  { name: "year_trend", importance: 0.028, category: "temporal" },
  { name: "log_income", importance: 0.015, category: "financial" },
  { name: "is_management", importance: 0.008, category: "employment" },
]

const categoryColors: Record<string, string> = {
  location: "hsl(var(--chart-1))",
  demographic: "hsl(var(--chart-2))",
  application: "hsl(var(--chart-3))",
  financial: "hsl(var(--chart-4))",
  qualification: "hsl(var(--chart-5))",
  temporal: "hsl(var(--primary))",
  employment: "hsl(var(--accent))",
}

export function FeatureImportanceChart() {
  return (
    <Card className="glass-panel border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Feature Importance</CardTitle>
        <CardDescription className="text-muted-foreground">
          Top 10 features by importance score from Gradient Boosting model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featureData} layout="vertical" margin={{ left: 30, right: 30 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                horizontal={true}
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis 
                type="number" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={120}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, "Importance"]}
                labelFormatter={(label) => `Feature: ${label}`}
              />
              <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                {featureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border/50">
          {Object.entries(categoryColors).slice(0, 5).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground capitalize">{category}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
