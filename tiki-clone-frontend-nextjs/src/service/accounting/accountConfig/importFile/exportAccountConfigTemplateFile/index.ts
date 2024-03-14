import { accountingApi } from '@/config/axios'

export const exportAccountConfigFile = async (): Promise<any> => {
  const res = await accountingApi({
    method: 'get',
    url: '/api/v1/accounts/export',
    responseType: 'blob',
  })

  return res.data
}
