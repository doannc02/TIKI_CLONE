import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import DebtPolicySave from '@/components/templates/Accounting/Customer/DebtPolicy/DebtPolicySave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DebtPolicySave />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Chính sách cấp công nợ' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/debt-policy',
      ])),
    },
  }
}

export default Page
