import { Button, TextInput, PasswordInput, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUserLogin } from "@/hooks/usersHook";

const LoginForm = () => {

  const { mutate: userLogin } = useUserLogin();

  const form = useForm({
    mode: "uncontrolled",
    validate: (values) => ({
      username: values.username == undefined && "Username is required",
      password: values.password == undefined && "Password is required"
    })
  });

  return (
    <form onSubmit={ form.onSubmit( (values: any) => {
      userLogin(values);
    })}>

      <Box mx="xs" mb="sm">
        <TextInput
          label="Username"
          withAsterisk
          key={form.key('username')}
          {...form.getInputProps("username")}
        />

        <PasswordInput
          label="Password"
          withAsterisk
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
      </Box>
      
      <Box>
        <Button type="submit">
          Login
        </Button>
      </Box>

    </form>
  )
}

export default LoginForm;