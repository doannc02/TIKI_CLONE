import { BaseResponse } from '@/service/type'

export type BalanceDetail = {
  id?: number | null
  account: {
    id: number
    code: string
    name: string
  } | null
  bankAccount: {
    id: number
    code: string
    name: string
  }
  currencySource: {
    id: number
    name: string
  }
  debit: number
  credit: number
  amountSourceDebit: number
  amountSourceCredit: number
}

export type RequestParams = {
  GET: { id: number; beginType: 'CUSTOMER' | 'VENDOR' | 'BANK' | 'OTHER' }
}

export type Response = {
  GET: BaseResponse<BalanceDetail>
}
