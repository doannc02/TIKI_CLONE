import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useEntryList from './useEntryList'

const EntryList = () => {
  const { t } = useTranslation('accounting/entry-list')

  const [values, handles] = useEntryList()

  const {
    isLoadingPartners,
    partnerSelect,
    isLoadingReconcile,
    methodForm,
    methodFormTable,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoading,
  } = values
  const { control, reset } = methodForm
  const { onSubmit, onChangePageSize, onReset, onReconcile } = handles

  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('title')}</Typography>
          </div>
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
              <CoreAutocomplete
                control={control}
                name='partnerId'
                label='Khách hàng'
                placeholder='Chọn khách hàng'
                labelPath2='code'
                required
                valuePath='id'
                labelPath='name'
                loading={isLoadingPartners}
                options={partnerSelect}
                genus='small'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <CoreCheckbox name='isMatching' control={control} label='Khớp' />
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

        <div className='flex'>
          <ButtonCustom
            theme='submit'
            onClick={onReconcile}
            textTransform='none'
            height={36}
            disabled={methodFormTable.watch('accountMoveLine').length < 1}
            loading={isLoadingReconcile}
          >
            Đối soát
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
          isLoading={isLoading}
        />
      </div>
    </PageContainer>
  )
}

export default EntryList
