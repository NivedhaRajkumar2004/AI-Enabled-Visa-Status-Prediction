"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const modelData = [
  { name: "Gradient Boosting", r2: 98.47, rmse: 8.42, mae: 5.31, color: "hsl(var(--chart-1))" },
  { name: "Random Forest", r2: 97.23, rmse: 11.24, mae: 7.18, color: "hsl(var(--chart-2))" },
  { name: "Decision Tree", r2: 94.56, rmse: 15.82, mae: 10.45, color: "hsl(var(--chart-3))" },
  { name: "Ridge", r2: 82.34, rmse: 28.56, mae: 22.14, color: "hsl(var(--chart-4))" },
  { name: "Linear", r2: 81.56, rmse: 29.12, mae: 23.45, color: "hsl(var(--chart-5))" },
  { name: "Lasso", r2: 78.23, rmse: 31.67, mae: 25.89, color: "hsl(var(--muted-foreground))" },
]

interface ModelComparisonChartProps {
  metric: "r2" | "rmse" | "mae"
}

export function ModelComparisonChart({ metric }: ModelComparisonChartProps) {
  const getMetricLabel = () => {
    switch (metric) {
      case "r2": return { title: "R² Score (%)", description: "Higher is better" }
      case "rmse": return { title: "RMSE (Days)", description: "Lower is better" }
      case "mae": return { title: "MAE (Days)", description: "Lower is better" }
    }
  }

  const labels = getMetricLabel()

  return (
    <Card className="glass-panel border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">{labels.title}</CardTitle>
        <CardDescription className="text-muted-foreground">{labels.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modelData} layout="vertical" margin={{ left: 20, right: 20 }}>
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
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number) => [
                  metric === "r2" ? `${value.toFixed(2)}%` : `${value.toFixed(2)} days`,
                  labels.title
                ]}
              />
              <Bar dataKey={metric} radius={[0, 4, 4, 0]}>
                {modelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
