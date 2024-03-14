import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import usePaymentTermList from './usePaymentTermList'

const PaymentTermList = () => {
  const { t } = useTranslation('accounting/payment-term')
  const [values, handles] = usePaymentTermList()
  const { methodForm, columns, tableData, totalPages, size, page, isLoading } =
    values
  const { control } = methodForm
  const { typePath } = useCheckPath()

  const { onSubmit, onChangePageSize, onReset } = handles
  const router = useRouter()
  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('title')}</Typography>
          </div>
          <ButtonCustom
            theme='submit'
            variant='contained'
            textTransform='none'
            height={38}
            onClick={() =>
              router.push(`${MENU_URL[typePath].PAYMENT_TERM}/addNew`)
            }
          >
            {t('common:btn.add')}
          </ButtonCustom>
        </div>
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
                genus='small'
              />
            </Grid>
          </Grid>

          <div className='flex justify-center mt-15'>
            <div className='m-5'>
              <ButtonCustom
                onClick={onReset}
                theme='reset'
                textTransform='none'
                height={36}
              >
                Reset
              </ButtonCustom>
            </div>
            <div className='m-5'>
              <ButtonCustom
                theme='submit'
                type='submit'
                textTransform='none'
                height={36}
              >
                {t('common:Search')}
              </ButtonCustom>
            </div>
          </div>
        </form>

        <CustomTable
          className='mt-15'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoading}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL[typePath].PAYMENT_TERM}/[id]`,
              query: {
                id: id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default PaymentTermList
