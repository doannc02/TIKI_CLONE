import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useSaleOrderManagement } from './useSaleOrderManagement'
import { useCheckPath } from '@/path'

export const SaleOrderManagement = () => {
  const router = useRouter()
  const [values, handles] = useSaleOrderManagement()
  const { typePathSale } = useCheckPath()
  const {
    control,
    isLoading,
    data,
    page,
    size,
    totalPages,
    dataRows,
    columns,
    stateFilter,
    PATH_URL,
  } = values
  const { refetch, onSubmit, handleReset, onChangePageSize } = handles

  return (
    <PageContainer
      action={
        <div className='flex justify-between w-full'>
          <Typography variant='h6'>
            {typePathSale === 'CLEARANCE' ? 'Thanh lý' : 'Đơn bán'}
          </Typography>
        </div>
      }
    >
      <div>
        <form onSubmit={onSubmit} autoComplete='off'>
          <div className='grid grid-cols-3 gap-10'>
            <CoreInput
              control={control}
              name='search'
              label='Mã đơn hàng'
              placeholder='Nhập từ khóa'
              genus='small'
            />

            <DatePickerCustom
              control={control}
              name='quotationDate'
              title='Ngày gửi báo giá'
              genus='small'
            />
            <DatePickerCustom
              control={control}
              name='orderDate'
              title='Ngày đặt hàng'
              genus='small'
            />
            <DatePickerCustom
              control={control}
              name='createDate'
              title='Ngày tạo báo giá'
              genus='small'
            />
            <CoreAutocomplete
              control={control}
              name='state'
              label='Trạng thái'
              returnValueType='enum'
              placeholder='Chọn trạng thái'
              options={stateFilter}
              genus='small'
            />
          </div>
          <div className='flex justify-center mt-6 mb-16'>
            <div className='m-5'>
              <ButtonCustom
                onClick={() => handleReset()}
                theme='reset'
                textTransform='none'
                height={36}
                // style={{ marginRight: 20 }}
              >
                Reset
              </ButtonCustom>
            </div>
            <div className='m-5'>
              <ButtonCustom
                theme='submit'
                type='submit'
                textTransform='none'
                height={36}
              >
                Tìm kiếm
              </ButtonCustom>
            </div>
          </div>
        </form>
        <CustomTable
          columns={columns}
          data={dataRows}
          onChangePageSize={onChangePageSize}
          page={page}
          size={size}
          totalPages={totalPages}
          isLoading={isLoading}
          isShowColumnStt
        />
      </div>
    </PageContainer>
  )
}
