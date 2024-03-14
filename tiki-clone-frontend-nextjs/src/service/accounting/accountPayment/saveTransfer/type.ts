export type RequestBody = {
  SAVE: {
    id: number | null
    code: string
    accountJournal: {
      id: number | null
      code: string
      name: string
    }
    currency: {
      id: number | null
      name: string
    }
    destinationJournalId: number
    paymentMethod: string
    partner: {
      id: number | null
      code: string
      name: string
    }
    incomeExpense: {
      id: number | null
      code: string
      name: string
    }
    bankAccount: {
      id: number | null
      code: string
      name: string
    }
    amount: number
    paymentDate: string
    note: string
    state: 'DRAFT' | 'POSTED'
    partnerType: 'VENDOR' | 'CUSTOMER'
    paymentType: 'INBOUND' | 'OUTBOUND'
    amountSource: number
    currencySource: string
  }
}
