import { createContext, useState } from "react";
import { getCurrentDate } from "../Utils/getCurrentDate";

export const SearchFilterContext = createContext()

export const SearchFilterContextProvider = ({ children }) => {

  const [searchFilter, setSearchFilter] = useState({
    'timebase':'1',
    'table':'data_t1',
    'parameters':[],
    'startDate': getCurrentDate(),
    'endDate': getCurrentDate(),
    'viewType':'',
    'timebaseData': []
  })
  
  return (
    <SearchFilterContext.Provider value={{searchFilter, setSearchFilter}}>
      {children}
    </SearchFilterContext.Provider>
  )
}
