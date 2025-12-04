"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function PremiumCalculator() {
  const [insuranceType, setInsuranceType] = useState("")
  const [age, setAge] = useState("")
  const [coverage, setCoverage] = useState("")
  const [premium, setPremium] = useState<number | null>(null)

  const calculatePremium = () => {
    if (!insuranceType || !age || !coverage) return

    let basePremium = 100

    if (insuranceType === "health") basePremium = 150
    if (insuranceType === "vehicle") basePremium = 75
    if (insuranceType === "life") basePremium = 200

    const ageMultiplier = Math.max(1, (Number.parseInt(age) - 18) / 20)
    const coverageMultiplier = Number.parseInt(coverage) / 100000

    const calculatedPremium = Math.round(basePremium * ageMultiplier * coverageMultiplier)
    setPremium(calculatedPremium)
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Premium Calculator</CardTitle>
        <CardDescription>Estimate your policy premium</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Insurance Type</label>
            <Select value={insuranceType} onValueChange={setInsuranceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">Health Insurance</SelectItem>
                <SelectItem value="vehicle">Vehicle Insurance</SelectItem>
                <SelectItem value="life">Life Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Your Age</label>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" />
          </div>
          <div>
            <label className="text-sm font-medium">Coverage Amount</label>
            <Input type="number" value={coverage} onChange={(e) => setCoverage(e.target.value)} placeholder="500000" />
          </div>
        </div>

        <Button onClick={calculatePremium} className="w-full">
          Calculate Premium
        </Button>

        {premium !== null && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
            <p className="text-muted-foreground mb-2">Estimated Monthly Premium</p>
            <p className="text-4xl font-bold text-primary">${premium}</p>
            <p className="text-sm text-muted-foreground mt-2">Annual: ${premium * 12}</p>
            <Button className="mt-4">Buy This Policy</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
