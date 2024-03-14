import { accountingApi } from '@/config/axios'

export const exportAccountTypeFile = async (): Promise<any> => {
  const res = await accountingApi({
    method: 'get',
    url: '/api/v1/account-types/export',
    responseType: 'blob',
  })

  return res.data
}
