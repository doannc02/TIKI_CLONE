import { Box } from '@mui/material'
import { ReactNode } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import LeftMenu from './components/LeftMenu'

export const Layout1 = ({ children }: { children: ReactNode }) => {
  return (
    <Box className='flex flex-col flex-1 h-screen overflow-hidden'>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 600 }}>
        <Header />
      </Box>
      <Box className='w-full flex' sx={{ maxHeight: `calc( 100vh - 60px )` }}>
        {/* <LeftMenu /> */}

        <Box
          className='w-full bg-[#E5E5E5] relative pb-20'
          sx={{
            height: `calc( 100vh - 60px )`,
            overflow: 'auto',
          }}
        >
          <Box className='w-full'>{children}</Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}
