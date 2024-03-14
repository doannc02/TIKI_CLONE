import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageContainer from '@/components/organism/PageContainer'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { getCurrencyOfCompany } from '@/service/common/company/getListCurrency'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogCfEditBalance from '../../DialogCfEditBalance'
import DialogDeleteBalance from '../../DialogDeleteBalance'
import useSaveCOPDebtBalance from './useSaveCOPDebtBalance'
import { postCheckMappingBalance } from '@/service/accounting/accountMoveLine/checkMapping'

const SaveCOPDebtBalance = () => {
  const { t } = useTranslation('accounting/cop-balance')
  const [values, handles] = useSaveCOPDebtBalance()
  const { id, isUpdate, actionType, currencyId, methodForm, isLoadingSubmit } =
    values

  const { watch, control, trigger } = methodForm
  const { onSubmit, onCancel } = handles
  const router = useRouter()
  const { balanceTypePath } = useCheckPath()
  const { showDialog } = useDialog()

  return (
    <PageContainer
      isTopView
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            prevUrl={MENU_URL.BALANCE[balanceTypePath]}
            textCurrent={
              isUpdate
                ? actionType === 'VIEW'
                  ? t('common:detail')
                  : t('common:btn.edit')
                : t('common:btn.add')
            }
            textPrev={
              balanceTypePath === 'CUSTOMER'
                ? t('title_customer')
                : t('title_provider')
            }
          />
          {!router.asPath.includes('/addNew') && (
            <TopAction
              actionList={['edit', 'delete']}
              onEditAction={async () => {
                if (isUpdate) {
                  const { data } = await postCheckMappingBalance({
                    id,
                  })
                  if (data && data.isHaveMatching) {
                    showDialog(
                      <DialogCfEditBalance
                        id={id}
                        refetch={() => {
                          router.replace({
                            pathname: `${MENU_URL.BALANCE.BANK_BALANCE}/[id]`,
                            query: {
                              id,
                            },
                          })
                        }}
                      />
                    )
                  }
                }
              }}
              onDeleteAction={() => {
                showDialog(
                  <DialogDeleteBalance
                    id={id}
                    beginType={
                      balanceTypePath === 'CUSTOMER' ? 'CUSTOMER' : 'VENDOR'
                    }
                    refetch={() => {
                      router.push({
                        pathname: MENU_URL.BALANCE.BANK_BALANCE,
                      })
                    }}
                  />
                )
              }}
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
            <CoreAutoCompleteAPI
              control={control}
              name='account'
              label='Số tài khoản'
              placeholder='Chọn số tài khoản'
              fetchDataFn={getAccountList}
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutoCompleteAPI
              control={control}
              name='currencySource'
              label='Tiền tệ'
              placeholder='Chọn tiền tệ'
              fetchDataFn={getCurrencyOfCompany}
              required
              rules={{
                required: t('common:validation.required'),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutoCompleteAPI
              control={control}
              name='partner'
              label={
                balanceTypePath === 'CUSTOMER' ? 'Khách hàng' : 'Nhà cung cấp'
              }
              labelPath2='code'
              placeholder={
                balanceTypePath === 'CUSTOMER'
                  ? 'Chọn khách hang'
                  : 'Chọn nhà cung cấp'
              }
              fetchDataFn={getPartnerList}
              params={
                balanceTypePath === 'CUSTOMER'
                  ? { isCustomer: true }
                  : {
                      isVendor: true,
                    }
              }
              required
              rules={{
                required: t('common:validation.required'),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}></Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='amountSourceDebit'
              label='Dư nợ'
              type='number'
              placeholder='Nhập số dư nợ'
              rules={{
                required: t('common:validation.required'),
                validate: (val: number) => {
                  if (val === 0 && watch('amountSourceCredit') === 0)
                    return 'Dư nợ hoặc dư có phải khác 0.'
                  else if (val !== 0 && watch('amountSourceCredit') !== 0)
                    return 'Dư nợ hoặc dư có phải bằng 0.'
                },
              }}
              onAfterChangeValue={() => trigger('amountSourceCredit')}
              required
            />
          </Grid>

          {watch('currencySource')?.id !== currencyId && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='debit'
                type='number'
                label='Dư nợ quy đổi'
                placeholder='Nhập số dư nợ quy đổi'
                rules={{
                  required: t('common:validation.required'),
                  validate: (val: number) => {
                    if (val === 0 && watch('credit') === 0)
                      return 'Dư nợ gốc hoặc dư có gốc phải khác 0.'
                    else if (val !== 0 && watch('credit') !== 0)
                      return 'Dư nợ gốc hoặc dư có gốc phải bằng 0.'
                  },
                }}
                required
                onAfterChangeValue={() => trigger('amountSourceCredit')}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='amountSourceCredit'
              label='Dư có'
              type='number'
              placeholder='Nhập số dư có'
              rules={{
                required: t('common:validation.required'),
                validate: (val: number) => {
                  if (val === 0 && watch('amountSourceDebit') === 0)
                    return 'Dư nợ hoặc dư có phải khác 0.'
                  else if (val !== 0 && watch('amountSourceDebit') !== 0)
                    return 'Dư nợ hoặc dư có phải bằng 0.'
                },
              }}
              onAfterChangeValue={() => trigger('amountSourceDebit')}
              required
            />
          </Grid>

          {watch('currencySource')?.id !== currencyId && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='credit'
                type='number'
                label='Dư có gốc'
                placeholder='Nhập số dư có gốc'
                rules={{
                  required: t('common:validation.required'),
                  validate: (val: number) => {
                    if (val === 0 && watch('debit') === 0)
                      return 'Dư nợ gốc hoặc dư có gốc phải khác 0.'
                    else if (val !== 0 && watch('debit') !== 0)
                      return 'Dư nợ gốc hoặc dư có gốc phải bằng 0.'
                  },
                }}
                required
                onAfterChangeValue={() => trigger('debit')}
              />
            </Grid>
          )}
        </Grid>

        {actionType !== 'VIEW' && (
          <div className='space-x-12 text-center mt-15'>
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

export default SaveCOPDebtBalance
