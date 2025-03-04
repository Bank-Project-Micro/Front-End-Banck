export type Customer = {
  id: number
  name: string
  email: string
}

export type AccountType = "SAVINGS" | "CHECKING"

export type Account = {
  id: number
  customerId: number
  type: AccountType
  balance: number
  customerName: string
}

export type CreateCustomerDto = Omit<Customer, "id">
export type CreateAccountDto = Omit<Account, "id" | "customerName">

