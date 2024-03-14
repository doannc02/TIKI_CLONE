import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { WHITE } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ExpandableListItem from './components/collapseCustom'
import CustomCompareTable from './components/tableCompareCustom'
import useDetailHisUpdate from './useDetailHisUpdate'
import { useCheckPath } from '@/path'

const DetailHisUpdate = () => {
  const router = useRouter()
  const { id, name, code, historyType } = router.query
  const [values, handles] = useDetailHisUpdate({ id: Number(id) })
  const { tableData } = values
  const { paymentType } = useCheckPath()
  function capitalizeFirstLetter(str: any) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)
  }
  return (
    <>
      <PageContainer
        title={
          <div className='flex justify-between w-full'>
            <CoreBreadcrumbs
              textPrev={
                historyType !== 'OUTBOUND'
                  ? `Phiếu thu ${String(code)}`
                  : `Phiếu chi ${String(code)}`
              }
              textCurrent={String(name)}
              prevUrl={`${MENU_URL.BANK_ACCOUNT[paymentType]}/[id]`}
            />
          </div>
        }
        className='px-0'
      >
        <div className='py-25'>
          <ExpandableListItem
            contentHeder={
              <div
                className='flex items-center justify-evenly h-20'
                style={{
                  backgroundColor: '#F6F7FB',
                  border: '1px solid #DFE0EB',
                }}
              >
                <Typography fontWeight='500' sx={{ textAlign: 'center' }}>
                  Nội dung thay đổi
                </Typography>
                <Typography fontWeight='500' sx={{ textAlign: 'center' }}>
                  Nội dung cũ
                </Typography>
              </div>
            }
            header={
              <div className='flex justify-start item-center'>
                <Typography fontWeight='500'>Thông tin chung</Typography>
              </div>
            }
            content={
              <div className='flex justify-between align-middle'>
                <CustomCompareTable data={tableData} />
              </div>
            }
          />
        </div>
      </PageContainer>
      <Box className='m-10'>
        <Box
          sx={{
            backgroundColor: WHITE,
            border: '1px solid #DFE0EB',
          }}
        >
          <div className='flex h-20 items-center'>
            <div
              className='h-full flex justify-center items-center w-65'
              style={{
                borderRight: '1px solid #DFE0EB',
              }}
            >
              <Typography
                sx={{
                  padding: '2px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '400',
                }}
              >
                Lý do thay đổi
              </Typography>
            </div>
            <div
              className='h-full w-full flex justify-end'
              style={{
                borderBottom: '1px solid #DFE0EB',
              }}
            />
          </div>
          <Box className='p-15'>
            {capitalizeFirstLetter(
              tableData?.paymentChange?.reason ?? tableData?.createdBy
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DetailHisUpdate
