import React from 'react';
import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useLogin from './hooks';

const Login = () => {
  const { email, password,errorMsg, setEmail, setPassword, handleLogin } = useLogin();
  const router = useRouter();

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      h="100vh"
    >
      <Heading mb={4}>Iniciar sesión</Heading>
      <VStack spacing={4}>
      { errorMsg && <Text color="red.500">{errorMsg}</Text> }
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          borderColor="skyblue"
          _hover={{ borderColor: 'dodgerblue' }}
          _focus={{ borderColor: 'dodgerblue', boxShadow: '0 0 5px dodgerblue' }}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          borderColor="skyblue"
          _hover={{ borderColor: 'dodgerblue' }}
          _focus={{ borderColor: 'dodgerblue', boxShadow: '0 0 5px dodgerblue' }}
        />
        <Button 
          onClick={handleLogin}
          background={email && password ? 'dodgerblue' : 'skyblue'}
          borderColor="skyblue"
          _hover={{ bg: 'skyblue', color: 'white' }}
          _active={{ bg: 'dodgerblue', color: 'white' }}
        >
          Enviar
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
