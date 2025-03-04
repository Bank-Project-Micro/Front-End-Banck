"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { customerService } from "../services/api"
import type { CreateCustomerDto } from "../lib/types"

export function NewCustomer() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<CreateCustomerDto>({
    name: "",
    email: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await customerService.create(formData)
      navigate("/customers")
    } catch (err) {
      setError("Failed to create customer")
      console.error("Error creating customer:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">New Customer</h2>
          <p className="text-sm text-muted-foreground">Add a new customer to the system</p>
        </div>
        {error && <div className="mb-4 p-4 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Customer"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

