import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { taxComputeTypeSelect } from '@/enum'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountTagList } from '@/service/accounting/accountTag/getList'
import { useQueryGetTaxDetail } from '@/service/accounting/tax/getDetail'
import { useQueryGetTaxNames } from '@/service/accounting/tax/getNames'
import { postTax, putTax } from '@/service/accounting/tax/save'
import { RequestBody } from '@/service/accounting/tax/save/type'
import { useQueryGetCountryList } from '@/service/common/country/getList'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const defaultValues = {
  name: '',
  scopeType: '',
  taxComputeType: '',
  type: '',
  isIncludedPrice: false,
  isAffectingBase: false,
  baseIsAffected: false,
  description: ' ',
  isActive: true,
  repartitions: [
    {
      percent: 0,
      accountId: null,
      accountTagId: null,
    },
  ],
  taxItems: [
    {
      taxId: null,
      taxComputeType: null,
      amount: null,
    },
  ],
}

const useSaveTax = () => {
  const { t } = useTranslation('accounting/tax')
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { control, formState, handleSubmit, reset, watch, setError } =
    methodForm

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putTax : postTax,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        router.back()
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    if (data.taxComputeType === 'GROUP_OF_TAXES') {
      mutate({
        ...data,
        amount: data.amount ?? 0,
        repartitions: undefined,
        taxItems: data?.taxItems?.map((item, index) => {
          return { ...item, sequence: index }
        }),
      })
    } else if (['FIXED', 'PERCENT'].includes(watch('taxComputeType'))) {
      mutate({
        ...data,
        amount: data.amount ?? 0,
        taxItems: undefined,
        repartitions: data?.repartitions?.map((item, index) => {
          return { ...item, sequence: index }
        }),
      })
    }
  })

  const { data, isLoading } = useQueryGetTaxDetail({ id }, { enabled: !!id })

  useEffect(() => {
    if (id && data && data.data) {
      reset({
        ...data.data,
        repartitions: data.data.repartitions.map((item) => {
          return {
            ...item,
            accountId: item.account ? item.account.id : null,
            accountTagId: item.accountTag ? item.accountTag.id : null,
          }
        }),
        taxItems: data.data.taxItems.map((item) => {
          return { ...item, taxId: item.tax.id }
        }),
      })
    }
  }, [id, data, reset])

  const {
    fields: fields1,
    append: append1,
    remove: remove1,
  } = useFieldArray({
    control,
    name: 'taxItems',
    keyName: 'key',
  })

  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control,
    name: 'repartitions',
    keyName: 'key',
  })

  const { isLoading: isLoadingGetList, data: taxList } = useQueryGetTaxNames({
    page: 0,
    size: MAX_VALUE,
    type: watch('taxComputeType') === 'GROUP_OF_TAXES' ? watch('type') : null,
  })

  const { isLoading: isLoadingAccountSelect, data: accountSelect } =
    useQueryGetAccountList({
      page: 0,
      size: MAX_VALUE,
    })

  const { isLoading: isLoadingAccountTagSelect, data: accountTagSelect } =
    useQueryGetAccountTagList({
      page: 0,
      size: MAX_VALUE,
      applicability: 'TAXES',
    })

  const { isLoading: isLoadingCountrySelect, data: countryList } =
    useQueryGetCountryList({
      page: 0,
      size: MAX_VALUE,
    })

  const columns1 = useMemo(
    () =>
      [
        {
          header: 'Tên thuế',
          fieldName: 'taxId',
          styleCell: {
            width: '300px',
          },
        },
        {
          header: 'Tính thuế',
          fieldName: 'taxComputeType',
          styleCell: {
            width: '300px',
          },
        },
        {
          header: 'Số tiền',
          fieldName: 'amount',
          styleCell: {
            width: '300px',
          },
        },
        {
          header: '',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    []
  )

  const tableData1 = (fields1 ?? []).map((field, index) => {
    if (actionType === 'VIEW')
      return {
        taxId: taxList
          ? taxList?.data?.content.find((ele) => ele.id === field.taxId)?.name
          : '',

        taxComputeType: taxComputeTypeSelect.find(
          (ele) =>
            ele.value ===
            taxList?.data.content.find(
              (item) => item.id === watch(`taxItems.${index}.taxId`)
            )?.taxComputeType
        )?.label,

        amount: taxList?.data.content.find(
          (item) => item.id === watch(`taxItems.${index}.taxId`)
        )?.amount,
      }

    return {
      taxId: (
        <CoreAutocomplete
          control={control}
          name={`taxItems.${index}.taxId`}
          placeholder='Chọn thuế'
          disableClearable
          genus='small'
          labelPath='name'
          valuePath='id'
          loading={isLoadingGetList}
          options={taxList ? taxList.data.content : []}
          rules={{ required: t('common:validation.required') }}
        />
      ),

      taxComputeType: taxComputeTypeSelect.find(
        (ele) =>
          ele.value ===
          taxList?.data.content.find(
            (item) => item.id === watch(`taxItems.${index}.taxId`)
          )?.taxComputeType
      )?.label,

      amount: taxList?.data.content.find(
        (item) => item.id === watch(`taxItems.${index}.taxId`)
      )?.amount,

      action:
        index > 0 ? (
          <Action
            actionList={['delete']}
            onDeleteAction={() => {
              remove1(index)
            }}
          />
        ) : null,
    }
  })

  const columns2 = useMemo(
    () =>
      [
        {
          header: '%',
          fieldName: 'percent',
          styleCell: {
            width: '300px',
          },
        },
        {
          header: 'Account',
          fieldName: 'accountId',
          styleCell: {
            width: '300px',
          },
        },
        {
          header: 'Tax Grids',
          fieldName: 'accountTagId',
          styleCell: {
            width: '300px',
          },
        },
        {
          header: '',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    []
  )

  const tableData2 = (fields2 ?? []).map((field, index) => {
    if (actionType === 'VIEW') {
      return {
        percent: field.percent,
        accountId: accountSelect?.data?.content.find(
          (a) => a.id === field.accountId
        )?.name,
        accountTagId: accountTagSelect?.data.content.find(
          (a) => a.id === field.accountTagId
        )?.name,
      }
    }

    return {
      percent: (
        <CoreInput
          control={control}
          name={`repartitions.${index}.percent`}
          placeholder='Nhập phần trăm'
          type='number'
          genus='small'
          rules={{ required: t('common:validation.required') }}
        />
      ),
      accountId: (
        <CoreAutocomplete
          control={control}
          name={`repartitions.${index}.accountId`}
          placeholder='Chọn tài khoản'
          disableClearable
          genus='small'
          valuePath='id'
          labelPath='name'
          labelPath2='code'
          loading={isLoadingAccountSelect}
          options={(accountSelect?.data?.content ?? []).map((item) => ({
            id: item.id,
            name: item.code + ' - ' + item.name,
          }))}
          rules={{ required: t('common:validation.required') }}
        />
      ),
      accountTagId: (
        <CoreAutocomplete
          control={control}
          name={`repartitions.${index}.accountTagId`}
          placeholder='Chọn tax grids'
          disableClearable
          genus='small'
          valuePath='id'
          labelPath='name'
          loading={isLoadingAccountTagSelect}
          options={accountTagSelect ? accountTagSelect.data.content : []}
          rules={{ required: t('common:validation.required') }}
        />
      ),
      action:
        index > 0 ? (
          <Action
            actionList={['delete']}
            onDeleteAction={() => remove2(index)}
          />
        ) : null,
    }
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
      columns1,
      tableData1,
      columns2,
      tableData2,
      isLoadingCountrySelect,
      countryList,
      isView,
    },
    { onSubmit, onCancel, append1, append2 },
  ] as const
}

export default useSaveTax
