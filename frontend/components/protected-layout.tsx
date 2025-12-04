"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ProtectedLayoutProps {
  children: React.ReactNode
  allowedRoles: ("client" | "admin" | "approver")[]
}

export function ProtectedLayout({ children, allowedRoles }: ProtectedLayoutProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const userType = sessionStorage.getItem("userType")

    if (!userType || !allowedRoles.includes(userType as any)) {
      router.push("/login")
      return
    }

    setIsAuthorized(true)
  }, [router, allowedRoles])

  if (!isAuthorized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <>{children}</>
}
