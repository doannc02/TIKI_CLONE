export type StockPickingLines = {
  id: number
  productId: number
  sku: string
  upc: string
  checkingType: string
  productName: string
  demandQty: number
  uomCode: string
  inventories: [
    {
      serialLots: [
        {
          lotId: number
          lotCode: string
          doneQtyByLot: number
        }
      ]
      locationId: number
      locationName: string
      quantityInventory: number
      doneQty: number
      isHasSerialLot: boolean
    }
  ]
}

export type StockPickingOutDetail = {
  name: string
  code: string
  scheduledDate: string
  doneDate: string
  pickingTypeId: number
  rejectReason: string
  pickingType: {
    id: number
    warehouseId: number
    name: string
    code: string
    type: string
    fromLocationId: number
    fromLocationName: string
    toLocationId: number
    toLocationName: string
    note: string
    isDefault: true
  }
  orderType: string
  sourceDocument: string
  userId: number
  warehouseId: number
  warehouseName: string
  note: string
  state: string
  employeeId: number
  employee: {
    name: string
    code: string
  }
  customerId: number
  customer: {
    name: string
    code: string
  }
  stockPickingLines: StockPickingLines[]
}

export type Response = {
  GET: StockPickingOutDetail
}

export type RequestBody = {
  GET: {
    id: number
    warehouseId?: number
    pickingTypeId?: number
  }
}
