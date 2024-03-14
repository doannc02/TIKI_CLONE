import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { paymentStatusEnum } from '@/enum'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useProviderInvoiceList from './useProviderInvoiceList'

const ProviderInvoiceList = () => {
  const { t } = useTranslation('accounting/provider-invoice')

  const [values, handles] = useProviderInvoiceList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
  } = values
  const { control, reset } = methodForm

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
            onClick={() => router.push(`${MENU_URL.PROVIDER.INVOICE}/addNew`)}
          >
            {t('common:btn.add')}
          </ButtonCustom>
        </div>
      }
    >
      <form onSubmit={onSubmit} className='flex flex-col'>
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
            <CoreAutocomplete
              control={control}
              name='paymentStatus'
              label='Thanh toán'
              placeholder='Chọn thanh toán'
              genus='small'
              options={paymentStatusEnum}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <DatePickerCustom
              control={control}
              name='startDate'
              title='Ngày lập hóa đơn (từ)'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
              genus='small'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <DatePickerCustom
              control={control}
              name='endDate'
              title='Ngày lập hóa đơn (đến)'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
              genus='small'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <DatePickerCustom
              control={control}
              name='startDueDate'
              title='Ngày đến hạn (từ)'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
              genus='small'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <DatePickerCustom
              control={control}
              name='endDueDate'
              title='Ngày đến hạn (đến)'
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
        onRowClick={(id: number) => {
          router.push({
            pathname: `${MENU_URL.PROVIDER.INVOICE}/[id]`,
            query: {
              id,
              actionType: 'VIEW',
            },
          })
        }}
      />
    </PageContainer>
  )
}

export default ProviderInvoiceList
