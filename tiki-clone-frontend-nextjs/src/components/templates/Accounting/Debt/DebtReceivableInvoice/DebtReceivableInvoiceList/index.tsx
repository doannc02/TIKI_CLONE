import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useDebtReceivableInvoiceList from './useDebtReceivableInvoiceList'

const DebtReceivableInvoiceList = () => {
  const { t } = useTranslation('accounting/debt-receivable-invoice')
  const [values, handles] = useDebtReceivableInvoiceList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    isLoadingPartners,
    partnerSelect,
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
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col mb-15'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
                genus='small'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <DatePickerCustom
                control={control}
                name='start'
                title='Ngày lập hóa đơn (từ)'
                placeholder='Chọn ngày'
                // format='YYYY-MM-DD'
                genus='small'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <DatePickerCustom
                control={control}
                name='end'
                title='Ngày lập hóa đơn (đến)'
                placeholder='Chọn ngày'
                //format='YYYY-MM-DD'
                genus='small'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='account'
                label='Tài khoản'
                placeholder='Chọn tài khoản'
                genus='small'
                //loading={isLoadingPartners}
                options={[
                  {
                    label: '331 - Tài khoản trả',
                    value: 'PAYABLE',
                  },
                  {
                    label: '131 - Tài khoản thu',
                    value: 'RECEIVE',
                  },
                ]}
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
          isLoading={isLoadingTable}
          isShowColumnStt
        />
      </div>
    </PageContainer>
  )
}

export default DebtReceivableInvoiceList
