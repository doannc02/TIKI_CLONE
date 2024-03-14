import { accountingApi } from '@/config/axios'
import { RequestParams, Response } from './type'
import { errorMsg, successMsg } from '@/helper/message'

export const postCopyMoveLines = async (
  params: RequestParams['POST']
): Promise<Response['POST']> => {
  const { data } = await accountingApi({
    method: 'post',
    url: '/api/v1/account-move/copy',
    params,
  })

  return data
}
