import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CustomerInvoicePrint from '@/components/templates/Accounting/Customer/CustomerInvoice/CustomerInvoicePrint'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <CustomerInvoicePrint />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Customer Invoice Print' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Page
