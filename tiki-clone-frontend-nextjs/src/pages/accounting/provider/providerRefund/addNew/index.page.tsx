import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import SaveProviderRefund from '@/components/templates/Accounting/Provider/ProviderRefund/SaveProviderRefund'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveProviderRefund />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Create Provider Refund' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/provider-refund',
      ])),
    },
  }
}

export default Page
