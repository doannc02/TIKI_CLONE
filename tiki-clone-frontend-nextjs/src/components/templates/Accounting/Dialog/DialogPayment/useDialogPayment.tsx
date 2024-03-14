import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountJournalCashBankList } from '@/service/accounting/accountJournal/getCashBank'
import { postAccountPayment } from '@/service/accounting/accountPayment/save'
import { RequestBody } from '@/service/accounting/accountPayment/save/type'
import { useQueryGetMoneyPaid } from '@/service/accounting/paymentTerm/getMoneyPaid'
import { useQueryGetCurrenciesOfCompany } from '@/service/common/company/getListCurrency'
import { useQueryGetCompanyUserLogin } from '@/service/common/company/userLogin'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'

export type Props = {
  id: number
  type: 'INBOUND' | 'OUTBOUND'
  name: string
  refetch: any
}

const useDialogPayment = ({ id, name, type, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const defaultValues = {
    id: null,
    accountMoveId: id,
    note: name,
    paymentDate: moment().format('YYYY-MM-DD'),
    paymentType: type,
    description: '',
    branchId: null,
    keepOpen: true,
    haveEarlyDiscount: null,
  }

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const [amountValue, setAmountValue] = useState(0)

  const { currencyId } = useAppSelector((state) => state.companyConfigData)

  const { handleSubmit, watch, setValue, setError } = methodForm

  const { data, isLoading } = useQueryGetMoneyPaid({
    accountMoveId: id,
    dayPayment: watch('paymentDate') ?? moment().format('YYYY-MM-DD'),
  })

  const {
    isLoading: isLoadingUserLogin,
    data: userLoginData,
    refetch: refetchUserLoginData,
  } = useQueryGetCompanyUserLogin()

  const { isLoading: isLoadingCurrencySelect, data: currencySelect } =
    useQueryGetCurrenciesOfCompany({
      page: 0,
      size: MAX_VALUE,
    })

  useEffect(() => {
    if (userLoginData) {
      setValue('currencyId', userLoginData.currencyId ?? currencyId)
    }
  }, [currencyId, setValue, userLoginData])

  useEffect(() => {
    if (id && data && data.data) {
      setAmountValue(data.data.moneyPaid)
      setValue('haveEarlyDiscount', data.data.haveEarlyDiscount)
      setValue('amount', data.data.moneyPaid)
    }
  }, [id, data, setValue])

  const { isLoading: isLoadingAccountJournal, data: accountJournalSelect } =
    useQueryGetAccountJournalCashBankList({
      page: 0,
      size: MAX_VALUE,
    })

  const { isLoading: isLoadingAccountSelect, data: accountSelect } =
    useQueryGetAccountList({
      page: 0,
      size: MAX_VALUE,
      type: 'ASSET_CASH',
    })

  const { typePath } = useCheckPath()

  // SUBMIT
  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    postAccountPayment,
    {
      onSuccess: (data) => {
        successMsg(t('common:message.success'))
        refetch()
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (input) => {
    mutate(input)
    hideDialog()
  })
  return [
    {
      amountValue,
      isLoading,
      data,
      typePath,
      currencyId,
      moneyPaid: data?.data.moneyPaid,
      accountSelect: accountSelect ? accountSelect.data.content : [],
      isLoadingAccountSelect,
      isLoadingSubmit,
      methodForm,
      isLoadingAccountJournal,
      accountJournalSelect: accountJournalSelect
        ? accountJournalSelect.data.content
        : [],
      haveEarlyDiscount: data?.data.haveEarlyDiscount,
      isLoadingCurrencySelect,
      currencySelect: currencySelect ? currencySelect.data.content : [],
      isLoadingUserLogin,
      bankSelect: userLoginData
        ? userLoginData.bankAccountOutputs.map((item) => ({
            label: item.accountNumber + ' - ' + item.bank,
            value: item.id,
          }))
        : [],
    },
    { onSubmit, refetchUserLoginData, setAmountValue },
  ] as const
}

export default useDialogPayment
