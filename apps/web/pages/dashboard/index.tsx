import { withAuth } from "../../hoc/index";
import Navbar from "../layout/navbar";
import AdminDashboard from "./components/adminDashboard";
import CustomerDashboard from "./components/customerDashboard";
import TechDashboard from "./components/techDashboard";

const dashboardMapper : Record<string,JSX.Element>={
  "ADMIN":<AdminDashboard/>,
  "CLIENTE":<CustomerDashboard/>,
  "TECNICO":<TechDashboard/>,
}

const Dashboard = ({ role }: any) => {
  return (
    <>
      <Navbar />
      {dashboardMapper[role]}
    </>
  );
};

export const getServerSideProps = withAuth();

export default Dashboard;
