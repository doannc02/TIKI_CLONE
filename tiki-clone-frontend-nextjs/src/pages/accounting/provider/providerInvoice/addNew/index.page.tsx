import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import SaveProviderInvoice from '@/components/templates/Accounting/Provider/ProviderInvoice/SaveProviderInvoice'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveProviderInvoice />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Create Provider Invoice' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/provider-invoice',
      ])),
    },
  }
}

export default Page
