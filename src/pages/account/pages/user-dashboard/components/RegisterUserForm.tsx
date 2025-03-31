import classes from "../../Forms.module.css"

import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";

import { useForm } from "@mantine/form";
import { Flex, Text, TextInput, PasswordInput, NativeSelect, Button, Modal, Box, Loader } from "@mantine/core";
import { UserRolesType } from "@/types/users";
import { useRegisterUser } from "@/hooks/usersHook";
import { useDisclosure } from "@mantine/hooks";

type RegisterUserFormProps = {
  userRoles: UserRolesType[];
} 

const RegisterUserForm = ({userRoles}: RegisterUserFormProps) => {

  
  const [errorState, setErrorState] = useState(false);

  const { mutate: registerUser, isError, isPending } = useRegisterUser();

  const [opened, {open, close}] = useDisclosure(false);

  const userRoleSelection = userRoles.map((data) => ({ 
    label: data.role,
    value: data.id.toString()
  }));

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      roleId: 2,
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '' // This is now being used for validation
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
      firstName: (value) => 
        value.length < 2 
          ? 'First name must be at least 2 characters long' 
          : null,
      lastName: (value) => 
        value.trim() !== '' && value.length < 2 
          ? 'Last name must be at least 2 characters long' 
          : null,
      password: (value) => {
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        return null;
      },
      confirmPassword: (value, values) => 
        value !== values.password 
          ? 'Passwords do not match' 
          : null
    }
  });
  
  useEffect(() => {
    if (isError) {
      setErrorState(true);
      const timer = setTimeout(() => {
        setErrorState(false)
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isError]);


  const handleSubmit = (values: any) => {

    const { confirmPassword, ...submitData } = values;

    registerUser(submitData, {
      onError: () => {
        showNotification({
          title: "Register Failed",
          message: "An error occurred while registering User.",
          color: "red",
          autoClose: 5000,
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Register Successful",
          message: "User have been registered successfully!",
          color: "green",
          autoClose: 3000,
        });
        close();
      },
    });
  };

  return (
    <Flex gap='lg' direction='column' flex={1}>

      <Box>
        <Button onClick={open}>
          Create User
        </Button>
      </Box>

      <Modal opened={opened} onClose={close} title="Create User" >
        <form onSubmit={form.onSubmit(handleSubmit)}>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Username <b style={{color:"red"}}>*</b></Text>
            <TextInput
              placeholder="juan69"
              className={classes.textInput}
              key={form.key('username')}
              {...form.getInputProps('username')}
              required
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Email</Text>
            <TextInput
              placeholder="juan@gmail.com"
              className={classes.textInput}
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>First Name <b style={{color:"red"}}>*</b></Text>
            <TextInput
              placeholder="Juan"
              className={classes.textInput}
              key={form.key('firstName')}
              {...form.getInputProps('firstName')}
              required
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Last Name</Text>
            <TextInput
              placeholder="De la Cruz"
              className={classes.textInput}
              key={form.key('lastName')}
              {...form.getInputProps('lastName')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Password <b style={{color:"red"}}>*</b></Text>
            <PasswordInput
              placeholder="Enter password"
              className={classes.textInput}
              key={form.key('password')}
              {...form.getInputProps('password')}
              required
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Confirm Password <b style={{color:"red"}}>*</b></Text>
            <PasswordInput
              placeholder="Confirm password"
              className={classes.textInput}
              key={form.key('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
              required
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Role <b style={{color:"red"}}>*</b></Text>
            <NativeSelect
              size="xs"
              data={userRoleSelection}
              key={form.key('roleId')}
              {...form.getInputProps('roleId')}
            />
          </Flex>

          <Flex justify='flex-end' mt="md">
            { 
              isPending ? (
                <Button color="dark.3" disabled>
                  <Loader size="xs" />
                </Button>
              ) : (
                <Button 
                  type="submit"
                  color="dark.3"
                  disabled={errorState}
                >
                  Register User
                </Button>
              )
            }
          </Flex>
        </form>
      </Modal>

    </Flex>
  )
}

export default RegisterUserForm;