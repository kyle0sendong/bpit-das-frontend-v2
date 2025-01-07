
import { getCurrentDate, getCurrentTime } from '../../../../../Utils/getCurrentDate';

export const insertLog = (mutate, logInfo) => {

  const logData = {
    "username": logInfo.username,
    "full_name": logInfo.full_name,
    "date": getCurrentDate(),
    "time": getCurrentTime(),
    "tags": logInfo.tags,
    "changes": logInfo.changes
  }

  mutate(logData)
  
}