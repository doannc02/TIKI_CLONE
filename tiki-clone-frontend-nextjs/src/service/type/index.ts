export type SortObject = {
  empty?: boolean
  sorted?: boolean
  unsorted?: boolean
}

export type PageableObject = {
  offset?: number
  sort?: SortObject
  pageNumber?: number
  pageSize?: number
  paged?: boolean
  unpaged?: boolean
}

export type BaseResponse<T> = {
  message: string
  traceId: string
  data: T
}

export type ErrorCodes = {
  code: string
  message: string
  httpCode?: number
  fields?: string[]
}

export type PageResponse<T> = {
  message: string
  traceId: string
  data: {
    content: T
    page: number
    size: number
    sort: string
    totalElements: number
    totalPages: number
    numberOfElements: number
  }
  errorCodes?: ErrorCodes[]
}
