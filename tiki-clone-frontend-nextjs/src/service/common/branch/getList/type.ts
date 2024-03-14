import { PageResponse } from '@/service/type'

export type Branch = {
  id: number,
  code: string,
  name: string,
  parentId: number,
  parent: string,
  companyId: number,
  company: string,
  description: string,
  activated: true,
  logo: string,
  phone: string,
  email: string,
  taxCode: string,
  address: string
}

export type Response = {
  GET: PageResponse<Branch[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    activated: boolean
  }
}
