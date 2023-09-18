import { useEffect, useState, createContext } from 'react';

import { WorkOrderDTO } from '@fixtrack/contracts';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface WorkOrderContextProps {
  workOrders?: WorkOrderDTO[];
  setWorkOrders?: React.Dispatch<React.SetStateAction<WorkOrderDTO[]>>;
  loading?: boolean;
  error?: any;
}

export const WorkOrderContext = createContext<WorkOrderContextProps>({});

export const useWorkOrders = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrderDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiURL}/workorder`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        const data = await response.json();
        setWorkOrders(data);
      } catch (e) {
        //setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkOrders();
  }, []);

  return { workOrders, setWorkOrders, loading, error };
};
