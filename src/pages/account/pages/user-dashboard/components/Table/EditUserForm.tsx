import classes from "../../../Forms.module.css"
import { useForm } from "@mantine/form";
import { Flex, Text, TextInput, NativeSelect, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UserType, UserRolesType } from "@/types/users";

type EditUserFormProps = {
  userData: UserType;
  userRoles: UserRolesType[];
}

const EditUserForm = ({userRoles, userData}: EditUserFormProps) => {

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      id: userData.id,
      role: userData.roleId
    }
  });

  const userRoleSelection = userRoles.map( (data) => { 
    return {
      label: data.role,
      value: data.id
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
          console.log(values)
        })}>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> First Name </Text>
            <TextInput
              placeholder={userData.firstName}
              className={classes.textInput}
              key={form.key('firstName')}
              {...form.getInputProps('firstName')}
              required
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Last Name </Text>
            <TextInput
              placeholder={userData.lastName}
              className={classes.textInput}
              key={form.key('lastName')}
              {...form.getInputProps('lastName')}
              required
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Username </Text>
            <TextInput
              placeholder={userData.username}
              className={classes.textInput}
              key={form.key('username')}
              {...form.getInputProps('username')}
              required
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Email </Text>
            <TextInput
              placeholder={userData.email}
              className={classes.textInput}
              key={form.key('email')}
              {...form.getInputProps('email')}
              required
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Role</Text>
            <NativeSelect
              size="xs"
              data={userRoleSelection}
              key={form.key(`role`)}
              {...form.getInputProps(`role`)}
            />
          </Flex>

          <Flex justify='flex-end'>
            <Button type="submit">
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