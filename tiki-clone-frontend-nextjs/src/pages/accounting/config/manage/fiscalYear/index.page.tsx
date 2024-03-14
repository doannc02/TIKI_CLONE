import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import FiscalYearList from '@/components/templates/Accounting/V1/FiscalYear/FiscalYearList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <FiscalYearList />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Fiscal Year List' }))

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
