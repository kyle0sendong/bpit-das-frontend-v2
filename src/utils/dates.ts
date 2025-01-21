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
