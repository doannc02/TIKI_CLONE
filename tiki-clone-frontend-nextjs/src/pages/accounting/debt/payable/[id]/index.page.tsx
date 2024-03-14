import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import DebtPayableDetail from '@/components/templates/Accounting/Debt/DebtPayable/DebtPayableDetail'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DebtPayableDetail />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Chi tiết công nợ' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/debt-payable',
      ])),
    },
  }
}

export default Page
