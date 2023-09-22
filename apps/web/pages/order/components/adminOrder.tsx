import { useContext } from 'react';

import { DeviceDTO, UserDTO } from '../../../services/auth';
import { WorkOrderContext } from '../hooks';
import { CreateButtonProps } from 'apps/web/components/CreateButton';
import { useUsers } from '../../user/hooks';
import { useDevices } from '../../device/hooks';
import ListAccordion from 'apps/web/components/ListAccordion';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const AdminOrder = () => {
  const { workOrders, setWorkOrders, loading, error } =
    useContext(WorkOrderContext);
  const { users } = useUsers();
  const { devices } = useDevices();

  const customers = users?.filter(user => user.role === 'CLIENTE');
  const technicians = users?.filter(user => user.role === 'TECNICO');

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/workorder/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const updatedWorkOrder = workOrders
          ? workOrders.filter(order => order._id !== id)
          : [];
        if (setWorkOrders) setWorkOrders(updatedWorkOrder);
      } else {
        console.log('No se pudo eliminar el usuario');
      }
    } catch (error) {
      console.log('Ocurrió un error al eliminar el usuario:', error);
    }
  };

  const handleUpdate = async (updatedData: any) => {
    try {
      const response = await fetch(`${apiUrl}/workorder`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        if (setWorkOrders && workOrders) {
          const updatedOrders = workOrders.map(order =>
            order._id === updatedData._id ? { ...order, ...updatedData } : order
          );
          setWorkOrders(updatedOrders);
        }
      } else {
        console.error('No se pudo actualizar la orden de trabajo');
      }
    } catch (error) {
      console.error(
        'Ocurrió un error al actualizar la orden de trabajo:',
        error
      );
    }
  };

  const handleWorkOrderCreated = (newWorkOrder: any) => {
    if (setWorkOrders && workOrders) {
      setWorkOrders([...workOrders, newWorkOrder]);
    }
  };

  const createFields = [
    {
      label: 'Cliente',
      type: 'filtrableSelect',
      fieldName: 'idCustomer',
      options: customers,
      optionRenderer: (customer: UserDTO) => customer.email
    },
    {
      label: 'Tecnico',
      type: 'filtrableSelect',
      fieldName: 'idTechnician',
      options: technicians,
      optionRenderer: (technician: UserDTO) => technician.email
    },
    {
      label: 'Dispositivo',
      type: 'filtrableSelect',
      fieldName: 'idDevice',
      options: devices,
      optionRenderer: (device: DeviceDTO) => `${device.brand} ${device.model}`
    },
    { label: 'Descripción', type: 'text', fieldName: 'description' },
    { label: 'Precio', type: 'text', fieldName: 'price' }
  ];

  const createButtonProps: CreateButtonProps = {
    fields: createFields,
    apiUrl: `${apiUrl}/workorder`,
    title: 'orden de trabajo',
    onCreated: handleWorkOrderCreated,
    defaultValues: {
      status: 'PENDING',
      startDate: new Date().toDateString()
    }
  };

  return (
    <>
      <ListAccordion
        title="órdenes de trabajo"
        createButton={createButtonProps}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

export default AdminOrder;
