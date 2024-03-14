import { authApi } from '@/config/axios'

export const postRefreshToken = async (refreshToken: string): Promise<any> => {
  const { data } = await authApi({
    method: 'post',
    url: '/oauth/refresh-token',
    data: {
      refreshToken,
    },
  })

  return data
}
