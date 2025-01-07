const getItems = (analyzerType, items, navigate) => {

  return (
    items.map(
      (item) => {
        return {
          key: `${item.name}`,
          label: `${item.name}`,
          onClick: ()=> {
            navigate(`/monitor-data/${analyzerType}/${item.id}`)
          }
        };
      },
    )
  )
}

export default function SidebarItems(items, others, navigate) {
  return (
    [{
      key: 'tcpAnalyzers',
      label: 'TCP/IP',
      children: getItems('tcp', items, navigate)
    },
    {
      key: 'otherAnalyzers',
      label: 'Other Analyzer',
      children: others ? getItems('others', others, navigate) : []
    }]
  )
}