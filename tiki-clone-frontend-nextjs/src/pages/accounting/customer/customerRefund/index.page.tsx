import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CustomerRefundList from '@/components/templates/Accounting/Customer/CustomerRefund/CustomerRefundList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <CustomerRefundList />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Customer Refund List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/customer-refund',
      ])),
    },
  }
}

export default Page
