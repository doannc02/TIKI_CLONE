import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const putAccountMoveRejectPunish = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/account-move/reject-punish',
    params: {
      punishId: requestBody.punishId,
    },
  })
}
