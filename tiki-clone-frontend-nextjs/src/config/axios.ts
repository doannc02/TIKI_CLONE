import { postLogout } from '@/service/auth/logout'
import { postRefreshToken } from '@/service/auth/refreshToken'
import axios, { AxiosRequestConfig } from 'axios'
import getConfig from 'next/config'
import queryString from 'query-string'
import { getCmsToken, removeCmsToken, setCmsToken } from './token'
import { errorMsg } from '@/helper/message'

const {
  publicRuntimeConfig: {
    SUBDOMAIN,
    AUTH_URL,
    COMMON_URL,
    UAA_URL,
    PRODUCT_URL,
    SO_URL,
    PO_URL,
    WAREHOUSE_URL,
    ACCOUNTING_URL,
    FINANCE_URL,
  },
} = getConfig()

const requestAuth = axios.create({
  baseURL: AUTH_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params: any) =>
      queryString.stringify(params, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
      }),
  },
})

const logoutAccount = async () => {
  const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')
  try {
    if (tokenAccess && tokenAccess?.jti) await postLogout(tokenAccess.jti)
  } catch (error) {
    console.log(error)
  } finally {
    localStorage.clear()
    sessionStorage.clear()
    await removeCmsToken()
    if (window.location.origin.includes('localhost')) {
      window.location.replace('/login')
    } else
      window.location.replace(
        `https://${SUBDOMAIN}/login?redirect=accounting-cms`
      )
  }
}

export const middlewareRequest = async (config: any) => {
  const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')

  if (
    config.url &&
    config.url.includes('/oauth') &&
    !config.url.includes('/oauth/logout')
  ) {
    return {
      ...config,
      headers: {
        ...config.headers,
        'Accept-Language': 'vi',
      },
    }
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      'Accept-Language': 'vi',
      Authorization: `Bearer ${tokenAccess?.accessToken}`,
    },
  }
}

let isRefreshing = false
let refreshSubscribers: any = []

export const middlewareResponseError = async (error: any) => {
  const {
    config,
    response: { status },
  } = error
  const originalRequest = config

  if (
    status === 401 &&
    !config.url.includes('/oauth') &&
    !originalRequest._retry
  ) {
    if (!isRefreshing) {
      isRefreshing = true
      const tokenAccess = JSON.parse(getCmsToken() ?? '{}')

      if (tokenAccess && tokenAccess?.refreshToken) {
        postRefreshToken(tokenAccess?.refreshToken)
          .then((res) => {
            isRefreshing = false

            if (res && res?.data && res.data.accessToken) {
              setCmsToken(res.data)
            }

            refreshSubscribers.map((su: any) => {
              su(res.data.accessToken)
            })
          })
          .catch(() => {
            logoutAccount()
          })
      } else {
        logoutAccount()
      }
    }

    const retryOrigReq = new Promise((resolve, _) => {
      refreshSubscribers.push((accessToken: string) => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        resolve(axios(originalRequest))
      })
    })

    return retryOrigReq
  } else if (status === 403) {
    errorMsg('Bạn không có quyền thực hiện tính năng này.')
  }

  return Promise.reject(error)
}

requestAuth.interceptors.request.use(middlewareRequest, (error: any) =>
  Promise.reject(error)
)

requestAuth.interceptors.response.use((res) => {
  const { data } = res

  if (!!data?.errorCodes)
    return Promise.reject(data?.errorCodes ?? 'Hệ thống đang bị lỗi !!!')

  return res
}, middlewareResponseError)

export const defaultOption = {
  // cacheTime: Infinity,
  refetchOnWindowFocus: false,
  // staleTime: Infinity,
  refetchInterval: 0,
  keepPreviousData: false,
}
export const authApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_URL,
    ...options,
  })
}
export const authWarehouseApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: WAREHOUSE_URL,
    ...options,
    // headers: { 'Accept-Language': 'vi', ...options.headers },
  })
}
export const commonApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: COMMON_URL,
    ...options,
  })
}

export const authUAAAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: UAA_URL,
    ...options,
  })
}

export const productApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: PRODUCT_URL,
    ...options,
  })
}

export const accountingApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: ACCOUNTING_URL,
    ...options,
  })
}

export const financeApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: FINANCE_URL,
    ...options,
  })
}


export const authCommonAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: COMMON_URL,
    ...options,
    // headers: { 'Accept-Language': 'vi', ...options.headers },
  })
}

export const authSOApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: SO_URL,
    ...options,
    // headers: { 'Accept-Language': 'vi', ...options.headers },
  })
}
