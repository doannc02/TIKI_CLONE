import { WHITE } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { useTranslation } from 'next-i18next'

const PageContainer = ({
  title,
  children,
  hiddenLayout,
  action,
  disableBackground,
  className,
  rightActionList,
  isTopView,
}: {
  title?: ReactNode
  action?: ReactNode
  children: ReactNode
  hiddenLayout?: boolean
  disableBackground?: boolean
  className?: string
  rightActionList?: ReactNode[]
  isTopView?: boolean
}) => {
  const { t } = useTranslation('common')

  if (hiddenLayout) {
    return <>{children}</>
  }

  return (
    <Box className='w-full h-full '>
      {title && (
        <Box
          sx={{
            backgroundColor: '',
            height: '57px',
            padding: '0 30px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {title}
        </Box>
      )}

      {action && (
        <Box
          sx={{
            backgroundColor: WHITE,
            height: '57px',
            padding: '0 0 0 30px',
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid #DFE0EB',
          }}
        >
          {action}
        </Box>
      )}

      <Box className='m-10'>
        <Box
          sx={{
            backgroundColor: !disableBackground ? '' : undefined,
            border: '1px solid #DFE0EB',
          }}
        >
          {isTopView && (
            <div className='flex h-20 items-center'>
              <div
                className='h-full flex justify-center items-center w-50'
                style={{
                  borderRight: '1px solid #DFE0EB',
                }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  {t('detail')}
                </Typography>
              </div>

              <div
                className='h-full w-full flex justify-end'
                style={{
                  borderBottom: '1px solid #DFE0EB',
                }}
              >
                {(rightActionList ?? []).map((item, index) => (
                  <div
                    key={index}
                    className='h-full px-5'
                    style={{
                      borderLeft: '1px solid #DFE0EB',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Box className={className ?? 'p-15'}>{children}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PageContainer
