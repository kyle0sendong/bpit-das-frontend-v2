import { Tag } from "antd";

export const columns = [

  {
    title: 'Username',
    dataIndex: 'username',
    sorter: (a, b) => a.username.localeCompare(b.username),
    width: 100,
  },
  {
    title: 'Name',
    dataIndex: 'full_name',
    sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    width: 150,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
    sortDirections: ['descend', 'ascend', 'descend'],
    defaultSortOrder: 'descend',
    width: 75
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: 75
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    width: 150,
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = '#D2649A';

          switch(tag) {
            case 'Virtual Channel':
              color = '#40679E'
              break
            case 'Analyzer':
              color = '#40679E'
              break
            case 'Parameter':
              color = '#AF8F6F'
              break
            case ' Insert':
              color = '#597E52'
              break
            case ' Update':
              color = '#FF6E31'
              break
            case ' Delete':
              color = "#CD1818"
              break
          }
  
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: 'Changes',
    dataIndex: 'changes',
    width: 250
  }
];