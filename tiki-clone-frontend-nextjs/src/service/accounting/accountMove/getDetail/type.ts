import { BaseResponse } from '@/service/type'

export interface AccountMoveDetail {
  id?: number | null
  code: string
  orderName: string | null
  saleOrderId: number | null
  purchaseOrderId: number | null
  returnPurchaseOrderId: number | null
  returnSaleOrderId: number | null
  scopeType: 'DOMESTICALLY' | 'EXPORTED' | 'ALL'
  moveType: string
  paymentStatus: string
  state: string
  address: string
  paymentTerm: {
    id: number
    name: string
  }
  partner: {
    id: number
    name: string
    label: string
  }
  accountJournal: {
    id: number
    name: string
  }
  incomeExpense: {
    id: number
    name: string
    code: string
  }
  date: string
  dueDate: string
  accountingDate: string | null
  accountPaymentId: number | null
  amountUntaxed: number
  totalTax: number
  amountTotal: number
  discount: number | null
  moneyPaid: number
  invoiceLines: InvoiceLine[]
  moveLines: MoveLine[]
  movePunishes: MovePunishes[]
  moneyBalanceResponses: MoneyBalanceResponse[]
  paymentResponses: PaymentResponse[]
  computeTaxInfo: ComputeTaxInfo
}

export interface ComputeTaxInfo {
  taxLines: TaxLine[]
  summaryItems: SummaryItem[]
}

export interface SummaryItem {
  taxId: number
  taxName: string
  amount: number
}

export interface Repartition2 {
  id: number
  accountId: number
  accountTagId: number
  amount: number
}

export interface Item2 {
  taxId: number
  taxName: string
  repartitions: Repartition2[]
  amount: number
}

export interface TaxLine {
  items: Item2[]
  amount: number
  untaxedAmount: number
}

export interface MovePunishes {
  id: number
  moveType: string
  code: string
  amountTotal: number
  date: string
  paymentStatus: string
  punishRemainAmount: number
  isRejectPunish: boolean
  state: string
  canUndo: boolean
  punishAmountFirst: number
  punishPayments: PunishPayment[]
}

export interface PunishPayment {
  timePayment: string
  amount: number
  currency: string
  isDiscount: boolean
  amountDiscount: number | null
  paymentPopUpResponse: PaymentPopUpResponse
}

export interface PaymentPopUpResponse {
  id: number
  amount: number
  accountJournalName: string
  note: string
  paymentDate: string
  payType:
    | 'BY_ACCOUNT_MOVE'
    | 'BY_PAYMENT'
    | 'DECLARE_BANK'
    | 'DECLARE_VENDOR'
    | 'DECLARE_CUSTOMER'
  accountMoveId: number
  paymentMethodName: string
  paymentMethod: 'CASH' | 'BANK'
  paymentType: 'INBOUND' | 'OUTBOUND'
  moveType: string
}

export interface PaymentResponse {
  amount: number
  currency: string | null
  amountDiscount: number | null
  paymentPopUpResponse: PaymentPopUpResponse
}

export interface MoneyBalanceResponse {
  accountPaymentId: number
  accountPaymentCode: string
  amount: number
  accountMoveLineId: number
  currencyId: number
  currency: string
  paymentAccountId: number
  paymentLabel: string
  payType: string
}

export interface InvoiceLine {
  id: number
  sequence: number
  product: {
    id: number
    name: string
  }
  quantity: number
  uom: {
    id: number
    name: string
  } | null
  unitPrice: number
  amountUntaxed: number
  amountTotal: number
  discount: number
  taxes: Tax[]
  taxIds: number[]
  lineTax: number
}

export interface Tax {
  id: number
  name: string
}

export interface MoveLine {
  id: number
  sequence: number
  currencyId: number
  description: string
  partnerId: number
  account: Account
  label: string
  accountId: number
  debit: number
  credit: number
  matchingNumber: string
  state: string
  accountTags: AccountTag[]
}

export interface Account {
  id: number
  code: string
  name: string
}

export interface AccountTag {
  id: number
  name: string
  applicability: string
  isNegativeBalance: boolean
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AccountMoveDetail>
}
