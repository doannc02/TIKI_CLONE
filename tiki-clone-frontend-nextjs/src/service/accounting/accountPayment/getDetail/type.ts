import { BaseResponse } from '@/service/type'

export type AccountPaymentDetail = {
  id: number
  code: string
  accountJournal: {
    id: number
    code: string
    name: string
  }
  currency: {
    id: number | null
    name: string
  }
  amount: number
  equalAmount: number
  paymentMethod: string
  paymentMethodName: string
  partner: {
    id: number
    name: string
    code: string
    address: string
    city: string
    district: string
    ward: string
  }
  bankAccount: {
    id: number | null
    code: string
    name: string
  }
  paymentDate: string
  note: string
  accountMoveId: number
  paymentEntry: PaymentEntry[]
  state: 'DRAFT' | 'POSTED'
  destinationJournalId: number
  destinationJournalName: string
  paymentType: 'INBOUND' | 'OUTBOUND'
  moveType:
    | 'ENTRY'
    | 'OUT_INVOICE'
    | 'OUT_REFUND'
    | 'IN_INVOICE'
    | 'IN_REFUND'
    | 'PAYMENT'
  number: number
  debit: number
  credit: number
  partnerAddress: string
  reason: string
  amountWord: string
}

export interface PaymentEntry {
  id: number
  accountId: number
  accountName: string
  partnerId: number
  partnerName: string
  amount: number
  debit: number
  credit: number
  note: string
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AccountPaymentDetail>
}
