import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { TableDebt } from './TableDebt'
import useDebtPayableList from './useDebtPayableList'

const DebtPayableList = () => {
  const { t } = useTranslation('accounting/debt-payable')
  const [values, handles] = useDebtPayableList()
  const router = useRouter()

  const {
    queryPage,
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
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('title')}</Typography>
          </div>
          <div></div>
        </div>
      }
    >
      <div className='flex flex-col' key='list'>
        <form onSubmit={onSubmit} className='flex flex-col mb-15'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='vendor'
                label='Nhà cung cấp'
                placeholder='Chọn nhà cung cấp'
                labelPath2='code'
                fetchDataFn={getPartnerList}
                params={{
                  isVendor: true,
                }}
                genus='small'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <DatePickerCustom
                control={control}
                name='start'
                title='Từ ngày'
                placeholder='Chọn ngày'
                format='YYYY-MM-DD'
                genus='small'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
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
          onRowClick={(id: number, row: any) => {
            router.push({
              pathname: `${MENU_URL.DEBT.PAYABLE}/[id]`,
              query: {
                id,
                start: queryPage?.start,
                end: queryPage?.end,
                partner: row.partner,
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default DebtPayableList
