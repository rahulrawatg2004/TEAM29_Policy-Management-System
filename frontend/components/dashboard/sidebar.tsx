"use client"

import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, Shield, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface SidebarProps {
  dashboardType: string
  setDashboardType: (type: any) => void
}

export default function Sidebar({ dashboardType, setDashboardType }: SidebarProps) {
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
          <button
            onClick={() => setDashboardType("client")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              dashboardType === "client" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Client Dashboard</span>
          </button>

          <button
            onClick={() => setDashboardType("admin")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              dashboardType === "admin" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
            }`}
          >
            <Shield size={20} />
            <span>Admin Dashboard</span>
          </button>

          <button
            onClick={() => setDashboardType("approval")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              dashboardType === "approval" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
            }`}
          >
            <CheckCircle2 size={20} />
            <span>Approval Dashboard</span>
          </button>
        </nav>

        <div className="pt-8 border-t border-border">
          <Link href="/">
            <Button variant="outline" className="w-full flex gap-2 bg-transparent">
              <LogOut size={20} />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  )
}
