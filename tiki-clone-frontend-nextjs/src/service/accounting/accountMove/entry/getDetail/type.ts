import { BaseResponse } from '@/service/type'

export interface EntryDetail {
  id: number
  code: string
  accountingDate: string
  state: string
  partnerType: string
  accountPaymentId: number
  partner: {
    id: number
    name: string
    code: string
  }

  accountJournal: {
    id: number
    name: string
    code: string
  }
  moveLines: MoveLine[]
}

export interface MoveLine {
  id: number
  account: {
    id: number
    name: string
    code: string
  }
  debit: number
  credit: number
  label: string
  accountTags: {
    id: number
    name: string
  }[]
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<EntryDetail>
}
