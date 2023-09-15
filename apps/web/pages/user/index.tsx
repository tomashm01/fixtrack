import { withAuth } from 'apps/web/hoc';
import Navbar from '../layout/navbar';
import { useUsers } from './hooks';
import ListTable from 'apps/web/components/ListTable';
import { CreateButtonProps } from 'apps/web/components/createButton';
import { KnownRoles } from 'apps/web/services/auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UserListProps {
  role: string;
}

const UserList = ({ role }: UserListProps) => {
  const { users, setUsers, loading } = useUsers();

  const handleUserCreated = (newUser: any) => {
    if (setUsers && users) {
      setUsers([...users, newUser]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
      } else {
        console.log('No se pudo eliminar el usuario');
      }
    } catch (error) {
      console.log('Ocurrió un error al eliminar el usuario:', error);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'EMAIL', accessor: 'email' },
    { header: 'ROLE', accessor: 'role' }
  ];

  const createFields = [
    { label: 'Correo electrónico', type: 'text', fieldName: 'email' },
    { label: 'Contraseña', type: 'password', fieldName: 'password' },
    {
      label: 'Rol usuario',
      type: 'select',
      fieldName: 'role',
      options: Object.values(KnownRoles)
    }
  ];

  const createButtonProps: CreateButtonProps = {
    fields: createFields,
    apiUrl: `${apiUrl}/user`,
    title: 'usuario',
    onCreated: handleUserCreated
  };

  return (
    <>
      <Navbar role={role} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ListTable
          data={users}
          columns={columns}
          createButton={createButtonProps}
          onDelete={handleDelete}
          title="usuarios"
        />
      )}
    </>
  );
};

export const getServerSideProps = withAuth(['ADMIN']);

export default UserList;
