import React, { useState } from 'react';
import { Button, TextInput, PasswordInput, Box, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUserLogin } from "@/hooks/usersHook";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { mutate: userLogin } = useUserLogin();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: (value) => value ? null : "Username is required",
      password: (value) => value ? null : "Password is required"
    }
  });

  const handleLogin = (values: { username: string; password: string }) => {
    // Reset previous error before attempting login
    setLoginError(null);

    userLogin(values, {
      onSuccess: () => {
        onLoginSuccess?.();
      },
      onError: () => {
        setLoginError("Login failed. Please check your credentials.");
      }
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleLogin)}>
      {loginError && (
        <Box mb="md">
          <Alert color="red" title="Login Error">
            {loginError}
          </Alert>
        </Box>
      )}

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
        <Button type="submit" fullWidth>
          Login
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm;