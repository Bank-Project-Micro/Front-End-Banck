"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select } from "../components/ui/select"
import type { AccountType } from "../lib/types"

export function NewAccount() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    type: "" as AccountType,
    balance: "",
    clientId: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to create account
    console.log("Creating account:", formData)
    navigate("/accounts")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">New Account</h2>
          <p className="text-sm text-muted-foreground">Create a new bank account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Account Type</Label>
            <Select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as AccountType })}
              required
            >
              <option value="">Select account type</option>
              <option value="CURRENT">Current Account</option>
              <option value="SAVINGS">Savings Account</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="balance">Initial Balance</Label>
            <Input
              id="balance"
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientId">Client ID</Label>
            <Input
              id="clientId"
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              required
            />
          </div>
          <Button type="submit">Create Account</Button>
        </form>
      </Card>
    </div>
  )
}

