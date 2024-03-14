import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import SaveCustomerRefund from '@/components/templates/Accounting/Customer/CustomerRefund/SaveCustomerRefund'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveCustomerRefund />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Update Customer Refund' }))

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
