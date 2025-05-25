import { useUser } from '@/contexts/UserContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader, Flex } from '@mantine/core';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useUser(); // update context if needed
  const location = useLocation();

  if (isLoading) {
    return (
      <Flex mih='80vh' w='100%' align='center' justify='center'>
        <Loader size='lg' />
      </Flex>
    );
  }


  if (!user) {
    return <Navigate to='/data-monitoring' state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;