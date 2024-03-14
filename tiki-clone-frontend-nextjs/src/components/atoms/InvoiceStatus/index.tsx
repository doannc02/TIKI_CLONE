import {
  GREEN,
  ORANGE,
  RED,
} from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { Typography } from '@mui/material'
import { memo } from 'react'

const InvoiceStatus = ({ value }: { value?: string | null }) => {
  if (value === 'DRAFT')
    return (
      <Typography variant='body1' style={{ color: ORANGE }}>
        Nháp
      </Typography>
    )
  if (value === 'POSTED')
    return (
      <Typography variant='body1' style={{ color: GREEN }}>
        Đã vào sổ
      </Typography>
    )
  if (value === 'CANCELED')
    return (
      <Typography variant='body1' style={{ color: RED }}>
        Đã hủy
      </Typography>
    )

  return null
}

export default memo(InvoiceStatus)
