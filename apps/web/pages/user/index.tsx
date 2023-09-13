import { useState } from 'react';

import { withAuth } from 'apps/web/hoc';
import Navbar from '../layout/navbar';
import { useUsers } from './hooks';
import { useRouter } from 'next/router';
import ListTable from 'apps/web/components/ListTable';

const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

interface UserListProps {
  role: string;
}

const UserList = (role:UserListProps) => {

  const router = useRouter();
  if(role.role !== 'ADMIN') router.push('/dashboard');

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
  
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "EMAIL", accessor: "email" },
  ];

  return (
    <>
      <Navbar role={role.role} />
      <ListTable 
        data={users}
        columns={columns}
        onDelete={handleDelete}
        title="usuarios"
      />
    </>
  );
};

export const getServerSideProps = withAuth();

export default UserList;
