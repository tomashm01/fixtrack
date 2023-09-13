import { useEffect, useState, createContext } from 'react';

import { DeviceDTO } from '@fixtrack/contracts';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface DeviceContextProps {
  devices?: DeviceDTO[];
  setDevices?: React.Dispatch<React.SetStateAction<DeviceDTO[]>>;
  loading?: boolean;
  error?: any;
}

export const DeviceContext = createContext<DeviceContextProps>({});

export const useDevices = () => {
  const [devices, setDevices] = useState<DeviceDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiURL}/device`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
        );
        const data = await response.json();
        setDevices(data);
      } catch (e) {
        //setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return { devices, setDevices, loading, error };
};
