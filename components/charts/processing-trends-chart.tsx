"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Monthly processing time trends
const monthlyData = [
  { month: "Jan", avgTime: 42, minTime: 28, maxTime: 58 },
  { month: "Feb", avgTime: 45, minTime: 30, maxTime: 62 },
  { month: "Mar", avgTime: 52, minTime: 35, maxTime: 72 },
  { month: "Apr", avgTime: 58, minTime: 42, maxTime: 78 },
  { month: "May", avgTime: 55, minTime: 38, maxTime: 75 },
  { month: "Jun", avgTime: 48, minTime: 32, maxTime: 65 },
  { month: "Jul", avgTime: 44, minTime: 28, maxTime: 60 },
  { month: "Aug", avgTime: 46, minTime: 30, maxTime: 64 },
  { month: "Sep", avgTime: 50, minTime: 34, maxTime: 68 },
  { month: "Oct", avgTime: 47, minTime: 31, maxTime: 65 },
  { month: "Nov", avgTime: 43, minTime: 28, maxTime: 60 },
  { month: "Dec", avgTime: 40, minTime: 25, maxTime: 55 },
]

export function ProcessingTrendsChart() {
  return (
    <Card className="glass-panel border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Monthly Processing Trends</CardTitle>
        <CardDescription className="text-muted-foreground">
          Average, minimum, and maximum processing times by month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="rangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{ value: "Days", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number, name: string) => [
                  `${value} days`,
                  name === "avgTime" ? "Average" : name === "minTime" ? "Minimum" : "Maximum"
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="maxTime" 
                stroke="transparent"
                fill="url(#rangeGradient)"
              />
              <Line 
                type="monotone" 
                dataKey="maxTime" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={1}
                strokeDasharray="4 4"
                dot={false}
                name="Maximum"
              />
              <Line 
                type="monotone" 
                dataKey="avgTime" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--background))", strokeWidth: 2 }}
                name="Average"
              />
              <Line 
                type="monotone" 
                dataKey="minTime" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={1}
                strokeDasharray="4 4"
                dot={false}
                name="Minimum"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Insights */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary font-mono">Apr</p>
            <p className="text-xs text-muted-foreground">Peak Season</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">47.5</p>
            <p className="text-xs text-muted-foreground">Yearly Average</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent font-mono">Dec</p>
            <p className="text-xs text-muted-foreground">Fastest Month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
