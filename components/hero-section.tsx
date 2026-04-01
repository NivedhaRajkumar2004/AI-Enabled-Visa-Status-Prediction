"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Shield, Clock, Zap } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"
import { TypingText } from "@/components/typing-text"
import { TiltCard } from "@/components/tilt-card"
import { NeuralNetwork } from "@/components/neural-network"

const stats = [
  { value: 98.5, label: "Accuracy Rate", suffix: "%", icon: Brain },
  { value: 50000, label: "Predictions Made", suffix: "+", icon: Zap },
  { value: 6, label: "ML Models", suffix: "", icon: Shield },
  { value: 45, label: "Avg Response", suffix: "ms", icon: Clock },
]

const typingTexts = [
  "Visa Processing Time",
  "Application Timeline",
  "Wait Period Estimate",
  "Approval Duration"
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      
      {/* Neural Network Animation - Right Side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 hidden lg:block">
        <NeuralNetwork width={500} height={400} />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-8 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">AI-Powered Predictions</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
            <span className="block text-foreground">Predict Your</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent min-h-[1.2em]">
              <TypingText texts={typingTexts} typingSpeed={80} deletingSpeed={40} pauseDuration={2500} />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 text-pretty leading-relaxed">
            Get data-driven estimates powered by 6 advanced machine learning models. 
            Know your timeline with confidence intervals and real-time analytics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              asChild 
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-6 text-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              <Link href="/predict">
                <span className="relative z-10 flex items-center">
                  Start Prediction
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="group px-8 py-6 text-lg font-semibold border-border/50 hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <Link href="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>

          {/* Stats Grid with Tilt Effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <TiltCard
                key={stat.label}
                tiltAmount={8}
                className="h-full"
              >
                <div 
                  className="relative group h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative glass-panel rounded-2xl p-6 h-full hover:border-primary/30 transition-colors duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
