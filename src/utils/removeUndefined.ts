export const removeUndefined = (values: { [x: string]: any }) => {
  // Remove undefined values
  for (let key in values) {
    if(values[key] === undefined) {
      delete values[key]
    }
  }

  return {...values}
}