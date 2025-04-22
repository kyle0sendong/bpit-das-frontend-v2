import classes from "../../../Forms.module.css"

import { useState, useEffect } from "react";

import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Flex, Text, TextInput, NativeSelect, Modal } from "@mantine/core";
import { LoaderButton1, EditButton2, SaveButton1} from "@/components/ui/button";
import { useDisclosure } from "@mantine/hooks";
import { UserType, UserRolesType } from "@/types/users";
import { useUpdateOtherUser } from "@/hooks/usersHook";

type EditUserFormProps = {
  userData: UserType;
  userRoles: UserRolesType[];
}

const EditUserForm = ({userRoles, userData}: EditUserFormProps) => {

  const [errorState, setErrorState] = useState(false);
  const { mutate: updateOtherUser, isPending, isError } = useUpdateOtherUser();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      id: userData.id,
      role_id: userData.roleId.toString(),
      username: userData.username,
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName
    },
    validate: {
      username: (value) => 
        value.length < 3 
          ? 'Username must be at least 3 characters long' 
          : null,
      email: (value) => 
        value.trim() !== '' && !/^\S+@\S+\.\S+$/.test(value) 
          ? 'Invalid email address' 
          : null,
      first_name: (value) => 
        value.length < 2 
          ? 'First name must be at least 2 characters long' 
          : null,
      last_name: (value) => 
        value.trim() !== '' && value.length < 2 
          ? 'Last name must be at least 2 characters long' 
          : null,
    }
  });

  useEffect(() => {
    if (isError) {
      setErrorState(true);
      const timer = setTimeout(() => {
        setErrorState(false)
        form.reset()
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleSubmit = (values: any) => {
    updateOtherUser(values, {
      onError: () => {
        showNotification({
          title: "Update Failed",
          message: "An error occurred while updating User.",
          color: "red",
          autoClose: 5000,
        });
        form.reset()
      },
      onSuccess: () => {
        showNotification({
          title: "Update Successful",
          message: "User have been updated successfully!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
  };

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
        <form onSubmit={form.onSubmit(handleSubmit)}>

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
            <Text className={classes.text}> Role</Text>
            <NativeSelect
              size="xs"
              data={userRoleSelection}
              key={form.key(`role_id`)}
              {...form.getInputProps(`role_id`)}
            />
          </Flex>

          <Flex justify='flex-end'>
            { isPending 
                ? <LoaderButton1 />
                : <SaveButton1 isDisabled={errorState} />
            }
          </Flex>
        </form>

      </Modal>
      <EditButton2
        onClick={openEdit}
      />

    </>
  )
}

export default EditUserForm;