"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const centerData = [
  { center: "California SC", speed: 85, volume: 95, efficiency: 82, accuracy: 90 },
  { center: "Nebraska SC", speed: 78, volume: 85, efficiency: 88, accuracy: 92 },
  { center: "Texas SC", speed: 92, volume: 75, efficiency: 85, accuracy: 88 },
  { center: "Vermont SC", speed: 88, volume: 65, efficiency: 90, accuracy: 94 },
  { center: "National BC", speed: 75, volume: 90, efficiency: 80, accuracy: 86 },
]

const radarData = [
  { metric: "Speed", California: 85, Nebraska: 78, Texas: 92, Vermont: 88 },
  { metric: "Volume", California: 95, Nebraska: 85, Texas: 75, Vermont: 65 },
  { metric: "Efficiency", California: 82, Nebraska: 88, Texas: 85, Vermont: 90 },
  { metric: "Accuracy", California: 90, Nebraska: 92, Texas: 88, Vermont: 94 },
]

export function CenterPerformanceChart() {
  return (
    <Card className="glass-panel border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Processing Center Performance</CardTitle>
        <CardDescription className="text-muted-foreground">
          Multi-dimensional comparison of service centers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
              />
              <Radar 
                name="California SC" 
                dataKey="California" 
                stroke="hsl(var(--chart-1))" 
                fill="hsl(var(--chart-1))" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar 
                name="Texas SC" 
                dataKey="Texas" 
                stroke="hsl(var(--chart-2))" 
                fill="hsl(var(--chart-2))" 
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar 
                name="Vermont SC" 
                dataKey="Vermont" 
                stroke="hsl(var(--chart-3))" 
                fill="hsl(var(--chart-3))" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
            <span className="text-xs text-muted-foreground">California SC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
            <span className="text-xs text-muted-foreground">Texas SC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-3))" }} />
            <span className="text-xs text-muted-foreground">Vermont SC</span>
          </div>
        </div>

        {/* Center Stats Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 text-muted-foreground font-medium">Center</th>
                <th className="text-center py-2 text-muted-foreground font-medium">Avg Days</th>
                <th className="text-center py-2 text-muted-foreground font-medium">Volume</th>
              </tr>
            </thead>
            <tbody>
              {centerData.map((center) => (
                <tr key={center.center} className="border-b border-border/30">
                  <td className="py-2 text-foreground">{center.center}</td>
                  <td className="text-center py-2 text-foreground font-mono">{Math.round(100 - center.speed + 30)}</td>
                  <td className="text-center py-2 text-muted-foreground font-mono">{center.volume}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
