import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-balance text-foreground leading-tight">
            The complete platform to manage insurance policies
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Digital transformation for insurers. Seamless policy issuance, instant claims processing, and complete
            transparency for your customers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8">
              Browse Policies
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Active Policies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24h</div>
            <div className="text-sm text-muted-foreground">Claims Processing</div>
          </div>
        </div>
      </div>
    </section>
  )
}
