import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import InvoiceStatus from '@/components/atoms/InvoiceStatus'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { RED } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { ColumnProps } from '@/components/organism/TableCustom'
import { paymentMethodSelect } from '@/enum'
import { MAX_VALUE } from '@/helper/contain'
import { convertToDate } from '@/helper/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountPaymentList } from '@/service/accounting/accountPayment/getList'
import { RequestBody } from '@/service/accounting/accountPayment/getList/type'
import { useQueryGetPartnerList } from '@/service/common/partner/getListTiny'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useBankAccountList = () => {
  const { t } = useTranslation('accounting/bank-account')
  const router = useRouter()
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { showDialog } = useDialog()
  const { currency } = useAppSelector((state) => state.companyConfigData)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.partnerName'),
          fieldName: 'partner',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: t('table.paymentDate'),
          fieldName: 'paymentDate',
        },
        {
          header: t('table.accountJournalName'),
          fieldName: 'accountJournal',
        },
        {
          header: t('table.paymentMethod'),
          fieldName: 'paymentMethod',
        },

        {
          header: t('table.amountSource'),
          fieldName: 'amountSource',
        },
        {
          header: t('table.amount') + ` (${currency})`,
          fieldName: 'amount',
        },
        {
          header: t('table.state'),
          fieldName: 'state',
        },
      ] as ColumnProps[],
    [currency, t]
  )

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

  const { paymentMethod, paymentType } = useCheckPath()

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetAccountPaymentList({
    ...queryPage,
    paymentType,
    paymentMethod,
    partnerType: paymentType === 'INBOUND' ? 'CUSTOMER' : 'VENDOR',
  })

  const { isLoading: isLoadingPartners, data: partnerSelect } =
    useQueryGetPartnerList({
      page: 0,
      size: MAX_VALUE,
      activated: true,
    })

  const { isLoading: isLoadingSelect, data: accountSelect } =
    useQueryGetAccountList({
      page: 0,
      size: MAX_VALUE,
    })

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography sx={{ fontWeight: 500 }}>{item.code}</Typography>,
      accountJournal: item.accountJournal?.name,
      paymentMethod: paymentMethodSelect.find(
        (ele) => ele.value === item.paymentMethod
      )?.label,
      partner: item.partner?.code + ' - ' + item.partner?.name,
      amountSource: item.amountSource ? (
        <div className='flex gap-2'>
          <CurrencyFormatCustom amount={item.amountSource} color={RED} />
          <Typography
            style={{
              color: RED,
            }}
          >
            {` (${item.currency.name})`}
          </Typography>
        </div>
      ) : null,
      amount: <CurrencyFormatCustom amount={item.amount} color={RED} />,
      paymentDate: convertToDate(item.paymentDate),
      state: <InvoiceStatus value={item.state} />,
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
      isLoadingPartners,
      partnerSelect: (partnerSelect ? partnerSelect.data.content : []).map(
        (item) => ({ ...item, name: item.code + ' - ' + item.name })
      ),
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useBankAccountList
