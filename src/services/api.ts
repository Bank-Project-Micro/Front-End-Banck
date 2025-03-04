import axios from "axios"
import type { Customer, Account, CreateCustomerDto, CreateAccountDto } from "../lib/types"

const API_URL = "http://localhost:8989/api"

const api = axios.create({
  baseURL: API_URL,
})

export const customerService = {
  getAll: () => api.get<Customer[]>("/customers"),
  getById: (id: number) => api.get<Customer>(`/customers/${id}`),
  create: (data: CreateCustomerDto) => api.post<Customer>("/customers", data),
}

export const accountService = {
  getAll: (customerId: number) => api.get<Account[]>(`/accounts/customer/${customerId}`),
  getById: (id: number) => api.get<Account>(`/accounts/${id}`),
  create: (data: CreateAccountDto) => api.post<Account>("/accounts", data),
}

