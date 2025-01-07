export const SAMPLING_ITEM = []
for (let i = 100; i >= 25; i -= 25) {
  SAMPLING_ITEM.push( {
    key: `${i}`,
    label: `${i}%`
  })
}