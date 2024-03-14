import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { useQueryGetAccountLedgerDetail } from '@/service/accounting/accountLedger/getDetail'
import {
  postAccountLedger,
  putAccountLedger,
} from '@/service/accounting/accountLedger/save'
import { RequestBody } from '@/service/accounting/accountLedger/save/type'
import { useQueryGetAccountTagDetail } from '@/service/accounting/accountTag/getDetail'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  name: '',
  isUsedTaxReporting: false,
}

const useSaveLedger = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { control, formState, handleSubmit, reset, setError } = methodForm

  const { data, isLoading, refetch } = useQueryGetAccountLedgerDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
  }, [id, data, reset])

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAccountLedger : postAccountLedger,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res && res.data && res.data?.data.id) {
          router.push({
            pathname: `${MENU_URL.CONFIG.ACCOUNTING.LEDGER}/[id]`,
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
      id,
      control,
      formState,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      methodForm,
      isView,
    },
    { onSubmit, onCancel },
  ] as const
}

export default useSaveLedger
function putAccountAccountLedger(variables: void): Promise<unknown> {
  throw new Error('Function not implemented.')
}
