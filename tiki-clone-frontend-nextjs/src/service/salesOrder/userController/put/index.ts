import { authUAAAPI } from '@/config/axios'
import { Request } from './type'

export const putModifyUser = async (
  requestBody: Request['PUT']
): Promise<any> => {
  const { userId, attachIds, detachIds } = requestBody
  const url = attachIds
    ? `/api/v1/user/modify-roles?userId=${userId}&attachIds=${attachIds}`
    : detachIds
    ? `/api/v1/user/modify-roles?userId=${userId}&detachIds=${detachIds}`
    : `/api/v1/user/modify-roles?userId=${userId}`
  return await authUAAAPI({
    method: 'put',
    url,
    data: requestBody,
  })
}
