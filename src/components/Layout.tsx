import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { Building2, CreditCard, LayoutDashboard } from "lucide-react"
import { cn } from "../lib/utils"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: location.pathname === "/",
    },
    {
      href: "/customers",
      label: "Customers",
      icon: Building2,
      active: location.pathname === "/customers",
    },
    {
      href: "/accounts",
      label: "Accounts",
      icon: CreditCard,
      active: location.pathname === "/accounts",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 container mx-auto">
          <div className="font-bold mr-8">Banking App</div>
          <nav className="flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <route.icon className="w-4 h-4 mr-2" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <main className="container mx-auto py-6">{children}</main>
    </div>
  )
}

