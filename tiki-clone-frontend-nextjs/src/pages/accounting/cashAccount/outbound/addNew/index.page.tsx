import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import SaveCashAccount from '@/components/templates/Accounting/CashAccount/SaveCashAccount'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveCashAccount />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Create Cash Account' }))

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
