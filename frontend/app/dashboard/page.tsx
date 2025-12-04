"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import ClientDashboard from "@/components/dashboard/client-dashboard"

export default function ClientDashboardPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const userType = sessionStorage.getItem("userType")
    const email = sessionStorage.getItem("userEmail")

    if (userType !== "client") {
      router.push("/login")
      return
    }

    setUserEmail(email || "")
    setIsAuthorized(true)
  }, [router])

  if (!isAuthorized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation showUserMenu userType="client" userEmail={userEmail} />
      <div className="flex h-[calc(100vh-73px)]">
        <DashboardNav userType="client" />
        <div className="flex-1 overflow-auto">
          <ClientDashboard />
        </div>
      </div>
    </main>
  )
}
