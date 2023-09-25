import { useContext } from 'react';

import { WorkOrderContext } from '../hooks';
import ListAccordion from 'apps/web/components/ListAccordion';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const TechOrder = () => {
  const { workOrders, setWorkOrders } = useContext(WorkOrderContext);

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

  return (
    <>
      <ListAccordion title="órdenes de trabajo" handleUpdate={handleUpdate} />
    </>
  );
};

export default TechOrder;
