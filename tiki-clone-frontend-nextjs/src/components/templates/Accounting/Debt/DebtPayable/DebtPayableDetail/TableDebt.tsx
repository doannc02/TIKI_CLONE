import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import PaginationCustom from '@/components/organism/PaginationCustom'
import { useAppSelector } from '@/redux/hook'
import { TotalDebt } from '@/service/accounting/debtPaid/getTotal/type'
import styled from '@emotion/styled'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { ReactElement } from 'react'

export interface ColumnProps {
  header: string | ReactElement
  fieldName?: string
  render?: (val: any, index: number) => ReactElement
  styleCell?: TableCellProps
}

type PaginationTableProps = {
  page?: number
  size?: number
}

type Props = {
  className?: string
  data: Record<string, any>[]
  columns: ColumnProps[]
  page?: number
  size?: number
  totalPages?: number
  paginationHidden?: boolean
  isLoading?: boolean
  isShowColumnStt?: boolean
  maxHeight?: number
  showInfoText?: boolean
  totalDebt: TotalDebt | null
  onChangePageSize?: (val: PaginationTableProps) => void
  onRowClick?: (id: number, row?: any) => void
}

export const TableHeadCommon = styled(TableHead)(() => ({
  background: '#F6F7FB',
}))

export const TableCellCommon = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
}))

export const TableContainerCommon = styled(TableContainer)(() => ({
  boxShadow: 'none!important',
  borderRadius: '4px 4px 0px 0px',
  border: '1px solid #DFE0EB',
}))

export const TableDebt = ({
  className,
  data,
  columns,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  isLoading,
  isShowColumnStt = false,
  maxHeight,
  showInfoText = true,
  totalDebt,
  onChangePageSize,
  onRowClick,
}: Props) => {
  const { t } = useTranslation('common')

  const { currency } = useAppSelector((state) => state.companyConfigData)

  if (isShowColumnStt) {
    columns = [
      {
        header: t('table.no') ?? 'No',
        fieldName: 'index',
      },
      ...columns,
    ]
    data = data.map((item: any, index: number) => {
      const noNumber = page * size + index + 1
      return {
        ...item,
        index: noNumber > 9 ? noNumber : `0${noNumber}`,
      }
    })
  }

  return (
    <Box className={className}>
      <TableContainerCommon
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHeadCommon>
            <TableRow>
              <TableCellCommon align='center' rowSpan={2}>
                STT
              </TableCellCommon>
              <TableCellCommon
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Mã đơn hàng
              </TableCellCommon>
              <TableCellCommon
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Ngày tạo DH
              </TableCellCommon>
              <TableCellCommon
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Mã hóa đơn
              </TableCellCommon>
              <TableCellCommon
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Ngày tạo HD
              </TableCellCommon>
              <TableCellCommon
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Nội dung
              </TableCellCommon>
              <TableCellCommon
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                TK công nợ
              </TableCellCommon>
              <TableCellCommon
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                TK đối ứng
              </TableCellCommon>

              <TableCellCommon align='center' colSpan={2}>
                Số dư đầu kỳ
              </TableCellCommon>
              <TableCellCommon align='center' colSpan={2}>
                Phát sinh
              </TableCellCommon>
              <TableCellCommon align='center' colSpan={2}>
                Số dư cuối kỳ
              </TableCellCommon>
            </TableRow>

            <TableRow>
              <TableCellCommon
                align='center'
                style={{
                  minWidth: 200,
                }}
              >
                {`Nợ (${currency})`}
              </TableCellCommon>
              <TableCellCommon
                align='center'
                style={{
                  minWidth: 200,
                }}
              >{`Có (${currency})`}</TableCellCommon>
              <TableCellCommon
                align='center'
                style={{
                  minWidth: 200,
                }}
              >
                {`Nợ (${currency})`}
              </TableCellCommon>
              <TableCellCommon
                align='center'
                style={{
                  minWidth: 200,
                }}
              >{`Có (${currency})`}</TableCellCommon>
              <TableCellCommon
                align='center'
                style={{
                  minWidth: 200,
                }}
              >
                {`Nợ (${currency})`}
              </TableCellCommon>
              <TableCellCommon
                align='center'
                style={{
                  minWidth: 200,
                }}
              >{`Có (${currency})`}</TableCellCommon>
            </TableRow>
          </TableHeadCommon>

          <TableBody>
            {!isLoading && data?.length > 0 && totalDebt && (
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.debit}
                  />
                </TableCell>
                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.credit}
                  />
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.debit}
                  />
                </TableCell>
                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.credit}
                  />
                </TableCell>
              </TableRow>
            )}

            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} variant='body'>
                  <div className='flex justify-center min-h-[30px]'>
                    <CircularProgress />
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              showInfoText ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    variant='body'
                    align='center'
                    className='py-8'
                  >
                    <Typography variant='body1'>
                      {t('table.no_data')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null
            ) : (
              _.map(data, (row: any, index) => (
                <TableRow
                  key={row?.key || row?.id || index}
                  className='hover:bg-slate-100 cursor-pointer'
                  onDoubleClick={() => {
                    onRowClick && onRowClick(row?.id, row)
                  }}
                >
                  {_.map(columns, (column, indexColumn) => {
                    return (
                      <TableCell
                        key={indexColumn}
                        style={{
                          borderBottom:
                            index !== data.length - 1
                              ? '1px solid rgba(224, 224, 224, 1)'
                              : '',
                        }}
                        align='center'
                      >
                        {column?.fieldName && !column?.render && (
                          <>{_.get(row, column.fieldName)}</>
                        )}
                        {column?.render && column.render(row, index)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}

            {totalDebt && (
              <TableRow className='bg-slate-100 h-22'>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align='center'>
                  <Typography variant='subtitle1'>Tổng</Typography>
                </TableCell>

                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.debit}
                  />
                </TableCell>
                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.credit}
                  />
                </TableCell>
                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.arise.debit}
                  />
                </TableCell>
                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.arise.credit}
                  />
                </TableCell>
                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.endingBalance.debit}
                  />
                </TableCell>
                <TableCell align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.endingBalance.credit}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
      {!paginationHidden && (
        <div className='py-5'>
          <PaginationCustom
            size={size ?? 1}
            page={page ?? 1}
            totalPages={totalPages ?? 1}
            onChangePagination={(val: any) =>
              onChangePageSize && onChangePageSize(val)
            }
          />
        </div>
      )}
    </Box>
  )
}
