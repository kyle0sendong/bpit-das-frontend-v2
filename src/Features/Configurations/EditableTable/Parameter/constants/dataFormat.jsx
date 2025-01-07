export const DATA_FORMAT = [
  {
    key: '16-bit',
    label: <hr />,
    type: 'group',
    children: [
      {
        key: 'Signed',
        label: '16-bit',
      }
    ] 
  },
  {
    key: '32-bit',
    label: <hr />,
    type: 'group',
    children: [
      {
        key: '32-bit Signed Big-Endian',
        label: '32-bit',
      },
      {
        key: '32-bit Signed Big-Endian byte swap',
        label: '32-bit Inverse',
      }
    ]
  },
  {
    key: '64-bit',
    label: <hr />,
    type: 'group',
    children: [
      {
        key: '64-bit Signed Big-Endian',
        label: '64-bit',
      },
      {
        key: '64-bit Signed Big-Endian byte swap',
        label: '64-bit Inverse',
      }
    ]
  },
  {
    key: '32-bitFloat',
    label: <hr />,
    type: 'group',
    children: [
      {
        key: '32-bit Float Big-Endian',
        label: 'Float',
      },
      {
        key: '32-bit Float Big-Endian byte swap',
        label: 'Float Inverse',
      }
    ]
  },
  {
    key: '64-bitDouble',
    label: <hr />,
    type: 'group',
    children: [
      {
        key: '64-bit Double Big-Endian',
        label: 'Double',
      },
      {
        key: '64-bit Double Big-Endian byte swap',
        label: 'Double Inverse',
      }
    ]
  },
  {
    key: 'advancedFormat',
    label: <hr />,
    type: 'group',
    children: [
      {
        key: 'advancedDataFormatting',
        label: 'Advanced',
        children:
        [
          {
            key: '16-bit',
            label: <hr />,
            type: 'group',
            children: [
              {
                key: 'Signed',
                label: 'Signed',
              },
              {
                key: 'Unsigned',
                label: 'Unsigned'
              }
            ] 
          },
          {
            key: '16-bit-higher',
            label: <hr />,
            type: 'group',
            children: [
              {
                key: '32-bit Signed',
                label: '32-bit Signed',
                children: [
                  {
                    key: '32-bit Signed Big-Endian',
                    label: 'Big-Endian',
                  },
                  {
                    key: '32-bit Signed Little-Endian',
                    label: 'Little-Endian',
                  },
                  {
                    key: '32-bit Signed Big-Endian byte swap',
                    label: 'Big-Endian byte swap',
                  },
                  {
                    key: '32-bit Signed Little-Endian byte swap',
                    label: 'Little-Endian byte swap',
                  }
                ]
              },
              {
                key: '32-bit Unsigned',
                label: '32-bit Unsigned',
                children: [
                  {
                    key: '32-bit Unsigned Big-Endian',
                    label: 'Big-Endian',
                  },
                  {
                    key: '32-bit Unsigned Little-Endian',
                    label: 'Little-Endian',
                  },
                  {
                    key: '32-bit Unsigned Big-Endian byte swap',
                    label: 'Big-Endian byte swap',
                  },
                  {
                    key: '32-bit Unsigned Little-Endian byte swap',
                    label: 'Little-Endian byte swap',
                  }
                ]
              },
              {
                key: '64-bit Signed',
                label: '64-bit Signed',
                children: [
                  {
                    key: '64-bit Signed Big-Endian',
                    label: 'Big-Endian',
                  },
                  {
                    key: '64-bit Signed Little-Endian',
                    label: 'Little-Endian',
                  },
                  {
                    key: '64-bit Signed Big-Endian byte swap',
                    label: 'Big-Endian byte swap',
                  },
                  {
                    key: '64-bit Signed Little-Endian byte swap',
                    label: 'Little-Endian byte swap',
                  }
                ]
              },
              {
                key: '64-bit Unsigned',
                label: '64-bit Unsigned',
                children: [
                  {
                    key: '64-bit Unsigned Big-Endian',
                    label: 'Big-Endian',
                  },
                  {
                    key: '64-bit Unsigned Little-Endian',
                    label: 'Little-Endian',
                  },
                  {
                    key: '64-bit Unsigned Big-Endian byte swap',
                    label: 'Big-Endian byte swap',
                  },
                  {
                    key: '64-bit Unsigned Little-Endian byte swap',
                    label: 'Little-Endian byte swap',
                  }
                ]
              },
            ]
          },
          {
            key: 'floatingpoints',
            label: <hr />,
            type: 'group',
            children: [
              {
                key: '32-bit Float',
                label: '32-bit Float',
                children: [
                  {
                    key: '32-bit Float Big-Endian',
                    label: 'Big-Endian',
                  },
                  {
                    key: '32-bit Float Little-Endian',
                    label: 'Little-Endian',
                  },
                  {
                    key: '32-bit Float Big-Endian byte swap',
                    label: 'Big-Endian byte swap',
                  },
                  {
                    key: '32-bit Float Little-Endian byte swap',
                    label: 'Little-Endian byte swap',
                  }
                ]
              },
              {
                key: '64-bit Double',
                label: '64-bit Double',
                children: [
                  {
                    key: '64-bit Double Big-Endian',
                    label: 'Big-Endian',
                  },
                  {
                    key: '64-bit Double Little-Endian',
                    label: 'Little-Endian',
                  },
                  {
                    key: '64-bit Double Big-Endian byte swap',
                    label: 'Big-Endian byte swap',
                  },
                  {
                    key: '64-bit Double Little-Endian byte swap',
                    label: 'Little-Endian byte swap',
                  }
                ]
              }
            ]
          }
        ]
      },
    ]
  }
  
  
]
