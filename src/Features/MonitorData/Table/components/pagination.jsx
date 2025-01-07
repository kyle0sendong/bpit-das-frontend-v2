// Modifying pagination element   
  // For changing the next and previous button
const itemRender = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a style={{marginInline:'1rem'}}>Previous</a>;
  }
  if (type === 'next') {
    return <a style={{marginInline:'1rem'}}>Next</a>;
  }
  return originalElement;
};

export const pagination = {
  position: ['bottomLeft'],
  total: length.dataSource,
  defaultPageSize: 20,
  defaultCurrent: 1,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  itemRender: itemRender
};