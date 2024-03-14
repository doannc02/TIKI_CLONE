/* eslint-disable @next/next/no-img-element */
import { Item } from '@/components/templates/Dashboard'
import { MenuProps, listMenuRoutes } from '@/routes'
import { Box, Paper, Stack, Typography } from '@mui/material'

const menusRoutes = listMenuRoutes
const LeftMenuV2 = (props?: MenuProps) => {
  return (
    <>
      {menusRoutes.map((i, index) => {
        return (
          <Item key={index} className='mb-10'>
            <Stack direction='column' className='ml-5'>
              <div className='w-full flex justify-start my-6'>
                <Typography className='font-bold'>
                  {i?.nameMenu ?? 'Danh mục'}
                </Typography>
              </div>
              <Box>
                {(i?.listItem ?? []).map((it, index) => {
                  return (
                    <Stack
                      className='p-2 rounded-md '
                      sx={{
                        '&:hover': {
                          cursor: 'pointer',
                          background: 'whitesmoke',
                        },
                      }}
                      width={'80%'}
                      direction='row'
                      justifyContent='space-around'
                      key={index}
                      onClick={() => {}}
                    >
                      <Paper className='h-10 w-10  rounded-lg'>
                        <img
                          alt=''
                          className='w-full h-full rounded-lg object-cover'
                          src={it?.icon as any}
                        />
                      </Paper>
                      <Typography fontSize={13}> {it?.name}</Typography>
                    </Stack>
                  )
                })}
              </Box>
            </Stack>
          </Item>
        )
      })}
    </>
  )
}
export default LeftMenuV2
