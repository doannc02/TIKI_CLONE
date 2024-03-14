import { authWarehouseApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getStockPickingOutDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: 'api/v1/stock-picking/out',
    params,
  })

  return data 
}

export const getStockPickingTypeListWarehouse = async (params: any) => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/stock-picking-type/list',
    params,
  })

  return data ? data.data : data
}

export const useQueryGetStockPickingOutDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/stock-picking/out', params],
    () => getStockPickingOutDetail(params),
    { ...defaultOption, ...options }
  )
}
