export type Customer = {
    id: string
    name: string
    email: string
  }
  
  export type AccountType = "CURRENT" | "SAVINGS"
  
  export type Account = {
    id: string
    balance: number
    type: AccountType
    clientId: string
  }
  
  