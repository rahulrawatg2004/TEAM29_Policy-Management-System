import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Chief Operations Officer",
    company: "SafeGuard Insurance",
    content:
      "SecurePolicy cut our policy issuance time by 90%. The automation alone paid for itself in the first month.",
  },
  {
    name: "Priya Sharma",
    role: "Customer Service Manager",
    company: "Trust Insurance Co.",
    content: "Our customers love the transparency. Claims tracking has transformed how we interact with policyholders.",
  },
  {
    name: "Arjun Patel",
    role: "IT Director",
    company: "Secure Coverage Inc.",
    content:
      "The security infrastructure is enterprise-grade. Compliance audits are now straightforward with complete audit trails.",
  },
]

export default function Testimonials() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Trusted by Industry Leaders</h2>
          <p className="text-xl text-muted-foreground">See how leading insurers are transforming with SecurePolicy</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6 italic">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
