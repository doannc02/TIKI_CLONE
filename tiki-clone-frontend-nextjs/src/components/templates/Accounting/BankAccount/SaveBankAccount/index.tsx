import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import ConvertCurrency from '@/components/atoms/ConvertCurrency'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import CustomStep from '@/components/atoms/CustomSteps'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { PRIMARY } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { Action } from '@/components/molecules/Action'
import { TopAction } from '@/components/molecules/TopAction'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { DialogAddSTKBank } from '@/components/templates/Accounting/Dialog/DialogAddSTKBank'
import DialogConfirmDraft from '@/components/templates/Accounting/Dialog/DialogConfirmDraft'
import DialogDeletePayment from '@/components/templates/Accounting/Dialog/DialogDeletePayment'
import { partnerType, paymentMethodSelect } from '@/enum'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { Grid, Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSaveBankAccount from './useSaveBankAccount'
import DialogHisUpdateList from '../../Dialog/DialogHistoryEditBound'
import { SelectBoxCustomV2 } from '@/components/atoms/SelectBoxCustomV2'
import {
  getIncomeList,
  getListObjectCurrency,
} from '@/service/accounting/accountMove/getListIncome'

const SaveBankAccount = () => {
  const { t } = useTranslation('accounting/bank-account')
  const [values, handles] = useSaveBankAccount()

  const { showDialog, hideDialog } = useDialog()
  const {
    id,
    isUpdate,
    tab,
    currencyId,
    currencyRateData,
    paymentData,
    accountMoveId,
    isLoadingAccountJournal,
    isLoadingPartners,
    isLoadingSubmit,
    partnerSelect,
    methodForm,
    columns,
    tableData,
    accountJournalSelect,
    isLoadingCurrencySelect,
    currencySelect,
    isLoadingUserLogin,
    bankSelect,
    incomeExpenseColumns,
  } = values
  const {
    setTab,
    onCancel,
    onSubmit,
    onDraftSubmit,
    refetch,
    refetchUserLoginData,
  } = handles
  const { control, getValues, watch, setValue } = methodForm
  const [isOpenDialogSTK, setIsOpenDialogSTK] = useState(false)
  const router = useRouter()
  const { actionType } = router.query
  const { paymentType } = useCheckPath()
  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            textPrev={
              paymentType === 'INBOUND'
                ? t('title.inbound')
                : t('title.outbound')
            }
            textCurrent={
              isUpdate ? getValues('code') ?? '' : t('common:btn.add')
            }
            prevUrl={MENU_URL.BANK_ACCOUNT[paymentType]}
          />

          {watch('state') === 'DRAFT' && !router.asPath.includes('/addNew') ? (
            <TopAction
              actionList={['edit', 'delete', 'history']}
              onEditAction={() => {
                router.replace({
                  pathname: `${MENU_URL.BANK_ACCOUNT[paymentType]}/[id]`,
                  query: {
                    id,
                  },
                })
              }}
              onDeleteAction={() => {
                showDialog(
                  <DialogDeletePayment
                    id={id}
                    refetch={() => {
                      router.push({
                        pathname: MENU_URL.BANK_ACCOUNT[paymentType],
                      })
                    }}
                  />
                )
              }}
              onHistoryAction={() => {
                showDialog(
                  <DialogHisUpdateList
                    code={watch('code')}
                    changeId={id}
                    historyType='PAYMENT'
                    refetch={() => {}}
                  />
                )
              }}
            />
          ) : !router.asPath.includes('/addNew') ? (
            <TopAction
              actionList={['history']}
              onHistoryAction={() => {
                showDialog(
                  <DialogHisUpdateList
                    code={watch('code')}
                    changeId={id}
                    historyType='PAYMENT'
                    refetch={() => {}}
                  />
                )
              }}
            />
          ) : (
            <></>
          )}
        </div>
      }
      action={
        <div className='bg-white flex justify-between w-full items-center'>
          <div className='flex gap-5'>
            {watch('state') === 'POSTED' && (
              <ButtonCustom
                theme='submit'
                variant='contained'
                textTransform='none'
                onClick={() => {
                  showDialog(
                    <DialogConfirmDraft
                      id={id}
                      type='PAYMENT'
                      refetch={refetch}
                    />
                  )
                }}
                height={38}
              >
                Đặt lại thành nháp
              </ButtonCustom>
            )}

            {paymentData && (
              <ButtonCustom
                theme='submit'
                textTransform='none'
                height={38}
                onClick={() => {
                  router.push({
                    pathname: `${MENU_URL.BANK_ACCOUNT[paymentType]}/[id]/print`,
                    query: {
                      id: id,
                      paymentName: getValues('code'),
                    },
                  })
                }}
              >
                In phiếu
              </ButtonCustom>
            )}
          </div>

          <CustomStep
            listStep={['NHÁP', 'ĐÃ VÀO SỔ']}
            index={
              watch('state') === 'DRAFT'
                ? 0
                : watch('state') === 'POSTED'
                ? 1
                : -1
            }
            enableNextStep={false}
          />
        </div>
      }
      className='px-0'
    >
      <div className='flex flex-col'>
        {watch('state') === 'DRAFT' && (
          <form className='flex flex-col p-15' onSubmit={onSubmit}>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreInput
                  control={control}
                  name='code'
                  label='Mã thanh toán'
                  placeholder='Nhập mã thanh toán'
                  readOnly={watch('state') === 'POSTED'}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutocomplete
                  control={control}
                  name='accountJournal'
                  label='Sổ kế toán'
                  placeholder='Chọn sổ kế toán'
                  valuePath='id'
                  labelPath='name'
                  loading={isLoadingAccountJournal}
                  options={accountJournalSelect}
                  required
                  rules={{ required: t('common:validation.required') }}
                  readOnly={watch('state') === 'POSTED'}
                  onChangeValue={(val) => {
                    if (val) {
                      setValue('paymentMethod', val.type)
                    }
                  }}
                  returnValueType='option'
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutocomplete
                  control={control}
                  name='paymentMethod'
                  label='Hình thức thanh toán'
                  placeholder='Chọn hình thức thanh toán'
                  options={paymentMethodSelect}
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutocomplete
                  control={control}
                  name='partnerType'
                  label='Loại đối tác'
                  placeholder='Chọn loại đối tác'
                  options={partnerType}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutocomplete
                  control={control}
                  name='partner'
                  label='Đối tác'
                  placeholder='Chọn đối tác'
                  required
                  valuePath='id'
                  labelPath='name'
                  loading={isLoadingPartners}
                  options={partnerSelect}
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  readOnly={watch('state') === 'POSTED'}
                  returnValueType='option'
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div className='flex flex-col gap-5'>
                  <CoreInput
                    control={control}
                    name='amount'
                    type='number'
                    label='Số tiền'
                    placeholder='Số tiền'
                    required
                    InputProps={{
                      style: { paddingRight: 0 },
                      endAdornment:
                        actionType === 'VIEW' ? (
                          <Typography variant='body2'>
                            {
                              currencySelect.find(
                                (ele) => ele.id === watch('currency')?.id
                              )?.name
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
                            name='currency'
                            placeholder='Đơn vị'
                            disableClearable
                            labelPath='name'
                            valuePath='id'
                            loading={isLoadingCurrencySelect}
                            options={currencySelect}
                            readOnly={watch('state') === 'POSTED'}
                            hasMessageError={false}
                            returnValueType='option'
                          />
                        ),
                    }}
                    rules={{
                      required: t('common:validation.required'),
                    }}
                    readOnly={watch('state') === 'POSTED'}
                  />

                  {watch('amount') &&
                    watch('currency')?.id !== currencyId &&
                    currencyRateData && (
                      <ConvertCurrency currencyRateData={currencyRateData} />
                    )}

                  {watch('amountSource') && watch('currencySource') && (
                    <Typography variant='body2'>
                      Số tiền đã được quy đổi:
                      <Link
                        style={{
                          textDecoration: 'none',
                        }}
                      >{` ${watch('amountSource')} ${watch(
                        'currencySource'
                      )} = ${watch('amount')} ${watch('currency')}`}</Link>
                    </Typography>
                  )}
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <DatePickerCustom
                  control={control}
                  name='paymentDate'
                  title='Ngày'
                  placeholder='Chọn ngày'
                  format='YYYY-MM-DD'
                  readOnly={watch('state') === 'POSTED'}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div className='flex flex-col gap-2'>
                  <CoreAutocomplete
                    control={control}
                    name='bankAccount'
                    label='Số tài khoản'
                    placeholder='Chọn stk'
                    loading={isLoadingUserLogin}
                    options={bankSelect}
                    required
                    labelPath='bank'
                    labelPath2='accountNumber'
                    valuePath='id'
                    rules={{
                      required: t('common:validation.required'),
                    }}
                    readOnly={watch('state') === 'POSTED'}
                    returnValueType='option'
                  />
                  <div
                    className='flex items-center gap-1 cursor-pointer'
                    onClick={() => {
                      setIsOpenDialogSTK(true)
                    }}
                  >
                    <Action actionList={['append']} />
                    <Typography variant='caption' color={PRIMARY}>
                      Tạo nhanh STK
                    </Typography>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                {paymentType === 'INBOUND' ? (
                  <SelectBoxCustomV2
                    control={control}
                    name='incomeExpense'
                    columns={incomeExpenseColumns}
                    labelPath='name'
                    valuePath='id'
                    fetchDataFn={getListObjectCurrency}
                    className='w-full'
                    label='Đối tượng thu'
                    placeholder='Chọn đối tượng thu'
                  />
                ) : (
                  <SelectBoxCustomV2
                    control={control}
                    name='incomeExpense'
                    columns={incomeExpenseColumns}
                    labelPath='name'
                    valuePath='id'
                    fetchDataFn={getIncomeList}
                    className='w-full'
                    label='Đối tượng chi'
                    placeholder='Chọn đối tượng chi'
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CoreInput
                  multiline
                  control={control}
                  name='note'
                  label='Nội dung giao dịch'
                  placeholder='Nhập nội dung giao dịch'
                  readOnly={watch('state') === 'POSTED'}
                />
              </Grid>
            </Grid>

            {watch('state') === 'DRAFT' && actionType !== 'VIEW' && (
              <div className='space-x-12 text-center my-15'>
                <ButtonCustom theme='cancel' onClick={onCancel}>
                  {t('common:btn.cancel')}
                </ButtonCustom>
                <ButtonCustom
                  theme='draft'
                  onClick={onDraftSubmit}
                  loading={isLoadingSubmit}
                >
                  {t('common:btn.draft')}
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
        )}
        {watch('state') === 'POSTED' && (
          <div className='px-0'>
            <div
              className='flex h-27 flex-row-reverse'
              style={{
                borderBottom: '1px solid #DFE0EB',
              }}
            >
              <div
                className='w-50 flex flex-col gap-2 items-center justify-center cursor-pointer'
                style={{
                  borderLeft: '1px solid #DFE0EB',
                }}
                onClick={() => {
                  setTab('ENTRY')
                }}
              >
                <Typography variant='body1'>Bút toán</Typography>
                <Typography
                  variant='caption'
                  style={{
                    color: '#747475',
                  }}
                >
                  Xem chi tiết
                </Typography>
              </div>
              <div
                className='w-50 flex flex-col gap-2 items-center justify-center cursor-pointer'
                style={{
                  borderLeft: '1px solid #DFE0EB',
                }}
                onClick={() => {
                  setTab('PAYMENT')
                }}
              >
                <Typography variant='body1'>Thanh toán</Typography>
                <Typography
                  variant='caption'
                  style={{
                    color: '#747475',
                  }}
                >
                  Xem chi tiết
                </Typography>
              </div>

              {accountMoveId && (
                <div
                  className='w-50 flex flex-col gap-2 items-center justify-center cursor-pointer'
                  style={{
                    borderLeft: '1px solid #DFE0EB',
                  }}
                  onClick={() =>
                    router.push({
                      pathname: `${MENU_URL.CUSTOMER.INVOICE}/[id]`,
                      query: {
                        id: accountMoveId,
                      },
                    })
                  }
                >
                  <Typography variant='body1'>Hóa đơn</Typography>
                  <Typography
                    variant='caption'
                    style={{
                      color: '#747475',
                    }}
                  >
                    Xem chi tiết
                  </Typography>
                </div>
              )}
            </div>
            <div className='px-0'>
              {tab === 'PAYMENT' && (
                <form className='flex flex-col p-15' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='code'
                        label='Mã thanh toán'
                        placeholder='Nhập mã thanh toán'
                        readOnly={watch('state') === 'POSTED'}
                        inputProps={{ maxLength: 50 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='accountJournal'
                        label='Sổ kế toán'
                        placeholder='Chọn sổ kế toán'
                        valuePath='id'
                        labelPath='name'
                        loading={isLoadingAccountJournal}
                        options={accountJournalSelect}
                        required
                        rules={{ required: t('common:validation.required') }}
                        readOnly={watch('state') === 'POSTED'}
                        onChangeValue={(val) => {
                          if (val) {
                            setValue('paymentMethod', val.type)
                          }
                        }}
                        returnValueType='option'
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='paymentMethod'
                        label='Hình thức thanh toán'
                        placeholder='Chọn hình thức thanh toán'
                        options={paymentMethodSelect}
                        readOnly
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='partnerType'
                        label='Loại đối tác'
                        placeholder='Chọn loại đối tác'
                        options={partnerType}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='partner'
                        label='Đối tác'
                        placeholder='Chọn đối tác'
                        required
                        valuePath='id'
                        labelPath='name'
                        loading={isLoadingPartners}
                        options={partnerSelect}
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        readOnly={watch('state') === 'POSTED'}
                        returnValueType='option'
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <div className='flex flex-col gap-5'>
                        <CoreInput
                          control={control}
                          name='amount'
                          type='number'
                          label='Số tiền'
                          placeholder='Số tiền'
                          required
                          InputProps={{
                            style: { paddingRight: 0 },
                            endAdornment:
                              actionType === 'VIEW' ? (
                                <Typography variant='body2'>
                                  {
                                    currencySelect.find(
                                      (ele) => ele.id === watch('currency')?.id
                                    )?.name
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
                                  name='currency'
                                  placeholder='Đơn vị'
                                  disableClearable
                                  labelPath='name'
                                  valuePath='id'
                                  loading={isLoadingCurrencySelect}
                                  options={currencySelect}
                                  readOnly={watch('state') === 'POSTED'}
                                  hasMessageError={false}
                                  returnValueType='option'
                                />
                              ),
                          }}
                          rules={{
                            required: t('common:validation.required'),
                          }}
                          readOnly={watch('state') === 'POSTED'}
                        />

                        {watch('amount') &&
                          watch('currency')?.id !== currencyId &&
                          currencyRateData && (
                            <ConvertCurrency
                              currencyRateData={currencyRateData}
                            />
                          )}

                        {watch('amountSource') && watch('currencySource') && (
                          <Typography variant='body2'>
                            Số tiền đã được quy đổi:
                            <Link
                              style={{
                                textDecoration: 'none',
                              }}
                            >{` ${watch('amountSource')} ${watch(
                              'currencySource'
                            )} = ${watch('amount')} ${watch(
                              'currency'
                            )}`}</Link>
                          </Typography>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <DatePickerCustom
                        control={control}
                        name='paymentDate'
                        title='Ngày'
                        placeholder='Chọn ngày'
                        format='YYYY-MM-DD'
                        readOnly={watch('state') === 'POSTED'}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <div className='flex flex-col gap-2'>
                        <CoreAutocomplete
                          control={control}
                          name='bankAccount'
                          label='Số tài khoản'
                          placeholder='Chọn stk'
                          loading={isLoadingUserLogin}
                          options={bankSelect}
                          required
                          labelPath='bank'
                          labelPath2='accountNumber'
                          valuePath='id'
                          rules={{
                            required: t('common:validation.required'),
                          }}
                          readOnly={watch('state') === 'POSTED'}
                          returnValueType='option'
                        />
                        <div
                          className='flex items-center gap-1 cursor-pointer'
                          onClick={() => {
                            setIsOpenDialogSTK(true)
                          }}
                        >
                          <Action actionList={['append']} />
                          <Typography variant='caption' color={PRIMARY}>
                            Tạo nhanh STK
                          </Typography>
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      {paymentType === 'INBOUND' ? (
                        <SelectBoxCustomV2
                          control={control}
                          name='incomeExpense'
                          columns={incomeExpenseColumns}
                          labelPath='name'
                          valuePath='id'
                          fetchDataFn={getListObjectCurrency}
                          className='w-full'
                          label='Đối tượng thu'
                          placeholder='Chọn đối tượng thu'
                        />
                      ) : (
                        <SelectBoxCustomV2
                          control={control}
                          name='incomeExpense'
                          columns={incomeExpenseColumns}
                          labelPath='name'
                          valuePath='id'
                          fetchDataFn={getIncomeList}
                          className='w-full'
                          label='Đối tượng chi'
                          placeholder='Chọn đối tượng chi'
                        />
                      )}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <CoreInput
                        multiline
                        control={control}
                        name='note'
                        label='Nội dung giao dịch'
                        placeholder='Nhập nội dung giao dịch'
                        readOnly={watch('state') === 'POSTED'}
                      />
                    </Grid>
                  </Grid>

                  {watch('state') === 'DRAFT' && actionType !== 'VIEW' && (
                    <div className='space-x-12 text-center my-15'>
                      <ButtonCustom theme='cancel' onClick={onCancel}>
                        {t('common:btn.cancel')}
                      </ButtonCustom>
                      <ButtonCustom
                        theme='draft'
                        onClick={onDraftSubmit}
                        loading={isLoadingSubmit}
                      >
                        {t('common:btn.draft')}
                      </ButtonCustom>
                      <ButtonCustom
                        theme='submit'
                        type='submit'
                        loading={isLoadingSubmit}
                      >
                        {isUpdate
                          ? t('common:btn.save_change')
                          : t('common:btn.add')}
                      </ButtonCustom>
                    </div>
                  )}
                </form>
              )}

              {tab === 'ENTRY' && (
                <div className='p-15'>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant='h4'>Hạng mục bút toán</Typography>
                      <CustomTable
                        className='mt-10'
                        columns={columns}
                        data={tableData}
                        paginationHidden={true}
                      />
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isOpenDialogSTK && (
        <DialogAddSTKBank
          refetch={refetchUserLoginData}
          onCloseDialog={() => setIsOpenDialogSTK(false)}
          setValue={methodForm.setValue}
          name='bankAccountId'
        />
      )}
    </PageContainer>
  )
}

export default SaveBankAccount
