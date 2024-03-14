import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const putAccountMoveDraft = async (
  requestBody: RequestBody['PUT']
): Promise<Response['PUT']> => {
  const { data } = await accountingApi({
    method: 'put',
    url: '/api/v1/account-move/set-to-draft',
    params: {
      id: requestBody.id,
      reason: requestBody.reason,
    },
  })

  return data
}

// export const approveProductRequestInternal = async (params: any) => {
//   const url = `/api/v1/product-internal-request/approve`
//   const { data } = await accountingApi({
//     method: 'get',
//     url,
//     params,
//   })
//   return data ? data.data : data
// }
