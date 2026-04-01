"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const visaTypeData = [
  { name: "H-1B", value: 35, avgTime: 52, color: "hsl(var(--chart-1))" },
  { name: "L-1", value: 18, avgTime: 45, color: "hsl(var(--chart-2))" },
  { name: "O-1", value: 8, avgTime: 38, color: "hsl(var(--chart-3))" },
  { name: "EB-2", value: 15, avgTime: 62, color: "hsl(var(--chart-4))" },
  { name: "EB-3", value: 12, avgTime: 58, color: "hsl(var(--chart-5))" },
  { name: "Other", value: 12, avgTime: 48, color: "hsl(var(--muted-foreground))" },
]

export function VisaTypeChart() {
  return (
    <Card className="glass-panel border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Applications by Visa Type</CardTitle>
        <CardDescription className="text-muted-foreground">
          Distribution and average processing time by visa category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={visaTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                stroke="hsl(var(--background))"
                strokeWidth={2}
              >
                {visaTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% of applications (Avg: ${props?.payload?.avgTime} days)`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend with details */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/50">
          {visaTypeData.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">{item.avgTime}d avg</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
