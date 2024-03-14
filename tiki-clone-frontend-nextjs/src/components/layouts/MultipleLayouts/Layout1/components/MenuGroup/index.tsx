import { ButtonMenu } from '@/components/atoms/ButtonMenu'
import { WHITE } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { MenuPathProps } from '@/routes'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Button, Collapse, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { isOpenLeftMenu } from '../LeftMenu/recoil'

interface Props {
  isChecked?: boolean
  item: MenuPathProps
  indexNumber: number
  isSystemAdmin?: boolean
  listPermission?: string[]
}

const MenuGroup = (props: Props) => {
  const { t } = useTranslation('common')
  const { indexNumber, isChecked, isSystemAdmin, item, listPermission } = props
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isOpenMenu = useRecoilValue(isOpenLeftMenu)

  const groupMenuChecked = (item: MenuPathProps): boolean => {
    if (item.children)
      return item.children.some(
        (itemMenu) =>
          router.asPath.startsWith(itemMenu.path) || groupMenuChecked(itemMenu)
      )
    else return false
  }

  if (item.type === 'item') {
    return (
      <Link
        href={item.path}
        style={{
          textDecoration: 'none',
          width: '100%',
        }}
      >
        <ButtonMenu
          color='primary'
          variant={isChecked ? 'contained' : 'text'}
          disableElevation
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'start',
            paddingLeft: (indexNumber + 1) * 16,
          }}
        >
          <div className='flex gap-6 items-center'>
            {item.icon}
            {isOpenMenu && (
              <Typography
                variant='body2'
                style={{
                  color: isChecked ? WHITE : 'black',
                }}
              >
                {t(item.name)}
              </Typography>
            )}
          </div>
        </ButtonMenu>
      </Link>
    )
  }

  return (
    <Box>
      <Button
        color='primary'
        variant={groupMenuChecked(item) ? 'contained' : 'text'}
        disableElevation
        style={{
          paddingLeft: (indexNumber + 1) * 16,
          height: 40,
          width: '100%',
          borderRadius: '0px 20px 20px 0px',
          backgroundColor: groupMenuChecked(item) ? '#e0e0e0' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => setOpen(!open)}
      >
        <div className='flex gap-6 items-center'>
          {item.icon}
          {isOpenMenu && (
            <Typography
              variant='body2'
              style={{
                color: groupMenuChecked(item) ? WHITE : 'black',
              }}
            >
              {t(item.name)}
            </Typography>
          )}
        </div>
        <KeyboardArrowRightIcon
          fontSize='small'
          style={{ transform: open ? 'rotate(90deg)' : undefined }}
        />
      </Button>

      {item.children && (
        <Collapse in={open}>
          {item.children.map((item: any, index: number) => {
            return (
              <MenuGroup
                key={index}
                item={item}
                isChecked={router.asPath.startsWith(item.path)}
                indexNumber={indexNumber + 1}
                isSystemAdmin={isSystemAdmin}
                listPermission={listPermission}
              />
            )
          })}
        </Collapse>
      )}
    </Box>
  )
}

export default MenuGroup
