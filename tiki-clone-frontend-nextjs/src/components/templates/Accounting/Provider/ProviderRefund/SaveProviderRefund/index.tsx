import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import CustomStep from '@/components/atoms/CustomSteps'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import LoadingPage from '@/components/atoms/LoadingPage'
import MyAntTabs from '@/components/atoms/MyAntTab'
import PunishLine from '@/components/atoms/PunishLine'
import TitleWithAmount from '@/components/atoms/TitleWithAmount'
import { WarningText } from '@/components/atoms/WarningText'
import {
  GREEN,
  ORANGE,
  RED,
} from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { TopAction } from '@/components/molecules/TopAction'
import MoneyBalanceItem from '@/components/organism/MoneyBalanceItem'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { TableCustomDnd } from '@/components/organism/TableCustomDnd'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import DialogConfirmDraft from '@/components/templates/Accounting/Dialog/DialogConfirmDraft'
import DialogDeleteAccountMove from '@/components/templates/Accounting/Dialog/DialogDeleteAccountMove'
import DialogPayment from '@/components/templates/Accounting/Dialog/DialogPayment'
import PopupDetailInvoice from '@/components/templates/Accounting/Dialog/PopupDetailInvoice'
import { MENU_URL } from '@/routes'
import { getAccountJournal } from '@/service/accounting/accountJournal/getList'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid, Tab, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogCopyInvoice from '../../../Dialog/DialogCopyInvoice'
import useCustomerRefund from './useProviderRefund'
import { SelectBoxCustomV2 } from '@/components/atoms/SelectBoxCustomV2'
import {
  getIncomeList,
  getListObjectCurrency,
} from '@/service/accounting/accountMove/getListIncome'
import DialogHisUpdateList from '../../../Dialog/DialogHistoryEditBound'

