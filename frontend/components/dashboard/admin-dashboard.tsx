"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const applicationsData = [
  {
    id: "APP001",
    customerName: "Rajesh Kumar",
    policyType: "Health Insurance",
    premium: "$150/month",
    status: "Pending",
    appliedDate: "2025-02-20",
  },
  {
    id: "APP002",
    customerName: "Priya Sharma",
    policyType: "Vehicle Insurance",
    premium: "$75/month",
    status: "Approved",
    appliedDate: "2025-02-18",
  },
  {
    id: "APP003",
    customerName: "Arjun Patel",
    policyType: "Life Insurance",
    premium: "$200/month",
    status: "Under Review",
    appliedDate: "2025-02-19",
  },
]

const analyticsData = [
  { month: "Jan", policies: 450, premiums: 67500, claims: 12 },
  { month: "Feb", policies: 520, premiums: 78000, claims: 15 },
  { month: "Mar", policies: 680, premiums: 102000, claims: 18 },
  { month: "Apr", policies: 750, premiums: 112500, claims: 22 },
  { month: "May", policies: 890, premiums: 133500, claims: 25 },
  { month: "Jun", policies: 1050, premiums: 157500, claims: 28 },
]

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage policies, review applications, and monitor performance</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">1,050</div>
            <p className="text-xs text-muted-foreground mt-1">+15% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Premiums</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">$157.5K</div>
            <p className="text-xs text-muted-foreground mt-1">Monthly revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">8</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Claim Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">2.3%</div>
            <p className="text-xs text-muted-foreground mt-1">Of total premiums</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Policy Growth Trends</CardTitle>
              <CardDescription>6-month performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="policies"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    name="Active Policies"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Monthly premium collection</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Bar dataKey="premiums" fill="var(--color-accent)" name="Premiums ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Policy Applications</h2>
            <Button>Export Report</Button>
          </div>

          <div className="space-y-4">
            {applicationsData.map((app) => (
              <Card key={app.id} className="hover:border-primary/50 transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{app.customerName}</CardTitle>
                      <CardDescription>
                        {app.policyType} - App ID: {app.id}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        app.status === "Approved" ? "default" : app.status === "Pending" ? "secondary" : "outline"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Premium</p>
                      <p className="font-semibold">{app.premium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Applied Date</p>
                      <p className="font-semibold">{app.appliedDate}</p>
                    </div>
                    <div className="flex gap-2 col-span-2 justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {app.status === "Pending" && (
                        <>
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                            Reject
                          </Button>
                          <Button size="sm">Approve</Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Insurance Products</h2>
            <Button>Add Product</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {["Health Insurance", "Vehicle Insurance", "Life Insurance"].map((product, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{product}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Base Premium</p>
                    <p className="text-2xl font-bold text-primary">${[150, 75, 200][i]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Policies</p>
                    <p className="text-2xl font-bold text-primary">{[350, 450, 250][i]}</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Edit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
