import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DialogDebtPayment from '../DialogDebtPayment'
import useDebtInvoiceSale from './useDebtInvoiceSale'

const DebtInvoiceSale = () => {
  const { t } = useTranslation('accounting/debt-receivable')
  const [values, handles] = useDebtInvoiceSale()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    methodFormTable,
  } = values
  const { control } = methodForm

  const { showDialog, onSubmit, onChangePageSize, onReset, refetch } = handles

  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('titleInvoice')}</Typography>
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
                name='code'
                label='Mã hóa đơn'
                placeholder='Nhập từ khóa'
                genus='small'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <DatePickerCustom
                control={control}
                name='date'
                title='Ngày lập'
                placeholder='Chọn ngày'
                format='YYYY-MM-DD'
                genus='small'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <DatePickerCustom
                control={control}
                name='dueDate'
                title='Ngày đến hạn'
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

        <div className='flex justify-between flex-row-reverse'>
          <ButtonCustom
            theme='submit'
            type='button'
            textTransform='none'
            height={36}
            onClick={() =>
              showDialog(
                <DialogDebtPayment
                  saleOrderId={[]}
                  invoiceId={methodFormTable.watch('checkedList') ?? []}
                  refetchDebtSale={refetch}
                  refetchDebtException={() => {}}
                />
              )
            }
            disabled={methodFormTable.watch('checkedList').length < 1}
          >
            Thanh toán
          </ButtonCustom>
        </div>

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
        />
      </div>
    </PageContainer>
  )
}

export default DebtInvoiceSale