const SaveProviderRefund = () => {
  const { t } = useTranslation('accounting/provider-refund')
  const [values, handles] = useCustomerRefund()
  const {
    id,
    actionType,
    data,
    valueTab,
    invoiceName,
    control,
    isUpdate,
    isLoading,
    isLoadingSubmit,
    methodForm,
    invoiceColumns,
    invoiceLinesTableData,
    moveLinesColumns,
    moveLinesTableData,
    incomeExpenseColumns,
  } = values

  const router = useRouter()

  const { watch, setValue } = methodForm
  const {
    refetch,
    onSubmit,
    onDraftSubmit,
    onCancel,
    appendInvoiceLines,
    handleChangeTab,
    showDialog,
    onAfterChangeValue,
  } = handles

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
            prevUrl={MENU_URL.PROVIDER.REFUND}
          />

          {watch('state') === 'DRAFT' && !router.asPath.includes('addNew') ? (
            <TopAction
              actionList={['copy', 'edit', 'delete', 'history']}
              onCopyAction={() => {
                showDialog(
                  <DialogCopyInvoice
                    id={id}
                    refetch={() => {
                      router.push({
                        pathname: MENU_URL.CUSTOMER.INVOICE,
                      })
                    }}
                  />
                )
              }}
              onEditAction={() => {
                router.replace({
                  pathname: `${MENU_URL.PROVIDER.REFUND}/[id]`,
                  query: {
                    id,
                  },
                })
              }}
              onDeleteAction={() => {
                showDialog(
                  <DialogDeleteAccountMove
                    id={id}
                    refetch={() => {
                      router.push({
                        pathname: `${MENU_URL.PROVIDER.REFUND}`,
                      })
                    }}
                  />
                )
              }}
              onHistoryAction={() => {
                showDialog(
                  <DialogHisUpdateList
                    changeId={id}
                    code={watch('code')}
                    historyType='IN_REFUND'
                    refetch={() => {}}
                  />
                )
              }}
            />
          ) : !router.asPath.includes('addNew') ? (
            <TopAction
              actionList={['copy', 'history']}
              onCopyAction={() => {
                showDialog(
                  <DialogCopyInvoice
                    id={id}
                    refetch={() => {
                      router.push({
                        pathname: MENU_URL.CUSTOMER.INVOICE,
                      })
                    }}
                  />
                )
              }}
              onHistoryAction={() => {
                showDialog(
                  <DialogHisUpdateList
                    changeId={id}
                    code={watch('code')}
                    historyType='IN_REFUND'
                    refetch={() => {}}
                  />
                )
              }}
            />
          ) : (
            <TopAction
              actionList={['copy']}
              onCopyAction={() => {
                showDialog(
                  <DialogCopyInvoice
                    id={id}
                    refetch={() => {
                      router.push({
                        pathname: MENU_URL.CUSTOMER.INVOICE,
                      })
                    }}
                  />
                )
              }}
            />
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
                      type='INVOICE'
                      refetch={refetch}
                    />
                  )
                }}
                height={38}
              >
                Đặt lại thành nháp
              </ButtonCustom>
            )}
            {watch('state') === 'POSTED' &&
              ['NOT_PAYMENT', 'PARTIAL_PAYMENT'].includes(
                watch('paymentStatus')
              ) && (
                <ButtonCustom
                  theme='submit'
                  variant='contained'
                  textTransform='none'
                  height={38}
                  onClick={() => {
                    showDialog(
                      <DialogPayment
                        id={id}
                        name={watch('code')}
                        type='INBOUND'
                        amount={
                          watch('paymentStatus') === 'NOT_PAYMENT'
                            ? data
                              ? data.data.amountTotal
                              : watch('amountTotal')
                            : watch('paymentStatus') === 'PARTIAL_PAYMENT'
                            ? watch('moneyPaid')
                            : 0
                        }
                        refetch={refetch}
                      />
                    )
                  }}
                >
                  Ghi nhận thanh toán
                </ButtonCustom>
              )}

            {data?.data && (
              <ButtonCustom
                theme='submit'
                textTransform='none'
                height={38}
                onClick={() => {
                  router.push({
                    pathname: '/accounting/provider/providerRefund/[id]/print',
                    query: {
                      id,
                      invoiceName,
                    },
                  })
                }}
              >
                In hóa đơn
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
      {isLoading ? (
        <div className='w-full min-h-[500px] flex justify-center items-center'>
          <LoadingPage />
        </div>
      ) : (
        <div className='w-full flex flex-col'>
          <div className='flex justify-between items-center'>
            <MyAntTabs
              value={valueTab}
              onChange={handleChangeTab}
              variant='scrollable'
              scrollButtons={false}
              aria-label='scrollable prevent tabs example'
            >
              <Tab label='Chi tiết đơn hoàn tiền' value='Detail' />
              <Tab label='Bút toán' value='Entry' />
            </MyAntTabs>

            <div>
              {watch('state') === 'POSTED' && (
                <CustomStep
                  listStep={[
                    '',
                    watch('paymentStatus') === 'PAID'
                      ? 'Đã thanh toán'
                      : watch('paymentStatus') === 'PARTIAL_PAYMENT'
                      ? 'Thanh toán 1 phần'
                      : watch('paymentStatus') === 'REVERSE'
                      ? 'Đảo ngược'
                      : 'Chưa thanh toán',
                  ]}
                  index={1}
                  enableNextStep={false}
                  color={
                    watch('paymentStatus') === 'PAID'
                      ? GREEN
                      : watch('paymentStatus') === 'PARTIAL_PAYMENT'
                      ? ORANGE
                      : RED
                  }
                />
              )}
            </div>
          </div>

          <form
            className='bg-[#ffffff] px-15'
            onSubmit={onSubmit}
            style={{
              paddingTop:
                watch('moneyPaid') > 0 &&
                watch('moneyBalanceResponses') &&
                watch('moneyBalanceResponses').length > 0
                  ? '0px'
                  : '30px',
            }}
          >
            {valueTab === 'Detail' && (
              <>
                {watch('moneyPaid') > 0 &&
                  watch('moneyBalanceResponses') &&
                  watch('moneyBalanceResponses').length > 0 && (
                    <div className='py-4'>
                      <WarningText bgColor='#abdbe3'>
                        Bạn có các khoản tín dụng chưa thanh toán với khách hàng
                        này. Bạn có thể phân bổ chúng để ghi nhận là hóa đơn này
                        đã thanh toán.
                      </WarningText>
                    </div>
                  )}
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  {isUpdate && (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      style={{
                        marginBottom: '15px',
                      }}
                    >
                      <Typography variant='h6'>{invoiceName}</Typography>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreInput
                      control={control}
                      name='code'
                      label='Mã đơn hoàn tiền'
                      placeholder='Nhập mã đơn hoàn tiền'
                      readOnly={watch('state') === 'POSTED'}
                      inputProps={{ maxLength: 50 }}
                    />
                  </Grid>

                  {watch('orderName') && (
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='orderName'
                        label='Đơn hàng'
                        readOnly
                        inputProps={{ maxLength: 50 }}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='partner'
                      label='Nhà cung cấp'
                      labelPath2='code'
                      placeholder='Chọn nhà cung cấp'
                      required
                      fetchDataFn={getPartnerList}
                      params={{
                        isVendor: true,
                        vendorActivated: true,
                      }}
                      rules={{
                        required: t('common:validation.required'),
                      }}
                      readOnly={watch('state') === 'POSTED'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='accountJournal'
                      label='Sổ kế toán'
                      placeholder='Chọn sổ kế toán'
                      required
                      fetchDataFn={getAccountJournal}
                      params={{
                        type: 'PURCHASE',
                      }}
                      onChangeValue={onAfterChangeValue}
                      readOnly={watch('state') === 'POSTED'}
                      rules={{ required: t('common:validation.required') }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <DatePickerCustom
                      control={control}
                      name='date'
                      title='Ngày tạo hóa đơn'
                      placeholder='Chọn ngày'
                      required
                      format='YYYY-MM-DD'
                      rules={{
                        required: t('common:validation.required'),
                      }}
                      readOnly={watch('state') === 'POSTED'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <DatePickerCustom
                      control={control}
                      name='dueDate'
                      title='Ngày đến hạn'
                      placeholder='Chọn ngày'
                      format='YYYY-MM-DD'
                      required
                      rules={{
                        required: t('common:validation.required'),
                      }}
                      readOnly={watch('state') === 'POSTED'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <DatePickerCustom
                      control={control}
                      name='accountingDate'
                      title='Ngày vào sổ'
                      placeholder='Chọn ngày'
                      format='YYYY-MM-DD'
                      readOnly={watch('state') === 'POSTED'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
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
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <div className='flex gap-1 items-center mt-5'>
                      <Typography variant='h6'>Thông tin hóa đơn</Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      marginBottom: '15px',
                    }}
                  >
                    <TableCustomDnd
                      setValue={setValue}
                      watch={watch}
                      fieldsName='invoiceLines'
                      columns={
                        actionType
                          ? invoiceColumns.slice(0, -1)
                          : invoiceColumns
                      }
                      data={invoiceLinesTableData}
                      isShowColumnStt
                      actionTable={
                        watch('state') === 'DRAFT' && !watch('orderName') ? (
                          <ActionTable
                            columns={invoiceColumns}
                            append={appendInvoiceLines}
                            defaultValueLine={{
                              amountUntaxed: 0,
                              amountTotal: 0,
                              lineTax: 0,
                              discount: 0,
                              taxIds: [],
                            }}
                          />
                        ) : null
                      }
                    />
                  </Grid>

                  {
                    <div className='flex flex-col w-full gap-10 mt-10 mb-20'>
                      <TitleWithAmount
                        amount={watch('amountUntaxed')}
                        title='Thành tiền chưa thuế'
                      />

                      {(watch('computeTaxInfo')
                        ? watch('computeTaxInfo').summaryItems
                        : []
                      ).map((item: any, index: number) => {
                        return (
                          <TitleWithAmount
                            key={index}
                            amount={item.amount}
                            title={item.taxName}
                          />
                        )
                      })}

                      <TitleWithAmount
                        amount={watch('totalTax')}
                        title='Tổng thuế'
                      />

                      <TitleWithAmount
                        amount={watch('amountTotal')}
                        title='Thành tiền'
                      />

                      {watch('movePunishes') &&
                        watch('movePunishes').length > 0 && (
                          <div className='flex flex-row-reverse'>
                            <div className='flex flex-col'>
                              <div className='flex flex-row-reverse'>
                                <div className='w-260'>
                                  <Typography variant='h6'>
                                    Phạt trả chậm
                                  </Typography>
                                </div>
                              </div>

                              {watch('movePunishes').map((item, index) => {
                                return (
                                  <PunishLine
                                    key={index}
                                    index={index + 1}
                                    data={item}
                                    refetch={refetch}
                                  />
                                )
                              })}
                            </div>
                          </div>
                        )}

                      {watch('paymentResponses') &&
                        watch('paymentResponses').length > 0 && (
                          <div className='flex flex-row-reverse'>
                            <div className='flex flex-col gap-5'>
                              <div className='flex flex-row-reverse'>
                                <div className='w-260'>
                                  <Typography variant='h6'>
                                    Đã thanh toán
                                  </Typography>
                                </div>
                              </div>

                              {watch('paymentResponses').map((item, index) => {
                                return (
                                  <PopupDetailInvoice key={index} item={item} />
                                )
                              })}
                            </div>
                          </div>
                        )}

                      {watch('discount') !== null &&
                        Number(watch('discount')) > 0 && (
                          <TitleWithAmount
                            title='Áp dụng DKTK'
                            amount={-(watch('discount') ?? 0)}
                          />
                        )}

                      {watch('state') === 'POSTED' &&
                        watch('moneyPaid') !== null &&
                        watch('moneyPaid') !== undefined && (
                          <TitleWithAmount
                            title='Số tiền phải trả'
                            variant='subtitle1'
                            amount={watch('moneyPaid')}
                          />
                        )}

                      {watch('moneyPaid') > 0 &&
                        watch('moneyBalanceResponses') &&
                        watch('moneyBalanceResponses').length > 0 && (
                          <>
                            <div className='flex flex-row-reverse my-10'>
                              <div className='w-260'>
                                <Typography variant='h6'>
                                  Dư nợ còn lại
                                </Typography>
                              </div>
                            </div>

                            {isUpdate &&
                              data &&
                              watch('moneyBalanceResponses').map(
                                (item, index) => {
                                  return (
                                    <MoneyBalanceItem
                                      key={index}
                                      item={item}
                                      dataInvoice={data.data}
                                      type='OUTBOUND'
                                      refetch={refetch}
                                    />
                                  )
                                }
                              )}
                          </>
                        )}
                    </div>
                  }
                </Grid>
              </>
            )}

            {valueTab === 'Entry' && (
              <Grid
                container
                spacing={{ xs: 1, sm: 2, md: 3 }}
                style={{ marginBottom: '40px' }}
              >
                <Grid item xs={12}>
                  <CustomTable
                    columns={moveLinesColumns}
                    data={moveLinesTableData}
                    paginationHidden
                  />
                </Grid>
              </Grid>
            )}
 
            {watch('state') === 'DRAFT' && actionType !== 'VIEW' && (
              <div className='space-x-12 text-center my-10'>
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
        </div>
      )}
    </PageContainer>
  )
}

export default SaveProviderRefund
