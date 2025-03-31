import classes from '../Forms.module.css'

import { useState, useEffect } from "react";

import { showNotification } from "@mantine/notifications";
import { Flex, Text, TextInput, Paper, Button, PasswordInput, Alert, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useUpdateUser } from '@/hooks/usersHook';
import { useUser } from '@/contexts/UserContext';

const AccountSettingsPage = () => {

  const { mutate: updateUser, isError, isPending } = useUpdateUser();
  const [errorState, setErrorState] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { user } = useUser();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: user?.id ?? 1,
      email: '',
      first_name: '',
      last_name: '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    },
    validate: {
      email: (value) => 
        value && !/^\S+@\S+\.\S+$/.test(value) 
          ? 'Invalid email address' 
          : null,
      new_password: (value) => {
        if (value) {
          // Password strength requirements
          if (value.length < 8) {
            return 'Password must be at least 8 characters long';
          }
        }
        return null;
      },
      confirm_password: (value, values) => 
        value !== values.new_password 
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

  const handleSubmit = (values: typeof form.values) => {
    // Reset previous password error
    setPasswordError(null);

    // Check if password change is attempted
    const isPasswordChangeAttempted = 
      values.current_password || 
      values.new_password || 
      values.confirm_password;

    // If password change is attempted, validate current password is provided
    if (isPasswordChangeAttempted && !values.current_password) {
      setPasswordError('Current password is required to change password');
      return;
    }

    // Prepare update object (only include non-empty values)
    const updateData = {
      id: values.id,
      ...(values.email && { email: values.email }),
      ...(values.first_name && { first_name: values.first_name }),
      ...(values.last_name && { last_name: values.last_name }),
      ...(isPasswordChangeAttempted && {
        current_password: values.current_password,
        new_password: values.new_password
      })
    };

    // Call update user mutation
    updateUser(updateData, {
      onError: () => {
        showNotification({
          title: "Update Failed",
          message: "An error occurred while updating User.",
          color: "red",
          autoClose: 5000,
        });
        form.reset();
      },
      onSuccess: () => {
        showNotification({
          title: "Update Successful",
          message: "User have been updated successfully!",
          color: "green",
          autoClose: 3000,
        });
        form.reset();
      },
    });
  };

  return (
    <Paper w='50%' m='auto' p='lg'>
      <Flex gap='lg' direction='column' flex={1}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {passwordError && (
            <Alert color="red" title="Error" mb="md">
              {passwordError}
            </Alert>
          )}

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Username</Text>
            <TextInput
              disabled
              placeholder={user?.username}
              className={classes.textInput}
              key={form.key('username')}
              {...form.getInputProps('username')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Email</Text>
            <TextInput
              placeholder={user?.email}
              className={classes.textInput}
              key={form.key('email')}
              {...form.getInputProps('email')} 
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>First Name</Text>
            <TextInput
              placeholder={user?.firstName}
              className={classes.textInput}
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Last Name</Text>
            <TextInput
              placeholder={user?.lastName}
              className={classes.textInput}
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
            />
          </Flex>


          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Current Password</Text>
            <PasswordInput
              placeholder="Enter current password"
              className={classes.textInput}
              key={form.key('current_password')}
              {...form.getInputProps('current_password')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}>New Password</Text>
            <PasswordInput
              placeholder="Enter new password"
              className={classes.textInput}
              key={form.key('new_password')}
              {...form.getInputProps('new_password')}
            />
          </Flex>
          
          <Flex className={classes.flexItem}>
            <Text className={classes.text}>Confirm Password</Text>
            <PasswordInput
              placeholder="Confirm new password"
              className={classes.textInput}
              key={form.key('confirm_password')}
              {...form.getInputProps('confirm_password')}
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
                  Save
                </Button>
              )
            }
          </Flex>
        </form>
      </Flex>
    </Paper>
  )
}

export default AccountSettingsPage;