import { PageResponse } from '@/service/type'
import { UomGroup } from '../getUomGroup/type'

type Product = {
  id: number
  name: string
  sku: string
  upc: string
  uomId: number
  uomCode: string
  uomName: string
  productImage: string[]
  quantityInventory: number
  minQuantity: number
  uomGroup: UomGroup
}

export type Response = {
  GET: PageResponse<Product[]>
}

export type RequestBody = {
  GET: {
    search?: number
    page: number
    size: number
  }
}
