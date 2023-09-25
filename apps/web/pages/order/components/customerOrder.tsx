import ListAccordion from 'apps/web/components/ListAccordion';
import { WorkOrderContext, useWorkOrders } from '../hooks';

interface CustomerOrderProps {
  role: string;
  id: string;
}

const CustomerOrder = ({ role, id }: CustomerOrderProps) => {
  const { workOrders, setWorkOrders, loading, error } = useWorkOrders(id, role);

  return (
    <WorkOrderContext.Provider
      value={{ workOrders, setWorkOrders, loading, error }}
    >
      <ListAccordion title="órdenes de trabajo" />
    </WorkOrderContext.Provider>
  );
};

export default CustomerOrder;
