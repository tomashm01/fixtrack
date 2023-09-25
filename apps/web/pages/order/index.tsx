import { withAuth } from '../../hoc/index';
import Navbar from '../layout/navbar';

import AdminOrder from './components/adminOrder';
import CustomerOrder from './components/customerOrder';
import TechOrder from './components/techOrder';
import { WorkOrderContext, useWorkOrders } from './hooks';

interface WorkOrderProps {
  role: string;
  id: string;
}

const WorkOrder = ({ role, id }: WorkOrderProps) => {
  const workOrderMapper: Record<string, JSX.Element> = {
    ADMIN: <AdminOrder />,
    TECNICO: <TechOrder />,
    CLIENTE: <CustomerOrder role={role} id={id} />
  };
  const { workOrders, setWorkOrders, loading, error } = useWorkOrders(id, role);

  return (
    <WorkOrderContext.Provider
      value={{ workOrders, setWorkOrders, loading, error }}
    >
      <Navbar role={role} />
      {workOrderMapper[role]}
    </WorkOrderContext.Provider>
  );
};

export const getServerSideProps = withAuth(['ADMIN', 'TECNICO', 'CLIENTE']);

export default WorkOrder;
