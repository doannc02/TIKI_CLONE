import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { MAX_VALUE } from '@/helper/contain'
import { convertToDate } from '@/helper/convertToDate'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetAccountNames } from '@/service/accounting/account/getNames'
import { useQueryGetAccountMoveDetail } from '@/service/accounting/accountMove/getDetail'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { postGenerateMoveLines } from '@/service/accounting/accountMove/postGenerateLines'
import {
  postAccountMove,
  putAccountMove,
} from '@/service/accounting/accountMove/save'
import { RequestBody } from '@/service/accounting/accountMove/save/type'
import { useQueryGetAccountTagList } from '@/service/accounting/accountTag/getList'
import { useQueryGetTaxList } from '@/service/accounting/tax/getList'
import { getProductTinyList } from '@/service/product/productController/getListTiny'
import { getUomBaseOfProduct } from '@/service/product/productController/getUomBase'
import { getUomProductList } from '@/service/product/productController/getUomGroup'
import _ from 'lodash'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'
import UomAutocomplete from '../../../_component/UomAutocomplete'
import { useQueryGetWarehouseList } from '@/service/warehouse/getList'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
let f: any = null

const useProviderRefund = () => {
  const { t } = useTranslation('accounting/provider-refund')
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const { showDialog, hideDialog } = useDialog()

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      id: null,
      code: '',
      moveType: 'IN_REFUND',
      paymentStatus: 'NOT_PAYMENT',
      state: 'DRAFT',
      scopeType: 'DOMESTICALLY',
      date: convertToDate(moment.now(), 'YYYY-MM-DD'),
      accountingDate: convertToDate(moment.now(), 'YYYY-MM-DD'),
      accountPaymentId: null,
      purchaseOrderId: null,
      saleOrderId: null,
      invoiceLines: [
        {
          amountTotal: 0,
          amountUntaxed: 0,
          lineTax: 0,
          taxIds: [],
        },
      ],
      amountTotal: 0,
      movePunishes: [],
      paymentResponses: [],
      moneyBalanceResponses: [],
    },
  })

  let renderTime = new Date(Date.now()).getTime()

  const {
    control,
    formState,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    setError,
  } = methodForm

  const { data: wareHouseList } = useQueryGetWarehouseList({
    page: 0,
    size: MAX_VALUE,
  })
  const ProductColumns = useMemo(
    () =>
      [
        {
          header: 'SKU',
          fieldName: 'sku',
          styleCell: {
            style: {
              maxWidth: '140px',
              cursor: 'pointer',
            },
          },
        },
        {
          header: 'Tên sản phẩm',
          fieldName: 'name',
          styleCell: {
            style: {
              maxWidth: '300px',
              cursor: 'pointer',
            },
          },
        },
        {
          header: 'Tổng tồn',
          fieldName: 'totalInventory',
          styleCell: {
            style: {
              // maxWidth: '200px',
              cursor: 'pointer',
            },
          },
        },
        ...(wareHouseList?.data?.content ?? []).map((item) => ({
          header: item.name,
          fieldName: item.id,
          styleCell: {
            style: {
              // maxWidth: '100px',
              cursor: 'pointer',
            },
          },
        })),
      ] as ColumnProps[],
    [wareHouseList]
  )
  const { isLoading, data, refetch } = useQueryGetAccountMoveDetail(
    { id },
    { enabled: !!id }
  )

  const { currency } = useAppSelector((state) => state.companyConfigData)

  const [valueTab, setValueTab] = useState<'Detail' | 'Entry'>('Detail')
  const handleChangeTab = (
    _: React.SyntheticEvent,
    newValue: 'Detail' | 'Entry'
  ) => {
    setValueTab(newValue)
  }

  const { isLoading: isLoadingTax, data: taxSelect } = useQueryGetTaxList({
    page: 0,
    size: MAX_VALUE,
    type: 'PURCHASE',
    isActive: true,
  })

  const { isLoading: isLoadingAccountTag, data: accountTagSelect } =
    useQueryGetAccountTagList({
      page: 0,
      size: MAX_VALUE,
    })

  const { isLoading: isLoadingAccountSelect, data: accountSelect } =
    useQueryGetAccountNames({
      page: 0,
      size: MAX_VALUE,
    })

  const computeTax = useCallback(async () => {
    try {
      const invoiceWatch = watch('invoiceLines') ?? []
      let validate = true
      if (invoiceWatch) {
        invoiceWatch.forEach((item) => {
          if (
            _.isNil(item.quantity) ||
            _.isNil(item.unitPrice) ||
            _.isNil(item.product?.id) ||
            _.isNil(item.uom?.id)
          ) {
            validate = false
            // eslint-disable-next-line react-hooks/exhaustive-deps
            renderTime = new Date(Date.now()).getTime()
          }
        })
      }
      if (!validate || watch('state') === 'POSTED') return

      const res = await postGenerateMoveLines({
        moveType: 'IN_REFUND',
        accountJournalId: watch('accountJournal')?.id,
        data: invoiceWatch,
      })

      if (res.data) {
        setValue('computeTaxInfo', res.data)
      }

      if (res.data.moveLines) {
        setValue('moveLines', res.data.moveLines)
      }

      // unTax
      if (res.data.taxLines && res.data.taxLines.length > 0) {
        const amountUntaxed = res.data.taxLines
          .map((ele, index) => {
            setValue(`invoiceLines.${index}.amountUntaxed`, ele.untaxedAmount)
            return ele.untaxedAmount * 100
          })
          .reduce((a, b) => a + b, 0)

        setValue('amountUntaxed', amountUntaxed / 100)
      }

      //Tax
      if (res.data.taxLines && res.data.taxLines.length > 0) {
        const totalTax = res.data.taxLines
          .map((ele, index) => {
            setValue(`invoiceLines.${index}.lineTax`, ele.amount)
            return ele.amount * 100
          })
          .reduce((a, b) => a + b, 0)

        setValue('totalTax', totalTax / 100)
      }

      //Amount
      const amountTotal = invoiceWatch
        .map((item, index) => {
          setValue(
            `invoiceLines.${index}.amountTotal`,
            item.amountUntaxed + item.lineTax
          )
          return item.amountUntaxed * 100 + item.lineTax * 100
        })
        .reduce((a, b) => a + b, 0)
      setValue('amountTotal', amountTotal / 100)
    } catch (err) {
      errorMsg(err)
    }
  }, [])

  useEffect(() => {
    if (id && data && data.data) {
      reset({
        ...data.data,
        invoiceLines: data.data.invoiceLines.map((item) => ({
          ...item,
          taxIds: item.taxes.map((item) => item.id),
          lineTax: item.amountTotal - item.amountUntaxed,
        })),
        moveLines: data.data.moveLines.map((item) => ({
          ...item,
          accountId: item.account.id,
          accountTagIds: item.accountTags.map((item) => item.id),
        })),
        totalTax: data.data.amountTotal - data.data.amountUntaxed,
      })
    }
    computeTax()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data, reset, computeTax])

  const {
    fields,
    append: appendInvoiceLines,
    remove: removeInvoiceLines,
  } = useFieldArray({
    control,
    name: 'invoiceLines',
    keyName: 'key',
  })

  const { fields: fieldMoveLines } = useFieldArray({
    control,
    name: 'moveLines',
    keyName: 'key',
  })

  const moveLinesColumns = useMemo(
    () =>
      [
        {
          header: 'Tài khoản',
          fieldName: 'accountId',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
        {
          header: 'Nhãn',
          fieldName: 'label',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
        {
          header: 'Nợ' + ` (${currency})`,
          fieldName: 'debit',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
        {
          header: 'Có' + ` (${currency})`,
          fieldName: 'credit',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
        {
          header: 'Thẻ tài khoản',
          fieldName: 'accountTagIds',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
      ] as ColumnProps[],
    [currency]
  )

  const moveLinesTableData = (fieldMoveLines ?? []).map((item, index) => {
    if (actionType === 'VIEW') {
      const account = accountSelect?.data.content.find(
        (a) => a.id === item.accountId
      )
      return {
        accountId: account ? account.code + ' - ' + account.name : '',
        label: item.label ?? '-',
        debit: <CurrencyFormatCustom amount={item.debit} />,
        credit: <CurrencyFormatCustom amount={item.credit} />,
        accountTagIds: (item.accountTags ?? [])
          .map((ele) => {
            if (accountTagSelect) {
              return accountTagSelect.data.content.find(
                (tag) => tag.id === ele.id
              )
            }
          })
          .map((item) => item?.name)
          .join(', '),
      }
    }

    return {
      accountId1: (
        <CoreAutocomplete
          control={control}
          name={`moveLines.${index}.accountId`}
          placeholder='Chọn account'
          valuePath='id'
          labelPath='name'
          loading={isLoadingAccountSelect}
          options={(accountSelect?.data.content ?? []).map((item) => ({
            id: item.id,
            name: item.code + ' - ' + item.name,
          }))}
          rules={{
            required: t('common:validation.required'),
          }}
          hasMessageError={false}
          readOnly={watch('state') === 'POSTED'}
          genus='small'
        />
      ),
      accountId: (
        <CoreAutocomplete
          control={control}
          name={`moveLines.${index}.accountId`}
          placeholder='Chọn account'
          valuePath='id'
          labelPath='name'
          loading={isLoadingAccountSelect}
          options={(accountSelect?.data.content ?? []).map((item) => ({
            id: item.id,
            name: item.code + ' - ' + item.name,
          }))}
          rules={{
            required: t('common:validation.required'),
          }}
          hasMessageError={false}
          readOnly={watch('state') === 'POSTED'}
          genus='small'
        />
      ),
      label: (
        <CoreInput
          control={control}
          name={`moveLines.${index}.label`}
          genus='small'
          readOnly={watch('state') === 'POSTED'}
        />
      ),
      debit: (
        <CoreInput
          control={control}
          name={`moveLines.${index}.debit`}
          genus='small'
          type='number'
          readOnly={watch('state') === 'POSTED'}
        />
      ),
      credit: (
        <CoreInput
          control={control}
          name={`moveLines.${index}.credit`}
          genus='small'
          type='number'
          readOnly={watch('state') === 'POSTED'}
        />
      ),
      accountTagIds: (
        <CoreAutocomplete
          multiple
          control={control}
          name={`moveLines.${index}.accountTagIds`}
          placeholder='Chọn account tag'
          valuePath='id'
          labelPath='name'
          loading={isLoadingAccountTag}
          options={accountTagSelect ? accountTagSelect.data.content : []}
          readOnly={watch('state') === 'POSTED'}
        />
      ),
    }
  })

  const onAfterChangeValue = () => {
    const t = new Date(Date.now()).getTime() - renderTime
    if (t < 2000 && f) {
      clearTimeout(f)
      renderTime = new Date(Date.now()).getTime()
    }
    f = setTimeout(computeTax, 2000)
  }

  const invoiceColumns = useMemo(
    () =>
      [
        {
          header: 'Sản phẩm',
          fieldName: 'product',
          styleCell: {
            style: {
              minWidth: 350,
            },
          },
        },
        {
          header: 'Số lượng',
          fieldName: 'quantity',
        },
        {
          header: 'Đơn giá' + ` (${currency})`,
          fieldName: 'unitPrice',
        },
        {
          header: 'Thuế',
          fieldName: 'taxIds',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: 'Khuyến mại (%)',
          fieldName: 'discount',
        },
        {
          header: 'Trước thuế' + ` (${currency})`,
          fieldName: 'amountUntaxed',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: 'Tiền thuế' + ` (${currency})`,
          fieldName: 'lineTax',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: 'Sau thuế' + ` (${currency})`,
          fieldName: 'amountTotal',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: '',
          fieldName: 'action',
        },
      ] as ColumnProps[],

    [currency]
  )

  const invoiceLinesTableData = (fields ?? []).map((item, index) => {
    if (actionType === 'VIEW')
      return {
        id: item.key,
        product: item.product?.name,
        quantity: item.quantity + ' - ' + item.uom?.name,
        unitPrice: (
          <CurrencyFormatCustom variant='body1' amount={item.unitPrice} />
        ),
        taxIds: item.taxIds
          .map((ele) => {
            if (taxSelect) {
              return taxSelect.data.content.find((tax) => tax.id === ele)
            }
          })
          .map((item) => item?.name)
          .join(', '),
        discount: item.discount,
        amountUntaxed: (
          <CurrencyFormatCustom variant='body1' amount={item.amountUntaxed} />
        ),
        lineTax: <CurrencyFormatCustom variant='body1' amount={item.lineTax} />,
        amountTotal: (
          <CurrencyFormatCustom variant='body1' amount={item.amountTotal} />
        ),
      }

    return {
      id: item.key,
      product: (
        // <CoreAutoCompleteAPI
        //   control={control}
        //   name={`invoiceLines.${index}.product`}
        //   label=''
        //   placeholder='Chọn sản phẩm'
        //   fetchDataFn={getProductTinyList}
        //   genus='small'
        //   rules={{
        //     required: t('common:validation.required'),
        //   }}
        //   isHasMessageError={false}
        //   readOnly={watch('state') === 'POSTED'}
        //   onChangeValue={async (val) => {
        //     if (val) {
        //       const res = await getUomBaseOfProduct({ productId: val?.id })
        //       if (res && res.data)
        //         setValue(`invoiceLines.${index}.uom`, res.data)
        //     } else {
        //       setValue(`invoiceLines.${index}.uom`, null)
        //     }
        //     onAfterChangeValue()
        //   }}
        // />
        <SelectBoxCustom
          control={control}
          columns={ProductColumns}
          labelPath='name'
          valuePath='id'
          params={{}}
          name={`invoiceLines.${index}.product`}
          label=''
          placeholder='Chọn sản phẩm'
          fetchDataFn={getProductTinyList}
          genus='small'
          // rules={{
          //   required: t('common:validation.required'),
          // }}
          //isHasMessageError={false}
          //readOnly={watch('state') === 'POSTED'}
          onChangeValue={async (val) => {
            // setValue(`invoiceLines.${index}`, currentLine)
            if (val) {
              const res = await getUomBaseOfProduct({ productId: val?.id })
              if (res && res.data)
                setValue(`invoiceLines.${index}.uom`, res.data)
            } else {
              setValue(`invoiceLines.${index}.uom`, null)
            }
            onAfterChangeValue()
          }}
        />
      ),
      quantity: (
        <CoreInput
          control={control}
          name={`invoiceLines.${index}.quantity`}
          placeholder='Số lượng'
          type='number'
          readOnly={watch('state') === 'POSTED'}
          rules={{
            required: t('common:validation.required'),
          }}
          hasMessageError={false}
          InputProps={{
            style: {
              minHeight: '38px',
              height: '38px',
              paddingRight: 0,
            },
            endAdornment: (
              <div className='w-90'>
                <UomAutocomplete
                  control={control}
                  name={`invoiceLines.${index}.uom`}
                  label=''
                  placeholder='Đơn vị'
                  fetchDataFn={getUomProductList}
                  params={{
                    id: watch(`invoiceLines.${index}.product.id`),
                  }}
                  readOnly={watch('state') === 'POSTED'}
                  isHasMessageError={false}
                  InputProps={{
                    style: {
                      borderRadius: 0,
                      minWidth: '100px',
                      width: '100px',
                      minHeight: '38px',
                      height: '38px',
                      padding: '2px 4px 7.5px 5px',
                    },
                  }}
                />
              </div>
            ),
          }}
          onChangeValue={onAfterChangeValue}
        />
      ),
      unitPrice: (
        <CoreInput
          control={control}
          name={`invoiceLines.${index}.unitPrice`}
          type='number'
          genus='small'
          rules={{
            required: t('common:validation.required'),
          }}
          hasMessageError={false}
          placeholder='Nhập đơn giá'
          readOnly={watch('state') === 'POSTED'}
          onChangeValue={onAfterChangeValue}
        />
      ),
      taxIds: (
        <CoreAutocomplete
          multiple={true}
          control={control}
          name={`invoiceLines.${index}.taxIds`}
          genus='small'
          loading={isLoadingTax}
          valuePath='id'
          labelPath='name'
          placeholder='Chọn các loại thuế'
          options={taxSelect ? taxSelect.data.content : []}
          readOnly={watch('state') === 'POSTED'}
          onChangeValue={onAfterChangeValue}
        />
      ),
      discount: (
        <CoreInput
          control={control}
          name={`invoiceLines.${index}.discount`}
          type='number'
          genus='small'
          placeholder='Nhập khuyến mại'
          onChangeValue={onAfterChangeValue}
          readOnly={watch('state') === 'POSTED'}
        />
      ),
      amountUntaxed: (
        <CurrencyFormatCustom
          variant='body2'
          amount={getValues(`invoiceLines.${index}.amountUntaxed`)}
        />
      ),

      lineTax: (
        <CurrencyFormatCustom
          variant='body2'
          amount={getValues(`invoiceLines.${index}.lineTax`)}
        />
      ),

      amountTotal: (
        <CurrencyFormatCustom
          variant='body2'
          amount={getValues(`invoiceLines.${index}.amountTotal`)}
        />
      ),
      action:
        watch('state') === 'POSTED' ? null : (
          <Action
            actionList={['delete']}
            onDeleteAction={() => {
              removeInvoiceLines(index)
            }}
          />
        ),
    }
  })

  const incomeExpenseColumns = useMemo(
    () =>
      [
        {
          header: 'Mã đối tượng',
          fieldName: 'code',
        },
        {
          header: 'Tên đối tượng',
          fieldName: 'name',
        },
        {
          header: 'Mô tả',
          fieldName: 'description',
        },
      ] as ColumnProps[],
    []
  )

  // SUBMIT
  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAccountMove : postAccountMove,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))

        if (res && res.data && res.data?.data.id) {
          router.push({
            pathname: `${MENU_URL.PROVIDER.REFUND}/[id]`,
            query: {
              id: res?.data?.data?.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        }
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const isCheckValidate = (input: AccountMoveDetail) => {
    let flag = true
    const { moveLines, invoiceLines } = input

    if (!invoiceLines || invoiceLines.length < 1) {
      errorMsg('Vui lòng nhập thông tin sản phẩm.')
      flag = false
    }

    moveLines.map((item, index) => {
      if (!item.accountId) {
        if (valueTab === 'Detail') setValueTab('Entry')
        setError(`moveLines.${index}.accountId`, {
          message: t('common:validation.required') as string,
        })
        flag = false
      }
    })

    const totalCredit = moveLines
      .map((item) => item.credit)
      .reduce((a, b) => a + b, 0)

    const debitTotal = moveLines
      .map((item) => item.debit)
      .reduce((a, b) => a + b, 0)

    if (totalCredit !== debitTotal) {
      if (valueTab === 'Detail') setValueTab('Entry')
      errorMsg('Tổng nợ phải bằng tổng có.')
      flag = false
    }

    return flag
  }

  const onDraftSubmit = handleSubmit(async (input) => {
    if (isCheckValidate(input))
      mutate({
        ...input,
        state: 'DRAFT',
      })
  })

  const onSubmit = handleSubmit(async (input) => {
    if (isCheckValidate(input))
      mutate({
        ...input,
        state: 'POSTED',
      })
  })

  return [
    {
      id,
      actionType,
      data,
      isUpdate,
      valueTab,
      invoiceName: data ? data?.data?.code : null,
      control,
      formState,
      isLoading,
      isLoadingSubmit,
      methodForm,
      invoiceColumns,
      invoiceLinesTableData,
      moveLinesColumns,
      moveLinesTableData,
      incomeExpenseColumns,
    },
    {
      refetch,
      onSubmit,
      onDraftSubmit,
      onCancel,
      appendInvoiceLines,
      removeInvoiceLines,
      computeTax,
      handleChangeTab,
      onAfterChangeValue,
      showDialog,
      hideDialog,
    },
  ] as const
}

export default useProviderRefund
