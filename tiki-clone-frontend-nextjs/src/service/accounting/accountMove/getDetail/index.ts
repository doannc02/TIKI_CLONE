import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getAccountMoveDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: `/api/v1/account-move`,
    params,
  })
  return data
}

export const useQueryGetAccountMoveDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/account-move`, params],
    () => getAccountMoveDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
