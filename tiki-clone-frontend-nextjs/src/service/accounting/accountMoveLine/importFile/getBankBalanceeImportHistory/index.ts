import { useQuery } from 'react-query'
import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody } from './type'

export const getBankBalanceImportHistory = async (): Promise<any> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/bank-balance/list',
  })

  return data
}

export const useQueryGetBankBalanceImportHistory = (options?: any) => {
  return useQuery<RequestBody['GET']>(
    ['/api/v1/account-types/list'],
    () => getBankBalanceImportHistory(),
    { ...defaultOption, ...options }
  )
}
