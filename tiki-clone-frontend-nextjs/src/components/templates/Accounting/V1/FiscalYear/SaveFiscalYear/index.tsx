import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import PageContainer from '@/components/organism/PageContainer'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import useSaveDiaryEntry from './useFiscalYear'

const SaveFiscalYear = () => {
  const { t } = useTranslation('accounting/fiscal-year')
  const [values, handles] = useSaveDiaryEntry()
  const { control, isUpdate, isLoadingSubmit } = values
  const { onSubmit, onCancel } = handles

  const router = useRouter()
  const { actionType } = router.query

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          textCurrent={
            isUpdate
              ? actionType === 'VIEW'
                ? t('common:detail')
                : t('common:btn.edit')
              : t('common:btn.add')
          }
          textPrev={t('title')}
        />
      }
    >
      <form
        className='block bg-[#ffffff] mt-17 rounded-xl max-w-[900px] mx-auto'
        onSubmit={onSubmit}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='name'
              label='Tên'
              placeholder='Nhập tên'
              required
              rules={{ required: t('common:validation.required') }}
              inputProps={{
                maxLength: 250,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <DatePickerCustom
              control={control}
              name='startDate'
              title='Ngày bắt đầu'
              placeholder='Chọn ngày bắt đầu'
              format='YYYY-MM-DD'
              required
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <DatePickerCustom
              control={control}
              name='endDate'
              title='Ngày bắt đầu'
              placeholder='Chọn ngày bắt đầu'
              format='YYYY-MM-DD'
              required
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreSwitch control={control} name='activated' />
          </Grid>
        </Grid>

        <div className='space-x-12 text-center mt-10'>
          <ButtonCustom theme='cancel' onClick={onCancel}>
            {t('common:btn.cancel')}
          </ButtonCustom>
          <ButtonCustom theme='submit' type='submit' loading={isLoadingSubmit}>
            {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
          </ButtonCustom>
        </div>
      </form>
    </PageContainer>
  )
}

export default SaveFiscalYear
