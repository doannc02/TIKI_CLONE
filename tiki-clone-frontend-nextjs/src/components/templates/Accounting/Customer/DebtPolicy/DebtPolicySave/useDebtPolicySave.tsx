import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetDebtPolicyDetail } from '@/service/accounting/debtGrantingPolicies/getDetail'
import {
  postDebtPolicy,
  putDebtPolicy,
} from '@/service/accounting/debtGrantingPolicies/save'
import { RequestBody } from '@/service/accounting/debtGrantingPolicies/save/type'
import { useQueryGetPaymentTermList } from '@/service/accounting/paymentTerm/getList'
import { useQueryGetPartnerList } from '@/service/common/partner/getListTiny'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const useDebtPolicySave = () => {
  const { t } = useTranslation('accounting/debt-policy')
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      id: null,
      name: '',
      partnerIds: [],
      timeType: 'DAYS',
      timeApplyPolicy: '',
      timeEndPolicy: '',
      status: 'DRAFT',
      policyLines: [
        {
          id: null,
          timeTypeDeferredPaymentPeriod: 'DAYS',
        },
      ],
    },
  })

  const { setError, handleSubmit, reset, control } = methodForm

  const { data, isLoading, refetch } = useQueryGetDebtPolicyDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
  }, [id, data, reset])

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'policyLines',
    keyName: 'key',
  })

  const { currency } = useAppSelector((state) => state.companyConfigData)

  const { isLoading: isLoadingPartners, data: partnerSelect } =
    useQueryGetPartnerList({
      page: 0,
      size: MAX_VALUE,
      isCustomer: true,
    })

  const { isLoading: isLoadingPaymentTerm, data: paymentTermSelect } =
    useQueryGetPaymentTermList({
      page: 0,
      size: MAX_VALUE,
      type: 'SALE',
    })

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putDebtPolicy : postDebtPolicy,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res && res.data && res.data?.data.id) {
          router.push({
            pathname: `${MENU_URL.CUSTOMER.POLICY}/[id]`,
            query: {
              id: res?.data?.data?.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        }
      },
      onError: (error) => {
        if (error && Array.isArray(error)) {
          error.map((item) => {
            if (item && item.code && item.message) {
              errorMsg(item.message)
            }
          })
        }

        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate({ ...data, status: 'POSTED', statusPolicy: 'AWAITING' })
  })

  const onDraftSubmit = handleSubmit(async (data) => {
    mutate({ ...data, status: 'DRAFT', statusPolicy: 'AWAITING' })
  })

  return [
    {
      id,
      isUpdate,
      methodForm,
      fields,
      isLoading,
      isLoadingSubmit,
      currency,
      isLoadingPartners,
      partnerSelect: (partnerSelect ? partnerSelect.data.content : []).map(
        (item) => ({ ...item, name: item.code + ' - ' + item.name })
      ),
      paymentTermSelect: paymentTermSelect
        ? paymentTermSelect.data.content
        : [],
      isLoadingPaymentTerm,
    },
    { append, remove, onSubmit, onCancel, onDraftSubmit },
  ] as const
}

export default useDebtPolicySave
