import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { useQueryGetAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountJournalDetail } from '@/service/accounting/accountJournal/getDetail'
import {
  postAccountJournal,
  putAccountJournal,
} from '@/service/accounting/accountJournal/save'
import { RequestBody } from '@/service/accounting/accountJournal/save/type'
import { useQueryGetCompanyUserLogin } from '@/service/common/company/userLogin'
import { useQueryGetListTinyCurrencies } from '@/service/common/currency/listTiny'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  name: '',
  code: '',
  type: '',
  lossAccountId: null,
  profitAccountId: null,
  bankAccountId: null,
  journalEntryEditable: false,
  isRestrictedAccount: false,
}

const useSaveAccountJournal = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { handleSubmit, reset, watch, setError } = methodForm

  const { data, isLoading, refetch } = useQueryGetAccountJournalDetail(
    { id: Number(id) },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
  }, [id, data, reset])

  const { isLoading: isLoadingAccountSelect, data: accountSelect } =
    useQueryGetAccountList({
      page: 0,
      size: MAX_VALUE,
      type: watch('type') === 'PURCHASE' ? 'EXPENSE' : undefined,
    })

  const { isLoading: isLoadingCurrencySelect, data: currencySelect } =
    useQueryGetListTinyCurrencies({
      page: 0,
      size: MAX_VALUE,
    })

  const { isLoading: isLoadingUserLogin, data: userLoginData } =
    useQueryGetCompanyUserLogin()

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAccountJournal : postAccountJournal,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res && res.data && res.data?.data.id) {
          router.push({
            pathname: `${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_JOURNAL}/[id]`,
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

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  return [
    {
      methodForm,
      id,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      accountSelect: accountSelect?.data.content ?? [],
      isLoadingCurrencySelect,
      currencySelect: currencySelect?.data.content ?? [],
      isLoadingAccountSelect,
      isLoadingUserLogin,
      bankSelect: userLoginData
        ? userLoginData.bankAccountOutputs.map((item) => ({
            label: item.accountNumber + ' - ' + item.bank,
            value: item.id,
          }))
        : [],
    },
    { onSubmit, onCancel },
  ] as const
}

export default useSaveAccountJournal
