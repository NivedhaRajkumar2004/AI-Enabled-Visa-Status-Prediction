"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const nationalityData = [
  { country: "India", avgTime: 58, applications: 12500, color: "hsl(var(--chart-1))" },
  { country: "China", avgTime: 52, applications: 8200, color: "hsl(var(--chart-2))" },
  { country: "Mexico", avgTime: 45, applications: 4100, color: "hsl(var(--chart-3))" },
  { country: "Philippines", avgTime: 42, applications: 3800, color: "hsl(var(--chart-4))" },
  { country: "Brazil", avgTime: 48, applications: 2900, color: "hsl(var(--chart-5))" },
  { country: "S. Korea", avgTime: 38, applications: 2400, color: "hsl(var(--primary))" },
  { country: "Vietnam", avgTime: 44, applications: 2100, color: "hsl(var(--accent))" },
  { country: "Japan", avgTime: 35, applications: 1800, color: "hsl(var(--muted-foreground))" },
]

export function NationalityChart() {
  return (
    <Card className="glass-panel border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Processing Time by Nationality</CardTitle>
        <CardDescription className="text-muted-foreground">
          Average processing days for top applicant nationalities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nationalityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis 
                dataKey="country" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{ value: "Avg Days", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} days (${props?.payload?.applications?.toLocaleString()} applications)`,
                  "Avg Processing Time"
                ]}
              />
              <Bar dataKey="avgTime" radius={[4, 4, 0, 0]}>
                {nationalityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400 font-mono">India</p>
            <p className="text-xs text-muted-foreground">Longest Wait</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">45.3</p>
            <p className="text-xs text-muted-foreground">Global Average</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400 font-mono">Japan</p>
            <p className="text-xs text-muted-foreground">Fastest Processing</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
