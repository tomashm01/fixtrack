import { withAuth } from "../../hoc/index";
import AdminDashboard from "./components/adminDashboard";
import CustomerDashboard from "./components/customerDashboard";
import TechDashboard from "./components/techDashboard";

const dashboardMapper : Record<string,JSX.Element>={
  "ADMIN":<AdminDashboard/>,
  "CLIENTE":<CustomerDashboard/>,
  "TECNICO":<TechDashboard/>,
}

const Dashboard = ({ role }: any) => {
  return dashboardMapper[role];
};

export const getServerSideProps = withAuth();

export default Dashboard;
