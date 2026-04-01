import Link from "next/link"
import { Plane, Github, Mail, ExternalLink } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Predict Time", href: "/predict" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics", href: "/analytics" },
  ],
  models: [
    { label: "Gradient Boosting", href: "#" },
    { label: "Random Forest", href: "#" },
    { label: "Linear Regression", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "GitHub", href: "#", icon: Github },
  ]
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 glass-panel">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Plane className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-foreground">Visa</span>
                <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              AI-powered visa processing time predictions with confidence intervals and real-time analytics.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Models Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              ML Models
            </h3>
            <ul className="space-y-3">
              {footerLinks.models.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                    {link.icon && <ExternalLink className="h-3 w-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              2026 VisaAI. Built for academic purposes.
            </p>
            <p className="text-sm text-muted-foreground">
              Milestone 4: Web Application Development
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
