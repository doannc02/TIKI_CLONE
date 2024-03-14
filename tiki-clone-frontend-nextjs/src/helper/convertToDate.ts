import moment from 'moment'

export const convertToDate = (val: any, format = 'DD/MM/YYYY') => {
  if (!val) return ''
  else return moment(val).format(format)
}
