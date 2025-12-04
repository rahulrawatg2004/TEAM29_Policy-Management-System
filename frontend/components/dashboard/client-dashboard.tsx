"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { useState } from "react"
import PremiumCalculator from "./premium-calculator"
import ClaimForm from "./claim-form"
import { useEffect } from "react"

const policiesData = [
  {
    id: "POL001",
    type: "Health Insurance",
    premium: "$150/month",
    status: "Active",
    coverageAmount: "$500,000",
    renewalDate: "2025-12-31",
  },
  {
    id: "POL002",
    type: "Vehicle Insurance",
    premium: "$75/month",
    status: "Active",
    coverageAmount: "$100,000",
    renewalDate: "2025-09-15",
  },
  {
    id: "POL003",
    type: "Life Insurance",
    premium: "$200/month",
    status: "Pending Approval",
    coverageAmount: "$1,000,000",
    renewalDate: "N/A",
  },
]

const claimsData = [
  {
    id: "CLM001",
    policyId: "POL001",
    status: "Approved",
    amount: "$5,000",
    filedDate: "2025-01-10",
    approvedDate: "2025-01-15",
  },
  {
    id: "CLM002",
    policyId: "POL002",
    status: "Under Review",
    amount: "$2,500",
    filedDate: "2025-02-01",
    approvedDate: null,
  },
  {
    id: "CLM003",
    policyId: "POL001",
    status: "Submitted",
    amount: "$3,000",
    filedDate: "2025-02-15",
    approvedDate: null,
  },
]

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("policies")
  const [showCalculator, setShowCalculator] = useState(false)
  const [showClaimForm, setShowClaimForm] = useState(false)
  const [userName, setUserName] = useState("Client")

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail")
    if (email) {
      setUserName(email.split("@")[0])
    }
  }, [])

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome, {userName}</h1>
        <p className="text-muted-foreground">Manage your policies and claims all in one place</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">2</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 3 total policies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">$1.6M</div>
            <p className="text-xs text-muted-foreground mt-1">Across all policies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Monthly Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">$425</div>
            <p className="text-xs text-muted-foreground mt-1">Next payment due</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Policies</h2>
            <Button>
              <Plus size={20} />
              Buy New Policy
            </Button>
          </div>

          <div className="space-y-4">
            {policiesData.map((policy) => (
              <Card key={policy.id} className="hover:border-primary/50 transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{policy.type}</CardTitle>
                      <CardDescription>Policy ID: {policy.id}</CardDescription>
                    </div>
                    <Badge variant={policy.status === "Active" ? "default" : "secondary"}>{policy.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Premium</p>
                      <p className="font-semibold">{policy.premium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Coverage Amount</p>
                      <p className="font-semibold">{policy.coverageAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Renewal Date</p>
                      <p className="font-semibold">{policy.renewalDate}</p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        View PDF
                      </Button>
                      {policy.status === "Active" && (
                        <Button size="sm" onClick={() => setShowClaimForm(true)}>
                          File Claim
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Claim History</h2>

          <div className="space-y-4">
            {claimsData.map((claim) => (
              <Card key={claim.id} className="hover:border-primary/50 transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Claim #{claim.id}</CardTitle>
                      <CardDescription>Policy: {claim.policyId}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        claim.status === "Approved"
                          ? "default"
                          : claim.status === "Under Review"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {claim.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Claim Amount</p>
                      <p className="font-semibold text-lg">{claim.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Filed Date</p>
                      <p className="font-semibold">{claim.filedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Approval Date</p>
                      <p className="font-semibold">{claim.approvedDate || "Pending"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="cursor-pointer hover:border-primary/50 transition"
              onClick={() => setShowCalculator(!showCalculator)}
            >
              <CardHeader>
                <CardTitle>Premium Calculator</CardTitle>
                <CardDescription>Calculate premium for a new policy</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="cursor-pointer hover:border-primary/50 transition"
              onClick={() => setShowClaimForm(!showClaimForm)}
            >
              <CardHeader>
                <CardTitle>File a Claim</CardTitle>
                <CardDescription>Start a new claim on an active policy</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {showCalculator && <PremiumCalculator />}
          {showClaimForm && <ClaimForm />}
        </TabsContent>
      </Tabs>
    </div>
  )
}
