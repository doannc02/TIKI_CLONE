import { paymentMethodSelect } from '@/enum'
import { convertToDate } from '@/helper/convertToDate'
import { compareObjectFn } from '@/helper/diffFn'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

const CustomCompareTable = ({ data }: { data: any }) => {
  const { t } = useTranslation('accounting/account-history')
  let dataObjCompare: any
  if (data !== null) {
    const { createdBy, ...ObjCompare } = data
    dataObjCompare = ObjCompare
  }
  const removeIdFields = (obj: any) => {
    if (obj) {
      const { id, reason, ...rest } = obj
      return rest
    }
  }
  const restPaymentChange = removeIdFields(dataObjCompare?.paymentChange ?? dataObjCompare?.paymentMain)
  const restPaymentMain = removeIdFields(dataObjCompare?.paymentMain)
  console.log(compareObjectFn(restPaymentMain,restPaymentChange),'test compareObj')
  const findDifferences = (obj1: any, obj2: any) => {
    const differences: any = {}

    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          differences[key] = {
            oldValue: obj1[key],
            newValue: obj2[key],
          }
        }
      }
    }

    return differences
  }
  const findDiff = findDifferences(restPaymentChange, restPaymentMain)
  const getFieldValue = (
    value: any,
    nameField?: any,
    isPaymentChange?: boolean
  ) => {
    if (typeof value === 'object' && value !== null && 'name' in value) {
      return value.name
    }
    if (typeof value === 'string' && nameField === 'state') {
      const render = value === 'DRAFT' ? 'Nháp' : 'Đã vào sổ'
      return (
        <Typography
          color={`${nameField in findDiff && isPaymentChange ? 'red' : ''}`}
        >
          {render}
        </Typography>
      )
    }
    if(typeof value === 'string' && nameField === 'paymentMethod'){
      const find = paymentMethodSelect.find(item => item?.value === value)
      return (
        <Typography
          color={`${nameField in findDiff && isPaymentChange ? 'red' : ''}`}
        >
          {find?.label}
        </Typography>
      )
    }
    if(nameField === 'paymentDate'){
        return (
          <Typography
            color={`${nameField in findDiff && isPaymentChange ? 'red' : ''}`}
          >
            {convertToDate(value)}
          </Typography>
        )
    }
    return (
      <Typography color={`${nameField in findDiff && 'red'}`}>
        {value}
      </Typography>
    )
  }
  return (
    <Paper sx={{ width: '100%' }}>
      {data !== null ? (
        <Table>
          <Table>
            <TableBody>
              {Object?.keys(restPaymentChange).map((field: any, index) => (
                <TableRow key={index} sx={{ width: '100%' }}>
                  <TableCell width='28%' sx={{ pl: 3 }}>
                    {t(`table.${field}`)}
                  </TableCell>
                  <TableCell width='37%'>
                    {getFieldValue(restPaymentChange[field], field, true)}
                  </TableCell>
                  <TableCell>
                    {getFieldValue(restPaymentMain[field], field, false)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Table>
      ) : (
        <Table>
          <TableBody>
            <Typography>Không có dữ liệu</Typography>
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}

export default CustomCompareTable
