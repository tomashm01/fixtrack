import { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, Select, TableContainer, Flex, Heading, Text } from '@chakra-ui/react';

import { withAuth } from 'apps/web/hoc';
import Navbar from '../layout/navbar';
import { useUsers } from './hooks';
import { useRouter } from 'next/router';

const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

interface UserListProps {
  role: string;
}

const UserList = (role:UserListProps) => {

  const router = useRouter();

  if(role.role !== 'ADMIN') router.push('/dashboard');

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const { users,setUsers, loading, error } = useUsers();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      } else {
        console.log("No se pudo eliminar el usuario");
      }
    } catch (error) {
      console.log("Ocurrió un error al eliminar el usuario:", error);
    }
  };
  

  const filteredUsers = users.filter((user) => user.email.includes(filter));
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Navbar role={role.role} />
      <Box p={4}>
        
        <Flex direction="column" gap={5}>
          <Heading display="flex" justifyContent="center">Lista de usuarios</Heading>
          <Flex gap="4" justifyContent="center" alignItems="center">
          <Input 
            placeholder="Buscar por correo electrónico" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            width={["80%", "60%", "40%", "20%"]}
          />
          <Select 
            width={["80%", "60%", "40%", "20%"]} 
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
            <option value={50}>50 por página</option>
          </Select>
        </Flex>

        </Flex>
        
        <Box maxWidth="80%" margin="auto"> 
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Número</Th>
                  <Th>Email</Th>
                  <Th>Rol</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentUsers.map((user, index) => (
                  <Tr key={user.id}>
                    <Td>{startIndex + index + 1}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      <Button colorScheme="red" onClick={() => handleDelete(user.id)}>
                        Eliminar
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Flex justifyContent="center" alignContent="center" alignItems="center" gap="5">
          <Button isDisabled={currentPage === 1} onClick={handlePreviousPage}>
            Anterior
          </Button>
          <Text>Página {currentPage} de {totalPages}</Text>
          <Button isDisabled={currentPage === totalPages} onClick={handleNextPage}>
            Siguiente
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export const getServerSideProps = withAuth();

export default UserList;
