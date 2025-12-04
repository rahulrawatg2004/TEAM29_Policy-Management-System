import { Shield, Users, UserCheck } from "lucide-react"

interface RoleBadgeProps {
  role: "client" | "admin" | "approver"
  size?: "sm" | "md" | "lg"
}

export function RoleBadge({ role, size = "md" }: RoleBadgeProps) {
  const roleConfig = {
    client: { label: "Client", color: "bg-blue-100 text-blue-700", icon: Users },
    admin: { label: "Admin", color: "bg-purple-100 text-purple-700", icon: Shield },
    approver: { label: "Approver", color: "bg-green-100 text-green-700", icon: UserCheck },
  }

  const config = roleConfig[role]
  const Icon = config.icon
  const sizeClass = { sm: "text-xs px-2 py-1", md: "text-sm px-3 py-1.5", lg: "text-base px-4 py-2" }[size]

  return (
    <div className={`inline-flex items-center gap-1 rounded-full ${config.color} ${sizeClass}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </div>
  )
}
