import React from 'react';
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "@/contexts/UserContext";
import LoginForm from "./components/login-form/LoginForm";
import DropdownMenu from "./components/dropdown-menu/DropdownMenu";

const LoginButton: React.FC = () => {
  const { user } = useUser();
  const [loginOpened, { toggle: toggleLogin, close: closeLogin }] = useDisclosure(false);

  const handleLoginSuccess = () => {
    closeLogin();
  };

  const loginOroutButton = user ? (
    <DropdownMenu />
  ) : (
    <Button onClick={toggleLogin}>
      Log in
    </Button>
  );

  return (
    <>
      <Modal 
        opened={loginOpened} 
        onClose={closeLogin} 
        title="Login"
      >
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </Modal>
      {loginOroutButton}
    </>
  )
}

export default LoginButton;