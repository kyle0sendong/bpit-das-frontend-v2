export const PARAMETER_COLUMNS = [
  {
    title: 'Enable',
    dataIndex: 'enable',
    width: 70,
    inputType: 'switch',
    sorter: (a, b) => a.enable - b.enable
  },
  {
    title: 'Parameter Name',
    dataIndex: 'name',
    width: 200,
    inputType: 'text',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend', 'ascend']
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    width: 50,
    inputType: 'text',
  },
  {
    title: 'Request Interval',
    dataIndex: 'request_interval',
    width: 100,
    inputType: 'dropdown'
  },
  {
    title:'Data Format',
    width: 150,
    dataIndex: 'format',
    inputType: 'dropdown'
  },
  {
    title: 'Function Code',
    dataIndex: 'function_code',
    width: 150,
    inputType: 'dropdown',
    filters: [
      {
        text: '0x01 Read Coils',
        value: '0x01 Read Coils',
      },
      {
        text: '0x02 Read Discrete Inputs',
        value: '0x02 Read Discrete Inputs',
      },
      {
        text: '0x03 Read Holding Register',
        value: '0x03 Read Holding Register',
      },
      {
        text: '0x04 Read Input Register',
        value: '0x04 Read Input Register',
      },
    ],
    onFilter: (value, record) => record.function_code == value,
  },
  {
    title: 'Start Address',
    dataIndex: 'start_register_address',
    width: 100,
    inputType: 'text'
  },
  {
    title: 'Register Count',
    dataIndex: 'register_count',
    width: 100,
    inputType: 'text'
  },
  {
    title: 'Offset Formula',
    dataIndex: 'formula',
    width: 200,
    inputType: 'text'
  },
  {
    title: '',
    dataIndex: 'delete',
    width: 100,
    inputType: 'delete'
  }
]
