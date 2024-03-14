import { Breadcrumbs, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ParsedUrlQueryInput } from 'querystring'

interface CoreBreadcrumbsProps {
  textPrev: string
  textCurrent: string
  prevUrl?: string
  query?: string | ParsedUrlQueryInput | null
  className?: string
}
export const CoreBreadcrumbs = (props: CoreBreadcrumbsProps) => {
  const router = useRouter()
  const { textPrev, textCurrent, prevUrl, className, query } = props
  const breadcrumbsData = [
    <Typography
      key='prev'
      variant='subtitle1'
      color='primary'
      className='uppercase cursor-pointer'
      onClick={() =>
        prevUrl ? router.push({ pathname: prevUrl, query }) : router.back()
      }
    >
      {textPrev}
    </Typography>,

    <Typography key='current' variant='subtitle1' className='uppercase'>
      {textCurrent}
    </Typography>,
  ]
  return (
    <Breadcrumbs
      className={className}
      separator='/'
      classes={{
        root: 'bg-[#ffffff] h-[57px] flex item-center mb-0',
      }}
    >
      {breadcrumbsData}
    </Breadcrumbs>
  )
}
