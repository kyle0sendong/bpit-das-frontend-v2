import { Table, Flex, Loader } from "@mantine/core"
import { UserType, UserRolesType } from "@/types/users";
import EditUserForm from "./EditUserForm";
import DeleteUserForm from "./DeleteUserForm";

import { useUser } from "@/contexts/UserContext";

import { useGetAllUsers, useGetUserRoles } from "@/hooks/usersHook";

const TableRows = () => {

  const users = useGetAllUsers();
  const userRoles = useGetUserRoles();
  const { user } = useUser();

  if(users.isLoading || userRoles.isLoading) {
    return (
      <Table.Tr key={`loading`} >
        <Table.Td>
          <Loader />
        </Table.Td>
      </Table.Tr>
    )
  }

  if(users.isFetched && userRoles.isFetched) {

    const usersData: UserType[] = users.data;
    const userRolesData: UserRolesType[] = userRoles.data
    const filteredUsers = usersData.filter( (userData) => userData.username != user?.username)

    return filteredUsers.map( (userData) => {
      return (
        <Table.Tr key={`${userData.id}${userData.username}`} >
  
          {/* Username */}
          <Table.Td>
            {userData.username}
          </Table.Td>
  
          {/* Name */}
          <Table.Td>
            {`${userData.firstName} ${userData.lastName}`}
          </Table.Td>
        
          {/* Email */}
          <Table.Td>
            {userData.email}
          </Table.Td>
  
          {/* Role */}
          <Table.Td>
            {userData.role}
          </Table.Td>
  
          {/* Actions */}
          <Table.Td>
            <Flex justify="space-evenly">
              <EditUserForm userData={userData} userRoles={userRolesData}/>
              <DeleteUserForm id={userData.id} name={`${userData.firstName} ${userData.lastName}`}/>
            </Flex>
          </Table.Td>
        </Table.Tr>
      )
    })
  }

}

export default TableRows;