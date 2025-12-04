"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ClaimForm() {
  const [formData, setFormData] = useState({
    policyId: "",
    claimAmount: "",
    incidentDate: "",
    description: "",
    attachments: null as FileList | null,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>File a Claim</CardTitle>
        <CardDescription>Submit a new claim on your active policy</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Select Policy</label>
              <Select
                value={formData.policyId}
                onValueChange={(value) => setFormData({ ...formData, policyId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POL001">POL001 - Health Insurance</SelectItem>
                  <SelectItem value="POL002">POL002 - Vehicle Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Claim Amount</label>
              <Input
                type="number"
                value={formData.claimAmount}
                onChange={(e) => setFormData({ ...formData, claimAmount: e.target.value })}
                placeholder="5000"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Incident Date</label>
            <Input
              type="date"
              value={formData.incidentDate}
              onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Incident Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what happened..."
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Supporting Documents</label>
            <Input
              type="file"
              multiple
              onChange={(e) => setFormData({ ...formData, attachments: e.target.files })}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">Upload photos, reports, or receipts (PDF, JPG, PNG)</p>
          </div>

          <Button type="submit" className="w-full">
            Submit Claim
          </Button>

          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
              Claim submitted successfully! Reference: CLM{Date.now().toString().slice(-6)}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
