import React from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { TryRounded } from '@mui/icons-material'
import { Box } from '@mui/material'
import ProductCard from '../ProductCard'

function AutoPlay({
  imageList,
  productList,
  settings
}: {
  imageList?: any[]
  productList?: any[]
  settings?: Settings
}): JSX.Element {
  const settingDefault : Settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    arrows: true,
    touchMove: false,
    //dots: true
  }

  return (
    <>
      {productList ? (
        <>
          <Box
            sx={{
              '& .slideRoot': {
                '& .slick-prev, & .slick-next': {
                  // top: -25,
                  '&:before': {
                    color: (theme) => theme.palette.text.primary,
                    fontSize: '32px',
                  },
                  zIndex: 9999,
                },
                '& .slick-prev': {
                  //  right: 192,
                  left: 0,
                },
                '& .slick-next': {
                  right: 10,
                },
              },
            }}
            className='slider-container'
          >
            <Slider {...settings} className='slideRoot'>
              {productList.map((i, index) => {
                return <ProductCard product={i} key={index} />
              })}
            </Slider>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            '& .slideRoot': {
              '& .slick-prev, & .slick-next': {
                // top: -25,
                '&:before': {
                  color: (theme) => theme.palette.text.primary,
                  fontSize: '32px',
                },
                zIndex: 9999,
              },
              '& .slick-prev': {
                //  right: 192,
                left: 0,
              },
              '& .slick-next': {
                right: 10,
              },
            },
          }}
          className='slider-container'
        >
          <Slider {...settingDefault} {...settings} className='slideRoot'>
            {imageList?.map((image, index) => (
              <div
                className='h-[360px] w-[500px] overflow-hidden rounded-lg'
                key={index}
              >
                <Image
                  src={image}
                  alt={image}
                  className='w-full h-full rounded-lg object-cover'
                />
              </div>
            ))}
          </Slider>
        </Box>
      )}
    </>
  )
}

export default AutoPlay
