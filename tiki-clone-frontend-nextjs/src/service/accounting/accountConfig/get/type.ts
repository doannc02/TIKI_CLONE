import { BaseResponse } from '@/service/type'

export type AccountConfig = {
  id: number
  saleDefaultTax: {
    id: number
    name: string
  }
  purchaseDefaultTax: {
    id: number
    name: string
  }
  cashRounding: {
    id: number
    name: string
  }
  internalTransferAccount: {
    id: number
    code: string
    name: string
  }
  discountGainAccount: {
    id: number
    code: string
    name: string
  }
  discountLossAccount: {
    id: number
    code: string
    name: string
  }
  incomeAccount: {
    id: number
    code: string
    name: string
  }
  expenseAccount: {
    id: number
    code: string
    name: string
  }
  incomeCurrencyExchangeAccount: {
    id: number
    code: string
    name: string
  }
  expenseCurrencyExchangeAccount: {
    id: number
    code: string
    name: string
  }
  stockAutomaticAccounting: boolean
  stockValuationAccount: {
    id: number
    code: string
    name: string
  }
  stockJournal: {
    id: number
    code: string
    name: string
  }
  stockInputAccount: {
    id: number
    code: string
    name: string
  }
  stockOutputAccount: {
    id: number
    code: string
    name: string
  }
  fiscalLastMonth: number
  fiscalLastDay: number
  isFiscalYear: boolean
  fiscalYear: {
    id: number
    name: string
    startDate: string
    endDate: string
    activated: boolean
  }
  upperBoundDate: string

  country: {
    id: number
    code: string
    name: string
  }
  receivableAccount: {
    id: number
    code: string
    name: string
  }
  payableAccount: {
    id: number
    code: string
    name: string
  }
  posReceivableAccount: {
    id: number
    code: string
    name: string
  }
  branchAccounting: {
    id: number,
    branch: {
      id: number,
      name: string,
      code: string
    },
    accountingForm: "DEPENDENCE" | string
  }[],
  deleteBranchIds:  number[]
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AccountConfig>
}
