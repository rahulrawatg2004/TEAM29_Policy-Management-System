"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Zap } from "lucide-react"
import { useState } from "react"

const claimsAwaitingApproval = [
  {
    id: "CLM001",
    customerName: "Rajesh Kumar",
    policyId: "POL001",
    claimAmount: "$5,000",
    status: "Under Review",
    submittedDate: "2025-02-10",
    description: "Medical emergency hospitalization",
    documents: 3,
  },
  {
    id: "CLM002",
    customerName: "Priya Sharma",
    policyId: "POL002",
    claimAmount: "$2,500",
    status: "Evidence Required",
    submittedDate: "2025-02-08",
    description: "Vehicle accident - repair costs",
    documents: 2,
  },
  {
    id: "CLM003",
    customerName: "Arjun Patel",
    policyId: "POL001",
    claimAmount: "$3,500",
    status: "Under Review",
    submittedDate: "2025-02-12",
    description: "Prescription and consultation fees",
    documents: 4,
  },
]

const approvedClaimsThisWeek = [
  {
    id: "CLM004",
    customerName: "Sunita Verma",
    policyId: "POL003",
    claimAmount: "$10,000",
    status: "Approved",
    submittedDate: "2025-02-15",
    description: "Home renovation costs",
    documents: 5,
  },
  // ... other approved claims ...
]

const rejectedClaims = [
  {
    id: "CLM005",
    customerName: "Vikram Singh",
    policyId: "POL004",
    claimAmount: "$7,000",
    status: "Rejected",
    submittedDate: "2025-02-14",
    description: "Expired policy",
    documents: 3,
  },
  // ... other rejected claims ...
]

export default function ApprovalDashboard() {
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Claim Approval Dashboard</h1>
        <p className="text-muted-foreground">Review and approve pending claims</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-primary">8</div>
              <AlertCircle className="text-yellow-500" size={32} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting adjuster review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Approved (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-primary">12</div>
              <CheckCircle2 className="text-green-500" size={32} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total approved claims</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-primary">$45K</div>
              <Zap className="text-blue-500" size={32} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Approved this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="pending">Pending (8)</TabsTrigger>
          <TabsTrigger value="approved">Approved (12)</TabsTrigger>
          <TabsTrigger value="rejected">Rejected (3)</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {claimsAwaitingApproval.map((claim) => (
              <Card
                key={claim.id}
                className="hover:border-primary/50 transition cursor-pointer"
                onClick={() => setSelectedClaim(claim.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{claim.customerName}</CardTitle>
                      <CardDescription className="mt-1">{claim.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{claim.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Claim ID</p>
                      <p className="font-semibold">{claim.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Policy</p>
                      <p className="font-semibold">{claim.policyId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold text-lg">{claim.claimAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-semibold">{claim.submittedDate}</p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        View Files
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                        Reject
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4">
            {approvedClaimsThisWeek.map((claim) => (
              <Card
                key={claim.id}
                className="hover:border-green-50/50 transition cursor-pointer"
                onClick={() => setSelectedClaim(claim.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{claim.customerName}</CardTitle>
                      <CardDescription className="mt-1">{claim.description}</CardDescription>
                    </div>
                    <Badge variant="success">{claim.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Claim ID</p>
                      <p className="font-semibold">{claim.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Policy</p>
                      <p className="font-semibold">{claim.policyId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold text-lg">{claim.claimAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-semibold">{claim.submittedDate}</p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        View Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="grid gap-4">
            {rejectedClaims.map((claim) => (
              <Card
                key={claim.id}
                className="hover:border-red-50/50 transition cursor-pointer"
                onClick={() => setSelectedClaim(claim.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{claim.customerName}</CardTitle>
                      <CardDescription className="mt-1">{claim.description}</CardDescription>
                    </div>
                    <Badge variant="destructive">{claim.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Claim ID</p>
                      <p className="font-semibold">{claim.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Policy</p>
                      <p className="font-semibold">{claim.policyId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold text-lg">{claim.claimAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-semibold">{claim.submittedDate}</p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        View Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
