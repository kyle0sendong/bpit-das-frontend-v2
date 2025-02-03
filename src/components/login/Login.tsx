import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUserLogout } from '@/hooks/usersHook';
import { useUser } from "@/contexts/UserContext";
import LoginForm from "./components/loginForm/LoginForm";

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