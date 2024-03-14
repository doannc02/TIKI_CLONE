import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TableDebt } from './TableDebt'
import useDebtReceivableDetail from './useDebtReceivableDetail'

const DebtReceivableDetail = () => {
  const { t } = useTranslation('accounting/debt-receivable')
  const [values, handles] = useDebtReceivableDetail()

  const {
    id,
    partner,
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    isLoadingGetTotalDebt,
    totalDebt,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset } = handles
  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            prevUrl={MENU_URL.DEBT.RECEIVABLE}
            textCurrent={partner ?? 'CHI TIẾT CÔNG NỢ PHẢI THU'}
            textPrev={t('title')}
          />
        </div>
      }
    >
      {id && (
        <div className='flex flex-col' key='detail'>
          <form onSubmit={onSubmit} className='flex flex-col mb-15'>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DatePickerCustom
                  control={control}
                  name='start'
                  title='Từ ngày'
                  placeholder='Chọn ngày'
                  format='YYYY-MM-DD'
                  genus='small'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DatePickerCustom
                  control={control}
                  name='end'
                  title='Đến ngày'
                  placeholder='Chọn ngày'
                  format='YYYY-MM-DD'
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

          <TableDebt
            columns={columns}
            data={tableData}
            onChangePageSize={onChangePageSize}
            paginationHidden={tableData.length < 1}
            totalPages={totalPages}
            page={page}
            size={size}
            isLoading={isLoadingTable}
            isShowColumnStt
            totalDebt={totalDebt}
          />
        </div>
      )}
    </PageContainer>
  )
}

export default DebtReceivableDetail
