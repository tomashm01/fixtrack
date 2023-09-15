import { withAuth } from '../../hoc/index';
import Navbar from '../layout/navbar';

import AdminDevice from './components/adminDevice';
import CustomerDevice from './components/customerDevice';
import { DeviceContext, useDevices } from './hooks';

const deviceMapper: Record<string, JSX.Element> = {
  ADMIN: <AdminDevice />,
  CLIENTE: <CustomerDevice />
};

interface DeviceProps {
  role: string;
}

const Device = ({ role }: DeviceProps) => {
  const { devices, setDevices, loading, error } = useDevices();

  return (
    <DeviceContext.Provider value={{ devices, setDevices, loading, error }}>
      <Navbar role={role} />
      {deviceMapper[role]}
    </DeviceContext.Provider>
  );
};

export const getServerSideProps = withAuth(['ADMIN', 'CLIENTE']);

export default Device;
