"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Brain, Calendar, DollarSign, Briefcase, GraduationCap, Globe, MapPin } from "lucide-react"

// Options based on the feature engineering from the ML pipeline
const visaTypes = [
  "H-1B", "L-1", "O-1", "EB-1", "EB-2", "EB-3", "F-1", "J-1", "B-1/B-2", "K-1"
]

const educationLevels = [
  "High School", "Bachelor", "Master's", "Doctorate", "Professional", "Other"
]

const nationalities = [
  "India", "China", "Mexico", "Philippines", "Vietnam", "Brazil", 
  "South Korea", "Japan", "Canada", "United Kingdom", "Germany", "Other"
]

const processingCenters = [
  "California Service Center", "Nebraska Service Center", "Texas Service Center",
  "Vermont Service Center", "National Benefits Center", "Other"
]

const jobCategories = [
  "Software Engineer", "Data Scientist", "Manager", "Analyst", "Doctor",
  "Researcher", "Teacher", "Marketing", "Finance", "Other"
]

interface FormData {
  visaType: string
  nationality: string
  processingCenter: string
  educationLevel: string
  jobCategory: string
  annualIncome: string
  applicationMonth: string
}

export function PredictionForm({ onPredict }: { onPredict: (result: PredictionResult) => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    visaType: "",
    nationality: "",
    processingCenter: "",
    educationLevel: "",
    jobCategory: "",
    annualIncome: "",
    applicationMonth: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate AI prediction (in real app, this would call your Python backend)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate mock prediction based on inputs
    const baseTime = 45 // Base processing time in days
    const varianceFactors = {
      income: parseInt(formData.annualIncome) > 100000 ? -5 : 5,
      education: formData.educationLevel === "Doctorate" || formData.educationLevel === "Master's" ? -3 : 2,
      visaType: formData.visaType === "H-1B" ? 10 : formData.visaType === "O-1" ? -5 : 0,
      season: parseInt(formData.applicationMonth) >= 3 && parseInt(formData.applicationMonth) <= 6 ? 15 : 0
    }

    const predictedDays = baseTime + 
      varianceFactors.income + 
      varianceFactors.education + 
      varianceFactors.visaType + 
      varianceFactors.season + 
      Math.floor(Math.random() * 10)

    const confidenceInterval = {
      lower: Math.max(predictedDays - 12, 15),
      upper: predictedDays + 15
    }

    const result: PredictionResult = {
      predictedDays,
      confidenceInterval,
      confidence: 0.9847,
      modelUsed: "Gradient Boosting",
      factors: [
        { name: "Visa Type", impact: varianceFactors.visaType > 0 ? "high" : "low", value: formData.visaType },
        { name: "Processing Center", impact: "medium", value: formData.processingCenter },
        { name: "Season", impact: varianceFactors.season > 0 ? "high" : "low", value: `Month ${formData.applicationMonth}` },
        { name: "Education", impact: varianceFactors.education < 0 ? "positive" : "neutral", value: formData.educationLevel }
      ]
    }

    setIsLoading(false)
    onPredict(result)
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = Object.values(formData).every(v => v !== "")

  return (
    <Card className="glass-panel border-border/50 overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-secondary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl text-foreground">Application Details</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your visa application information for prediction
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Visa Type & Nationality Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Globe className="h-4 w-4 text-primary" />
                Visa Type
              </Label>
              <Select value={formData.visaType} onValueChange={(v) => updateField("visaType", v)}>
                <SelectTrigger className="bg-input border-border/50 focus:border-primary/50">
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  {visaTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Nationality
              </Label>
              <Select value={formData.nationality} onValueChange={(v) => updateField("nationality", v)}>
                <SelectTrigger className="bg-input border-border/50 focus:border-primary/50">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  {nationalities.map(nat => (
                    <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Processing Center & Education Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Processing Center
              </Label>
              <Select value={formData.processingCenter} onValueChange={(v) => updateField("processingCenter", v)}>
                <SelectTrigger className="bg-input border-border/50 focus:border-primary/50">
                  <SelectValue placeholder="Select center" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  {processingCenters.map(center => (
                    <SelectItem key={center} value={center}>{center}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                Education Level
              </Label>
              <Select value={formData.educationLevel} onValueChange={(v) => updateField("educationLevel", v)}>
                <SelectTrigger className="bg-input border-border/50 focus:border-primary/50">
                  <SelectValue placeholder="Select education" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  {educationLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job & Income Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Briefcase className="h-4 w-4 text-primary" />
                Job Category
              </Label>
              <Select value={formData.jobCategory} onValueChange={(v) => updateField("jobCategory", v)}>
                <SelectTrigger className="bg-input border-border/50 focus:border-primary/50">
                  <SelectValue placeholder="Select job" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  {jobCategories.map(job => (
                    <SelectItem key={job} value={job}>{job}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <DollarSign className="h-4 w-4 text-primary" />
                Annual Income (USD)
              </Label>
              <Input
                type="number"
                placeholder="e.g., 85000"
                value={formData.annualIncome}
                onChange={(e) => updateField("annualIncome", e.target.value)}
                className="bg-input border-border/50 focus:border-primary/50"
              />
            </div>
          </div>

          {/* Application Month */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              Application Month (1-12)
            </Label>
            <Select value={formData.applicationMonth} onValueChange={(v) => updateField("applicationMonth", v)}>
              <SelectTrigger className="bg-input border-border/50 focus:border-primary/50">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border/50">
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {new Date(2024, i, 1).toLocaleString("default", { month: "long" })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-6 text-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Running AI Prediction...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-5 w-5" />
                Predict Processing Time
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export interface PredictionResult {
  predictedDays: number
  confidenceInterval: {
    lower: number
    upper: number
  }
  confidence: number
  modelUsed: string
  factors: {
    name: string
    impact: string
    value: string
  }[]
}
