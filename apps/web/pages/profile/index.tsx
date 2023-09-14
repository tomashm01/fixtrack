import { withAuth } from 'apps/web/hoc';
import Navbar from '../layout/navbar';
import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getToken, setToken } from '../../services/auth';

interface ProfileProps {
  role: string;
}

const Profile = (role: ProfileProps) => {
  const [formData, setFormData] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: getToken(),
          password: formData.currentPassword,
          newpassword: formData.newPassword
        })
      });

      if (response.ok) {
        setToken('');
        router.push('/logout');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error inesperado.');
      setIsErrorModalOpen(true);
    }
  };

  return (
    <>
      <Navbar role={role.role} />
      <Flex justifyContent="center">
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="30%"
          gap="2"
          minHeight="50vh"
        >
          <Text fontSize="2xl" mb="4">
            Cambiar contraseña
          </Text>
          <FormControl mb="4">
            <FormLabel>Contraseña actual</FormLabel>
            <Input
              type="password"
              onChange={e =>
                setFormData({
                  ...formData,
                  currentPassword: e.target.value
                })
              }
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Nueva contraseña</FormLabel>
            <Input
              type="password"
              onChange={e =>
                setFormData({
                  ...formData,
                  newPassword: e.target.value
                })
              }
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Cambiar
          </Button>
        </Flex>
      </Flex>

      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{errorMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => setIsErrorModalOpen(false)}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const getServerSideProps = withAuth();

export default Profile;
