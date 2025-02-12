import classes from "../../Forms.module.css"
import { useForm } from "@mantine/form";
import { Flex, Text, TextInput, PasswordInput, NativeSelect, Button } from "@mantine/core";
import { UserRolesType } from "@/types/users";
import { useRegisterUser } from "@/hooks/usersHook";

type RegisterUserFormProps = {
  userRoles: UserRolesType[];
} 

const RegisterUserForm = ({userRoles}: RegisterUserFormProps) => {

  const { mutate: registerUser } = useRegisterUser();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      role: "2"
    }
  });
  
  const userRoleSelection = userRoles.map( (data) => { 
    return {
      label: data.role,
      value: data.id
    }
  })

  return (

    <Flex gap='lg' direction='column' flex={1}>

      <form onSubmit={form.onSubmit((values) => {
        registerUser(values)
      })}>

        <Flex className={classes.flexItem}>
          <Text className={classes.text}> First Name </Text>
          <TextInput
            placeholder="Juan"
            className={classes.textInput}
            key={form.key('firstName')}
            {...form.getInputProps('firstName')}
            required
          />
        </Flex>

        <Flex className={classes.flexItem}>
        <Text className={classes.text}> Last Name </Text>
          <TextInput
            placeholder="De la Cruz"
            className={classes.textInput}
            key={form.key('lastName')}
            {...form.getInputProps('lastName')}
            required
          />
        </Flex>

        <Flex className={classes.flexItem}>
        <Text className={classes.text}> Username </Text>
          <TextInput
            placeholder="juan69"
            className={classes.textInput}
            key={form.key('username')}
            {...form.getInputProps('username')}
            required
          />
        </Flex>

        <Flex className={classes.flexItem}>
          <Text className={classes.text}> Email </Text>
          <TextInput
            placeholder="juan@gmail.com"
            className={classes.textInput}
            key={form.key('email')}
            {...form.getInputProps('email')}
            required
          />
        </Flex>

        <Flex className={classes.flexItem}>
          <Text className={classes.text}> Password </Text>
          <PasswordInput
            className={classes.textInput}
            key={form.key('password')}
            {...form.getInputProps('password')}
            required
          />
        </Flex>

        <Flex className={classes.flexItem}>
          <Text className={classes.text}> Confirm Password </Text>
          <PasswordInput
            className={classes.textInput}
            key={form.key('password')}
            {...form.getInputProps('password')}
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
    </Flex>
  )
}

export default RegisterUserForm;