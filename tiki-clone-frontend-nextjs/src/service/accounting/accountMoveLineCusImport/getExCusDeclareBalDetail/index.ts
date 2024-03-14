import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'


export const getExCusDeclareBalanceDetail = async (): Promise<any> => {
  const res = await accountingApi({
    method: 'get',
    url: '/api/v1/customer-balance/export',
    responseType: 'blob',
  })
  return res.data
}

export const useQueryGetExCusDeclareBalDetail = (
  options?: any
) => {
  return useQuery(
    ['/api/v1/customer-balance/export'],
    () => getExCusDeclareBalanceDetail(),
    {
      ...defaultOption,
      ...options,
    }
  )
}
