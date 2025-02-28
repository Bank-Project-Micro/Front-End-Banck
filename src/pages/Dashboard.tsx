import { Card } from "../components/ui/card"
import { Building2, CreditCard, Users } from "lucide-react"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Customers</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">245</div>
          <p className="text-xs text-muted-foreground">+10% from last month</p>
        </Card>

        <Card className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Current Accounts</h3>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">189</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </Card>

        <Card className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Savings Accounts</h3>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">142</div>
          <p className="text-xs text-muted-foreground">+18% from last month</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold">Recent Customers</h3>
            <p className="text-sm text-muted-foreground">Latest customers that joined the bank</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: "John Doe", email: "john@example.com" },
                { name: "Jane Smith", email: "jane@example.com" },
                { name: "Bob Wilson", email: "bob@example.com" },
              ].map((customer) => (
                <div key={customer.email} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold">Recent Accounts</h3>
            <p className="text-sm text-muted-foreground">Latest accounts created</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { type: "CURRENT", balance: 1500 },
                { type: "SAVINGS", balance: 5000 },
                { type: "CURRENT", balance: 2300 },
              ].map((account, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{account.type}</p>
                    <p className="text-sm text-muted-foreground">Account #{i + 1}</p>
                  </div>
                  <div className="font-medium">${account.balance.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

