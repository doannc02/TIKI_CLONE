import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import ProviderRefundList from '@/components/templates/Accounting/Provider/ProviderRefund/ProviderRefundList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ProviderRefundList />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Provider Refund List' }))

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
