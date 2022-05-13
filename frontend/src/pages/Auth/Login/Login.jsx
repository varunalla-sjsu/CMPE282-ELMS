import React from 'react';
import { useForm } from '@mantine/hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Container,
} from '@mantine/core';
import { useMutation } from 'react-query';
import { login } from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';

export function Login() {

    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
        email: '',
        password: '',
        },

        validationRules: {
        email: (val) => /^\S+@\S+$/.test(val),
        password: (val) => val.length >= 6,
        },
    });

  const loginMutation = useMutation(login);

  function onSubmitLogin(email, password){
      loginMutation.mutateAsync({
          username: email,
          password: password
      }).then((res) => {
          localStorage.setItem("user",JSON.stringify(res));
          navigate('dashboard');

      })
  }

  return (
    <Container size={420} my={40}>
    <Paper radius="md" p="xl">
      <Text size="lg" weight={500}>
        Welcome to ELMS
      </Text>
      <form onSubmit={form.onSubmit((values) => {
          onSubmitLogin(values.email, values.password);
      })}>
        <Group direction="column" grow>
          
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />
        </Group>

        <Group position="apart" mt="xl">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Paper>
    </Container>
  );
}