import classes from "../../../Forms.module.css"
import { useForm } from "@mantine/form";
import { Flex, Text, TextInput, NativeSelect, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UserType, UserRolesType } from "@/types/users";
import { useUpdateOtherUser } from "@/hooks/usersHook";

type EditUserFormProps = {
  userData: UserType;
  userRoles: UserRolesType[];
}

const EditUserForm = ({userRoles, userData}: EditUserFormProps) => {

  const { mutate: updateOtherUser } = useUpdateOtherUser();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      id: userData.id,
      role_id: userData.roleId.toString()
    }
  });

  const userRoleSelection = userRoles.map( (data) => { 
    return {
      label: data.role,
      value: data.id.toString()
    }
  })

  const [openedEdit, {open: openEdit, close: closeEdit}] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={openedEdit} 
        onClose={closeEdit} 
        title={`Edit User`}
        overlayProps={{
          backgroundOpacity: 0.25,
          blur: 0.5
        }}
      >
        <form onSubmit={form.onSubmit((values) => {
          updateOtherUser(values)
        })}>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> First Name </Text>
            <TextInput
              placeholder={userData.firstName}
              className={classes.textInput}
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Last Name </Text>
            <TextInput
              placeholder={userData.lastName}
              className={classes.textInput}
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
              
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Username </Text>
            <TextInput
              placeholder={userData.username}
              className={classes.textInput}
              key={form.key('username')}
              {...form.getInputProps('username')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Email </Text>
            <TextInput
              placeholder={userData.email}
              className={classes.textInput}
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Role</Text>
            <NativeSelect
              size="xs"
              data={userRoleSelection}
              key={form.key(`role_id`)}
              {...form.getInputProps(`role_id`)}
            />
          </Flex>

          <Flex justify='flex-end'>
            <Button type="submit" onClick={closeEdit}>
              Save
            </Button>
          </Flex>
        </form>

      </Modal>
      
      <Button size="xs" variant="default" onClick={openEdit}>
        Edit
      </Button>

    </>
  )
}

export default EditUserForm;