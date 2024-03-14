import { PRIMARY } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import styled from '@emotion/styled'
import { TableCell, TableRow, Typography } from '@mui/material'

export const TableCellCommon = styled(TableCell)(() => ({
  '&:first-of-type': {
    borderLeft: '1px solid #DFE0EB',
  },
  '&:last-of-type': {
    borderRight: '1px solid #DFE0EB',
  },
}))

type Props = {
  columns: any
  append: any
  defaultValueLine: any
  action?: string
}

export const ActionTable = ({
  columns,
  append,
  defaultValueLine,
  action = 'Thêm sản phẩm',
}: Props) => {
  return (
    <TableRow>
      <TableCellCommon colSpan={columns.length + 1}>
        <div className='flex items-center gap-10 h-15 px-2'>
          <Typography
            variant='body1'
            style={{
              color: PRIMARY,
              cursor: 'pointer',
            }}
            onClick={() => append(defaultValueLine)}
          >
            {action}
          </Typography>

          {/* <Typography
              variant='body2'
              style={{
                color: '#213660',
                cursor: 'pointer',
              }}
              onClick={() => setTypeInput('SECTION')}
            >
              Thêm section
            </Typography>

            <Typography
              variant='body2'
              style={{
                color: '#213660',
                cursor: 'pointer',
              }}
              onClick={() => setTypeInput('NOTE')}
            >
              Thêm ghi chú
            </Typography> */}
        </div>
      </TableCellCommon>
    </TableRow>
  )
}
