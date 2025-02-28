import axios from "axios"
import type { Customer, Account } from "../lib/types"

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
})

export const customerService = {
  getAll: () => api.get<Customer[]>("/customers"),
  getById: (id: string) => api.get<Customer>(`/customers/${id}`),
  create: (data: Omit<Customer, "id">) => api.post<Customer>("/customers", data),
}

export const accountService = {
  getAll: () => api.get<Account[]>("/accounts"),
  getById: (id: string) => api.get<Account>(`/accounts/${id}`),
  create: (data: Omit<Account, "id">) => api.post<Account>("/accounts", data),
}

