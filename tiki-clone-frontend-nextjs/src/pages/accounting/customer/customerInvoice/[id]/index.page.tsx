import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import SaveCustomerInvoice from '@/components/templates/Accounting/Customer/CustomerInvoice/SaveCustomerInvoice'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveCustomerInvoice />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Update' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/customer-invoice',
      ])),
    },
  }
}

export default Page
