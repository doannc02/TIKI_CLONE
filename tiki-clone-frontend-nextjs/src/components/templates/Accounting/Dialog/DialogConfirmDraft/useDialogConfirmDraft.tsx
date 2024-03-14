import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { putAccountMoveDraft } from '@/service/accounting/accountMove/setDraft'
import { putPaymentDraft } from '@/service/accounting/accountPayment/setDraft'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'

import { RequestBody } from '@/service/accounting/accountPayment/setDraft/type'

type Props = {
  id: number
  type: string
  refetch: any
  reason: string
}

const useDialogConfirmDraft = ({ id, type, refetch, reason }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const { setError } = useFormCustom<RequestBody['PUT']>({
    defaultValues: {
      id,
      reason: '',
    },
  })

  const { mutate, isLoading } = useMutation(
    type === 'INVOICE' ? putAccountMoveDraft : putPaymentDraft,
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

  const handleConfirmDraft = (input: RequestBody['PUT']) => {
    input.id = id
    input.reason = reason
    mutate(input)
    hideDialog()
  }
  return [{ isLoading }, { handleConfirmDraft }] as const
}

export default useDialogConfirmDraft
