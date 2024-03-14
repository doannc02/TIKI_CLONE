import { accountingApi } from '@/config/axios'
import { ResponseBody, ResquestBody } from './type'

export const importAccountTypeFile = async (
  data: ResquestBody['POST']
): Promise<ResponseBody['POST']> => {
  const res = await accountingApi({
    method: 'POST',
    url: '/api/v1/account-types/import',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data?.data
}
