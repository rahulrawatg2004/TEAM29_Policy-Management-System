import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, BarChart3, FileCheck, Clock, Lock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Smart Risk Assessment",
    description: "Dynamic premium engine calculates fair prices based on individual risk profiles and coverage needs.",
  },
  {
    icon: Zap,
    title: "Instant Policy Generation",
    description: "Auto-generate official PDF certificates with unique policy numbers and QR codes in seconds.",
  },
  {
    icon: Clock,
    title: "Quick Claims Processing",
    description: "State-machine claims workflow ensures transparent, fast verification and settlement.",
  },
  {
    icon: BarChart3,
    title: "Admin Analytics",
    description: "Monitor premiums, active policies, claim ratios, and key performance metrics in real-time.",
  },
  {
    icon: FileCheck,
    title: "KYC Verification",
    description: "Secure document upload and storage with comprehensive identity proof verification.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Encrypted data protection, secure payments, audit trails, and full compliance standards.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for insurers who demand efficiency and customers who expect transparency
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border border-border hover:border-primary/50 transition">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
