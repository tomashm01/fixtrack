import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  VStack
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Landing() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      bg="gray.100"
    >
      <Box textAlign="center" fontSize="xl">
        <VStack spacing={8}>
          <Image
            boxSize="100px"
            objectFit="cover"
            src="/logo.png"
            alt="FixTrack Logo"
          />
          <Heading as="h1" size="2xl">
            Bienvenido a FixTrack
          </Heading>
          <Text>
            Tu solución completa para reparaciones de dispositivos electrónicos.
          </Text>
          <Button colorScheme="blue" size="lg" onClick={goToLogin}>
            Iniciar Sesión
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
