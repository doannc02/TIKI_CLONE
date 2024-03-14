import { NoneLayout } from '@/components/layouts/NoneLayout'
import { Meta } from '@/components/meta'
import Login from '@/components/templates/Login'
import { HttpResponse } from '@/lib/api'
import { combineGssp } from '@/lib/next/gssp/combineGssp'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Login />

Page.getLayout = NoneLayout
Page.getMeta = Meta(() => ({ title: 'Login' }))

export const getServerSideProps = combineGssp<any>(
  async ({ locale = 'vn' }) => ({
    props: {
      ...(await serverSideTranslations(locale)),
    },
  })
)

export default Page
