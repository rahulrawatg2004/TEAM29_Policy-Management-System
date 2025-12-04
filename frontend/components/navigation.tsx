"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, User } from "lucide-react"
import { RoleBadge } from "@/components/role-badge"

interface NavigationProps {
  showUserMenu?: boolean
  userType?: "client" | "admin" | "approver"
  userEmail?: string
}

export default function Navigation({ showUserMenu = false, userType, userEmail }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem("userType")
    sessionStorage.removeItem("userEmail")
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={showUserMenu ? "#" : "/"} className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
            S
          </div>
          SecurePolicy
        </Link>

        {!showUserMenu && (
          <>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-foreground hover:text-primary transition">
                Features
              </Link>
              <Link href="#about" className="text-foreground hover:text-primary transition">
                About
              </Link>
              <Link href="#contact" className="text-foreground hover:text-primary transition">
                Contact
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </>
        )}

        {showUserMenu && userType && (
          <div className="hidden md:flex items-center gap-4">
            <RoleBadge role={userType} size="sm" />
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition"
              >
                <User size={18} />
                <span className="text-sm truncate max-w-[150px]">{userEmail}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg p-2 space-y-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition text-red-600"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && !showUserMenu && (
        <div className="md:hidden border-t border-border p-4 space-y-3">
          <Link href="#features" className="block py-2 text-foreground hover:text-primary">
            Features
          </Link>
          <Link href="#about" className="block py-2 text-foreground hover:text-primary">
            About
          </Link>
          <Link href="#contact" className="block py-2 text-foreground hover:text-primary">
            Contact
          </Link>
          <div className="flex gap-2 pt-2">
            <Link href="/login" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Login
              </Button>
            </Link>
            <Link href="/login" className="flex-1">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}

      {isOpen && showUserMenu && userType && (
        <div className="md:hidden border-t border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <RoleBadge role={userType} size="sm" />
            <span className="text-sm text-muted-foreground truncate">{userEmail}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition text-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
