import { Button, TextInput, PasswordInput, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

const LoginForm = () => {

  const form = useForm({mode: "uncontrolled"});

  return (
    <form onSubmit={ form.onSubmit( (values: any) => {
      console.log(values)
    })}>

      <Box mx="xs" mb="sm">
        <TextInput
          label="Username"
          withAsterisk
        />

        <PasswordInput
          label="Password"
          withAsterisk
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