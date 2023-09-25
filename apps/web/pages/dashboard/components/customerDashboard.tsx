import CustomerOrder from '../../order/components/customerOrder';

const CustomerDashboard = ({ role, id }: any) => {
  return <CustomerOrder role={role} id={id} />;
};

export default CustomerDashboard;
