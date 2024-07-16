import { format } from 'date-fns'
type DateFormat = string | number | Date
export const getDate = (date?: DateFormat) => {
  if (!date) return null
  return format(new Date(date), 'dd/MM/yyyy')
}

export const getDatetime = (date?: DateFormat) => {
  if (!date) return null
  return format(new Date(date), 'dd/MM/yyyy HH:mm')
}