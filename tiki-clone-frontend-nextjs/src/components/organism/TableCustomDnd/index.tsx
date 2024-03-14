import styled from '@emotion/styled'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { ReactElement, useCallback } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { TableRowCustom } from './TableRowCustom'

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
  onChangePageSize?: (val: PaginationTableProps) => void
  paginationHidden?: boolean
  isLoading?: boolean
  isShowColumnStt?: boolean
  maxHeight?: number
  fieldsName: string
  setValue?: any // required with case change data of form
  watch?: (name: string) => void // required with case change data of form
  actionTable?: null | ReactElement
}

export const TableHeadCommon = styled(TableHead)(() => ({
  background: '#F6F7FB',
  border: '1px solid #DFE0EB',
}))

export const TableCellCommon = styled(TableCell)(() => ({
  '&:first-of-type': {
    borderLeft: '1px solid #DFE0EB',
  },
  '&:last-of-type': {
    borderRight: '1px solid #DFE0EB',
  },
}))

export const TableContainerCommon = styled(TableContainer)(() => ({
  boxShadow: 'none!important',
}))

export const TableCustomDnd = ({
  className,
  data,
  columns,
  page = 0,
  size = 20,
  isShowColumnStt = false,
  maxHeight,
  setValue = (name: string, value: any) => null,
  watch = (name: string) => null,
  fieldsName,
  actionTable,
}: Props) => {
  const { t } = useTranslation('common')

  if (isShowColumnStt) {
    columns = [
      {
        header: 'STT',
        fieldName: 'index',
        styleCell: { style: { width: 100 } },
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

  const reOrder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const newData = reOrder(
      watch(fieldsName),
      result.source.index,
      result.destination.index
    )
    // clearErrors()
    setValue(fieldsName, newData)
  }

  const renderRow = useCallback(() => {
    return data.map((row, index) => {
      return (
        <TableRowCustom
          key={row.key ?? row.id ?? index}
          index={index}
          id={row.key ?? row.id}
          row={row}
          columns={columns}
        />
      )
    })
    // eslint-disable-next-line
  }, [data, columns])

  return (
    <Box className={className}>
      <TableContainerCommon style={{ maxHeight: `${maxHeight}px` }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHeadCommon>
            <TableRow>
              {_.map(columns, (column, index) => (
                <TableCell
                  variant='head'
                  key={index}
                  {...column.styleCell}
                  {...(column?.styleCell ?? {})}
                  style={{
                    minWidth: index !== 0 ? 200 : 60,
                    ...column?.styleCell?.style,
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeadCommon>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided, _) => (
                <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                  {renderRow()}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
          {actionTable && <TableBody>{actionTable}</TableBody>}
        </Table>
      </TableContainerCommon>
    </Box>
  )
}
