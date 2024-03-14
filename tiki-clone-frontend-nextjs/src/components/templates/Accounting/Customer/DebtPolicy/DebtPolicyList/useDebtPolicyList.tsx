import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import TooltipIcon from '@/components/icons/TooltipIcon'
import { RED } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { statusPolicyType, statusType, timeType } from '@/enum'
import { convertToDate } from '@/helper/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetDebtPolicy } from '@/service/accounting/debtGrantingPolicies/getList'
import { RequestBody } from '@/service/accounting/debtGrantingPolicies/getList/type'
import { Tooltip, Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import DialogDeleteDebtPolicy from '../DialogDeleteDebtPolicy'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useDebtPolicyList = () => {
  const { t } = useTranslation('accounting/debt-policy')
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
          header: t('table.name'),
          fieldName: 'name',
          styleCell: {
            style: {
              minWidth: 200,
            },
          },
        },
        {
          header: t('table.partner'),
          fieldName: 'partner',
          styleCell: {
            style: {
              minWidth: 200,
            },
          },
        },
        {
          header: t('table.timeApplyPolicy'),
          fieldName: 'timeApplyPolicy',
        },
        {
          header: t('table.timeEndPolicy'),
          fieldName: 'timeEndPolicy',
        },
        {
          header: t('table.maximumDebtAmount') + ` (${currency})`,
          fieldName: 'maximumDebtAmount',
        },
        {
          header: t('table.limit'),
          fieldName: 'limit',
          styleCell: {
            style: {
              minWidth: 150,
            },
          },
        },
        {
          header: t('table.amountPunish') + ` (${currency})`,
          fieldName: 'amountPunish',
          styleCell: {
            style: {
              minWidth: 170,
            },
          },
        },
        {
          header: t('table.status'),
          fieldName: 'status',
        },
        {
          header: t('table.statusPolicy'),
          fieldName: 'statusPolicy',
          styleCell: {
            style: {
              minWidth: 150,
            },
          },
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

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetDebtPolicy(queryPage, {
    refetchOnMount: 'true',
    refetchInactive: true,
  })

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      name: <Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>,
      maximumDebtAmount: (
        <CurrencyFormatCustom amount={item.maximumDebtAmount} color={RED} />
      ),
      amountPunish: (
        <CurrencyFormatCustom amount={item.amountPunish} color={RED} />
      ),
      timeApplyPolicy: convertToDate(item.timeApplyPolicy),
      timeEndPolicy: convertToDate(item.timeEndPolicy),
      partner:
        item.partners.length > 0 ? (
          item.partners.length === 1 ? (
            item.partners[0]
          ) : (
            <div className='flex justify-center'>
              <Tooltip
                title={
                  item.partners.length > 0 ? (
                    <div className='bg-[#fff] flex flex-col gap-3 m-5'>
                      {item.partners.map((item, index) => (
                        <Typography
                          key={index}
                          variant='caption'
                          style={{
                            margin: 4,
                          }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </div>
                  ) : (
                    ''
                  )
                }
              >
                <div className='h-8 w-8'>
                  <TooltipIcon />
                </div>
              </Tooltip>
            </div>
          )
        ) : null,
      limit:
        item.timeRepayDebt +
        ' ' +
        timeType.find((i) => i.value === item.timeType)?.label,
      status: statusType.find((ele) => ele.value === item.status)?.label,
      statusPolicy: statusPolicyType.find(
        (ele) => ele.value === item.statusPolicy
      )?.label,

      action: (
        <Action
          actionList={item.status === 'DRAFT' ? ['edit', 'delete'] : ['watch']}
          onEditAction={() => {
            router.push({
              pathname: `${MENU_URL.CUSTOMER.POLICY}/[id]`,
              query: {
                id: item.id,
              },
            })
          }}
          onWatchAction={() => {
            router.push({
              pathname: `${MENU_URL.CUSTOMER.POLICY}/[id]`,
              query: {
                id: item.id,
              },
            })
          }}
          onDeleteAction={() =>
            showDialog(
              <DialogDeleteDebtPolicy id={item.id} refetch={refetch} />
            )
          }
        />
      ),
    }
  })

  return [
    {
      methodForm,
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

export default useDebtPolicyList
