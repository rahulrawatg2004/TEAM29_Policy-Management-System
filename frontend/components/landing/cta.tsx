import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground text-balance">
            Ready to transform your insurance business?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto text-balance">
            Join leading insurers worldwide who are modernizing with SecurePolicy
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button
              size="lg"
              className="text-lg px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Start Free Trial
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Schedule Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
