import { withAuth } from '../../hoc/index';
import Navbar from '../layout/navbar';
import AdminDashboard from './components/adminDashboard';
import CustomerDashboard from './components/customerDashboard';
import TechDashboard from './components/techDashboard';

const dashboardMapper: Record<string, JSX.Element> = {
  ADMIN: <AdminDashboard />,
  CLIENTE: <CustomerDashboard />,
  TECNICO: <TechDashboard />
};

interface DashboardProps {
  role: string;
}

const Dashboard = ({ role }: DashboardProps) => {
  return (
    <>
      <Navbar role={role} />
      {dashboardMapper[role]}
    </>
  );
};

export const getServerSideProps = withAuth(['ADMIN', 'CLIENTE', 'TECNICO']);

export default Dashboard;
