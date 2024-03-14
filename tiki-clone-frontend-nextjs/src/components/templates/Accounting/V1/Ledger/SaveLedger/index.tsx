import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteAccountTag from '../../AccountTag/DialogDeleteAccountTag'
import useSaveLedger from './useLedgerSave'
import { REGEX } from '@/helper/regex'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import DialogDeleteLedger from '../DialogDeleteLedger'

const SaveAccountLedger = () => {
  const { t } = useTranslation('accounting/account-ledger')
  const [values, handles] = useSaveLedger()
  const { id, control, isUpdate, isLoadingSubmit, isView } = values
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
                  pathname: `${MENU_URL.CONFIG.ACCOUNTING.LEDGER}/[id]`,
                  query: {
                    id,
                  },
                })
              }}
              onDeleteAction={() =>
                showDialog(<DialogDeleteLedger id={id} refetch={router.back} />)
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
              label='Mã sổ cái'
              placeholder='Nhập mã sổ cái'
              rules={{
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
              label='Tên thẻ'
              placeholder='Nhập tên thẻ'
              required
              inputProps={{
                maxLength: 250,
              }}
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreInput
              multiline
              control={control}
              name='description'
              label='Mô tả'
              placeholder='Mô tả'
              inputProps={{
                maxLength: 1000,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CoreCheckbox
                name='isUsedTaxReporting'
                control={control}
                label='Dùng cho báo cáo thuế'
              />
            </Grid>
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

export default SaveAccountLedger
