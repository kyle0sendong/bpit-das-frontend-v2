import { getCurrentDate } from "../../../../Utils/getCurrentDate"

export const navigationItems = [
  {
    label: 'Configurations',
    key: '/configurations/home'
  },
  {
    label: 'Data Reporter',
    key: `/data-reporter`
  },
  {
    label: 'Monitor Data',
    key: '/monitor-data'
  },
  {
    label: 'User Logs',
    key: `/user-logs/date?date=${getCurrentDate()}`,
  }
]