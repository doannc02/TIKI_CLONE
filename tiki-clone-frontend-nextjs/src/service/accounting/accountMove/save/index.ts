import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccountMove = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/account-move`,
    data: requestBody,
  })
}

export const putAccountMove = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/account-move`,
    data: requestBody,
    params: {
      id: requestBody.id,
    },
  })
}

export const putAccountMoveLocked = async (
  requestBody: RequestBody['LOCK']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/account-move/locked`,
    params: requestBody.id,
  })
}
