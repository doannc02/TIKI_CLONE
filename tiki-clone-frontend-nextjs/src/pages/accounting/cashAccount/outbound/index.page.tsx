import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CashAccountList from '@/components/templates/Accounting/CashAccount/CashAccountList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <CashAccountList />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Cash Account List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/cash-account',
      ])),
    },
  }
}

export default Page
