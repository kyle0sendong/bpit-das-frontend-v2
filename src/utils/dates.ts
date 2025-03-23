import { DateValue } from "@mantine/dates"

export const getCurrentDate = () => {
  const tempDate = new Date()
  const currentDate = `${tempDate.getFullYear()}-${tempDate.getMonth()+1}-${tempDate.getDate()}`
  return currentDate
}

export const getDateTomorrow = () => {
  const tempDate = new Date()
  const currentDate = `${tempDate.getFullYear()}-${tempDate.getMonth()+1}-${tempDate.getDate()+1}`
  return currentDate
}

export const getCurrentTime = () => {
  const temp = new Date()
  const currentTime = `${temp.getHours()}:${temp.getMinutes()}`
  return currentTime
}

export const convertDateToStringMantineDates = (date: DateValue) => {
  const month = date?.getMonth() ?? 1;
  const convertedDate = `${date?.getFullYear()}-${month + 1}-${date?.getDate()}`
  return convertedDate;
}

export const convertDateTimeToString = (datetime: string | null) => {

  if(datetime) {
    const convertedDateTime = new Date(datetime).toLocaleString('en-SG', { 
      timeZone: 'Asia/Singapore',
      hour12: false, // Use 24-hour format
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    return convertedDateTime;
  }
  return 'N/A';
}

