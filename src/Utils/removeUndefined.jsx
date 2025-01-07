export const removeUndefined = (values) => {
  // Remove undefined values
  for (let key in values) {
    if(values[key] === undefined) {
      delete values[key]
    }
  }

  return {...values}
}