import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ModelsSection } from "@/components/models-section"
import { Footer } from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ModelsSection />
      <Footer />
    </main>
  )
}
