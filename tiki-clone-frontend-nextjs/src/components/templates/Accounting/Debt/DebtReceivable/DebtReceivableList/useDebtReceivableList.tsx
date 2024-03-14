import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { useQueryGetDebtReceivableList } from '@/service/accounting/debtReceivable/getList'
import { RequestBody } from '@/service/accounting/debtReceivable/getList/type'
import { useQueryGetTotalReceivableDebt } from '@/service/accounting/debtReceivable/getTotal'
import { useQueryGetFiscalYearConfig } from '@/service/common/company/getFiscalYearConfig'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'

const defaultValues = {
  page: 0,
  size: 20,
}

const useDebtReceivableList = () => {
  const { t } = useTranslation('accounting/debt-receivable')
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { reset, handleSubmit, setValue } = methodForm

  const { data: fiscalYearConfig } = useQueryGetFiscalYearConfig()

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  useEffect(() => {
    if (fiscalYearConfig) {
      setQueryPage({
        ...queryPage,
        start: fiscalYearConfig.data.startFiscalYear,
        end: fiscalYearConfig.data.endFiscalYear,
      })
      setValue('start', fiscalYearConfig.data.startFiscalYear)
      setValue('end', fiscalYearConfig.data.endFiscalYear)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiscalYearConfig, setValue])

  const columns = useMemo(
    () =>
      [
        {
          fieldName: 'code',
        },
        {
          fieldName: 'name',
        },
        {
          fieldName: 'codeAccount',
        },
        {
          fieldName: 'openBalanceDebit',
        },
        {
          fieldName: 'openBalanceCredit',
        },

        {
          fieldName: 'ariseDebit',
        },
        {
          fieldName: 'ariseCredit',
        },
        {
          fieldName: 'endingBalanceDebit',
        },
        {
          fieldName: 'endingBalanceCredit',
        },
      ] as ColumnProps[],
    []
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }

    setQueryPage(input)
  }

  const onReset = () => {
    reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetDebtReceivableList(
    {
      ...queryPage,
      customerId: queryPage?.customer?.id,
      customer: null,
    },
    {
      enabled: !!queryPage?.start && !!queryPage?.end,
    }
  )

  const { isLoading: isLoadingGetTotalDebt, data: totalDebt } =
    useQueryGetTotalReceivableDebt(
      {
        ...queryPage,
        customerId: queryPage?.customer?.id,
        customer: null,
      },
      {
        enabled: !!queryPage?.start && !!queryPage?.end,
      }
    )

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      partner: item.code + ' - ' + item.name,
      customerId: item.id,
      code: <Typography sx={{ fontWeight: 500 }}>{item.code}</Typography>,
      name: item.name,
      codeAccount: item.codeAccount,
      openBalanceDebit: (
        <CurrencyFormatCustom variant='body1' amount={item.openBalance.debit} />
      ),
      openBalanceCredit: (
        <CurrencyFormatCustom
          variant='body1'
          amount={item.openBalance.credit}
        />
      ),
      ariseDebit: (
        <CurrencyFormatCustom variant='body1' amount={item.arise.debit} />
      ),
      ariseCredit: (
        <CurrencyFormatCustom variant='body1' amount={item.arise.credit} />
      ),
      endingBalanceDebit: (
        <CurrencyFormatCustom
          variant='body1'
          amount={item.endingBalance.debit}
        />
      ),
      endingBalanceCredit: (
        <CurrencyFormatCustom
          variant='body1'
          amount={item.endingBalance.credit}
        />
      ),
    }
  })

  return [
    {
      queryPage,
      methodForm,
      isLoadingGetTotalDebt,
      totalDebt: totalDebt ? totalDebt.data : null,
      columns,
      isLoadingTable,
      tableData,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useDebtReceivableList
