import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { ResponseProduct } from '../getAllSaleProducts/type'
import  { useCheckPath,TypePath } from '@/path'
import { RequestProductPriceList } from './type'

export const getProductOfPriceList = async (
  params: RequestProductPriceList['PARAMS'],
  typePath: TypePath
): Promise<ResponseProduct['GET']> => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order/price-list/products`
  const { data } = await authSOApi({
    method: 'get',
    url,
    params,
  })
  return data ? data.data : data
}

export const useQueryGetProductOfPriceList = (
  params: RequestProductPriceList['PARAMS'],
  options?: any
) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<ResponseProduct['GET']>(
    [`/api/v1/${typeSaleRequest.toLowerCase()}/sale-order/price-list/products`, params],
    () => getProductOfPriceList(params, typeSaleRequest),
    { ...defaultOption, ...options }
  )
}
