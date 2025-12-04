"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOut, LayoutDashboard, Shield, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface DashboardNavProps {
  userType: "client" | "admin" | "approver"
}

export default function DashboardNav({ userType }: DashboardNavProps) {
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem("userType")
    sessionStorage.removeItem("userEmail")
    router.push("/")
  }

  return (
    <aside className="w-64 border-r border-border bg-card p-6">
      <div className="space-y-8">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
              S
            </div>
            SecurePolicy
          </Link>
        </div>

        <nav className="space-y-2">
          {userType === "client" && (
            <Link href="/dashboard">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition bg-primary text-primary-foreground">
                <LayoutDashboard size={20} />
                <span>My Policies</span>
              </button>
            </Link>
          )}

          {userType === "admin" && (
            <Link href="/admin-dashboard">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition bg-primary text-primary-foreground">
                <Shield size={20} />
                <span>Dashboard</span>
              </button>
            </Link>
          )}

          {userType === "approver" && (
            <Link href="/approval-dashboard">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition bg-primary text-primary-foreground">
                <CheckCircle2 size={20} />
                <span>Claims Review</span>
              </button>
            </Link>
          )}
        </nav>

        <div className="pt-8 border-t border-border">
          <Button onClick={handleLogout} variant="outline" className="w-full flex gap-2 bg-transparent">
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}
