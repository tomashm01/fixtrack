import { withAuth } from '../../hoc/index';
import Navbar from '../layout/navbar';
import AdminDashboard from './components/adminDashboard';
import CustomerDashboard from './components/customerDashboard';
import TechDashboard from './components/techDashboard';

interface DashboardProps {
  role: string;
  id: string;
}

const Dashboard = ({ role, id }: DashboardProps) => {
  const dashboardMapper: Record<string, JSX.Element> = {
    ADMIN: <AdminDashboard />,
    CLIENTE: <CustomerDashboard role={role} id={id} />,
    TECNICO: <TechDashboard />
  };
  return (
    <>
      <Navbar role={role} />
      {dashboardMapper[role]}
    </>
  );
};

export const getServerSideProps = withAuth(['ADMIN', 'CLIENTE', 'TECNICO']);

export default Dashboard;
