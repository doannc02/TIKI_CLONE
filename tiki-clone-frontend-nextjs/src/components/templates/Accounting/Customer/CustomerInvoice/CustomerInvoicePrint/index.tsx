import { CoreBreadcrumbsV2 } from '@/components/atoms/CoreBreadcrumbsV2'
import LoadingPage from '@/components/atoms/LoadingPage'
import PageContainer from '@/components/organism/PageContainer'
import { printWorkerUrl } from '@/config/print'
import { MENU_URL } from '@/routes'
import { useQueryGetInvoicePrint } from '@/service/accounting/print/invoice'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const CustomerInvoicePrint = () => {
  const { t } = useTranslation('accounting/customer-invoice')
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const router = useRouter()
  const id = Number(router.query?.id)
  const invoiceName = router.query?.invoiceName as string

  const { isLoading, data } = useQueryGetInvoicePrint(
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
                  pathname: MENU_URL.CUSTOMER.INVOICE,
                }),
            },
            {
              title: invoiceName,
              onClick: () => {
                router.push({
                  pathname: `${MENU_URL.CUSTOMER.INVOICE}/[id]`,
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

export default CustomerInvoicePrint
