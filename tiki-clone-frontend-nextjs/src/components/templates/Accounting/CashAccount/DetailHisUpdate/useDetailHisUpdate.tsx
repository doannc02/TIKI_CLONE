import { useQueryGetUpdateHisDetail } from '@/service/accounting/updateHistory/getDetail'
import { useTranslation } from 'react-i18next'

const useDetailHisUpdate = ({ id }: { id: number }) => {
  const { t } = useTranslation('')
  const { data, isLoading } = useQueryGetUpdateHisDetail(
    {
      id,
    },
    { enabled: !!id }
  )
  const tableData = data?.data ?? null
  return [{tableData}, {}] as const
}

export default useDetailHisUpdate
