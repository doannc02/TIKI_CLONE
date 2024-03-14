import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getBranches = async (params: any): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/branches/list',
    params,
  })
  return data
}

export const useQueryGetBranches = (params: any, options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/branches/list', params],
    () => getBranches(params),
    { ...defaultOption, ...options }
  )
}
