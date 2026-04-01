"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Generate mock residual data for visualization
const generateResidualData = () => {
  const data = []
  for (let i = 0; i < 100; i++) {
    const predicted = 30 + Math.random() * 90
    const residual = (Math.random() - 0.5) * 20 + (Math.random() > 0.9 ? (Math.random() - 0.5) * 30 : 0)
    data.push({
      predicted: Math.round(predicted),
      residual: Math.round(residual * 10) / 10,
    })
  }
  return data
}

const residualData = generateResidualData()

export function ResidualChart() {
  return (
    <Card className="glass-panel border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Residual Analysis</CardTitle>
        <CardDescription className="text-muted-foreground">
          Predicted vs Residual values - checking model assumptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))"
              />
              <XAxis 
                dataKey="predicted" 
                name="Predicted"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{ value: "Predicted (days)", position: "bottom", fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                dataKey="residual" 
                name="Residual"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{ value: "Residual", angle: -90, position: "left", fill: "hsl(var(--muted-foreground))" }}
              />
              <ReferenceLine y={0} stroke="hsl(var(--primary))" strokeDasharray="5 5" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number, name: string) => [
                  `${value} days`,
                  name === "predicted" ? "Predicted" : "Residual"
                ]}
              />
              <Scatter 
                data={residualData} 
                fill="hsl(var(--chart-1))"
                opacity={0.7}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">0.02</p>
            <p className="text-xs text-muted-foreground">Mean Residual</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">8.42</p>
            <p className="text-xs text-muted-foreground">Std Deviation</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary font-mono">Normal</p>
            <p className="text-xs text-muted-foreground">Distribution</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
