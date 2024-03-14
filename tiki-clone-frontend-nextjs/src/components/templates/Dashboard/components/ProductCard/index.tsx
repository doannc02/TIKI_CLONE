import { StarFilled } from '@ant-design/icons'
import { Card } from 'antd'

import images from '@/assets/images'
import { formatAmount } from '@/helper/formatAmound'
import Image from '@/components/atoms/ImageCustom'
// import { Product } from '@/types'



interface ProductCardProps {
  product: any
}

export default function ProductCard({ product }: ProductCardProps) {

  if (!product) return null

  return (
    <Card
      hoverable
      style={{ width: 200 }}
      bodyStyle={{ padding: 10 }}
      className='relative overflow-hidden rounded'
      cover={<Image className='h-[200px] w-[200px] object-contain' alt='example' src={product.product_thumb} />}
      onClick={() => {}}
    >
      <Image
        className='absolute -top-[6px] -left-[1px] h-[24px] w-[68px] max-w-full object-contain'
        src={images.officialBadge }
        alt='official badge'
      />
      <div className='break-words text-xs font-normal text-[#38383d]'>{product.product_name}</div>

      <div className='flex items-center text-xs font-normal'>
        <div className='flex items-center'>
          <span>4.95</span>
          <StarFilled rev="star-filled-icon" className='text-[#fdd836]' />
        </div>                      
        <div className='flex items-center'>
          <div className='mx-[6px] h-[9px] w-[1px] bg-[#c7c7c7]'></div>
          <div>Đã bán 1000+</div>
        </div>
      </div>

      <div className='mt-[6px] flex items-center text-[#ff424e]'>
        <div className='text-base font-medium'>{formatAmount(product.product_price, 'vi-VN', 'VND')}</div>
        <div className='ml-1 mt-[3px] px-[2px] text-xs font-medium'>-34%</div>
      </div>

      <div className='min-h-[24px] text-[12px] font-normal leading-3 text-[#808089]'>
        {'Tặng tới 802 ASA (181k ₫)'}
        <br />
        {'≈ 2.5% hoàn tiền'}
      </div>

      <div className='mt-[6px] flex min-h-[17px] flex-wrap gap-1'>
        {['Freeship+', 'Trả góp'].map((item) => (
          <div
            key={item}
            className='rounded-sm border-[0.5px] border-[#1a94ff] py-[2px] px-1 text-[12px] font-normal leading-3 text-[#1a94ff]'
          >
            {item}
          </div>
        ))}
      </div>
    </Card>
  )
}
