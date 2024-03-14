import { useFormCustom } from "@/lib/form"

const useHeader = () => {
    const methodForm = useFormCustom<any>()
    const { control } = methodForm
    return [{control}, {}]
}
export default useHeader