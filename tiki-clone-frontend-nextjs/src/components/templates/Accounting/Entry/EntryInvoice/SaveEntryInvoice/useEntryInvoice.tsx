import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/TableCustom'
import { convertToDate } from '@/helper/convertToDate'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { useQueryGetEntryDetail } from '@/service/accounting/accountMove/entry/getDetail'
import { EntryDetail } from '@/service/accounting/accountMove/entry/getDetail/type'
import {
  postEntry,
  putEntry,
} from '@/service/accounting/accountMove/entry/save'
import { RequestBody } from '@/service/accounting/accountMove/entry/save/type'
import { getAccountTagList } from '@/service/accounting/accountTag/getList'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const useEntryInvoice = () => {
  const { t } = useTranslation('accounting/entry-invoice')
  const router = useRouter()
  const id = Number(router.query?.id)
  const { actionType } = router.query
  const isUpdate = !!id

  const { showDialog, hideDialog } = useDialog()

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      code: '',
      state: 'DRAFT',
      partnerType: 'CUSTOMER',
      accountingDate: convertToDate(moment.now(), 'YYYY-MM-DD'),
      moveLines: [],
    },
  })

  const { control, formState, handleSubmit, reset, watch, setError } =
    methodForm

  const { isLoading, data, refetch } = useQueryGetEntryDetail(
    { id },
    { enabled: !!id }
  )

  const { currency } = useAppSelector((state) => state.companyConfigData)

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
  }, [id, data, reset])

  const {
    fields: fieldMoveLines,
    append: appendMoveLines,
    remove: removeMoveLines,
  } = useFieldArray({
    control,
    name: 'moveLines',
    keyName: 'key',
  })

  const moveLinesColumns = useMemo(
    () =>
      [
        {
          header: 'Tài khoản',
          fieldName: 'account',
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
          fieldName: 'accountTags',
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
      return {
        account: item.account?.name,
        label: item.label ?? '-',
        debit: <CurrencyFormatCustom amount={item.debit} />,
        credit: <CurrencyFormatCustom amount={item.credit} />,
        accountTags: (item.accountTags ?? [])
          .map((item) => item?.name)
          .join(', '),
      }
    }

    return {
      account: (
        <CoreAutoCompleteAPI
          control={control}
          name={`moveLines.${index}.account`}
          label=''
          placeholder='Chọn account'
          labelPath2='code'
          fetchDataFn={getAccountList}
          rules={{
            required: t('common:validation.required'),
          }}
          isHasMessageError={false}
          readOnly={watch('state') === 'POSTED'}
          genus='small'
          onChangeValue={(val) =>
            methodForm.setValue(`moveLines.${index}.label`, val?.name)
          }
        />
      ),
      label: (
        <CoreInput
          control={control}
          name={`moveLines.${index}.label`}
          readOnly={watch('state') === 'POSTED'}
          genus='small'
        />
      ),
      debit: (
        <CoreInput
          control={control}
          name={`moveLines.${index}.debit`}
          type='number'
          readOnly={watch('state') === 'POSTED'}
          genus='small'
        />
      ),
      credit: (
        <CoreInput
          control={control}
          name={`moveLines.${index}.credit`}
          type='number'
          readOnly={watch('state') === 'POSTED'}
          genus='small'
        />
      ),
      accountTags: (
        <CoreAutoCompleteAPI
          multiple
          control={control}
          name={`moveLines.${index}.accountTagIds`}
          label=''
          placeholder='Chọn account tag'
          fetchDataFn={getAccountTagList}
          readOnly={watch('state') === 'POSTED'}
          genus='small'
        />
      ),
    }
  })

  // SUBMIT
  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putEntry : postEntry,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))

        if (res && res.data && res.data?.data.id) {
          router.push({
            pathname: `${MENU_URL.ENTRY.ENTRY_INVOICE}/[id]`,
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

  const isCheckValidate = (input: EntryDetail) => {
    let flag = true

    const { moveLines } = input

    const totalCredit = moveLines
      .map((item) => item.credit)
      .reduce((a, b) => a + b, 0)

    const debitTotal = moveLines
      .map((item) => item.debit)
      .reduce((a, b) => a + b, 0)

    if (totalCredit !== debitTotal) {
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
        moveLines: input.moveLines.map((item, index) => ({
          ...item,
        })),
        state: 'POSTED',
      })
  })

  return [
    {
      id,
      isUpdate,
      invoiceName: data ? data?.data?.code : null,
      control,
      formState,
      isLoading,
      isLoadingSubmit,
      methodForm,
      moveLinesColumns,
      moveLinesTableData,
    },
    {
      refetch,
      onSubmit,
      onDraftSubmit,
      onCancel,
      showDialog,
      hideDialog,
      appendMoveLines,
      removeMoveLines,
    },
  ] as const
}

export default useEntryInvoice
