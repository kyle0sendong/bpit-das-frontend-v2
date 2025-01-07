const BASE_URL = 'http://localhost:8000/api/configuration'

// const BASE_URL = import.meta.env.VITE_BASE_API_URL
const Endpoints = {

  parameterUrl: (id) => {
    if(id) {
      return `${BASE_URL}/parameters/${id}` 
    } else {
      return `${BASE_URL}/parameters`
    }
  },

  currentValues:(id) => {
    if(id) {
      return `${BASE_URL}/current-values-tcp/${id}`
    } else {
      return `${BASE_URL}/current-values`
    }
  },

  tcpDataRange: (query) => {
    if(query) {
      return `${BASE_URL}/tcp-data-range/search?table=${query.table}&startDate=${query.startDate}&endDate=${query.endDate}`
    } else {
      return `${BASE_URL}/tcp-data-range`
    }
  },

  derivedParameterUrl: (id) => {
    if(id) {
      return `${BASE_URL}/derived-parameters/${id}`                                                                
    } else {
      return `${BASE_URL}/derived-parameters`
    }
  },

  siteUrl: () => {
    return `${BASE_URL}/site`
  },

  timebaseUrl: () => {
    return `${BASE_URL}/timebase`
  },

  analyzerUrl: (id) => {
    if(id) {
      return `${BASE_URL}/tcpAnalyzer/${id}`
    } else {
      return `${BASE_URL}/tcpAnalyzer`
    }
  },

  alterTableUrl: (type) => {
    switch(type) {
      case 'insert':
        return `${BASE_URL}/insertTable`
      case 'delete':
        return `${BASE_URL}/deleteTable`
      case 'rename':
        return `${BASE_URL}/renameTable`
    }
  },

  alterColumnUrl: (type) => {
    switch(type) {
      case 'insert':
        return `${BASE_URL}/insertColumn`
      case 'delete':
        return `${BASE_URL}/deleteColumn`
      case 'rename':
        return `${BASE_URL}/renameColumn`
    }
  },

  userLogsUrl: (date, type) => {
    switch(type) {
      case 'insert':
        return `${BASE_URL}/logs`
      case 'distinctDates':
        return `${BASE_URL}/dates`
      case 'date':
        return `${BASE_URL}/log/date?date=${date.date}`
      case 'dateRange':
        return `${BASE_URL}/logs/date?startDate=${date.startDate}&endDate=${date.endDate}` 
    }
  }
  
}

export default Endpoints