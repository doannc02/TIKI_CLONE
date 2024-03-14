import { getCmsToken, removeCmsToken, setCmsToken } from '@/config/token'
import { errorMsg } from '@/helper/message'
import { postLogin } from '@/service/auth/login'
import { postLogout } from '@/service/auth/logout'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useLogin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const pathParams = router.query?.redirect
  const {
    publicRuntimeConfig: { SUBDOMAIN },
  } = getConfig()

  const loginAccount = async (dataLogin: any) => {
    // try {
    //   setLoading(true)
    //   const requestBody = {
    //     username: dataLogin?.username,
    //     password: dataLogin?.password,
    //     companyId: dataLogin?.companyId,
    //     grant_type: 'password',
    //   }
    //   const data = await postLogin(requestBody)
    //   setCmsToken(data?.data)
    //   if (pathParams) {
    //     router.push(`https://${pathParams}${SUBDOMAIN}`)
    //     setCmsToken(data?.data)
    //   } else router.push('/')
    //   setLoading(false)
    // } catch (err) {
    //   errorMsg(err, 'Có lỗi')
    //   localStorage.clear()
    //   sessionStorage.clear()
    //   setLoading(false)
    // }
    setCmsToken('test')
    router.push('/')
  }

  const logoutAccount = async () => {
    window.location.replace('/login')
    // const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')
    // try {
    //   if (tokenAccess && tokenAccess?.jti) await postLogout(tokenAccess.jti)
    // } catch (error) {
    //   errorMsg('Có lỗi xảy ra !!!')
    // } finally {
    //   localStorage.clear()
    //   sessionStorage.clear()
    //   await removeCmsToken()

    //   if (window.location.origin.includes('localhost')) {
    //     window.location.replace('/login')
    //   } else
    //     window.location.replace(
    //       `https://company-service${SUBDOMAIN}/login?redirect=accounting-cms`
    //     )
    // }
  }

  return { loginAccount, logoutAccount, loading }
}
