import { accountingApi } from '@/config/axios'

export const exportBankBalanceFile = async (): Promise<any> => {
  const res = await accountingApi({
    method: 'get',
    url: '/api/v1/bank-balance/export',
    responseType: 'blob',
  })

  return res.data
}
