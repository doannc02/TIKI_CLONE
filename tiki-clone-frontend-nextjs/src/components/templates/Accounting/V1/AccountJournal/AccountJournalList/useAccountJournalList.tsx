import { ColumnProps } from '@/components/organism/TableCustom'
import { accountJournalType } from '@/enum'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountJournalList } from '@/service/accounting/accountJournal/getList'
import { RequestBody } from '@/service/accounting/accountJournal/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useAccountJournalList = () => {
  const { t } = useTranslation('accounting/account-journal')
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.name'),
          fieldName: 'name',
        },
        {
          header: t('table.type'),
          fieldName: 'type',
        },
        {
          header: t('table.defaultAccount'),
          fieldName: 'defaultAccount',
        },
        {
          header: t('table.currency'),
          fieldName: 'currency',
        },
      ] as ColumnProps[],
    [t]
  )

  const { isLoading: isLoadingSelect, data: accountSelect } =
    useQueryGetAccountList({
      page: 0,
      size: MAX_VALUE,
    })

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )
  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }

    setQueryPage(input)
  }

  const onReset = () => {
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetAccountJournalList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography sx={{ fontWeight: 500 }}>{item.code}</Typography>,
      type: accountJournalType.find((ele) => ele.value === item.type)?.label,
    }
  })

  return [
    {
      methodForm,
      columns,
      isLoadingTable,
      tableData,
      isLoadingSelect,
      accountSelect: (accountSelect?.data.content ?? []).map((item) => ({
        id: item.id,
        name: item.code + ' - ' + item.name,
      })),
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useAccountJournalList
