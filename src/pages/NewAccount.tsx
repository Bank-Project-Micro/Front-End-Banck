"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select } from "../components/ui/select"
import { accountService, customerService } from "../services/api"
import type { CreateAccountDto, Customer } from "../lib/types"

export function NewAccount() {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [formData, setFormData] = useState<CreateAccountDto>({
    customerId: 0,
    type: "SAVINGS",
    balance: 0,
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerService.getAll()
        setCustomers(response.data)
        if (response.data.length > 0) {
          setFormData((prev) => ({ ...prev, customerId: response.data[0].id }))
        }
      } catch (err) {
        setError("Failed to fetch customers")
        console.error("Error fetching customers:", err)
      }
    }

    fetchCustomers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await accountService.create(formData)
      navigate("/accounts")
    } catch (err) {
      setError("Failed to create account")
      console.error("Error creating account:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">New Account</h2>
          <p className="text-sm text-muted-foreground">Create a new bank account</p>
        </div>
        {error && <div className="mb-4 p-4 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerId">Customer</Label>
            <Select
              id="customerId"
              value={formData.customerId.toString()}
              onChange={(e) => setFormData({ ...formData, customerId: Number.parseInt(e.target.value) })}
              required
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Account Type</Label>
            <Select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as "SAVINGS" | "CHECKING" })}
              required
            >
              <option value="SAVINGS">Savings</option>
              <option value="CHECKING">Checking</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="balance">Initial Balance</Label>
            <Input
              id="balance"
              type="number"
              min="0"
              step="0.01"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: Number.parseFloat(e.target.value) })}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

