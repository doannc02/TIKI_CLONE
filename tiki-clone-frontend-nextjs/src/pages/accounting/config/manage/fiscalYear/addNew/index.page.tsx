import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import SaveFiscalYear from '@/components/templates/Accounting/V1/FiscalYear/SaveFiscalYear'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveFiscalYear />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Create Fiscal Year' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/fiscal-year',
      ])),
    },
  }
}

export default Page
