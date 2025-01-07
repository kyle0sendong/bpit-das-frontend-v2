export const DERIVED_PARAMETER_COLUMNS = [
  {
    title: 'Parameter Name',
    dataIndex: 'name',
    width: 150,
    inputType: 'text',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend', 'ascend'],
    ellipsis: true
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    width: 50,
    inputType: 'text',
    ellipsis: true
  },
  {
    title: 'x',
    dataIndex: 'x',
    width: 50,
    inputType: 'dropdown',
    ellipsis: true
  },
  {
    title:'y',
    dataIndex: 'y',
    width: 50,
    inputType: 'dropdown',
    ellipsis: true
  },
  {
    title: 'z',
    dataIndex: 'z',
    width: 50,
    inputType: 'dropdown',
    ellipsis: true
  },
  {
    title: 'a',
    dataIndex: 'a',
    width: 50,
    inputType: 'dropdown',
    ellipsis: true
  },
  {
    title:'b',
    dataIndex: 'b',
    width: 50,
    inputType: 'dropdown',
    ellipsis: true
  },
  {
    title: 'c',
    dataIndex: 'c',
    width: 50,
    inputType: 'dropdown',
    ellipsis: true
  },
  {
    title: 'Formula',
    dataIndex: 'formula',
    width: 100,
    inputType: 'text',
    ellipsis: true
  },
  {
    title: '',
    dataIndex: 'delete',
    width: 50,
    inputType: 'delete',
    ellipsis: true
  }
]