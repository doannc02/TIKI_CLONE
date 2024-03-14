export type RequestBody = {
  SAVE: {
    id?: number | null
    sequence: number
    name: string
    scopeType: string
    amount: number
    taxComputeType: string
    type: string
    countryId: number
    isIncludedPrice: boolean
    isAffectingBase: boolean
    baseIsAffected: boolean
    description: string
    isActive: boolean
    repartitions?: {
      sequence?: number | null
      percent: number | null
      // basedOn: string | null
      accountId: number | null
      accountTagId: number | null
    }[]
    taxItems?: {
      sequence?: number | null
      taxId: number | null
      taxComputeType?: string | null
      amount?: number | null
    }[]
  }
}
