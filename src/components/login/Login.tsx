import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "@/contexts/UserContext";
import LoginForm from "./components/login-form/LoginForm";
import DropdownMenu from "./components/dropdown-menu/DropdownMenu";

const LoginButton = () => {
  const { user } = useUser();
  const [loginOpened, { toggle: toggleLogin, close: closeLogin }] = useDisclosure(false);

  const loginOroutButton = user ? (
    <DropdownMenu />
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