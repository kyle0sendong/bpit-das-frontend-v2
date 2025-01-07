export const isValidTimebase = (allTimebase, timebase) => {

  for (let i = 0; i < allTimebase.length; i++) {
    if(allTimebase[i].timebase == Math.round(timebase)) {
      return false
    }
  }

  return true

}