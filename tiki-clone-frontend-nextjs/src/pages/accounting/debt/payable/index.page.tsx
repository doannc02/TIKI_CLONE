import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import DebtPayableList from '@/components/templates/Accounting/Debt/DebtPayable/DebtPayableList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DebtPayableList />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Công nợ phải trả' }))

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
