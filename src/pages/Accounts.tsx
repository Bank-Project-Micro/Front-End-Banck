import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Plus } from "lucide-react"

export function Accounts() {
  const accounts = [
    { id: "1", type: "CURRENT", balance: 1500, clientId: "1" },
    { id: "2", type: "SAVINGS", balance: 5000, clientId: "1" },
    { id: "3", type: "CURRENT", balance: 2300, clientId: "2" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <Link to="/accounts/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Account
          </Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Account Type</th>
                <th className="text-left p-4">Balance</th>
                <th className="text-left p-4">Client ID</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="border-b">
                  <td className="p-4">{account.type}</td>
                  <td className="p-4">${account.balance.toLocaleString()}</td>
                  <td className="p-4">{account.clientId}</td>
                  <td className="p-4">
                    <Link to={`/accounts/${account.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

