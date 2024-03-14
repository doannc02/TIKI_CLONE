import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageContainer from '@/components/organism/PageContainer'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { getAccountTypeList } from '@/service/accounting/accountType/getList'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteAccountSystemConfig from '../DialogDeleteAccountSystemConfig'
import useSaveAccountingSystemConfig from './useSaveAccountingSystemConfig'

const SaveAccountingSystemConfig = () => {
  const { t } = useTranslation('accounting/accounting-system-config')
  const [values, handles] = useSaveAccountingSystemConfig()
  const { id, methodForm, isUpdate, isLoadingSubmit, isView } = values
  const { control, setValue } = methodForm
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
              actionList={isView ? ['edit', 'delete'] : ['delete']}
              onEditAction={() => {
                router.replace({
                  pathname: `${MENU_URL.CONFIG.ACCOUNTING.SYSTEM}/[id]`,
                  query: {
                    id,
                  },
                })
              }}
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteAccountSystemConfig
                    id={Number(id)}
                    refetch={router.back}
                  />
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
              name='code'
              required
              label='Mã'
              placeholder='Nhập mã'
              rules={{
                required: t('common:validation.alias'),
                validate: {
                  isCode: (v: string) =>
                    REGEX.CODE.test(v) || t('common:validation.alias'),
                },
              }}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='name'
              required
              label='Tên tài khoản'
              placeholder='Nhập tên tài khoản'
              inputProps={{
                maxLength: 250,
              }}
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutoCompleteAPI
              name='accountType'
              control={control}
              label='Kiểu'
              placeholder='Type'
              fetchDataFn={getAccountTypeList}
              onChangeValue={(val) => {
                if (val === 'ASSET_CASH') {
                  setValue('isAllowedReconcile', false)
                }
              }}
            />
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

export default SaveAccountingSystemConfig
