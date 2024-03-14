import { useSwitchSystem } from '@/components/hooks/switchSystem/useSwitchSystem'
import { listMenuRoutes } from '@/routes'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Box, Divider, IconButton, Typography, styled } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import MenuGroup from '../MenuGroup'
import { isOpenLeftMenu } from './recoil'

export const drawerWidth: number = 280

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    borderRight: 'none',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const LeftMenu = () => {
  const router = useRouter()
  const [isOpen, setIsOpenMenu] = useRecoilState(isOpenLeftMenu)
  const { handleOpenDialog, renderDialogChoseBizzApp } = useSwitchSystem()

  const toggleDrawer = () => {
    setIsOpenMenu(!isOpen)
  }

  const renderLeftMenu = () => {
    return (
      <Box
        className='flex flex-col overflow-y-auto relative bg-[#F6F7FB]'
        style={{
          width: drawerWidth,
          zIndex: 101,
          height: '100%',
          overflow: 'auto',
          boxShadow: '5px 0px 8px rgba(0, 0, 0, 0.08)',
          transform: 'scale(1)',
        }}
      >
        {isOpen ? (
          <div className='flex h-32 justify-between py-0 pl-10 pr-6'>
            <div
              className='flex items-center gap-4 cursor-pointer'
              onClick={() => router.push('/')}
            >
              <Typography variant='h6'>Accounting</Typography>
            </div>
            <div className='flex items-center gap-2'>
              <IconButton onClick={handleOpenDialog}>
                <Image
                  alt='Apodio_logo'
                  width={16}
                  height={16}
                  src={require('@/assets/svg/arrowsClockwise.svg')}
                />
              </IconButton>

              <IconButton onClick={toggleDrawer}>
                <MenuOpenIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <div className='flex flex-col'>
            <div className='flex h-22 justify-start py-0 px-10'>
              <IconButton onClick={toggleDrawer}>
                <MenuOpenIcon />
              </IconButton>
            </div>

            <div className='flex h-22 justify-start py-0 px-10'>
              <IconButton onClick={handleOpenDialog}>
                <Image
                  alt='Apodio_logo'
                  width={16}
                  height={16}
                  src={require('@/assets/svg/arrowsClockwise.svg')}
                />
              </IconButton>
            </div>
          </div>
        )}

        <Divider className='w-full' />

        <Box
          display='flex'
          flexDirection='column'
          sx={{ maxHeight: `calc( 100vh - 120px )`, overflow: 'auto' }}
        >
          {listMenuRoutes.map((item, index) => {
            return (
              <MenuGroup
                key={index}
                item={item}
                isChecked={router.asPath.startsWith(item.path)}
                listPermission={[]}
                isSystemAdmin={true}
                indexNumber={0}
              />
            )
          })}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      style={{
        boxShadow: '5px 0px 8px rgba(0, 0, 0, 0.08)',
        transform: 'scale(1)',
      }}
    >
      <Box position='sticky' top='0px' zIndex={1}>
        <Drawer variant='permanent' open={isOpen}>
          <div>
            {renderLeftMenu()}
            {renderDialogChoseBizzApp()}
          </div>
        </Drawer>
      </Box>
    </Box>
  )
}

export default LeftMenu
