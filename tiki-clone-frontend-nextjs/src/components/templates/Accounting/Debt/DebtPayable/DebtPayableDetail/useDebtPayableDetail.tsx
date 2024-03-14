import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { PRIMARY } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { useQueryGetDebtPaidDetail } from '@/service/accounting/debtPaid/getDetail'
import { RequestBody } from '@/service/accounting/debtPaid/getDetail/type'
import { useQueryGetTotalPayableDebt } from '@/service/accounting/debtPaid/getTotal'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  page: 0,
  size: 20,
}

const useDebtPayableDetail = () => {
  const { t } = useTranslation('accounting/debt-payable')
  const router = useRouter()

  const { id, start, end, partner } = router.query

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues: {
      ...defaultValues,
      vendorId: Number(id),
      start: !!start ? start.toString() : undefined,
      end: !!end ? end.toString() : undefined,
    },
  })

  const { reset, handleSubmit } = methodForm

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(
      {
        ...defaultValues,
        vendorId: Number(id),
        start: start ? start.toString() : undefined,
        end: end ? end.toString() : undefined,
      },
      _.isNil
    )
  )

  const columns = useMemo(
    () =>
      [
        {
          fieldName: 'orderCode',
        },
        {
          fieldName: 'orderDate',
        },
        {
          fieldName: 'invoiceCode',
        },
        {
          fieldName: 'invoiceDate',
        },
        {
          fieldName: 'note',
        },
        {
          fieldName: 'codeAccount',
        },
        {
          fieldName: 'codeReciprocalAccount',
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
          fieldName: 'balanceDebit',
        },
        {
          fieldName: 'balanceCredit',
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
  } = useQueryGetDebtPaidDetail(
    {
      ...queryPage,
      vendorId: Number(id),
      vendor: null,
    },
    {
      enabled: !!Number(id),
    }
  )

  const { isLoading: isLoadingGetTotalDebt, data: totalDebt } =
    useQueryGetTotalPayableDebt(
      {
        ...queryPage,
        vendorId: Number(id),
        vendor: null,
      },
      {
        enabled: !!Number(id),
      }
    )

  const tableData = (data?.data?.content ?? []).map((item) => {
    let pathname = '#'
    if (item.payType === 'BY_PAYMENT') {
      if (item.paymentMethod === 'CASH') {
        pathname = `${MENU_URL.CASH_ACCOUNT[item.paymentType]}/[id]`
      } else if (item.paymentMethod === 'BANK') {
        pathname = `${MENU_URL.BANK_ACCOUNT[item.paymentType]}/[id]`
      }
    } else if (item.payType === 'BY_ACCOUNT_MOVE') {
      if (item.moveType === 'IN_INVOICE') {
        pathname = `${MENU_URL.PROVIDER.INVOICE}/[id]`
      } else if (item.moveType === 'IN_REFUND') {
        pathname = `${MENU_URL.PROVIDER.REFUND}/[id]`
      } else if (item.moveType === 'OUT_INVOICE') {
        pathname = `${MENU_URL.CUSTOMER.INVOICE}/[id]`
      } else if (item.moveType === 'OUT_REFUND') {
        pathname = `${MENU_URL.CUSTOMER.REFUND}/[id]`
      } else if (item.moveType === 'ENTRY') {
        pathname = `${MENU_URL.ENTRY.ENTRY_INVOICE}/[id]`
      }
    } else if (item.payType === 'DECLARE_BANK') {
      pathname = `${MENU_URL.BALANCE.BANK_BALANCE}/[id]`
    } else if (item.payType === 'DECLARE_CUSTOMER') {
      pathname = `${MENU_URL.BALANCE.CUSTOMER}/[id]`
    } else if (item.payType === 'DECLARE_VENDOR') {
      pathname = `${MENU_URL.BALANCE.PROVIDER}/[id]`
    }

    return {
      ...item,
      orderCode: (
        <Typography sx={{ fontWeight: 500 }}>{item.orderCode}</Typography>
      ),
      orderDate: item.dateOrder,
      invoiceCode: (
        <div
          onClick={(e) => {
            e.preventDefault()
            router.push({
              pathname,
              query: {
                id: item.accountPaymentId || item.accountMoveId,
                actionType: 'VIEW',
              },
            })
          }}
        >
          <Typography sx={{ fontWeight: 500 }} color={PRIMARY}>
            {item.code}
          </Typography>
        </div>
      ),
      invoiceDate: item.accountingDate,
      codeReciprocalAccount: item.codeReciprocalAccount,
      note: item.note,
      code: <Typography sx={{ fontWeight: 500 }}>{item.code}</Typography>,
      codeAccount: item.codeAccount,
      ariseDebit: (
        <CurrencyFormatCustom variant='body1' amount={item.arise.debit} />
      ),
      ariseCredit: (
        <CurrencyFormatCustom variant='body1' amount={item.arise.credit} />
      ),
      balanceDebit: (
        <CurrencyFormatCustom variant='body1' amount={item.balance.debit} />
      ),
      balanceCredit: (
        <CurrencyFormatCustom variant='body1' amount={item.balance.credit} />
      ),
    }
  })

  return [
    {
      id,
      partner: partner?.toString(),
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

export default useDebtPayableDetail
