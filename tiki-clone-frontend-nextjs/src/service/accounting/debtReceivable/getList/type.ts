import { PageResponse } from '@/service/type'

export type DebtPaid = {
  id: number
  code: string
  name: string
  codeAccount: string

  openBalance: {
    debit: number
    credit: number
  }
  arise: {
    debit: number
    credit: number
  }
  endingBalance: {
    debit: number
    credit: number
  }
}

export type Response = {
  GET: PageResponse<DebtPaid[]>
}

export type RequestBody = {
  GET: {
    page: number
    size: number
    customer: {
      id: number
      name: string
    }
    customerId?: number | null
    start: string
    end: string
  }
}
