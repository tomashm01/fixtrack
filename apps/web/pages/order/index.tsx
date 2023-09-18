import { withAuth } from '../../hoc/index';
import Navbar from '../layout/navbar';

import AdminOrder from './components/adminOrder';
import TechOrder from './components/techOrder';
import { WorkOrderContext, useWorkOrders } from './hooks';

const workOrderMapper: Record<string, JSX.Element> = {
  ADMIN: <AdminOrder />,
  TECNICO: <TechOrder />
};

interface WorkOrderProps {
  role: string;
}

const WorkOrder = ({ role }: WorkOrderProps) => {
  const { workOrders, setWorkOrders, loading, error } = useWorkOrders();

  return (
    <WorkOrderContext.Provider
      value={{ workOrders, setWorkOrders, loading, error }}
    >
      <Navbar role={role} />
      {workOrderMapper[role]}
    </WorkOrderContext.Provider>
  );
};

export const getServerSideProps = withAuth(['ADMIN', 'TECNICO']);

export default WorkOrder;
