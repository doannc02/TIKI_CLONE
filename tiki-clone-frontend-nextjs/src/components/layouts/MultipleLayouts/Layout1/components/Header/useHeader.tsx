import { useFormCustom } from '@/lib/form'
interface IInput {
  searchHeader: string
}
const useHeader = () => {
  const methodForm = useFormCustom<any>({
    defaultValues: { search: '' },
  })
  const onChangeSearch = (e: any) => {
    return e?.target.value
  }
  const searchQuery = () => {}
  const { control, setValue, watch } = methodForm
  return [{ control }, { onChangeSearch, setValue, watch }]
}
export default useHeader
