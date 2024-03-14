import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { PRIMARY, RED } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { convertToDate } from '@/helper/convertToDate'
import { MENU_URL } from '@/routes'
import { PaymentResponse } from '@/service/accounting/accountMove/getDetail/type'
import { IconButton, Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const PopupDetailInvoice = ({ item }: { item: PaymentResponse }) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  let pathname: string | null = null

  if (item.paymentPopUpResponse.payType === 'BY_PAYMENT') {
    if (item.paymentPopUpResponse.paymentMethod === 'CASH') {
      pathname = `${
        MENU_URL.CASH_ACCOUNT[item.paymentPopUpResponse.paymentType]
      }/[id]`
    } else if (item.paymentPopUpResponse.paymentMethod === 'BANK') {
      pathname = `${
        MENU_URL.BANK_ACCOUNT[item.paymentPopUpResponse.paymentType]
      }/[id]`
    }
  } else if (item.paymentPopUpResponse.payType === 'BY_ACCOUNT_MOVE') {
    if (item.paymentPopUpResponse.moveType === 'IN_INVOICE') {
      pathname = `${MENU_URL.PROVIDER.INVOICE}/[id]`
    } else if (item.paymentPopUpResponse.moveType === 'IN_REFUND') {
      pathname = `${MENU_URL.PROVIDER.REFUND}/[id]`
    } else if (item.paymentPopUpResponse.moveType === 'OUT_INVOICE') {
      pathname = `${MENU_URL.CUSTOMER.INVOICE}/[id]`
    } else if (item.paymentPopUpResponse.moveType === 'OUT_REFUND') {
      pathname = `${MENU_URL.CUSTOMER.REFUND}/[id]`
    } else if (item.paymentPopUpResponse.moveType === 'ENTRY') {
      pathname = `${MENU_URL.ENTRY.ENTRY_INVOICE}/[id]`
    }
  } else if (item.paymentPopUpResponse.payType === 'DECLARE_BANK') {
    pathname = `${MENU_URL.BALANCE.BANK_BALANCE}/[id]`
  } else if (item.paymentPopUpResponse.payType === 'DECLARE_CUSTOMER') {
    pathname = `${MENU_URL.BALANCE.CUSTOMER}/[id]`
  } else if (item.paymentPopUpResponse.payType === 'DECLARE_VENDOR') {
    pathname = `${MENU_URL.BALANCE.PROVIDER}/[id]`
  }

  let id = item.paymentPopUpResponse.id
  if (item.paymentPopUpResponse.payType === 'BY_ACCOUNT_MOVE') {
    id = item.paymentPopUpResponse.accountMoveId
  }

  return (
    <div className='flex flex-row-reverse'>
      <div className='flex flex-row-reverse min-w-[200px]'>
        <CurrencyFormatCustom
          amount={-item.amount}
          color={RED}
          showCurrencyName
        />
      </div>

      <div
        className='flex gap-5 items-center'
        id='demo-positioned-button'
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconButton>
          <Image
            alt='info'
            width={18}
            height={18}
            src={require('@/assets/svg/info.svg')}
          />
        </IconButton>

        <Typography variant='body1'>
          Trả lúc &nbsp;
          {convertToDate(item.paymentPopUpResponse?.paymentDate)}
        </Typography>
      </div>

      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        MenuListProps={{
          style: {
            paddingTop: 0,
            minWidth: '260px',
          },
        }}
      >
        <div className='bg-[#F6F7FB] h-20 flex justify-center items-center mb-3'>
          <Typography variant='h6'>Thông tin bút toán</Typography>
        </div>

        {item.amountDiscount && (
          <MenuItem className='flex gap-10'>
            <Typography variant='body1' width={68}>
              Khuyến mại:
            </Typography>
            <CurrencyFormatCustom
              amount={item.amountDiscount}
              showCurrencyName
              color={RED}
            />
          </MenuItem>
        )}

        <MenuItem className='flex gap-10'>
          <Typography variant='body1' width={68}>
            Số tiền:
          </Typography>
          <CurrencyFormatCustom
            amount={item.paymentPopUpResponse.amount}
            showCurrencyName
            color={RED}
          />
        </MenuItem>
        <MenuItem className='flex gap-10'>
          <Typography variant='body1' width={68}>
            Nội dung :
          </Typography>
          <Typography variant='body1'>
            {item.paymentPopUpResponse.note}
          </Typography>
        </MenuItem>
        <MenuItem className='flex gap-10'>
          <Typography variant='body1' width={68}>
            Ngày:
          </Typography>
          <Typography variant='body1'>
            {convertToDate(item.paymentPopUpResponse.paymentDate)}
          </Typography>
        </MenuItem>
        <MenuItem className='flex gap-10'>
          <Typography variant='body1' width={68}>
            Sổ kế toán:
          </Typography>
          <Typography variant='body1'>
            {item.paymentPopUpResponse.accountJournalName}&nbsp;
            {item.paymentPopUpResponse.paymentMethodName
              ? `(${item.paymentPopUpResponse.paymentMethodName})`
              : ''}
          </Typography>
        </MenuItem>
        <MenuItem
          style={{
            display: 'flex',
            justifyContent: 'center',
            textDecorationLine: 'underline',
            color: PRIMARY,
          }}
          onClick={() => {
            handleClose()

            if (id && pathname)
              router.push({
                pathname,
                query: {
                  id,
                  actionType: 'VIEW',
                },
              })
          }}
        >
          Xem chi tiết
        </MenuItem>
      </Menu>
    </div>
  )
}

export default PopupDetailInvoice
