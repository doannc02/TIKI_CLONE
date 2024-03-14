import { errorMsg } from '@/helper/message'
import { useState } from 'react'
import { Props } from '.'
import { ResponseBody } from '@/service/accounting/accountConfig/importFile/importAccountConfigFile/type'

export const useDialogImportFile = (props: Props) => {
  const { refetch, fetchDataExport, fetchDataImport } = props
  const [file, setFile] = useState<File>()
  const [importResult, setImportResult] = useState<ResponseBody['POST']>()
  const [loadingImport, setLoadingImport] = useState<boolean>(false)

  const handleDownloadFile = (res: any) => {
    const { name } = res
    const url = URL.createObjectURL(res)
    const downloadLink = document.createElement('a')
    document.body.appendChild(downloadLink)
    downloadLink.href = url
    downloadLink.target = '_self'
    downloadLink.download = name ?? 'Template.xlsx'
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  const handleGetProductTemplateFile = async () => {
    try {
      const res = await fetchDataExport()
      handleDownloadFile(res)
    } catch (error) {
      errorMsg(error)
    }
  }

  const handleDownloadFileByURL = (url: string) => {
    try {
      url = url + '?content-disposition=ATTACHMENT'
      const downloadLink = document.createElement('a')
      document.body.appendChild(downloadLink)
      downloadLink.href = url
      downloadLink.target = '_self'
      downloadLink.download = 'Result.xlsx'
      downloadLink.click()
    } catch (error) {
      errorMsg(error)
    }
  }

  const handleDeleteFile = () => {
    setFile(undefined)
  }

  const handleSaveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit = async () => {
    setLoadingImport(true)
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetchDataImport(formData)
        setImportResult(res)
        refetch()
      }
    } catch (error) {
      errorMsg(error)
    }
    setLoadingImport(false)
  }

  return [
    { file, loadingImport, importResult },
    {
      handleGetProductTemplateFile,
      handleSaveFile,
      handleDeleteFile,
      onSubmit,
      handleDownloadFileByURL,
    },
  ] as const
}
