import IconApplication from '@/assets/svg/layout1/application.svg'
import LogoApodio from '@/assets/svg/layout1/logo-apodio.svg'
import { useLogin } from '@/components/templates/Login/useLogin'
import { useAppSelector } from '@/redux/hook'
import {
  Avatar,
  ClickAwayListener,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BLACK, WHITE } from '../../../../WrapLayout/ModeTheme/colors'
import FontSizeEdit from '../FontSizeEdit'
import LanguageButton from '../LanguageButton'
import CoreInput from '@/components/atoms/CoreInput'
import useHeader from './useHeader'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import SearchIcon from '@/components/icons/SearchIcon'

const Header = () => {
  const { t } = useTranslation('common')
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const openMenu = Boolean(anchorEl)
  const { logoutAccount } = useLogin()
  const [values, handles] = useHeader()
  const { control } = values
  const { onChangeSearch, setValue, watch } = handles
  const { firstMainColor: PRIMARY } = useAppSelector(
    (state) => state.themeColorData
  )
  const [anchorElSearch, setAnchorElSearch] =
    useState<HTMLDivElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorElSearch(event.currentTarget)
  }
  const handleClickAway = () => {
    setAnchorElSearch(null)
  }
  const openPoper = Boolean(anchorElSearch)
  const { username } = useAppSelector((state) => state.companyConfigData)
  const listSg = [
    {
      label: 'trái cây',
      value: 'fruit',
    },
    {
      label: 'trái cây',
      value: 'fruit',
    },
    {
      label: 'trái cây',
      value: 'fruit',
    },
    {
      label: 'trái cây',
      value: 'fruit',
    },
    {
      label: 'trái cây',
      value: 'fruit',
    },
  ]
  return (
    <Box
      className='flex px-9 justify-between h-30'
      sx={{ backgroundColor: 'white', height: '90px' }}
    >
      <Box className='flex items-center'>
        <Typography
          variant='subtitle1'
          style={{ color: 'blue', marginLeft: 10 }}
        >
          Tiki
        </Typography>
      </Box>
      <Stack
        direction='column'
        className=' flex items-start justify-center w-1/2'
      >
        {/* <CoreInput
          className='w-full mt-5'
          genus='small'
          control={control}
          name='search'
          placeholder='Nhập thứ gì đó...'
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: (
              <div style={{ borderLeft: '1px solid #E5E5E5' }}>
                <ButtonCustom
                  theme='search'
                  sx={{ height: '10px' }}
                  type='submit'
                >
                  Tìm kiếm
                </ButtonCustom>
              </div>
            ),
          }}
          onClick={(e) => handleClick(e)}
          onChange={(e) => {
            // setInputSearch(e.target.value)
            console.log(e, 'xxxx')
          }}
        /> */}
        <CoreInput
          className='w-full mt-5'
          name='search'
          control={control}
          onClick={(e) => handleClick(e)}
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: (
              <div style={{ borderLeft: '1px solid #E5E5E5' }}>
                <ButtonCustom
                  theme='search'
                  sx={{ height: '10px' }}
                  type='submit'
                >
                  Tìm kiếm
                </ButtonCustom>
              </div>
            ),
          }}
        />
        <Popper
          sx={{ zIndex: 9999999 }}
          open={openPoper}
          anchorEl={anchorElSearch}
          transition
          className='max-w-[820px] '
        >
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={handleClickAway}>
              <Fade {...TransitionProps} timeout={100}>
                <Paper className='w-full bg-white z-50'>
                  <div className='w-[750px]'>
                    {watch('search') === '' ? (
                      <div className='w-full'>
                        {listSg.map((item, index) => {
                          return (
                            <Stack
                              onClick={() => {
                               setValue('search',item.label)
                                
                              }}
                              sx={{
                                '& ': {
                                  cursor: 'pointer',
                                  ':hover': {
                                    backgroundColor: 'gray',
                                  },
                                },
                              }}
                              className='m-1'
                              key={index}
                              direction='row'
                              alignItems='center'
                            >
                              <SearchIcon></SearchIcon>
                              <Typography> {item.label}</Typography>
                            </Stack>
                          )
                        })}
                      </div>
                    ) : (
                      <>
                        <Stack
                          sx={{
                            '& ': {
                              cursor: 'pointer',
                              ':hover': {
                                backgroundColor: 'gray',
                              },
                            },
                          }}
                          className='m-1'
                          direction='row'
                          alignItems='center'
                        >
                          <SearchIcon></SearchIcon>
                          <Typography> {watch('search')}</Typography>
                        </Stack>
                      </>
                    )}
                  </div>
                </Paper>
              </Fade>
            </ClickAwayListener>
          )}
        </Popper>
        <Stack direction='row'>
          {listSg.map((i) => (
            <Typography
              fontSize={'10px'}
              key={i.value}
              variant='subtitle1'
              style={{ color: 'GrayText', marginLeft: 10 }}
            >
              {i.label}
            </Typography>
          ))}
        </Stack>
      </Stack>
      <Box className='flex items-center gap-8 px-10'>
        <LanguageButton />
        <IconButton>
          <FontSizeEdit />
        </IconButton>
        <IconButton>
          <Image
            src={require('@/assets/svg/layout1/iconSearchWhite.svg')}
            alt=''
            height={15}
            width={15}
          />
        </IconButton>
        <>Trang chủ</>
        <IconButton>
          <Image
            src={require('@/assets/svg/layout1/iconSettingWhite.svg')}
            alt=''
            height={15}
            width={15}
          />
        </IconButton>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Typography
            variant='body1'
            style={{
              color: BLACK,
              marginRight: 10,
            }}
          >
            {username}
          </Typography>
          <Avatar style={{ height: 30, width: 30 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem> {t('account_info')}</MenuItem>
          <MenuItem
            onClick={() => {
              logoutAccount()
            }}
          >
            {t('logout')}
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default Header
