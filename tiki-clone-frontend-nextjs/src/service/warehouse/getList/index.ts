import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getWarehouseList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: 'api/v1/sale/stock-warehouse/list',
    params,
  })

  return data
}

export const useQueryGetWarehouseList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/sale/stock-warehouse/list', params],
    () => getWarehouseList(params),
    { ...defaultOption, ...options }
  )
}
