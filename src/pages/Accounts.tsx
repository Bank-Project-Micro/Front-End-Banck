"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Plus } from "lucide-react"
import { accountService, customerService } from "../services/api"
import { Label } from "../components/ui/label"
import { Select } from "../components/ui/select"
import type { Account, Customer } from "../lib/types"

export function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerService.getAll()
        setCustomers(response.data)

        if (response.data.length > 0) {
          setSelectedCustomerId(response.data[0].id)
        }
      } catch (err) {
        setError("Failed to fetch customers")
        console.error("Error fetching customers:", err)
      }
    }

    fetchCustomers()
  }, [])

  useEffect(() => {
    const fetchAccounts = async () => {
      if (selectedCustomerId === null) return

      setLoading(true)
      try {
        const response = await accountService.getAll(selectedCustomerId)
        setAccounts(response.data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch accounts")
        console.error("Error fetching accounts:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [selectedCustomerId])

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomerId(Number.parseInt(e.target.value))
  }

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

      <Card className="p-6">
        <div className="mb-6">
          <Label htmlFor="customerId">Select Customer</Label>
          <Select
            id="customerId"
            value={selectedCustomerId?.toString() || ""}
            onChange={handleCustomerChange}
            className="mt-2"
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.email})
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {loading ? (
        <div className="flex justify-center p-8">Loading accounts...</div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>
      ) : accounts.length === 0 ? (
        <Card className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No accounts found for this customer.</p>
            <Link to="/accounts/new">
              <Button className="mt-4">Create an Account</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Balance</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} className="border-b">
                    <td className="p-4">{account.id}</td>
                    <td className="p-4">{account.type}</td>
                    <td className="p-4">${account.balance.toLocaleString()}</td>
                    <td className="p-4">{account.customerName}</td>
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
      )}
    </div>
  )
}

