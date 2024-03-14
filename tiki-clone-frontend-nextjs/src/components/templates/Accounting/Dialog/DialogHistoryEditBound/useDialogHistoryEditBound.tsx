import { ColumnProps } from '@/components/organism/TableCustom'
import { convertToDate } from '@/helper/convertToDate'
import { useFormCustom } from '@/lib/form'
import { RequestParams } from '@/service/accounting/updateHistory/getList/type'
import { useQueryGetHisUpdateList } from '@/service/accounting/updateHistory/getList'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import { ViewDetail } from './components'
import { useRouter } from 'next/router'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import moment from 'moment'

const defaultValues: RequestParams['GET'] = {
  changeId: null,
  historyType: '',
  page: 0,
  size: 20,
}

type Props = {
  changeId: number
  code: string
  historyType:
    | 'ENTRY'
    | 'OUT_INVOICE'
    | 'OUT_REFUND'
    | 'IN_REFUND'
    | 'PAYMENT'
    | any
}

export const useDialogHisEditBound = ({
  changeId,
  historyType,
  code,
}: Props) => {
  const router = useRouter()
  const { hideDialog } = useDialog()
  const { t } = useTranslation('accounting/cop-balance')
  const [queryPage, setQueryPage] = useState<RequestParams['GET']>({
    changeId: changeId,
    historyType:  historyType,
    page: 0,
    size: 20,
  })
  const methodForm = useFormCustom<RequestParams['GET']>({ defaultValues })
  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const columns = useMemo(
    () =>
      [
        {
          header: 'Thời gian chỉnh sửa',
          fieldName: 'createdAt',
        },
        {
          header: 'Người chỉnh sửa',
          fieldName: 'createdBy',
        },
        {
          header: 'Thông tin chỉnh sửa',
          fieldName: 'viewAction',
        },
      ] as ColumnProps[],
    []
  )
  const { data, isLoading } = useQueryGetHisUpdateList(queryPage, {
    enabled: !!changeId,
  })

  const dataTable = (data?.data?.content ?? []).map((item, index) => {
    const noNumber = (queryPage?.page ?? 0) * (queryPage?.size ?? 0) + index + 1;
    return {
      ...item,
      createdAt: <>{moment(item?.createdAt).format('HH:mm DD/MM/YYYY')}</>,
      createdBy: item.createdBy,
      viewAction: (
        <ViewDetail
          onClick={() => {
            router.push({
              pathname:  `${router.pathname}/historyUpdate`,
              query: {
                id: item?.id,
                name: `Lần ${noNumber}`,
                code: code,
                historyType: historyType
              },
            })
            hideDialog()
          }}
        />
      ),
    }
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  return [
    {
      historyType,
      columns,
      dataTable,
      isLoading,
      page: data?.data?.page ?? 0,
      size: data?.data?.size ?? 20,
      totalPages: data?.data?.totalPages,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
