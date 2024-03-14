import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAccountConfig } from '@/service/accounting/accountConfig/get'
import { postAccountConfig } from '@/service/accounting/accountConfig/save'
import { RequestBody } from '@/service/accounting/accountConfig/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const useAccountConfig = () => {
  const { t } = useTranslation('accounting/account-config')
  const router = useRouter()

  const { data, isLoading } = useQueryGetAccountConfig()

  const methodForm = useFormCustom<RequestBody['SAVE']>()

  const { control, formState, handleSubmit, reset, setError } = methodForm

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    postAccountConfig,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  useEffect(() => {
    if (data && data.data) {
      reset(data.data)
    }
  }, [data, reset])

  return [
    {
      control,
      formState,
      isLoading,
      isLoadingSubmit,
      methodForm,
    },
    { onSubmit, onCancel },
  ] as const
}

export default useAccountConfig
