"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import AdminDashboard from "@/components/dashboard/admin-dashboard"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const userType = sessionStorage.getItem("userType")
    const email = sessionStorage.getItem("userEmail")

    if (userType !== "admin") {
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
      <Navigation showUserMenu userType="admin" userEmail={userEmail} />
      <div className="flex h-[calc(100vh-73px)]">
        <DashboardNav userType="admin" />
        <div className="flex-1 overflow-auto">
          <AdminDashboard />
        </div>
      </div>
    </main>
  )
}
