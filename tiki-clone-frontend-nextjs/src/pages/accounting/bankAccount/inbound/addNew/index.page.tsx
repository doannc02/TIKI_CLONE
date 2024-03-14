import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import SaveBankAccount from '@/components/templates/Accounting/BankAccount/SaveBankAccount'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveBankAccount />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Create Bank Account' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/bank-account',
      ])),
    },
  }
}

export default Page
