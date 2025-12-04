"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, UserCheck, AlertCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock credentials for admin and approver (pre-defined)
const ADMIN_CREDENTIALS = {
  email: "admin@securepolicy.com",
  password: "admin123",
}

const APPROVER_CREDENTIALS = {
  email: "approver@securepolicy.com",
  password: "approver123",
}

export default function LoginPage() {
  const [userType, setUserType] = useState<"client" | "admin" | "approver" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!userType) return

    // Validate credentials for admin and approver
    if (userType === "admin") {
      if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
        setError("Invalid admin credentials. Use admin@securepolicy.com / admin123")
        return
      }
    } else if (userType === "approver") {
      if (email !== APPROVER_CREDENTIALS.email || password !== APPROVER_CREDENTIALS.password) {
        setError("Invalid approver credentials. Use approver@securepolicy.com / approver123")
        return
      }
    }

    // Store session
    sessionStorage.setItem("userType", userType)
    sessionStorage.setItem("userEmail", email)

    const redirectMap = {
      client: "/dashboard",
      admin: "/admin-dashboard",
      approver: "/approval-dashboard",
    }
    router.push(redirectMap[userType])
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Store client session (in real app, this would call backend)
    sessionStorage.setItem("userType", "client")
    sessionStorage.setItem("userEmail", email)
    sessionStorage.setItem("userName", fullName)

    router.push("/dashboard")
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-2xl text-primary justify-center hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                S
              </div>
              SecurePolicy
            </Link>
            <p className="text-lg text-slate-600 font-medium">Choose your account type</p>
            <p className="text-sm text-slate-500">Select how you'd like to access the platform</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Client Card */}
            <Card
              className="cursor-pointer border-2 border-slate-200 hover:border-primary hover:shadow-xl transition-all duration-300 group"
              onClick={() => {
                setUserType("client")
                setIsSignUp(false)
              }}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-xl">Client</CardTitle>
                <CardDescription className="text-sm">Access your policies and claims</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Continue as Client</Button>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card
              className="cursor-pointer border-2 border-slate-200 hover:border-primary hover:shadow-xl transition-all duration-300 group"
              onClick={() => {
                setUserType("admin")
                setIsSignUp(false)
              }}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-xl">Admin</CardTitle>
                <CardDescription className="text-sm">Manage products and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-slate-600 font-medium">Pre-defined credentials</p>
                <Button variant="outline" className="w-full border-slate-300 hover:bg-slate-50 bg-transparent">
                  Continue as Admin
                </Button>
              </CardContent>
            </Card>

            {/* Approver Card */}
            <Card
              className="cursor-pointer border-2 border-slate-200 hover:border-primary hover:shadow-xl transition-all duration-300 group"
              onClick={() => {
                setUserType("approver")
                setIsSignUp(false)
              }}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                    <UserCheck className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-xl">Claims Approver</CardTitle>
                <CardDescription className="text-sm">Review and approve claims</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-slate-600 font-medium">Pre-defined credentials</p>
                <Button variant="outline" className="w-full border-slate-300 hover:bg-slate-50 bg-transparent">
                  Continue as Approver
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-slate-500">
              <Link href="/" className="text-primary hover:underline font-medium">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const userTypeConfig = {
    client: {
      title: "Client Account",
      description: "Access your policies and manage claims",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    admin: {
      title: "Admin Account",
      description: "Manage products, policies, and applications",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
    approver: {
      title: "Claims Approver Account",
      description: "Review and process claim applications",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
  }

  const config = userTypeConfig[userType]
  const IconComponent = config.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <button
          onClick={() => {
            setUserType(null)
            setEmail("")
            setPassword("")
            setFullName("")
            setConfirmPassword("")
            setError("")
            setIsSignUp(false)
          }}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className={`text-center space-y-4 p-6 rounded-2xl ${config.bgColor}`}>
          <div className="flex justify-center">
            <div className={`p-4 ${config.iconBg} rounded-xl`}>
              <IconComponent className={`w-8 h-8 ${config.color}`} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{config.title}</h1>
            <p className="text-slate-600 text-sm">{config.description}</p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Welcome back</CardTitle>
            <CardDescription>
              {userType === "client"
                ? isSignUp
                  ? "Create your account to get started"
                  : "Sign in to your account"
                : "Sign in with your pre-defined credentials"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {userType === "client" && (
              <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-lg w-full">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all ${
                    !isSignUp ? "bg-white text-slate-900 shadow-md" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all ${
                    isSignUp ? "bg-white text-slate-900 shadow-md" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}

            <form onSubmit={isSignUp ? handleSignup : handleLogin} className="space-y-4">
              {isSignUp && userType === "client" && (
                <div>
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-2 border-slate-200"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={userType === "client" ? "john@example.com" : ADMIN_CREDENTIALS.email}
                  className="mt-2 border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-2 border-slate-200"
                  required
                />
              </div>

              {isSignUp && userType === "client" && (
                <div>
                  <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-2 border-slate-200"
                    required
                  />
                </div>
              )}

              {userType !== "client" && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="font-semibold text-sm text-slate-900 mb-2">Demo Credentials:</p>
                  <div className="space-y-1 text-xs text-slate-600 font-mono bg-white p-2 rounded border border-slate-200">
                    <p>
                      <span className="text-slate-900">Email:</span>{" "}
                      {userType === "admin" ? ADMIN_CREDENTIALS.email : APPROVER_CREDENTIALS.email}
                    </p>
                    <p>
                      <span className="text-slate-900">Password:</span>{" "}
                      {userType === "admin" ? ADMIN_CREDENTIALS.password : APPROVER_CREDENTIALS.password}
                    </p>
                  </div>
                </div>
              )}

              {userType === "client" && !isSignUp && (
                <Link href="#" className="text-sm text-primary hover:underline block text-right font-medium">
                  Forgot password?
                </Link>
              )}

              <Button type="submit" className={`w-full text-white font-medium py-2 ${config.buttonColor}`}>
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-600">
          <p>
            <Link href="/" className="text-primary hover:underline font-medium">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
