import { Button, TextInput, PasswordInput, Box, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUserLogin } from "@/hooks/usersHook";
import { useDisclosure } from "@mantine/hooks";
import { useUserLogout } from '@/hooks/usersHook';
import { useUser } from "@/contexts/UserContext";

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

const LoginButton = () => {
  const { user } = useUser();
  const [loginOpened, { toggle: toggleLogin, close: closeLogin }] = useDisclosure(false);
  const {mutate: userLogout} = useUserLogout();

  const loginOroutButton = user ? (
    <Button onClick={ () => {
      const token = localStorage.getItem("token") ?? null;
      userLogout(token);
    }}>
      Log out
    </Button>
  ) : (
    <Button onClick={toggleLogin}>
      Log in
    </Button>
  );

  return (
    <>
      <Modal opened={loginOpened} onSubmit={closeLogin} onClose={closeLogin} title="Login">
        <LoginForm/>
      </Modal>
      {loginOroutButton}
    </>
  )
}
export default LoginButton;