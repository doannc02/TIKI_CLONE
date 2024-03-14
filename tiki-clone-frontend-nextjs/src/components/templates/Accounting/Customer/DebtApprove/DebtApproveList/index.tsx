import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { statusPolicyType } from '@/enum'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DialogViewPolicy from '../DialogViewPolicy'
import useDebtPolicyList from './useDebtApproveList'

const DebtApproveList = () => {
  const { t } = useTranslation('accounting/debt-approve')
  const [values, handles] = useDebtPolicyList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset, refetch } = handles
  const { showDialog } = useDialog()

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
              <DatePickerCustom
                control={control}
                name='timeApplyPolicy'
                title='Thời gian bắt đầu chính sách'
                placeholder='Chọn ngày'
                format='YYYY-MM-DD'
                genus='small'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='statusPolicy'
                label='Trạng thái'
                placeholder='Chọn trạng thái'
                options={statusPolicyType}
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
            showDialog(<DialogViewPolicy id={id} refetch={refetch} />)
          }}
        />
      </div>
    </PageContainer>
  )
}

export default DebtApproveList
