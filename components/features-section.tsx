"use client"

import { 
  Brain, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  TrendingUp,
  Database,
  Cpu
} from "lucide-react"
import { TiltCard } from "@/components/tilt-card"

const features = [
  {
    icon: Brain,
    title: "6 ML Models",
    description: "Linear, Ridge, Lasso, Decision Tree, Random Forest & Gradient Boosting algorithms work together.",
    gradient: "from-primary to-cyan-400"
  },
  {
    icon: BarChart3,
    title: "Confidence Intervals",
    description: "Get prediction ranges with statistical confidence, not just single estimates.",
    gradient: "from-accent to-emerald-400"
  },
  {
    icon: Shield,
    title: "Data Leakage Prevention",
    description: "Advanced preprocessing ensures predictions are based only on available information.",
    gradient: "from-violet-500 to-purple-400"
  },
  {
    icon: Zap,
    title: "Real-time Predictions",
    description: "Instant processing time estimates as you input your application details.",
    gradient: "from-amber-500 to-orange-400"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Support for multiple nationalities, visa types, and processing centers worldwide.",
    gradient: "from-blue-500 to-indigo-400"
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Visualize seasonal patterns and historical processing time distributions.",
    gradient: "from-rose-500 to-pink-400"
  },
  {
    icon: Database,
    title: "Feature Engineering",
    description: "25+ engineered features including income percentiles, education ranking, and job analysis.",
    gradient: "from-primary to-teal-400"
  },
  {
    icon: Cpu,
    title: "Hyperparameter Tuning",
    description: "Models optimized through RandomizedSearchCV for maximum accuracy.",
    gradient: "from-accent to-green-400"
  }
]

export function FeaturesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Powered by Advanced ML
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Built for Accuracy & Transparency
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
            Our prediction engine combines multiple machine learning algorithms with 
            comprehensive feature engineering to deliver reliable estimates.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <TiltCard
              key={feature.title}
              tiltAmount={6}
              className="h-full"
            >
              <div
                className="group relative h-full"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl blur transition-opacity duration-500" 
                     style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--accent))` }} />
                
                {/* Card */}
                <div className="relative glass-panel rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
