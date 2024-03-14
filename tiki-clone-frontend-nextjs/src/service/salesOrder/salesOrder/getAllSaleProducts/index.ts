import  { useCheckPath,TypePath } from '@/path'
import { ResponseProduct } from './type'
import { useQuery } from 'react-query'
import { authSOApi, defaultOption } from '@/config/axios'

export const getAllSaleProducts = async (
  params: any,
  typePath: TypePath
): Promise<any> => {
  if (params.search === '') delete params.search
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order/products`
  const { data } = await authSOApi({
    method: 'get',
    url,
    params,
  })
  return data ? data.data : data
}

export const useQueryGetAllSaleProducts = (params: any, options?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<ResponseProduct['GET']>(
    ['/api/v1/sale-order/sale/products', params],
    () => getAllSaleProducts(params, typeSaleRequest),
    { ...defaultOption, ...options }
  )
}
