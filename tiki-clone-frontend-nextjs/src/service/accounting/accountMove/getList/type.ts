import { PageResponse } from '@/service/type'

export type AccountMove = {
  id: number
  code: string
  partner: {
    name: string
    id: number
    code: string
  } | null
  moveType: string
  date: string
  dueDate: string
  amountUntaxed: number
  amountTotal: number
  paymentStatus: string
  state: string
  isLocked: boolean
}

export type Response = {
  GET: PageResponse<AccountMove[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    startDate?: string | null
    endDate?: string | null
    startDueDate?: string | null
    endDueDate?: string | null
    moveType?: string | null
    paymentStatus?: string 
    state?: string
  }
}
