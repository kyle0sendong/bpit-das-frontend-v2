import { Table, Flex, Loader } from "@mantine/core"
import { UserType, UserRolesType } from "@/types/users";
import EditUserForm from "./EditUserForm";
import DeleteUserForm from "./DeleteUserForm";

import { useGetAllUsers, useGetUserRoles } from "@/hooks/usersHook";

const TableRows = () => {

  const users = useGetAllUsers();
  const userRoles = useGetUserRoles();

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

    const userData: UserType[] = users.data;
    const userRolesData: UserRolesType[] = userRoles.data

    return userData.map( (user) => {
      return (
        <Table.Tr key={`${user.id}${user.username}`} >
  
          {/* Username */}
          <Table.Td>
            {user.username}
          </Table.Td>
  
          {/* Name */}
          <Table.Td>
            {`${user.firstName} ${user.lastName}`}
          </Table.Td>
        
          {/* Email */}
          <Table.Td>
            {user.email}
          </Table.Td>
  
          {/* Role */}
          <Table.Td>
            {user.role}
          </Table.Td>
  
          {/* Actions */}
          <Table.Td>
            <Flex justify="space-evenly">
              <EditUserForm userData={user} userRoles={userRolesData}/>
              <DeleteUserForm id={user.id}/>
            </Flex>
          </Table.Td>
        </Table.Tr>
      )
    })
  }

}

export default TableRows;