import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'


export const getExVenDeclareBalanceDetail = async (): Promise<any> => {
  const res = await accountingApi({
    method: 'get',
    url: '/api/v1/vendor-balance/export',
    responseType: 'blob',
  })
  return res.data
}

export const useQueryGetExVenDeclareBalDetail = (
  options?: any
) => {
  return useQuery(
    ['/api/v1/vendor-balance/export'],
    () => getExVenDeclareBalanceDetail(),
    {
      ...defaultOption,
      ...options,
    }
  )
}
