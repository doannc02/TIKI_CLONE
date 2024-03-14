import { WHITE } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import styles from './styles.module.css'

const RegisterPanel = () => {
  const matches = useMediaQuery('(max-width:640px)')

  if (matches) return null

  return (
    <div className={`flex flex-1 ${styles.imageBg} w-1/2`}>
      <div className={`w-full p-20 h-full flex-1 ${styles.frameBg}`}>
        <Image alt='' src={require('@/assets/svg/apodio_logo.svg')} />

        <div className='flex h-full items-center justify-center px-10'>
          <Typography
            style={{
              color: WHITE,
              lineHeight: '2.4rem',
            }}
            variant='body1'
          >
            APODIO một thương hiệu lấy cảm hứng từ vị thần đến từ đỉnh Olympia
            trong thần thoại Hy Lạp – APOLLO, vị thần của Mặt Trời, của Ánh
            Sáng, Âm Nhạc và những lời tiên tri. APODIO là sự trẻ trung, sáng
            tạo kết hợp với ứng dụng các công nghệ sản xuất tiên tiến nhất, các
            thiết kế bắt kịp với xu hướng thị trường đang mang đến cho các kiến
            trúc sư, người tiêu dùng một trợ lực hoàn hảo giúp họ có thể thỏa
            mãn sự sáng tạo các không gian kiến trúc đậm chất tự nhiên và hiện
            thực hóa các ý tưởng này một cách sống động nhất.
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default RegisterPanel
