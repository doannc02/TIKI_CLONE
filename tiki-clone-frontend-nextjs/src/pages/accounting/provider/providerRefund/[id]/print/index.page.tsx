import LoadingPage from '@/components/atoms/LoadingPage'
import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

type Props = HttpResponse<null>

const ProviderRefundPrint = dynamic(
  () =>
    import(
      '@/components/templates/Accounting/Provider/ProviderRefund/ProviderRefundPrint/index'
    ).then((component) => component.default),
  {
    ssr: false,
    loading: () => (
      <div className='min-h-screen flex flex-col justify-center'>
        <LoadingPage />
      </div>
    ),
  }
)

const Page: NextPageWithLayout<Props> = () => <ProviderRefundPrint />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Provider Refund Print' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Page
