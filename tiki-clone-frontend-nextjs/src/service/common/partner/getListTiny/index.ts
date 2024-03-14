import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getPartnerList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: 'api/v1/partners/list-tiny',
    params,
  })

  return data
}

export const useQueryGetPartnerList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/partners/list-tiny', params],
    () => getPartnerList(params),
    { ...defaultOption, ...options }
  )
}
