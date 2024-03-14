import PageContainer from '@/components/organism/PageContainer'
import { Grid, Stack, Typography } from '@mui/material'
// import { useDashboard } from './useDashboard'
import SlickSlider from './components/SlickSlider'
import images from '@/assets/images'
import AutoPlayMethods from './components/SlickSlider'
import AutoPlay from './components/SlickSlider'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import LeftMenu from '@/components/layouts/MultipleLayouts/Layout1/components/LeftMenu'
import LeftMenuV2 from '@/components/layouts/MultipleLayouts/Layout1/components/LeftMenuV2'
import ProductCard from './components/ProductCard'
import { BLUE } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import CountDownCustom from '@/components/atoms/CountDowntCustom'
import CountDown from '@/components/atoms/CountDowntCustom'

const imageList = [
  images.slider1,
  images.slider2,
  images.slider3,
  images.slider4,
  images.slider5,
]
const productList = [
  {
    product_thumb: '',
    officialBadge: '',
    product_name: '',
    product_price: 1200,
  },
  {
    product_thumb: '',
    officialBadge: '',
    product_name: '',
    product_price: 1000,
  },
  {
    product_thumb: '',
    officialBadge: '',
    product_name: '',
    product_price: 1200,
  },
  {
    product_thumb: '',
    officialBadge: '',
    product_name: '',
    product_price: 1000,
  },
  {
    product_thumb: '',
    officialBadge: '',
    product_name: '',
    product_price: 1200,
  },
  {
    product_thumb: '',
    officialBadge: '',
    product_name: '',
    product_price: 1000,
  },
]
export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
const Dashboard = () => {
  // const [, _] = useDashboard()
  const newYear = new Date("May 1, 2024").getTime()
  console.log(imageList, 'xx')
  return (
    <PageContainer
      title={
        // <div className='flex w-full'>
        //   <div className='flex flex-col justify-center'>
        //     <Typography variant='subtitle1'>test</Typography>
        //   </div>
        // </div>
        ''
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <LeftMenuV2 />
        </Grid>
        <Grid item xs={10}>
          <Item>
            <div className='w-full flex justify-end  bg-slate-50 rounded-lg'>
              <div className='w-full '>
                <AutoPlay imageList={imageList} />
              </div>
            </div>
          </Item>
          <Item className='mt-10'>
            <Stack direction='column'>
              <Stack
                className='px-5 py-10'
                direction='row'
                justifyContent='space-between'
              >
                <Stack  direction='row'
                justifyContent='space-between'>
                <Typography
                  sx={{
                    '&': {
                      fontWeight: "700",
                      cursor: 'pointer',
                    },
                  }}
                >
                  Giá tốt hôm nay
                </Typography>
                <CountDown newYear={newYear}/>
                </Stack>
                <Typography
                  sx={{
                    '&': {
                      color:BLUE,
                      cursor: 'pointer',
                    },
                  }}
                >
                  Xem tất cả
                </Typography>
              </Stack>
              <AutoPlay
                settings={
                  {
                    infinite: true,
                    slidesToShow: 5,
                    autoplay: true,
                    speed: 300,
                    autoplaySpeed: 9000,
                  } as any
                }
                productList={productList}
              />
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default Dashboard
