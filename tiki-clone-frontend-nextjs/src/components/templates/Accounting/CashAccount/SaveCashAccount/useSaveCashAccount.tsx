import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { RED } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { ColumnProps } from '@/components/organism/TableCustom'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetAccountJournalList } from '@/service/accounting/accountJournal/getList'
import { useQueryGetAccountPaymentDetail } from '@/service/accounting/accountPayment/getDetail'
import {
  postCreateInternalTransfer,
  putCreateInternalTransfer,
} from '@/service/accounting/accountPayment/saveTransfer'
import { RequestBody } from '@/service/accounting/accountPayment/saveTransfer/type'
import { useQueryGetCurrenciesOfCompany } from '@/service/common/company/getListCurrency'
import { useQueryGetCompanyUserLogin } from '@/service/common/company/userLogin'
import { useQueryCurrencyRate } from '@/service/common/currencyRate/getRate'
import { useQueryGetPartnerList } from '@/service/common/partner/getListTiny'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'

const useSaveCashAccount = () => {
  const { t } = useTranslation('accounting/cash-account')
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const [tab, setTab] = useState<'PAYMENT' | 'ENTRY'>('PAYMENT')

  const { currencyId, currency } = useAppSelector(
    (state) => state.companyConfigData
  )

  const { paymentType } = useCheckPath()

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      code: '',
      state: 'DRAFT',
      currency: {
        id: currencyId,
        name: currency,
      },
      partnerType: paymentType === 'INBOUND' ? 'CUSTOMER' : 'VENDOR',
      paymentType,
      note: '',
    },
  })

  const { handleSubmit, reset, watch, setError } = methodForm

  const { isLoading: isLoadingPartners, data: partnerSelect } =
    useQueryGetPartnerList({
      page: 0,
      size: MAX_VALUE,
      isVendor: watch('partnerType') === 'VENDOR' ? true : null,
      vendorActivated: watch('partnerType') === 'VENDOR' ? true : null,
      isCustomer: watch('partnerType') === 'CUSTOMER' ? true : null,
      activated: watch('partnerType') === 'CUSTOMER' ? true : null,
    })

  const { paymentMethod, typePath } = useCheckPath()

  const { isLoading: isLoadingAccountJournal, data: accountJournalSelect } =
    useQueryGetAccountJournalList({
      page: 0,
      size: MAX_VALUE,
      type: paymentMethod,
    })

  const { isLoading: isLoadingCurrencySelect, data: currencySelect } =
    useQueryGetCurrenciesOfCompany({
      page: 0,
      size: MAX_VALUE,
    })

  const {
    isLoading: isLoadingUserLogin,
    data: userLoginData,
    refetch: refetchUserLoginData,
  } = useQueryGetCompanyUserLogin()

  const { isLoading: isLoadingCurrencyRate, data: currencyRateData } =
    useQueryCurrencyRate(
      {
        isSale: typePath === 'CUSTOMER',
        amount: watch('amount'),
        currencySourceId: Number(watch('currency')?.id),
      },
      {
        enabled:
          !!Number(watch('currency')?.id) &&
          watch('currency')?.id !== currencyId &&
          !!watch('amount'),
      }
    )

  const {
    data: paymentData,
    isLoading: isPaymentLoading,
    refetch,
  } = useQueryGetAccountPaymentDetail({ id }, { enabled: !!id })

  const tableData = (paymentData?.data?.paymentEntry ?? []).map((item) => ({
    ...item,
    debit: <CurrencyFormatCustom amount={item.debit} color={RED} />,
    credit: <CurrencyFormatCustom amount={item.credit} color={RED} />,
  }))

  useEffect(() => {
    if (id && paymentData) {
      reset({
        ...paymentData.data,
        note: paymentData.data.note ?? '',
      })
    }
  }, [id, paymentData, reset])

  const columns = useMemo(
    () =>
      [
        {
          header: t('enTryTable.accountName'),
          fieldName: 'accountName',
        },
        {
          header: t('enTryTable.partnerName'),
          fieldName: 'partnerName',
        },
        {
          header: t('enTryTable.note'),
          fieldName: 'note',
        },
        {
          header: t('enTryTable.debit') + ` (${currency})`,
          fieldName: 'debit',
        },
        {
          header: t('enTryTable.credit') + ` (${currency})`,
          fieldName: 'credit',
        },
      ] as ColumnProps[],
    [currency, t]
  )

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

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putCreateInternalTransfer : postCreateInternalTransfer,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res && res.data && res.data?.data.id) {
          router.push({
            pathname: `${MENU_URL.CASH_ACCOUNT[paymentType]}/[id]`,
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

  const onCancel = () => {
    router.back()
  }

  const onDraftSubmit = handleSubmit(async (input) => {
    mutate({ ...input, state: 'DRAFT' })
  })

  const onSubmit = handleSubmit(async (input) => {
    mutate({ ...input, state: 'POSTED' })
  })

  return [
    {
      id,
      currencyId,
      isUpdate: !!id,
      tab,
      paymentData: paymentData ? paymentData.data : null,
      accountMoveId: paymentData?.data.accountMoveId,
      isPaymentLoading,
      methodForm,
      columns,
      tableData,
      isLoadingSubmit,
      isLoadingAccountJournal,
      accountJournalSelect: accountJournalSelect
        ? accountJournalSelect.data.content
        : [],
      isLoadingPartners,
      partnerSelect: partnerSelect ? partnerSelect.data.content : [],
      isLoadingCurrencySelect,
      currencySelect: currencySelect ? currencySelect.data.content : [],
      isLoadingUserLogin,
      bankSelect: userLoginData
        ? userLoginData.bankAccountOutputs.map((item) => ({
            label: item.accountNumber + ' - ' + item.bank,
            value: item.id,
          }))
        : [],
      isLoadingCurrencyRate,
      currencyRateData: currencyRateData ? currencyRateData.data : null,
      moveType: paymentData?.data?.moveType ?? 'ENTRY',
      incomeExpenseColumns,
    },
    {
      setTab,
      onCancel,
      onSubmit,
      onDraftSubmit,
      refetch,
      refetchUserLoginData,
    },
  ] as const
}

export default useSaveCashAccount
