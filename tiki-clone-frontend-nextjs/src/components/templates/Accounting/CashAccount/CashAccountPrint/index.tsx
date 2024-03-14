import { CoreBreadcrumbsV2 } from '@/components/atoms/CoreBreadcrumbsV2'
import LoadingPage from '@/components/atoms/LoadingPage'
import PageContainer from '@/components/organism/PageContainer'
import { printWorkerUrl } from '@/config/print'
import { MENU_URL } from '@/routes'
import { useQueryGetReceiptPaymentPrint } from '@/service/accounting/print/receiptPayment'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useCheckPath } from '@/path'

const CashAccountPrint = () => {
  const { t } = useTranslation('accounting/customer-payment')
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const router = useRouter()
  const id = Number(router.query?.id)
  const paymentName = router.query?.paymentName as string

  const { paymentType } = useCheckPath()

  const { isLoading, data } = useQueryGetReceiptPaymentPrint(
    {
      id,
    },
    {
      enabled: !!id,
    }
  )
  return (
    <PageContainer
      title={
        <CoreBreadcrumbsV2
          breadcrumbsData={[
            {
              title: t('title'),
              onClick: () =>
                router.push({
                  pathname: MENU_URL.CASH_ACCOUNT[paymentType],
                }),
            },
            {
              title: paymentName,
              onClick: () => {
                router.push({
                  pathname: `${MENU_URL.CASH_ACCOUNT[paymentType]}/[id]`,
                  query: {
                    id,
                  },
                })
              },
            },
            { title: 'Print' },
          ]}
        />
      }
    >
      {isLoading && <LoadingPage />}

      {data?.data.url && (
        <div>
          <Worker workerUrl={printWorkerUrl}>
            <Viewer
              plugins={[defaultLayoutPluginInstance]}
              fileUrl={data?.data.url}
            />
          </Worker>
        </div>
      )}
    </PageContainer>
  )
}

export default CashAccountPrint
