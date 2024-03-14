import { Token } from '@/service/auth/login/type'
import { RedirectError, RedirectProps } from '../error'
import { GsspMiddleware } from '../type'

export const authGssp =
  (
    redirectPropsToLogin: RedirectProps = {
      permanent: false,
      destination: '/login',
    }
  ): GsspMiddleware =>
  async (...args) => {
    const token = args[0].req.cookies.ACCESS_TOKEN

    if (!token) throw new RedirectError(redirectPropsToLogin)
    else {
      const tokenObject = JSON.parse(token)
    }

    return [...args, token]
  }
