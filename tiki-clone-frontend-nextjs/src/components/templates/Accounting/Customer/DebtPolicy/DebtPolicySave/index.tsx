import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { TopAction } from '@/components/molecules/TopAction'
import PageContainer from '@/components/organism/PageContainer'
import { timeType } from '@/enum'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteDebtPolicy from '../DialogDeleteDebtPolicy'
import useDebtPolicySave from './useDebtPolicySave'

const DebtPolicySave = () => {
  const { t } = useTranslation('accounting/debt-policy')
  const [values, handles] = useDebtPolicySave()
  const {
    id,
    isUpdate,
    fields,
    isLoadingSubmit,
    methodForm,
    currency,
    isLoadingPartners,
    partnerSelect,
    paymentTermSelect,
    isLoadingPaymentTerm,
  } = values

  const { control, watch } = methodForm
  const { onSubmit, onDraftSubmit, onCancel, append, remove } = handles
  const { showDialog } = useDialog()
  const router = useRouter()
  const { actionType } = router.query

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
            prevUrl={MENU_URL.CUSTOMER.POLICY}
          />

          {!router.asPath.includes('/addNew') && (
            <TopAction
              actionList={['edit', 'delete']}
              onEditAction={() => {
                router.replace({
                  pathname: `${MENU_URL.CUSTOMER.POLICY}/[id]`,
                  query: {
                    id,
                  },
                })
              }}
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteDebtPolicy id={id} refetch={router.back} />
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
              label='Tên chính sách'
              placeholder='Nhập tên chính sách'
              rules={{
                required: t('common:validation.required'),
              }}
              inputProps={{ maxLength: 255 }}
              required
              readOnly={watch('status') !== 'DRAFT'}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='maximumDebtAmount'
              label='Hạn mức nợ'
              placeholder='Nhập hạn mức nợ'
              type='number'
              required
              rules={{
                required: t('common:validation.required'),
              }}
              InputProps={{
                endAdornment: (
                  <Typography variant='body2'>{currency}</Typography>
                ),
              }}
              readOnly={watch('status') !== 'DRAFT'}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='timeRepayDebt'
              label='Thời gian miễn phạt'
              placeholder='Nhập thời gian miễn phạt'
              type='number'
              required
              rules={{
                required: t('common:validation.required'),
              }}
              InputProps={{
                style: { paddingRight: 0 },
                endAdornment:
                  actionType === 'VIEW' ? (
                    <Typography variant='body2'>
                      {
                        timeType.find((ele) => ele.value === watch('timeType'))
                          ?.label
                      }
                    </Typography>
                  ) : (
                    <CoreAutocomplete
                      InputProps={{
                        style: {
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          minWidth: 100,
                        },
                      }}
                      control={control}
                      name='timeType'
                      placeholder='Ngày'
                      disableClearable
                      options={timeType}
                      rules={{
                        required: t('common:validation.required'),
                      }}
                      hasMessageError={false}
                      readOnly={watch('status') !== 'DRAFT'}
                    />
                  ),
              }}
              readOnly={watch('status') !== 'DRAFT'}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              control={control}
              name='paymentTermId'
              label='Điều khoản thanh toán'
              placeholder='Chọn điều khoản thanh toán'
              valuePath='id'
              labelPath='name'
              loading={isLoadingPaymentTerm}
              options={paymentTermSelect}
              readOnly={watch('status') !== 'DRAFT'}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <DatePickerCustom
              control={control}
              name='timeApplyPolicy'
              title='Thời gian bắt đầu chính sách'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
              required
              rules={{
                required: t('common:validation.required'),
              }}
              readOnly={watch('status') !== 'DRAFT'}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              multiple
              control={control}
              name='partnerIds'
              label='Khách hàng áp dụng'
              placeholder='Chọn dánh sách khách hàng áp dụng'
              loading={isLoadingPartners}
              labelPath='name'
              valuePath='id'
              options={partnerSelect}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              readOnly={watch('status') !== 'DRAFT'}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle1'>Phạt trả chậm</Typography>
          </Grid>
        </Grid>

        {fields.map((field, index) => {
          return (
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              key={field.key}
              style={{
                marginTop: 10,
              }}
            >
              <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
                <CoreInput
                  control={control}
                  name={`policyLines.${index}.deferredPaymentPeriod`}
                  label='Thời gian trả chậm'
                  placeholder='Nhập thời gian'
                  type='number'
                  required
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  InputProps={{
                    style: { paddingRight: 0 },
                    endAdornment:
                      actionType === 'VIEW' ? (
                        <Typography variant='body2'>
                          {
                            timeType.find(
                              (ele) =>
                                ele.value ===
                                watch(
                                  `policyLines.${index}.timeTypeDeferredPaymentPeriod`
                                )
                            )?.label
                          }
                        </Typography>
                      ) : (
                        <CoreAutocomplete
                          InputProps={{
                            style: {
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                              minWidth: 100,
                            },
                          }}
                          control={control}
                          name={`policyLines.${index}.timeTypeDeferredPaymentPeriod`}
                          placeholder='Ngày'
                          disableClearable
                          options={timeType}
                          hasMessageError={false}
                          readOnly={watch('status') !== 'DRAFT'}
                        />
                      ),
                  }}
                  readOnly={watch('status') !== 'DRAFT'}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
                <CoreInput
                  control={control}
                  name={`policyLines.${index}.punish`}
                  label='Phạt'
                  type='number'
                  placeholder='Nhập phần trăm phạt'
                  InputProps={{
                    endAdornment: <Typography variant='body2'>%</Typography>,
                  }}
                  required
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  readOnly={watch('status') !== 'DRAFT'}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={1} lg={1}>
                <div className='flex items-center h-full'>
                  {index > 0 ? (
                    <Action
                      actionList={['append', 'remove']}
                      onAppendAction={() => {
                        append({
                          deferredPaymentPeriod: 0,
                          punish: 0,
                          timeTypeDeferredPaymentPeriod: 'DAYS',
                        })
                      }}
                      onRemoveAction={() => {
                        remove(index)
                      }}
                    />
                  ) : (
                    <Action
                      actionList={['append']}
                      onAppendAction={() => {
                        append({
                          deferredPaymentPeriod: 0,
                          punish: 0,
                          timeTypeDeferredPaymentPeriod: 'DAYS',
                        })
                      }}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          )
        })}

        {actionType !== 'VIEW' && (
          <div className='space-x-12 text-center mt-15'>
            <ButtonCustom
              theme='cancel'
              onClick={onCancel}
              disabled={watch('status') !== 'DRAFT'}
            >
              {t('common:btn.cancel')}
            </ButtonCustom>

            <ButtonCustom
              theme='cancel'
              loading={isLoadingSubmit}
              onClick={onDraftSubmit}
              disabled={watch('status') !== 'DRAFT'}
            >
              {t('common:btn.draft')}
            </ButtonCustom>
            <ButtonCustom
              theme='submit'
              type='submit'
              loading={isLoadingSubmit}
              disabled={watch('status') !== 'DRAFT'}
            >
              {t('common:btn.confirm')}
            </ButtonCustom>
          </div>
        )}
      </form>
    </PageContainer>
  )
}

export default DebtPolicySave
