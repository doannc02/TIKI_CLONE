import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteCashRounding from '../DialogDeleteCashRounding'
import useSaveCashRounding from './useSaveCashRounding'

const SaveCashRounding = () => {
  const { t } = useTranslation('accounting/cash-rounding')
  const [values, handles] = useSaveCashRounding()
  const {
    id,
    control,
    isUpdate,
    isLoadingSubmit,
    methodForm,
    isLoadingAccountSelect,
    accountSelect,
  } = values

  const { watch } = methodForm
  const { onSubmit, onCancel } = handles
  const router = useRouter()
  const { actionType } = router.query
  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
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

          {!router.asPath.includes('/addNew') && (
            <TopAction
              actionList={['edit', 'delete']}
              onEditAction={() => {
                router.replace({
                  pathname: `${MENU_URL.CONFIG.MANAGE.CASH_ROUNDING}/[id]`,
                  query: {
                    id,
                  },
                })
              }}
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteCashRounding id={id} refetch={router.back} />
                )
              }
            />
          )}
        </div>
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
              inputProps={{
                maxLength: 250,
              }}
              required
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='roundingPrecision'
              type='number'
              label='Làm tròn chính xác'
              placeholder='Nhập số chính xác'
              required
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              control={control}
              name='roundingMethod'
              label='Phương pháp làm tròn'
              placeholder='Chọn phương pháp làm tròn'
              required
              rules={{ required: t('common:validation.required') }}
              options={[
                {
                  label: 'UP',
                  value: 'UP',
                },
                {
                  label: 'DOWN',
                  value: 'DOWN',
                },
                {
                  label: 'HALF_UP',
                  value: 'HALF_UP',
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              control={control}
              name='roundingStrategy'
              label='Chiến lược làm tròn'
              placeholder='Chọn chiến lược làm tròn'
              required
              rules={{ required: t('common:validation.required') }}
              options={[
                {
                  label: 'Thêm làm tròn theo dòng',
                  value: 'DO_THE_LINE',
                },
                {
                  label: 'Chỉnh tiền thuế',
                  value: 'EARN_MONEY',
                },
              ]}
            />
          </Grid>

          {watch('roundingStrategy') === 'DO_THE_LINE' && (
            <>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreAutocomplete
                  control={control}
                  name='profitAccountId'
                  label='Tài khoản lợi nhuận'
                  placeholder='Chọn tài khoản lợi nhuận'
                  valuePath='id'
                  labelPath='name'
                  loading={isLoadingAccountSelect}
                  options={accountSelect}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreAutocomplete
                  control={control}
                  name='lossAccountId'
                  label='Tài khoản lỗ'
                  placeholder='Chọn tài khoản lỗ'
                  valuePath='id'
                  labelPath='name'
                  labelPath2='code'
                  loading={isLoadingAccountSelect}
                  options={accountSelect}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreInput
              multiline
              control={control}
              name='description'
              label='Mô tả'
              placeholder='Mô tả'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreSwitch control={control} name='activated' />
          </Grid>
        </Grid>

        {actionType !== 'VIEW' && (
          <div className='space-x-12 text-center mt-10'>
            <ButtonCustom theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </ButtonCustom>
            <ButtonCustom
              theme='submit'
              type='submit'
              loading={isLoadingSubmit}
            >
              {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
            </ButtonCustom>
          </div>
        )}
      </form>
    </PageContainer>
  )
}

export default SaveCashRounding
