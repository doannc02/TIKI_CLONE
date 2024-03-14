import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const putAccountMoveUndoPunish = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/account-move/undo-punish',
    params: {
      punishId: requestBody.punishId,
    },
  })
}
